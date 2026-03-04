/**
 * StoryForge — Cloudflare Worker API Proxy
 *
 * Deploy steps:
 * 1. Go to https://workers.cloudflare.com and create a free account
 * 2. Click "Create Worker"
 * 3. Paste this entire file into the editor
 * 4. Click "Settings" → "Variables" → add a secret:
 *      Name:  ANTHROPIC_API_KEY
 *      Value: your sk-ant-... key
 * 5. Click "Save and Deploy"
 * 6. Copy your worker URL (e.g. https://storyforge.your-name.workers.dev)
 * 7. Paste that URL into storyforge-app.html where it says WORKER_URL
 */

export default {
  async fetch(request, env) {

    // Allow CORS from any origin (so your local HTML file can call it)
    const corsHeaders = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    };

    // Handle preflight
    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders });
    }

    // Only allow POST
    if (request.method !== "POST") {
      return new Response("Method not allowed", { status: 405, headers: corsHeaders });
    }

    try {
      // Parse the request body from the browser
      const body = await request.json();

      // Forward to Anthropic — key stays here, never sent to browser
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "anthropic-version": "2023-06-01",
          "x-api-key": env.ANTHROPIC_API_KEY,
        },
        body: JSON.stringify({
          model: body.model || "claude-sonnet-4-5",
          max_tokens: body.max_tokens || 1200,
          messages: body.messages,
        }),
      });

      const data = await response.json();

      return new Response(JSON.stringify(data), {
        status: response.status,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });

    } catch (err) {
      return new Response(JSON.stringify({ error: { message: err.message } }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
  }
};
