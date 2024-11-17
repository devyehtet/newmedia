import { Suspense } from "react"
import ArticleContent from "./ArticleContent"

export default function PostPage({ params }: { params: { id: string } }) {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
            <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
          </div>
          <p className="mt-4 text-muted-foreground">Loading article...</p>
        </div>
      </div>
    }>
      <ArticleContent id={params.id} />
    </Suspense>
  )
}

export async function generateMetadata({ params }: { params: { id: string } }) {
  return {
    title: `Article ${params.id} | NewsHub`,
    description: `Read article ${params.id} on NewsHub`,
  }
}