"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Calendar, Clock, User } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card"

interface Article {
  id: number
  title: string
  content: string
  category: string
  createdAt: string
  imageUrl: string
  author?: string
  readTime?: string
}

export default function PostPage() {
  const [article, setArticle] = useState<Article | null>(null)
  const params = useParams()

  useEffect(() => {
    const fetchArticle = () => {
      const storedArticles = localStorage.getItem('articles')
      if (storedArticles && params.id) {
        const articles: Article[] = JSON.parse(storedArticles)
        const foundArticle = articles.find(a => a.id === Number(params.id))
        if (foundArticle) {
          setArticle(foundArticle)
        }
      }
    }

    fetchArticle()
  }, [params.id])

  if (!article) {
    return (
      <div className="container py-8">
        <Card>
          <CardContent className="p-8">
            <div className="text-center">Loading...</div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container max-w-4xl py-8">
      <div className="mb-8">
        <Button variant="ghost" asChild>
          <Link href="/" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </Button>
      </div>
      <article className="prose prose-stone dark:prose-invert max-w-none">
        <Card>
          <div className="relative aspect-[2/1] overflow-hidden">
            <Image
              src={article.imageUrl}
              alt={article.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60" />
            <Badge 
              className="absolute left-4 top-4" 
              variant="secondary"
            >
              {article.category}
            </Badge>
          </div>
          <CardHeader>
            <div className="space-y-4">
              <h1 className="text-4xl font-bold leading-tight">
                {article.title}
              </h1>
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  {article.author || 'Anonymous'}
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {new Date(article.createdAt).toLocaleDateString()}
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {article.readTime || '5 min read'}
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div 
              className="prose prose-stone dark:prose-invert max-w-none"
              dangerouslySetInnerHTML={{ 
                __html: article.content.split('\n').map(paragraph => 
                  paragraph ? `<p>${paragraph}</p>` : ''
                ).join('')
              }}
            />
          </CardContent>
          <CardFooter className="border-t">
            <div className="flex w-full justify-between">
              <Button variant="ghost" asChild>
                <Link href={`/category/${article.category.toLowerCase()}`}>
                  More from {article.category}
                </Link>
              </Button>
              <Button variant="ghost" asChild>
                <Link href="/">
                  Back to Home
                </Link>
              </Button>
            </div>
          </CardFooter>
        </Card>
      </article>
    </div>
  )
}