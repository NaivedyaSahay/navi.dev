import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    // Simple server-side validation
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      )
    }

    // Email regex validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      )
    }

    // Forward message to Web3Forms if access key is available
    const accessKey = process.env.WEB3FORMS_ACCESS_KEY?.trim();
    if (accessKey) {
      // Forward client browser headers so Web3Forms passes CORS origin verification checks
      const origin = request.headers.get("origin") || "http://localhost:3000";
      const referer = request.headers.get("referer") || "http://localhost:3000/";
      const userAgent = request.headers.get("user-agent") || "";

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Origin: origin,
          Referer: referer,
          "User-Agent": userAgent,
        },
        body: JSON.stringify({
          access_key: accessKey,
          name,
          email,
          subject,
          message,
          from_name: `${name} via Portfolio`,
        }),
      });

      if (!response.ok) {
        let errDetails = `HTTP error status ${response.status}`;
        try {
          const errData = await response.json();
          errDetails = JSON.stringify(errData);
        } catch (jsonErr) {
          try {
            errDetails = await response.text();
          } catch (textErr) {}
        }
        console.error("Web3Forms error details:", errDetails);
        throw new Error("Failed to send message via Web3Forms.");
      }
    }

    console.log("=== NEW CONTACT FORM MESSAGE ===");
    console.log(`From: ${name} (${email})`);
    console.log(`Subject: ${subject}`);
    console.log(`Message: ${message}`);
    console.log("================================");

    return NextResponse.json(
      { message: "Thank you! Your message has been received." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { error: "Internal Server Error. Please try again later." },
      { status: 500 }
    );
  }
}
