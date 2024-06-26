import dbConnect from "@/lib/mongodb";
import { Post } from "@/models/post";
import { NextRequest, NextResponse } from "next/server";

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
export const POST = async (req: NextRequest) => {
  try {
    await dbConnect();
    const { title, content } = await req.json();
    const post = await Post.create({
      title,
      content,
    });
    return NextResponse.json({ post });
  } catch (error: any) {
    console.log(error);
    throw new Error();
  }
};

export const PUT = async (req: NextRequest) => {
  try {
    await dbConnect();
    const { title, content, _id } = await req.json();
    const post = await Post.findByIdAndUpdate(
      { _id },
      {
        title,
        content,
      }
    );
    return NextResponse.json({ post });
  } catch (error: any) {
    console.log(error);
    throw new Error();
  }
};

export const DELETE = async (req: NextRequest) => {
  try {
    await dbConnect();
    const { _id } = await req.json();
    const post = await Post.findByIdAndDelete({ _id });
    return NextResponse.json({ post });
  } catch (error: any) {
    console.log(error);
    throw new Error();
  }
};
