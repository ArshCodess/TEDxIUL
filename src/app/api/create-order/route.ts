import { NextRequest, NextResponse } from "next/server";
import { instance } from "../../../lib/razorpay";

export async function POST(request: NextRequest) {
    try {
        const { amount } = await request.json();
        const order = await instance.orders.create({
            amount: amount,
            currency: "INR",
        })

        return NextResponse.json({ order: order }, { status: 200 })
    } catch (err) {

        return NextResponse.json({ error: err }, { status: 400 })
    }

}