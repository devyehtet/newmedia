"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { BarChart3, FileText, Home, Plus, Settings, Upload } from 'lucide-react'

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface Article {
  id: number;
  title: string;
  content: string;
  category: string;
  createdAt: string;
  imageUrl: string;
}

export default function AdminDashboard() {
  const [selectedCategory, setSelectedCategory] = useState("news")
  const [activeTab, setActiveTab] = useState("articles")
  const [featureImage, setFeatureImage] = useState<string | null>(null)
  const [articles, setArticles] = useState<Article[]>([])
  const [editingArticle, setEditingArticle] = useState<Article | null>(null)

  useEffect(() => {
    const storedArticles = localStorage.getItem('articles')
    if (storedArticles) {
      setArticles(JSON.parse(storedArticles))
    }
  }, [])

  const handleNewArticle = () => {
    setEditingArticle(null)
    setFeatureImage(null)
    setSelectedCategory("news")
    setActiveTab("create")
  }

  const handleEditArticle = (article: Article) => {
    setEditingArticle(article)
    setFeatureImage(article.imageUrl)
    setSelectedCategory(article.category)
    setActiveTab("create")
  }

  const handleDeleteArticle = (articleId: number) => {
    const updatedArticles = articles.filter(article => article.id !== articleId)
    setArticles(updatedArticles)
    localStorage.setItem('articles', JSON.stringify(updatedArticles))
  }

  const handleTabChange = (value: string) => {
    if (value === "articles") {
      setEditingArticle(null)
      setFeatureImage(null)
    }
    setActiveTab(value)
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setFeatureImage(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.currentTarget
    const formData = new FormData(form)
    
    const articleData = {
      title: formData.get('title') as string,
      content: formData.get('content') as string,
      category: selectedCategory,
      imageUrl: featureImage || '/placeholder.svg'
    }

    let updatedArticles: Article[]
    
    if (editingArticle) {
      // Update existing article
      updatedArticles = articles.map(article => 
        article.id === editingArticle.id 
          ? { ...article, ...articleData, imageUrl: featureImage || article.imageUrl }
          : article
      )
    } else {
      // Create new article
      const newArticle: Article = {
        id: Date.now(),
        createdAt: new Date().toISOString(),
        ...articleData
      }
      updatedArticles = [...articles, newArticle]
    }

    setArticles(updatedArticles)
    localStorage.setItem('articles', JSON.stringify(updatedArticles))
    setActiveTab("articles")
    setEditingArticle(null)
    setFeatureImage(null)
    form.reset()
  }

  return (
    <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 lg:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-[60px] items-center border-b px-6">
            <Link className="flex items-center gap-2 font-semibold" href="#">
              <FileText className="h-6 w-6" />
              <span>Content Dashboard</span>
            </Link>
          </div>
          <div className="flex-1 overflow-auto py-2">
            <nav className="grid items-start px-4 text-sm font-medium">
              <Link
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                href="/"
              >
                <Home className="h-4 w-4" />
                Home
              </Link>
              <Link
                className="flex items-center gap-3 rounded-lg bg-muted px-3 py-2 text-primary transition-all"
                href="#"
              >
                <FileText className="h-4 w-4" />
                Content
              </Link>
              <Link
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                href="#"
              >
                <BarChart3 className="h-4 w-4" />
                Analytics
              </Link>
              <Link
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                href="#"
              >
                <Settings className="h-4 w-4" />
                Settings
              </Link>
            </nav>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-muted/40 px-6">
          <h1 className="font-semibold">Content Management</h1>
        </header>
        <main className="flex-1 overflow-auto">
          <div className="container py-6">
            <Tabs value={activeTab} onValueChange={handleTabChange}>
              <div className="flex items-center justify-between">
                <TabsList>
                  <TabsTrigger value="articles">Articles</TabsTrigger>
                  <TabsTrigger value="create">{editingArticle ? 'Edit Article' : 'Create New'}</TabsTrigger>
                </TabsList>
                <Button onClick={handleNewArticle}>
                  <Plus className="mr-2 h-4 w-4" />
                  New Article
                </Button>
              </div>
              <TabsContent value="articles" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Articles</CardTitle>
                    <CardDescription>
                      Manage your published and draft articles
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {articles.map((article) => (
                        <div
                          key={article.id}
                          className="flex items-center justify-between rounded-lg border p-4"
                        >
                          <div className="grid gap-1">
                            <h3 className="font-semibold">
                              {article.title}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              Published on {new Date(article.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm" asChild>
                              <Link href={`/post/${article.id}`}>View</Link>
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleEditArticle(article)}
                            >
                              Edit
                            </Button>
                            <Button 
                              variant="destructive" 
                              size="sm"
                              onClick={() => handleDeleteArticle(article.id)}
                            >
                              Delete
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="create" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>{editingArticle ? 'Edit Article' : 'Create New Article'}</CardTitle>
                    <CardDescription>
                      {editingArticle ? 'Update the details of your article' : 'Fill in the details for your new article'}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="grid gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="title">Title</Label>
                        <Input 
                          id="title" 
                          name="title" 
                          placeholder="Enter article title" 
                          defaultValue={editingArticle?.title}
                          required 
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="category">Category</Label>
                        <Select
                          value={selectedCategory}
                          onValueChange={setSelectedCategory}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="news">News</SelectItem>
                            <SelectItem value="sport">Sport</SelectItem>
                            <SelectItem value="technology">Technology</SelectItem>
                            <SelectItem value="business">Business</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="content">Content</Label>
                        <Textarea
                          id="content"
                          name="content"
                          placeholder="Write your article content here..."
                          className="min-h-[300px]"
                          defaultValue={editingArticle?.content}
                          required
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="feature-image">Feature Image</Label>
                        <div className="flex items-center gap-4">
                          <Input
                            id="feature-image"
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="w-full max-w-xs"
                          />
                          <Button type="button" variant="outline" size="icon">
                            <Upload className="h-4 w-4" />
                          </Button>
                        </div>
                        {(featureImage || editingArticle?.imageUrl) && (
                          <div className="mt-4">
                            <Image
                              src={featureImage || editingArticle?.imageUrl || ''}
                              alt="Feature image preview"
                              width={200}
                              height={200}
                              className="rounded-md object-cover"
                            />
                          </div>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <Button type="submit">
                          {editingArticle ? 'Update' : 'Publish'}
                        </Button>
                        <Button 
                          type="button" 
                          variant="outline"
                          onClick={() => {
                            setActiveTab("articles")
                            setEditingArticle(null)
                          }}
                        >
                          Cancel
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  )
}