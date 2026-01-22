import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";
import { generateTailoredResume } from "@/lib/gemini";

export async function POST(req: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { resumeText, jobVacancy } = await req.json();

    if (!resumeText) {
      return NextResponse.json(
        { error: "Resume text is required" },
        { status: 400 },
      );
    }

    // Check usage limits
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      include: { usage: true },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const isPro = user.plan === "PRO" || user.plan === "ANNUAL";
    const usage = user.usage?.resumeUploads || 0;
    const limit = isPro ? 999999 : 5;

    if (usage >= limit) {
      return NextResponse.json(
        { error: "Usage limit reached. Upgrade to Pro." },
        { status: 403 },
      );
    }

    const analysisResult = await generateTailoredResume(
      resumeText,
      jobVacancy || "Vaga Geral",
    );

    // Save to history
    await prisma.resumeHistory.create({
      data: {
        userId: user.id,
        originalText: resumeText,
        jobVacancy: jobVacancy || null,
        generatedResume:
          typeof analysisResult === "string"
            ? analysisResult
            : analysisResult.markdownContent,
      },
    });

    await prisma.userUsage.upsert({
      where: { userId: user.id },
      update: {
        resumeUploads: { increment: 1 },
        resumeAnalyzed: { increment: 1 },
      },
      create: {
        userId: user.id,
        resumeUploads: 1,
        resumeAnalyzed: 1,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Analysis complete",
      data: analysisResult,
    });
  } catch (error) {
    console.error("Analysis error details:", error);
    if (error instanceof Error) {
      console.error("Error message:", error.message);
      console.error("Error stack:", error.stack);
    }
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
