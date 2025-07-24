import client from "../../../lib/db"; // assuming default export is PrismaClient instance
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    // Create a new user record
    const user = await client.user.create({
      data: {
        username: data.username,
        password: data.password,
      },
    });

    return NextResponse.json({
      msg: "You have been signed up",
    });
  } catch (error:any) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { msg: "Failed to create user", error: error.message },
      { status: 500 }
    );
  }
}
