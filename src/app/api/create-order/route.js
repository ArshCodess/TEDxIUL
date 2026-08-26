import { NextResponse } from "next/server";
import { instance } from "../../../lib/razorpay";
import User from "../../../lib/models/User";
import Razorpay from "../../../lib/models/Razorpay";

export async function POST(request) {
    try {
        const { amount, email } = await request.json();
        const normalizedEmail = email?.toLowerCase().trim();
        if (!Number.isInteger(amount) || amount <= 0 || !normalizedEmail) {
            return NextResponse.json(
                { success: false, message: "A valid amount and email are required" },
                { status: 400 }
            );
        }

        const user = await User.findOne({ email: normalizedEmail });
        if (!user) {
            return NextResponse.json(
                { success: false, message: "Verified user account not found" },
                { status: 404 }
            );
        }

        const order = await instance.orders.create({
            amount: amount,
            currency: "INR",
        })
        const razorpay = await Razorpay.create({
            userId: user,
            orderId: order.id,
            amount: order.amount,
            status: order.status.toUpperCase(),
        })

        return NextResponse.json({
            success: true,
            order: order,
            razorpayId: razorpay._id
        },
            {
                status: 200
            })
    } catch (err) {
        console.log(err);

        return NextResponse.json(
            { success: false, message: "Unable to create payment order" },
            { status: 500 }
        )
    }

}