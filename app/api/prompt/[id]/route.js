import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

// GET

export const GET =  async (req, {params})=>{
    try{
        await connectToDB();
       const prompt = await Prompt.findById(params.id).populate('creator');

       if(!prompt) return new Response("Prompt not found", {status:404});
       
        return new Response(JSON.stringify(prompt), {status:200})
    }catch(error){
return new Response("Failed to fetch prompt", {status:500})
    }
}

// PATCH

export const PATCH = async (req, {params})=>{
    const {prompt, tag} = await req.json();
    try {
        await connectToDB();

        const existingPrompt = await Prompt.findById(params?.id);

        if(!existingPrompt) return new Response("Prompt not found", {status: 404});

        existingPrompt.prompt = prompt;
        existingPrompt.tag = tag;

        await existingPrompt.save();

        return new Response(JSON.stringify(existingPrompt), {status: 200});

    } catch (error) {
        return new Response("Failed to update prompt", {status:500})
    }
}


// DELETE

export const DELETE = async (request, { params }) => {
    try {
        await connectToDB();

        
        // Find the prompt by ID and remove it
        const response = await Prompt.deleteOne( { "_id" : params.id } );
        console.log('response ==> ', response);

        return new Response("Prompt deleted successfully", { status: 200 });
    } catch (error) {
        return new Response(`Error deleting prompt ${error} `, { status: 500 });
    }
};