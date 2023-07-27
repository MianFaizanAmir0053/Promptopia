import Prompt from '@models/prompt'
import {connectToDatabase} from '@utils/database'

export async function POST(req) {
    const {prompt, tag, userId} = await req.json()
    try {
        await connectToDatabase()
        const newPrompt = await Prompt.create({creator: userId, prompt, tag})
        console.log(userId, "created a new prompt");
        return new Response(
            JSON.stringify(newPrompt),
            {status: 201}
        )

    } catch (error) {
        console.log(error);
        return new Response(
            JSON.stringify('Something went wrong'),
            {status: 500}
        )
    }
} 