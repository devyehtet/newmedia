"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Moon, Palette, Settings2, Sun } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    general: {
      siteName: "NewsHub",
      siteUrl: "https://newshub.com",
      maintenance: false,
      comments: true,
      autoPublish: false,
      socialShare: true
    },
    ads: {
      adsense: false,
      meta: false,
      adx: false,
      adsenseId: "",
      metaId: "",
      adxId: "",
      adDensity: "medium",
      adRefresh: "30"
    },
    appearance: {
      theme: "system",
      fontSize: "default",
      contentWidth: "full",
      darkMode: false
    }
  })

  const handleSettingChange = (category: keyof typeof settings, setting: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [setting]: value
      }
    }))
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
        <Button asChild variant="outline">
          <Link href="/admin">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Admin Dashboard
          </Link>
        </Button>
      </div>
      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="ads">Ads</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
        </TabsList>
        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>
                Configure your website's basic settings and preferences.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="siteName">Site Name</Label>
                <Input
                  id="siteName"
                  value={settings.general.siteName}
                  onChange={(e) => handleSettingChange('general', 'siteName', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="siteUrl">Site URL</Label>
                <Input
                  id="siteUrl"
                  value={settings.general.siteUrl}
                  onChange={(e) => handleSettingChange('general', 'siteUrl', e.target.value)}
                />
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="maintenance">Maintenance Mode</Label>
                    <p className="text-sm text-muted-foreground">
                      Enable this to show a maintenance page to visitors
                    </p>
                  </div>
                  <Switch
                    id="maintenance"
                    checked={settings.general.maintenance}
                    onCheckedChange={(checked) => handleSettingChange('general', 'maintenance', checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="comments">Comments</Label>
                    <p className="text-sm text-muted-foreground">
                      Allow visitors to comment on articles
                    </p>
                  </div>
                  <Switch
                    id="comments"
                    checked={settings.general.comments}
                    onCheckedChange={(checked) => handleSettingChange('general', 'comments', checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="autoPublish">Auto-publish</Label>
                    <p className="text-sm text-muted-foreground">
                      Automatically publish scheduled articles
                    </p>
                  </div>
                  <Switch
                    id="autoPublish"
                    checked={settings.general.autoPublish}
                    onCheckedChange={(checked) => handleSettingChange('general', 'autoPublish', checked)}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="ads" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Advertising Settings</CardTitle>
              <CardDescription>
                Configure your advertising platforms and display preferences.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="adsense">Google AdSense</Label>
                    <p className="text-sm text-muted-foreground">
                      Enable Google AdSense advertisements
                    </p>
                  </div>
                  <Switch
                    id="adsense"
                    checked={settings.ads.adsense}
                    onCheckedChange={(checked) => handleSettingChange('ads', 'adsense', checked)}
                  />
                </div>
                {settings.ads.adsense && (
                  <div className="space-y-2">
                    <Label htmlFor="adsenseId">AdSense Publisher ID</Label>
                    <Input
                      id="adsenseId"
                      value={settings.ads.adsenseId}
                      onChange={(e) => handleSettingChange('ads', 'adsenseId', e.target.value)}
                      placeholder="pub-xxxxxxxxxxxxxxxx"
                    />
                  </div>
                )}
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="meta">Meta Ads</Label>
                    <p className="text-sm text-muted-foreground">
                      Enable Meta (Facebook) advertisements
                    </p>
                  </div>
                  <Switch
                    id="meta"
                    checked={settings.ads.meta}
                    onCheckedChange={(checked) => handleSettingChange('ads', 'meta', checked)}
                  />
                </div>
                {settings.ads.meta && (
                  <div className="space-y-2">
                    <Label htmlFor="metaId">Meta Business Account ID</Label>
                    <Input
                      id="metaId"
                      value={settings.ads.metaId}
                      onChange={(e) => handleSettingChange('ads', 'metaId', e.target.value)}
                      placeholder="xxxxxxxxxxxxx"
                    />
                  </div>
                )}
                <div className="space-y-2">
                  <Label htmlFor="adDensity">Ad Density</Label>
                  <Select
                    value={settings.ads.adDensity}
                    onValueChange={(value) => handleSettingChange('ads', 'adDensity', value)}
                  >
                    <SelectTrigger id="adDensity">
                      <SelectValue placeholder="Select ad density" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Ad Settings</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="appearance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Appearance Settings</CardTitle>
              <CardDescription>
                Customize how your website looks and feels.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="theme">Theme</Label>
                <Select
                  value={settings.appearance.theme}
                  onValueChange={(value) => handleSettingChange('appearance', 'theme', value)}
                >
                  <SelectTrigger id="theme">
                    <SelectValue placeholder="Select theme" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">
                      <div className="flex items-center">
                        <Sun className="mr-2 h-4 w-4" />
                        Light
                      </div>
                    </SelectItem>
                    <SelectItem value="dark">
                      <div className="flex items-center">
                        <Moon className="mr-2 h-4 w-4" />
                        Dark
                      </div>
                    </SelectItem>
                    <SelectItem value="system">
                      <div className="flex items-center">
                        <Settings2 className="mr-2 h-4 w-4" />
                        System
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="fontSize">Font Size</Label>
                <Select
                  value={settings.appearance.fontSize}
                  onValueChange={(value) => handleSettingChange('appearance', 'fontSize', value)}
                >
                  <SelectTrigger id="fontSize">
                    <SelectValue placeholder="Select font size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="small">Small</SelectItem>
                    <SelectItem value="default">Default</SelectItem>
                    <SelectItem value="large">Large</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="contentWidth">Content Width</Label>
                <Select
                  value={settings.appearance.contentWidth}
                  onValueChange={(value) => handleSettingChange('appearance', 'contentWidth', value)}
                >
                  <SelectTrigger id="contentWidth">
                    <SelectValue placeholder="Select content width" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="narrow">Narrow</SelectItem>
                    <SelectItem value="default">Default</SelectItem>
                    <SelectItem value="full">Full Width</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="darkMode">Dark Mode</Label>
                  <p className="text-sm text-muted-foreground">
                    Enable dark mode for better night viewing
                  </p>
                </div>
                <Switch
                  id="darkMode"
                  checked={settings.appearance.darkMode}
                  onCheckedChange={(checked) => handleSettingChange('appearance', 'darkMode', checked)}
                />
              </div>
              <div className="space-y-2">
                <Label>Theme Preview</Label>
                <div className="rounded-lg border p-4">
                  <div className="flex items-center gap-2">
                    <Palette className="h-5 w-5" />
                    <span>Current theme preview</span>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Appearance</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}