import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function POST(request: Request) {
  const body = await request.json()
  const like = await prisma.like.create({
    data: {
      articleId: body.articleId,
      userId: body.userId, // This should be the ID of the authenticated user
    },
  })
  return NextResponse.json(like)
}

export async function DELETE(request: Request) {
  const body = await request.json()
  const like = await prisma.like.delete({
    where: {
      articleId_userId: {
        articleId: body.articleId,
        userId: body.userId, // This should be the ID of the authenticated user
      },
    },
  })
  return NextResponse.json(like)
}