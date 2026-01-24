export const OPENROUTER_MODEL = "nvidia/nemotron-3-nano-30b-a3b:free";

export async function chatCompletion(prompt: string, temperature: number = 1.0) {
    const apiKey = process.env.OPENROUTER_API_KEY;

    if (!apiKey) {
        console.error("OpenRouter API Key is missing!");
        return "Error: API Key missing.";
    }

    try {
        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${apiKey}`,
                "Content-Type": "application/json",
                "HTTP-Referer": window.location.origin, // Required by OpenRouter
                "X-Title": "DeepDive KI: Das Skelett", // Required by OpenRouter
            },
            body: JSON.stringify({
                model: OPENROUTER_MODEL,
                messages: [
                    { role: "user", content: prompt }
                ],
                temperature: temperature,
            })
        });

        const data = await response.json();

        if (data.choices && data.choices.length > 0) {
            return data.choices[0].message.content;
        } else {
            console.error("OpenRouter Error:", data);
            return "Error: No response from model.";
        }
    } catch (error) {
        console.error("Fetch Error:", error);
        return "Error connecting to OpenRouter.";
    }
}
