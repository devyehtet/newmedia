import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const articleId = searchParams.get('articleId')
  
  if (!articleId) {
    return NextResponse.json({ error: 'Article ID is required' }, { status: 400 })
  }

  const comments = await prisma.comment.findMany({
    where: { articleId },
    include: {
      user: {
        select: { name: true },
      },
    },
  })
  return NextResponse.json(comments)
}

export async function POST(request: Request) {
  const body = await request.json()
  const comment = await prisma.comment.create({
    data: {
      content: body.content,
      articleId: body.articleId,
      userId: body.userId, // This should be the ID of the authenticated user
    },
  })
  return NextResponse.json(comment)
}