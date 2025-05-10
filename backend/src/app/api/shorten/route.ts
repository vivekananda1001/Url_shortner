// src/app/api/shorten/route.ts
import { NextResponse } from "next/server";
import axios from "axios";
import { withCors } from "@/app/lib/cors";

export async function POST(req: Request) {
  const { url } = await req.json();
  const token = process.env.API_TOKEN;
  console.log(token);
  try {
    // console.log('Request URL:', url);
    const response = await axios.post(`https://api.tinyurl.com/create?api_token=${token}`, {
      url,
    });
    // console.log('TinyURL Response:', response.data);
    const shortenedUrl = response.data.data.tiny_url;
    if (!shortenedUrl) {
        throw new Error("Shortened URL not found in the TinyURL response.");
    }

    return withCors(NextResponse.json({ shortenedUrl }));
  } catch (error) {
    // console.error("Error while shortening the URL:", error);
    return withCors(NextResponse.json(
        { message: error?.response?.data?.message || "Failed to shorten the URL." },
        { status: 500 }
    ));
  }
}

export function OPTIONS() {
    return withCors(new NextResponse(null, { status: 204 }));
}