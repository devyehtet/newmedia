"use client"

import { useState } from "react"
import { ArrowDown, ArrowUp, BarChart3, FileText, Users } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function AnalyticsPage() {
  const [activeTab, setActiveTab] = useState("overview")

  const metrics = [
    {
      title: "Total Articles",
      value: "25",
      change: "+20.1%",
      trend: "up",
      description: "from last month",
      icon: FileText
    },
    {
      title: "Total Views",
      value: "1,429",
      change: "+180.1%",
      trend: "up",
      description: "from last month",
      icon: BarChart3
    },
    {
      title: "Active Users",
      value: "573",
      change: "+201",
      trend: "up",
      description: "since last hour",
      icon: Users
    },
    {
      title: "Engagement Rate",
      value: "23.4%",
      change: "+4.3%",
      trend: "up",
      description: "from last week",
      icon: BarChart3
    }
  ]

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Analytics</h2>
        <Button asChild variant="outline">
          <Link href="/admin">Back to Admin Dashboard</Link>
        </Button>
      </div>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="bg-muted/60">
          <TabsTrigger value="overview" className="data-[state=active]:bg-background">
            Overview
          </TabsTrigger>
          <TabsTrigger value="analytics" className="data-[state=active]:bg-background">
            Analytics
          </TabsTrigger>
          <TabsTrigger value="reports" className="data-[state=active]:bg-background">
            Reports
          </TabsTrigger>
        </TabsList>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {metrics.map((metric) => (
            <Card key={metric.title} className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {metric.title}
                </CardTitle>
                <metric.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metric.value}</div>
                <div className="flex items-center space-x-2">
                  <span className={`flex items-center text-sm ${metric.trend === "up" ? "text-green-600" : "text-red-600"}`}>
                    {metric.trend === "up" ? (
                      <ArrowUp className="mr-1 h-4 w-4" />
                    ) : (
                      <ArrowDown className="mr-1 h-4 w-4" />
                    )}
                    {metric.change}
                  </span>
                  <p className="text-xs text-muted-foreground">
                    {metric.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Overview</CardTitle>
              <CardDescription>
                Your content performance at a glance
              </CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <div className="h-[200px] md:h-[300px] flex items-center justify-center text-muted-foreground">
                Chart will be implemented here
              </div>
            </CardContent>
          </Card>
          <Card className="col-span-3">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>
                Latest updates and changes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {[1, 2, 3].map((_, i) => (
                  <div key={i} className="flex items-center">
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">
                        New article published
                      </p>
                      <p className="text-sm text-muted-foreground">
                        2 hours ago
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </Tabs>
    </div>
  )
}