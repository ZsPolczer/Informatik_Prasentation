export const OPENROUTER_MODEL = "nvidia/nemotron-3-nano-30b-a3b:free";

export async function chatCompletion(prompt: string, temperature: number = 1.0) {
    try {
        const response = await fetch("/api/ai/chat-completion", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                prompt,
                temperature
            })
        });

        const data = await response.json();

        if (response.ok && data.choices && data.choices.length > 0) {
            return data.choices[0].message.content;
        } else {
            console.error("AI Service Error:", data);
            return data.error || "Error: No response from model.";
        }
    } catch (error) {
        console.error("Fetch Error:", error);
        return "Error connecting to AI service.";
    }
}
