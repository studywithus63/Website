export async function POST(context) {
  try {
    const data = await context.request.json();
    const { name, email, consent } = data;

    if (!email || !consent) {
      return new Response("Email and consent are required", { status: 400 });
    }

    // In a real application, you would integrate with a mailing provider
    // or store the subscriber in a database.
    console.log(`New subscription: ${name} <${email}>`);

    return new Response("Subscribed!", { status: 200 });
  } catch (error) {
    console.error("Error processing subscription:", error);
    return new Response("Invalid request format.", { status: 400 });
  }
}
