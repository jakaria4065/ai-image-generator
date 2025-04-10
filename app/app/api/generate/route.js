export async function POST(request) {
  const { prompt } = await request.json();

  const response = await fetch("https://api.openai.com/v1/images/generations", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      prompt,
      n: 1,
      size: "512x512",
    }),
  });

  const data = await response.json();

  return new Response(JSON.stringify({ image: data.data[0].url }), {
    headers: { "Content-Type": "application/json" },
  });
}
