export async function POST(context) {
  const formData = await context.request.formData();
  const name = formData.get("name");
  const email = formData.get("email");
  const consent = formData.get("consent");

  if (!email || !consent) {
    return new Response("Email and consent are required", { status: 400 });
  }

  // In a real application, you would integrate with a mailing provider
  // or store the subscriber in a database.
  console.log(`New subscription: ${name} <${email}>`);

  return new Response("Subscribed!", { status: 200 });
}
