import Counter from "../../lib/models/counter";
import { connectdb } from '../../lib/mongo'
export async function getNumberOfTicketsSold() {
    try {
        await connectdb()
        const counter = await Counter.findByIdAndUpdate(
            { _id: 'ticketSequence' },
            { $inc: { seq: 1 } },
            { returnDocument: 'after', upsert: true }
        );
        return counter.seq;
    } catch (err) {
        console.log("Error occured while fetching number of sold tickets",err);
        return 0;
    }
}