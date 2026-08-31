// src/app/api/volunteer/verify/route.js
import { NextResponse } from 'next/server';
import Tickets from '../../../../lib/models/Ticket'
import User from '../../../../lib/models/User'
import { connectdb } from '../../../../lib/mongo';

export async function GET(req) {
  try {
    await connectdb()
    const { searchParams } = new URL(req.url);
    const passCode = searchParams.get('passCode')?.trim();

    if (!passCode) {
      return NextResponse.json({ error: 'passCode is required' }, { status: 400 });
    }

    const ticket = await Tickets.findOne({ passCode }).populate('userId', 'name email');
    if (!ticket) {
      return NextResponse.json({ error: 'Ticket not found for this pass code' }, { status: 404 });
    }

    return NextResponse.json({ success: true, ticket });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PATCH(req) {
  try {
    await connectdb();
    const { passCode, action, perkKey, staffEmail } = await req.json();

    const ticket = await Tickets.findOne({ passCode });
    if (!ticket) {
      return NextResponse.json({ error: 'Ticket not found' }, { status: 404 });
    }

    let staffUser = null;
    if (staffEmail) {
      staffUser = await User.findOne({ email: staffEmail.toLowerCase().trim() });
    }

    if (action === 'TOGGLE_ATTENDANCE') {
      if (ticket.attendance.status === 'NOT_ENTERED') {
        ticket.attendance.status = 'ENTERED';
        ticket.attendance.enteredAt = new Date();
      } else if (ticket.attendance.status === 'ENTERED') {
        ticket.attendance.status = 'EXITED';
        ticket.attendance.exitedAt = new Date();
      }
      if (staffUser) ticket.attendance.scannedByStaffId = staffUser._id;
    }
    if (action === 'TOGGLE_PERK' && perkKey && ticket.perksRedemption[perkKey]) {
      const perk = ticket.perksRedemption[perkKey];
      if (!perk.isEligible) {
        return NextResponse.json({ error: 'Attendee is not eligible for this perk' }, { status: 400 });
      }

      perk.isClaimed = !perk.isClaimed;
      perk.claimedAt = perk.isClaimed ? new Date() : null;
      perk.claimedByStaffId = perk.isClaimed && staffUser ? staffUser._id : null;
    }

    await ticket.save();
    return NextResponse.json({ success: true, ticket });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}