"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { PlusCircle, Pencil, Trash2, Upload, BarChart, FileText, Home, Settings } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import Image from 'next/image'
import Link from 'next/link'

interface Article {
  id: number
  title: string
  content: string
  category: string
  createdAt: string
  imageUrl: string
}

export default function AdminDashboard() {
  const [articles, setArticles] = useState<Article[]>([])
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [category, setCategory] = useState("")
  const [editingId, setEditingId] = useState<number | null>(null)
  const [featureImage, setFeatureImage] = useState("")
  const [contentImages, setContentImages] = useState<string[]>([])
  const contentRef = useRef<HTMLTextAreaElement>(null)
  const router = useRouter()

  useEffect(() => {
    const storedArticles = localStorage.getItem("articles")
    if (storedArticles) {
      setArticles(JSON.parse(storedArticles))
    }
  }, [])

  const saveArticle = () => {
    let updatedArticles
    const newArticle = {
      id: editingId || Date.now(),
      title,
      content,
      category,
      createdAt: new Date().toISOString(),
      imageUrl: featureImage,
    }

    if (editingId) {
      updatedArticles = articles.map((article) =>
        article.id === editingId ? newArticle : article
      )
    } else {
      updatedArticles = [...articles, newArticle]
    }

    localStorage.setItem("articles", JSON.stringify(updatedArticles))
    setArticles(updatedArticles)
    resetForm()
    router.refresh()
  }

  const editArticle = (article: Article) => {
    setEditingId(article.id)
    setTitle(article.title)
    setContent(article.content)
    setCategory(article.category)
    setFeatureImage(article.imageUrl)
    setContentImages(extractImagesFromContent(article.content))
  }

  const deleteArticle = (id: number) => {
    const updatedArticles = articles.filter((article) => article.id !== id)
    localStorage.setItem("articles", JSON.stringify(updatedArticles))
    setArticles(updatedArticles)
    router.refresh()
  }

  const resetForm = () => {
    setEditingId(null)
    setTitle("")
    setContent("")
    setCategory("")
    setFeatureImage("")
    setContentImages([])
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>, isFeatureImage: boolean) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const imageUrl = reader.result as string
        if (isFeatureImage) {
          setFeatureImage(imageUrl)
        } else {
          setContentImages(prev => [...prev, imageUrl])
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const insertImageIntoContent = (imageUrl: string) => {
    if (contentRef.current) {
      const textArea = contentRef.current
      const imageTag = `[image:${imageUrl}]`
      const cursorPosition = textArea.selectionStart
      const textBeforeCursor = textArea.value.substring(0, cursorPosition)
      const textAfterCursor = textArea.value.substring(cursorPosition)
      const newContent = textBeforeCursor + imageTag + textAfterCursor
      setContent(newContent)
      textArea.focus()
      textArea.setSelectionRange(cursorPosition + imageTag.length, cursorPosition + imageTag.length)
    }
  }

  const extractImagesFromContent = (content: string): string[] => {
    const regex = /\[image:(.*?)\]/g
    const matches = content.match(regex)
    return matches ? matches.map(match => match.slice(7, -1)) : []
  }

  return (
    <div className="container mx-auto p-4 flex">
      <aside className="w-64 bg-gray-100 p-4">
        <nav className="grid items-start px-4 text-sm font-medium">
          <Link
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-muted"
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
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-muted"
            href="/admin/analytics"
          >
            <BarChart className="h-4 w-4" />
            Analytics
          </Link>
          <Link
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-muted"
            href="/admin/settings"
          >
            <Settings className="h-4 w-4" />
            Settings
          </Link>
        </nav>
      </aside>
      <div className="ml-8 w-full">
        <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>{editingId ? "Edit Article" : "Create New Article"}</CardTitle>
            <CardDescription>Enter the details of your article below.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter article title"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="content">Content</Label>
                <Textarea
                  id="content"
                  ref={contentRef}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Write your article content here"
                  rows={10}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Technology">Technology</SelectItem>
                    <SelectItem value="Science">Science</SelectItem>
                    <SelectItem value="Politics">Politics</SelectItem>
                    <SelectItem value="Entertainment">Entertainment</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="feature-image">Feature Image</Label>
                <div className="flex items-center gap-4">
                  <Input
                    id="feature-image"
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, true)}
                    className="w-full max-w-xs"
                  />
                  <Button type="button" variant="outline" size="icon">
                    <Upload className="h-4 w-4" />
                  </Button>
                </div>
                {featureImage && (
                  <div className="mt-4">
                    <Image
                      src={featureImage}
                      alt="Feature image preview"
                      width={200}
                      height={200}
                      className="rounded-md object-cover"
                    />
                  </div>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="content-image">Content Images</Label>
                <div className="flex items-center gap-4">
                  <Input
                    id="content-image"
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, false)}
                    className="w-full max-w-xs"
                  />
                  <Button type="button" variant="outline" size="icon">
                    <Upload className="h-4 w-4" />
                  </Button>
                </div>
                <div className="mt-4 grid grid-cols-3 gap-4">
                  {contentImages.map((image, index) => (
                    <div key={index} className="relative">
                      <Image
                        src={image}
                        alt={`Content image ${index + 1}`}
                        width={100}
                        height={100}
                        className="rounded-md object-cover"
                      />
                      <Button
                        type="button"
                        variant="secondary"
                        size="sm"
                        className="absolute bottom-2 right-2"
                        onClick={() => insertImageIntoContent(image)}
                      >
                        Insert
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={saveArticle}>{editingId ? "Update" : "Publish"}</Button>
            {editingId && (
              <Button variant="outline" onClick={resetForm} className="ml-2">
                Cancel
              </Button>
            )}
          </CardFooter>
        </Card>
        <h2 className="text-xl font-semibold mb-4">Published Articles</h2>
        <div className="space-y-4">
          {articles.map((article) => (
            <Card key={article.id}>
              <CardHeader>
                <CardTitle>{article.title}</CardTitle>
                <CardDescription>{article.category}</CardDescription>
              </CardHeader>
              <CardContent>
                <p>{article.content.substring(0, 150)}...</p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" onClick={() => editArticle(article)}>
                  <Pencil className="w-4 h-4 mr-2" />
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => deleteArticle(article.id)}
                  className="ml-2"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}