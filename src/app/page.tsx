"use client"

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Clock, TrendingUp } from 'lucide-react'
import { AdSlot } from '@/components/AdSlot'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface Article {
  id: number
  title: string
  content: string
  category: string
  createdAt: string
  imageUrl: string
}

export default function HomePage() {
  const [articles, setArticles] = useState<Article[]>([])
  const [featuredArticles, setFeaturedArticles] = useState<Article[]>([])
  const [trendingArticles, setTrendingArticles] = useState<Article[]>([])

  useEffect(() => {
    const storedArticles = localStorage.getItem('articles')
    if (storedArticles) {
      const parsedArticles = JSON.parse(storedArticles)
      setArticles(parsedArticles)
      
      // Get latest 3 articles for featured section
      setFeaturedArticles(parsedArticles.slice(-3).reverse())
      
      // Get random 4 articles for trending section
      const shuffled = [...parsedArticles].sort(() => 0.5 - Math.random())
      setTrendingArticles(shuffled.slice(0, 4))
    }
  }, [])

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[70vh] bg-gradient-to-r from-gray-900 to-gray-800 text-white">
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src="/placeholder.svg?height=800&width=1200"
            alt="News Background"
            fill
            className="object-cover opacity-20"
            priority
          />
        </div>
        <div className="relative h-full flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">Welcome to NewsHub</h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl">
            Your trusted source for the latest news, insights, and stories that matter.
          </p>
          <Button size="lg" className="bg-primary hover:bg-primary/90">
            Start Reading <ArrowRight className="ml-2" />
          </Button>
        </div>
      </section>

      <AdSlot adUnitPath="/1234567/news_homepage_top" size={[728, 90]} adPlatform="adx" />

      {/* Featured Articles */}
      <section className="container mx-auto px-4 py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold">Featured Stories</h2>
          <Button variant="ghost">View All</Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredArticles.map((article) => (
            <Card key={article.id} className="group hover:shadow-lg transition-shadow">
              <CardHeader className="p-0">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={article.imageUrl}
                    alt={article.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <Badge className="absolute top-4 left-4">{article.category}</Badge>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                  <Clock className="w-4 h-4" />
                  {new Date(article.createdAt).toLocaleDateString()}
                </div>
                <CardTitle className="mb-3 line-clamp-2">{article.title}</CardTitle>
                <CardDescription className="line-clamp-3">
                  {article.content}
                </CardDescription>
              </CardContent>
              <CardFooter className="p-6 pt-0">
                <Button asChild variant="ghost" className="ml-auto">
                  <Link href={`/post/${article.id}`}>
                    Read More <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      <AdSlot adUnitPath="1234567890" size="responsive" adPlatform="adsense" />

      {/* Trending Section */}
      <section className="bg-muted py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 mb-8">
            <TrendingUp className="w-6 h-6 text-primary" />
            <h2 className="text-3xl font-bold">Trending Now</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {trendingArticles.map((article) => (
              <Card key={article.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <Badge variant="outline" className="w-fit mb-2">
                    {article.category}
                  </Badge>
                  <CardTitle className="line-clamp-2">{article.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {article.content}
                  </p>
                </CardContent>
                <CardFooter>
                  <Button asChild variant="ghost" className="w-full">
                    <Link href={`/post/${article.id}`}>Read Article</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Stay Informed with NewsHub</h2>
          <p className="text-muted-foreground mb-8">
            Get the latest news and updates delivered straight to your inbox. Join our community of informed readers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-4 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <Button size="lg">Subscribe Now</Button>
          </div>
        </div>
      </section>

      <footer className="border-t">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <p className="text-muted-foreground">
              &copy; {new Date().getFullYear()} NewsHub. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </main>
  )
}