export async function POST(request) {
    //Use POST(request) because that's Vercel's web-standard API handler ("request")
    // These functions are server-side code -- runs without you managing servers, Vercel
    //file-system routing uses routes defined in your codebase.
  try {
    const body = await request.json();
    const name = (body.name || "").trim();
    const email = (body.email || "").trim();
    const message = (body.message || "").trim();

    if (!name || !email || !message) {
      return Response.json(
        { ok: false, error: "Missing required fields." },
        { status: 400 }
      );
    }

    // For now: log submissions in Vercel Runtime Logs
    console.log("NEW_CONTACT_SUBMISSION", {
      name,
      email,
      message,
      submittedAt: new Date().toISOString(),
      userAgent: request.headers.get("user-agent"),
      referer: request.headers.get("referer"),
    });

    return Response.json(
      { ok: true, message: "Message recieved, looking forward to connect with you!." },
      { status: 200 }
    );
  } catch (error) {
    console.error("CONTACT_API_ERROR", error);

    return Response.json(
      { ok: false, error: "Invalid request." },
      { status: 500 }
    );
  }
}
