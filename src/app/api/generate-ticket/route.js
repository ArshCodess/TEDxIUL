import { Resend } from "resend";
import TedxTicketEmail from '../../../components/TedxTicketEmail';
import { NextResponse } from "next/server";
import Ticket from "../../../lib/models/Ticket";
import User from "../../../lib/models/User";
import Razorpay from "../../../lib/models/Razorpay";
import { connectdb } from "../../../lib/mongo";
import Counter from "../../../lib/models/counter";
const resend = new Resend(process.env.RESEND_API_KEY);
const body = {}
let counter;
const CAPPING_OBJECT = {
    basic: 'basicSeq',
    general: 'geneSeq',
    gold: 'goldSeq',
    platinum: 'platSeq',
    faculty: 'facSeq'
};
export async function POST(params) {
    let reqBody = await params.json();
    try {
        const { name, email, passCode, userId, ticketId, razorpayId, amount, tier } = reqBody;
        await connectdb();
        counter = await Counter.findByIdAndUpdate(
            { _id: 'ticketSequence' },
            { $inc: {[CAPPING_OBJECT[tier]]: 1 } },
            { returnDocument: 'after', upsert: true }
        );
        const ticket = await Ticket.create({
            "ticketId": ticketId,
            "userId": userId,
            "email": email,
            "passTier": tier,
            "passCode": passCode,
            "quantity": 1,
            "totalAmount": amount,
            "status": "CONFIRMED",
            "razorpayId": razorpayId
        })
        await User.findOneAndUpdate({ email: email }, { ticketId: ticket._id })
        await Razorpay.findOneAndUpdate({ userId: userId }, { status: "MANUALLY-CAPTURED" })
        const URI_IMG = encodeURIComponent(passCode);
        await resend.emails.send({
            from: `Here is your Ticket! <${process.env.SENDER_TICKET_EMAIL}>`,
            cc: "sayyedarslaanulhasan0@gmail.com",
            to: [email],
            subject: "Your ticket is generated successfully",
            react: <TedxTicketEmail name={name} uri={URI_IMG} passCode={passCode} />,
        });
        return NextResponse.json({ status: 200 }, { message: "Ticket send" })
    } catch (er) {
        if (counter && reqBody.tier && CAPPING_OBJECT[reqBody.tier]) {
            await Counter.findByIdAndUpdate(
                { _id: 'ticketSequence' },
                { $inc: {[CAPPING_OBJECT[reqBody.tier]]: -1 } }
            );
        }
        console.log(er);
        return NextResponse.json({ status: 500 }, { message: "Error in sending ticket", error: er })
    }
}