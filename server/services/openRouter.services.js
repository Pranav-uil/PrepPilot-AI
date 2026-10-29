// axios is used to fetch the url of openRoueter API

import axios from "axios"

export const askAi = async (messages) => {  
    try {
        if(!messages || !Array.isArray(messages) || messages.length === 0) {
            throw new Error("Messages array is empty.");                 
        } 
        const response = await axios.post("https://openrouter.ai/api/v1/chat/completions", 
        {
           model: "openrouter/free",
           messages: messages
        },

          {
            headers: {
    Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
   'Content-Type': 'application/json',
  },});
// ?. is called optional chaining in JavaScript.
// If response.data is missing or choices is null, JavaScript returns undefined instead of throwing an error from that missing property access.
   const content = response?.data?.choices?.[0]?.message?.content;

        if (!content || !content.trim()) {
      throw new Error("AI returned empty response.");
    }

    return content
    } catch (error) {
    console.error("OpenRouter Error:", error.response?.data || error.message);
    throw new Error("OpenRouter API Error");
    }
}