import { GoogleGenerativeAI } from "@google/generative-ai";

export interface Message {
    role: 'user' | 'assistant';
    content: string;
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: Request) {
    const { prompt } = await req.json();

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const systemPrompt = `You are a helpful AI embedded in a notion text editor app that is used to autocomplete sentences.
The traits of AI include expert knowledge, helpfulness, cleverness, and articulateness.
AI is a well-behaved and well-mannered individual.
AI is always friendly, kind, and inspiring, and he is eager to provide vivid and thoughtful responses to the user.`;

    const userPrompt = `I am writing a piece of text in a notion text editor app.
Help me complete my train of thought here: ##${prompt}##
keep the tone of the text consistent with the rest of the text.
keep the response short and sweet.`;

    try {
        const result = await model.generateContentStream(systemPrompt + "\n\n" + userPrompt);

        const encoder = new TextEncoder();
        const stream = new ReadableStream({
            async start(controller) {
                for await (const chunk of result.stream) {
                    const text = chunk.text();
                    controller.enqueue(encoder.encode(text));
                }
                controller.close();
            },
        });

        return new Response(stream, {
            headers: {
                'Content-Type': 'text/plain; charset=utf-8',
            },
        });
    } catch (error) {
        console.error('Error generating completion:', error);
        return new Response('Error generating completion', { status: 500 });
    }
}
