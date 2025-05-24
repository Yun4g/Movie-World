import connectDB from "@/lib/mongoose";
import User from "@/models/userModels";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
  await connectDB();

  try {
    const { email, password } = await req.json();

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return NextResponse.json({ message: "User does not exist" }, { status: 400 });
    }

    const validatePassword = await bcrypt.compare(password, existingUser.password);
    if (!validatePassword) {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 400 });
    }

    const tokenData = {
      id: existingUser._id,
      email: existingUser.email,
      username: existingUser.username,
    };

    const token = jwt.sign(tokenData, process.env.JWT_SECRET!, { expiresIn: "1d" });

    const res = NextResponse.json(
      { 
          user: {
            id: existingUser._id,
            username: existingUser.username,
            email: existingUser.email,
          },
          token,
          message: "Login successful",
          success: true
         },
      { status: 200 }
    );
    res.cookies.set("token", token, {
      httpOnly: true,
    });
    return res;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
