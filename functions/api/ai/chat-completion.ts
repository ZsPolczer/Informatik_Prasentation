type Ctx = { request: Request; env: Record<string, string> };

const corsHeaders = {
  "Access-Control-Allow-Origin": "*", // OK for school demo; tighten later if needed
  "Access-Control-Allow-Methods": "POST,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export const onRequestOptions = async () =>
  new Response(null, { status: 204, headers: corsHeaders });

export const onRequestPost = async ({ request, env }: Ctx) => {
  if (!env.OPENROUTER_API_KEY) {
    return new Response(JSON.stringify({ error: "Missing OPENROUTER_API_KEY" }), {
      status: 500,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }

  let body: any = {};
  try {
    body = await request.json();
  } catch {
    // ignore
  }

  const { prompt, temperature = 1.0 } = body ?? {};
  if (!prompt) {
    return new Response(JSON.stringify({ error: "Prompt is required" }), {
      status: 400,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }

  const upstream = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${env.OPENROUTER_API_KEY}`,
      "Content-Type": "application/json",
      "HTTP-Referer": env.HTTP_REFERER || "https://example.com",
      "X-Title": env.X_TITLE || "School Presentation",
    },
    body: JSON.stringify({
      model: "nvidia/nemotron-3-nano-30b-a3b:free",
      messages: [{ role: "user", content: prompt }],
      temperature,
    }),
  });

  const text = await upstream.text();
  return new Response(text || JSON.stringify({ error: "Empty upstream response" }), {
    status: upstream.status,
    headers: { "Content-Type": "application/json", ...corsHeaders },
  });
};