import Counter from "../../lib/models/counter";
import { connectdb } from '../../lib/mongo'
export async function getCounters() {
    try {
        await connectdb()
        const counter = await Counter.findByIdAndUpdate(
            { _id: 'ticketSequence' },
            { returnDocument: 'after', upsert: true }
        );
        return counter;
    } catch (err) {
        console.log("Error occured while fetching number of sold tickets",err);
        return 0;
    }
}