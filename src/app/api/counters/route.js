import { NextResponse } from "next/server";
import Counter from "../../../lib/models/counter";
import { connectdb } from "../../../lib/mongo";

export async function GET() {
    try {
        await connectdb()
        const counter = await Counter.findByIdAndUpdate(
            { _id: 'ticketSequence' },
            { returnDocument: 'after', upsert: true }
        );
        return NextResponse.json({
            status: 200,
            counter: counter
        });
    } catch (err) {
        console.log("Error occured while fetching number of sold tickets", err);
        return NextResponse.json({success:false,message:"Internal Server while fetching Counters"},{ status: 500 });

    }
}