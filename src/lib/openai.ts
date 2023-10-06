import { OpenAI } from "openai";
import { env } from "../env";

export const openai = new OpenAI({
    apiKey: env.OPENAI_API_KEY
})


// const { Configuration, OpenAIApi } = require('openai')

// const configuration = new Configuration({
//     apiKey: env.OPENAI_API_KEY
// })

// export const openai = new OpenAIApi(configuration);
