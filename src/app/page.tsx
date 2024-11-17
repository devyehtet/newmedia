"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Heart, MessageSquare, Share2 } from 'lucide-react'
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
  likes?: number
  comments?: number
}

export default function Home() {
  const [articles, setArticles] = useState<Article[]>([])

  useEffect(() => {
    const storedArticles = localStorage.getItem('articles')
    if (storedArticles) {
      setArticles(JSON.parse(storedArticles))
    }
  }, [])

  return (
    <div className="container grid gap-6 py-8 md:grid-cols-[2fr_1fr]">
      <div className="space-y-6">
        {articles.length > 0 && (
          <Card className="overflow-hidden group">
            <Link href={`/post/${articles[0].id}`} className="relative block">
              <div className="relative aspect-[2/1] overflow-hidden">
                <Image
                  src={articles[0].imageUrl}
                  alt={articles[0].title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60" />
                <Badge className="absolute left-4 top-4" variant="secondary">{articles[0].category}</Badge>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h2 className="mb-2 text-3xl font-bold leading-tight">{articles[0].title}</h2>
                <p className="text-sm text-white/80">
                  {new Date(articles[0].createdAt).toLocaleDateString()} • {articles[0].category}
                </p>
              </div>
            </Link>
            <CardFooter className="border-t bg-card p-4">
              <div className="flex space-x-4 text-sm text-muted-foreground">
                <Button variant="ghost" size="sm" className="gap-1">
                  <Heart className="h-4 w-4" />
                  2.5k
                </Button>
                <Button variant="ghost" size="sm" className="gap-1">
                  <MessageSquare className="h-4 w-4" />
                  128
                </Button>
                <Button variant="ghost" size="sm" className="gap-1">
                  <Share2 className="h-4 w-4" />
                  Share
                </Button>
              </div>
            </CardFooter>
          </Card>
        )}
        <div className="grid gap-6 md:grid-cols-2">
          {articles.slice(1).map((article) => (
            <Card key={article.id} className="group overflow-hidden">
              <Link href={`/post/${article.id}`}>
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={article.imageUrl}
                    alt={article.title}
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    fill
                  />
                  <Badge className="absolute left-4 top-4" variant="secondary">{article.category}</Badge>
                </div>
                <CardHeader>
                  <h3 className="line-clamp-2 text-lg font-bold group-hover:text-primary">
                    {article.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {new Date(article.createdAt).toLocaleDateString()} • {article.category}
                  </p>
                </CardHeader>
                <CardContent>
                  <p className="line-clamp-2 text-muted-foreground">{article.content}</p>
                </CardContent>
              </Link>
            </Card>
          ))}
        </div>
      </div>
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <h2 className="text-xl font-bold">Trending Now</h2>
          </CardHeader>
          <CardContent className="divide-y">
            {articles.slice(0, 5).map((article) => (
              <Link
                key={article.id}
                href={`/post/${article.id}`}
                className="flex items-center gap-4 py-4 transition-colors hover:bg-muted/50 first:pt-0 last:pb-0"
              >
                <div className="relative aspect-square w-16 overflow-hidden rounded-lg">
                  <Image
                    src={article.imageUrl}
                    alt={article.title}
                    className="object-cover"
                    fill
                  />
                </div>
                <div className="flex-1 space-y-1">
                  <h3 className="line-clamp-2 font-medium leading-tight group-hover:text-primary">
                    {article.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {new Date(article.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </Link>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}