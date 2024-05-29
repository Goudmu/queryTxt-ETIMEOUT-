import dbConnect from "@/lib/mongodb";
import { Post } from "@/models/post";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    await dbConnect();
    const post = await Post.find();
    return NextResponse.json({ post });
  } catch (error: any) {
    console.log(error);
    throw new Error();
  }
};
