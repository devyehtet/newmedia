"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Clock, User } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"

interface Article {
  id: number
  title: string
  content: string
  category: string
  createdAt: string
  imageUrl: string
}

function calculateReadingTime(content: string): string {
  const words = content.split(' ').length
  const time = Math.ceil(words / 200) // Assuming average reading speed of 200 words per minute
  return `${time} min read`
}

export default function ArticleContent({ id }: { id: string }) {
  const [article, setArticle] = useState<Article | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const storedArticles = localStorage.getItem('articles')
        if (storedArticles) {
          const articles = JSON.parse(storedArticles)
          const foundArticle = articles.find((a: Article) => a.id === Number(id))
          setArticle(foundArticle || null)
        }
      } catch (error) {
        console.error('Error fetching article:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchArticle()
  }, [id])

  if (loading) {
    return <div className="text-center">Loading...</div>
  }

  if (!article) {
    return <div className="text-center">Article not found</div>
  }

  const readingTime = calculateReadingTime(article.content)

  const renderContent = (content: string) => {
    const parts = content.split(/(\[image:[^\]]+\])/)
    return parts.map((part, index) => {
      if (part.startsWith('[image:') && part.endsWith(']')) {
        const imageUrl = part.slice(7, -1)
        return (
          <div key={index} className="my-4">
            <Image
              src={imageUrl}
              alt="In-post image"
              width={800}
              height={400}
              className="rounded-lg object-cover"
            />
          </div>
        )
      }
      return <p key={index} className="leading-7 [&:not(:first-child)]:mt-6">{part}</p>
    })
  }

  return (
    <article className="container mx-auto px-4 py-8 max-w-3xl">
      <div className="space-y-8">
        {/* Navigation */}
        <div className="flex justify-between items-center">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
          </Button>
          <Badge variant="secondary">{article.category}</Badge>
        </div>

        {/* Article Header */}
        <header className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">
            {article.title}
          </h1>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span>Anonymous</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>{readingTime}</span>
            </div>
            <time dateTime={article.createdAt}>
              {format(new Date(article.createdAt), 'MMM dd, yyyy')}
            </time>
          </div>
        </header>

        {/* Feature Image */}
        <div className="relative aspect-video w-full overflow-hidden rounded-lg">
          <Image
            src={article.imageUrl}
            alt={article.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Article Content */}
        <div className="prose prose-gray max-w-none">
          {renderContent(article.content)}
        </div>

        {/* Footer Navigation */}
        <footer className="mt-8 flex items-center justify-between border-t pt-8">
          <Button variant="outline" asChild>
            <Link href="/">Back to Home</Link>
          </Button>
          <Button asChild>
            <Link href={`/category/${article.category.toLowerCase()}`}>
              More from {article.category}
            </Link>
          </Button>
        </footer>
      </div>
    </article>
  )
}