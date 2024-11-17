import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function SiteFooter() {
  return (
    <footer className="border-t bg-background">
      <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold">NewsHub</span>
          </Link>
          <p className="text-center text-sm leading-loose md:text-left">
            Built by the NewsHub team. The source code is available on{" "}
            <a
              href="#"
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              GitHub
            </a>
            .
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm">Terms</Button>
          <Button variant="ghost" size="sm">Privacy</Button>
        </div>
      </div>
    </footer>
  )
}