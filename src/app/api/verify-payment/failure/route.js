import { NextResponse } from "next/server";
import Razorpay from "../../../../lib/models/Razorpay";

export async function POST(params) {
    try {
        const { order_id, failureReason } = await params.json();
        console.log(order_id + "---" + failureReason);

        await Razorpay.findOneAndUpdate({ orderId: order_id }, {
            failureReason: failureReason,
            status:"FAILED"
        })
        return NextResponse.json(
            { success: true, message: "updated reson in db" },
            { status: 200 })
    } catch (err) {
        return NextResponse.json(
            { success: false, message: "Something went wrong while updating failure reason in db" },
            { status: 500 }
        )
    }
}