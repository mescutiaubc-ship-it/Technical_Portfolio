
//Someone clicks on "Let's connect" but doesn't finish the form.
export async function POST(request) {
  try {
    const body = await request.json();

    console.log("CONNECT_CLICK", {
      source: body.source || "unknown",
      label: body.label || "Let's connect",
      clickedAt: new Date().toISOString(),
      userAgent: request.headers.get("user-agent"),
      referer: request.headers.get("referer"),
    });

    return Response.json({ ok: true }, { status: 200 });
  } catch (error) {
    console.error("TRACK_CONNECT_ERROR", error);
    return Response.json({ ok: false }, { status: 500 });
  }
}


        <form id="contact-form" class="contact-form">
            <input type="text" name="name" placeholder="Your name" required />
            <input type="email" name="email" placeholder="Your email" required />
            <textarea name="message" placeholder="Your message" rows="5" required></textarea>
            <button type="submit" class="btn primary">Send message</button>
            <p id="form-status" class="muted"></p>
          </form>
