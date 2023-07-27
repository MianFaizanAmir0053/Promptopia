import {connectToDatabase} from '@utils/database'
import Prompt from '@models/prompt'

export async function GET(req, res) {
    try {
        await connectToDatabase()
        const prompts = await Prompt.find({}).sort({createdAt: -1}).populate('creator')
        return new Response(
            JSON.stringify(prompts),
            {status: 200}
        )
    } catch (error) {
        console.log(error);
        return new Response(
            "Failed to get prompts",
            {status: 500}
        )
    }
}