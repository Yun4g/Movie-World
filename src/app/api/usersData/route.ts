// app/api/usersData/route.ts
import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongoose";
import User from "@/models/userModels";
import mongoose from "mongoose";

export async function GET(req: NextRequest) {
  await connectDB();
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return new NextResponse("User ID is required", { status: 400 });
    }
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return new NextResponse("Invalid user ID format", { status: 400 });
    }

      const user = await User.findById(id).select("username");

    if (!user) {
      return new NextResponse("User not found", { status: 404 });

    }
      const userData = {
         id: user._id,
         username: user.username,
      }

        return NextResponse.json(userData);
  } catch (error) {
    console.error("Error fetching user:", error);
    return new NextResponse("Failed to fetch user data", { status: 500 });
  }
}
