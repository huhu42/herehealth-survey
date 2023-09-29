import OpenAI from 'openai';

const openai = new OpenAI({apiKey: process.env.OPENAI_API_KEY});

function createOpenAIClient() {

    function complete(prompt: string): Promise<string> {
        return openai.chat.completions.create({
            model: "gpt-4",
            messages: [{"role": "user", "content": prompt}],
            max_tokens: 1024
        }).then(c => {
            if (c.choices.length === 0) {
                throw new Error("openai response returned empty")
            }
            const message = c.choices[0]!.message.content;
            if (!message) {
                throw new Error("openai response returned empty");
            }
            return message;
        }).catch(error => {
            throw new Error("openai returned error " + error);
        })
    }

    return {complete};
}

export const openAIClient = createOpenAIClient();

