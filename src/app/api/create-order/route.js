import { NextResponse } from "next/server";
import { instance } from "../../../lib/razorpay";
import User from "../../../lib/models/User";
import Razorpay from "../../../lib/models/Razorpay";
import { COUPON_CODES, getCouponDiscountedPassPrice, PASSES_DATA } from "../../../data/passesData";
import Coupon from "../../../lib/models/Coupon";

export async function POST(request) {
    try {
        const { email, passKey, couponCode } = await request.json();
        const normalizedEmail = email?.toLowerCase().trim();
        const pass = PASSES_DATA[passKey];
        const normalizedCoupon = couponCode?.trim().toUpperCase() || null;
        if (normalizedCoupon && !COUPON_CODES.includes(normalizedCoupon)) {
            return NextResponse.json({ success: false, message: "Invalid coupon code" }, { status: 400 });
        }

        if (normalizedCoupon) {
            await Coupon.bulkWrite(
                COUPON_CODES.map((code) => ({
                    updateOne: {
                        filter: { code },
                        update: { $setOnInsert: { code, redeemed: false } },
                        upsert: true,
                    },
                }))
            );
            const availableCoupon = await Coupon.findOne({ code: normalizedCoupon, redeemed: false }).lean();
            if (!availableCoupon) {
                return NextResponse.json({ success: false, message: "This coupon has already been used" }, { status: 409 });
            }
        }

        const amount = pass ? getCouponDiscountedPassPrice(pass.price, normalizedCoupon) * 100 : null;
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
            couponCode: normalizedCoupon,
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