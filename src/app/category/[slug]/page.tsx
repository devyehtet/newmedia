"use client"

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from "next/link"
import Image from "next/image"
import { Heart, MessageSquare } from 'lucide-react'

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
}

export default function CategoryPage() {
  const [articles, setArticles] = useState<Article[]>([])
  const [categoryTitle, setCategoryTitle] = useState<string>("")
  const params = useParams()

  useEffect(() => {
    const fetchArticles = () => {
      const storedArticles = localStorage.getItem('articles')
      if (storedArticles && params.slug) {
        const slug = params.slug as string
        const allArticles: Article[] = JSON.parse(storedArticles)
        const filteredArticles = allArticles.filter(
          article => article.category.toLowerCase() === slug.toLowerCase()
        )
        setArticles(filteredArticles)
        setCategoryTitle(slug.charAt(0).toUpperCase() + slug.slice(1))
      }
    }

    fetchArticles()
  }, [params.slug])

  if (!params.slug) {
    return <div className="container py-8">Loading...</div>
  }

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <div className="container py-8">
          <h1 className="text-3xl font-bold mb-8">{categoryTitle}</h1>
          {articles.length === 0 ? (
            <div className="text-center py-12">
              <h2 className="text-xl font-semibold mb-2">No articles found</h2>
              <p className="text-muted-foreground">
                There are currently no articles in the {categoryTitle} category.
              </p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {articles.map((article) => (
                <Card key={article.id}>
                  <Link href={`/post/${article.id}`}>
                    <div className="relative aspect-video">
                      <Image
                        src={article.imageUrl}
                        alt="Article thumbnail"
                        className="object-cover"
                        fill
                      />
                      <Badge className="absolute left-4 top-4" variant="secondary">
                        {article.category}
                      </Badge>
                    </div>
                    <CardHeader>
                      <h3 className="line-clamp-2 text-lg font-bold">
                        {article.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {new Date(article.createdAt).toLocaleDateString()} • {article.category}
                      </p>
                    </CardHeader>
                    <CardContent>
                      <p className="line-clamp-3 text-muted-foreground">
                        {article.content}
                      </p>
                    </CardContent>
                    <CardFooter className="border-t">
                      <div className="flex space-x-4 text-sm text-muted-foreground">
                        <Button variant="ghost" size="sm">
                          <Heart className="mr-2 h-4 w-4" />
                          1.2k
                        </Button>
                        <Button variant="ghost" size="sm">
                          <MessageSquare className="mr-2 h-4 w-4" />
                          64
                        </Button>
                      </div>
                    </CardFooter>
                  </Link>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}