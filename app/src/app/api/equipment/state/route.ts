import data from "./equipmentState.json"

export async function GET() {
  try {
    return Response.json(data);
  } catch (error) {
    return new Response(JSON.stringify({ error: "Falha ao carregar os dados" }), { status: 500 });
  }
}