import {connectToDatabase} from '@utils/database'
import Prompt from '@models/prompt'

export async function GET(req, {params}) {
    try {
        await connectToDatabase()
        const prompt = await Prompt.findById(params.id).populate('creator')
        if (!prompt) return new Response(
            "Prompt not found",
            {status: 404}
        )

        return new Response(
            JSON.stringify(prompt),
            {status: 200}
        )
    } catch (error) {
        console.log(error);
        return new Response(
            "Failed to get prompt",
            {status: 500}
        )
    }
}

export async function PATCH(req, {params}) {
    const {tag, prompt} = await req.json()

    try {
        await connectToDatabase()

        const existingPrompt = await Prompt.findById(params.id)
        if (!existingPrompt) return new Response(
            "Prompt not found",
            {status: 404}
        )

        existingPrompt.tag = tag
        existingPrompt.prompt = prompt
        await existingPrompt.save()

        return new Response(
            JSON.stringify(existingPrompt),
            {status: 200}
        )
    } catch (err) {
        console.log(err);
        return new Response(
            "Failed to update prompt",
            {status: 500}
        )
    }
}



export async function DELETE(req, {params}) {
    try {
        await connectToDatabase()

        await Prompt.findByIdAndDelete(params.id)

        return new Response(
            "Prompt deleted",
            {status: 200}
        )
    } catch (err) {
        console.log(err);
        return new Response(
            "Failed to delete prompt",
            {status: 500}
        )
    }
}