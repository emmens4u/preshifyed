import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "../../config/db";
import User from "../../models/User";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const data = await req.json();
    const result = loginSchema.safeParse(data);

    if (!result.success) {
      return NextResponse.json(
        { message: "Invalid email or password", errors: result.error },
        { status: 400 }
      );
    }

    const { email, password } = result.data;

    const user = await User.findOne({
      email,
    });

    if (!user || !user.password) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }

    // check if the user password exists

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return NextResponse.json(
        { message: "Invalid password second" },
        { status: 401 }
      );
    }

    const JWT_SECRET = process.env.JWT_SECRET;
    if (!JWT_SECRET) {
      throw new Error("JWT_SECRET must be defined in environment variables");
    }
    const token = jwt.sign({ id: user._id }, JWT_SECRET, {
      expiresIn: "1h",
    });

    return NextResponse.json(
      { message: "User logged in successfully", token },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error logging in", error },
      { status: 500 }
    );
  }
}
