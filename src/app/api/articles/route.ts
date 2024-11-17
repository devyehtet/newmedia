import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET() {
  const articles = await prisma.article.findMany({
    include: {
      author: {
        select: { name: true },
      },
    },
  })
  return NextResponse.json(articles)
}

export async function POST(request: Request) {
  const body = await request.json()
  const article = await prisma.article.create({
    data: {
      title: body.title,
      content: body.content,
      category: body.category,
      authorId: body.authorId, // This should be the ID of the authenticated user
    },
  })
  return NextResponse.json(article)
}