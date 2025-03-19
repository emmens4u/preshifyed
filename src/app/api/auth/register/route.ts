import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { connectDB } from "../../config/db";
import User from "../../models/User";

const registerSchema = z.object({
  fullname: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(6),
});

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const data = await req.json();
    const result = registerSchema.safeParse(data);

    const userExists = await User.findOne({ email: result.data?.email });
    if (userExists) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 409 }
      );
    }

    const user = await User.create(result.data);
    return NextResponse.json(
      { message: "User registered successfully", user },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error registering user", error },
      { status: 500 }
    );
  }
}

