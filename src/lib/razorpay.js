import Razorpay from "razorpay"

if (process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID === null || process.env.RAZORPAY_SECRET === null) {
    console.log("NO API KEYS FOUND");
}
export const instance = new Razorpay({
    key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_SECRET,
})