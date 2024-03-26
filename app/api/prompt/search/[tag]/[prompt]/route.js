import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

export const GET =  async (req, {params})=>{
    try{
        await connectToDB();

        const substringToSearch = params?.prompt;
        const tagToSearch = params?.tag;

        const query = {
            $or: [
                { tag: { $regex: tagToSearch, $options: 'i' } },
                { prompt: { $regex: substringToSearch, $options: 'i' } }
            ]
        };

       const prompts = await Prompt.find(query).populate('creator');

        return new Response(JSON.stringify(prompts), {status:200})
    }catch(error){
return new Response("Failed to fetch prompts", {status:500})
    }
}