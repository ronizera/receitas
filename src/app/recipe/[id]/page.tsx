import { Suspense } from "react"
import { Header } from "@/components/components/header"
import { RecipeDetails } from "@/components/components/recipe-details"
import { Breadcrumbs } from "@/components/components/breadcrumbs"
import { Footer } from "@/components/components/footer"

interface RecipePageProps {
  params: { id: string }
}

export default function RecipePage({ params }: RecipePageProps) {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <Breadcrumbs items={[{ label: "Receitas", href: "/search" }, { label: "Detalhes" }]} />
        <Suspense fallback={<RecipeDetailsSkeleton />}>
          <RecipeDetails recipeId={params.id} />
        </Suspense>
      </main>
      <Footer />
    </div>
  )
}

function RecipeDetailsSkeleton() {
  return (
    <div className="max-w-6xl mx-auto">
      {/* Header skeleton */}
      <div className="mb-8">
        <div className="h-8 bg-muted rounded w-3/4 mb-4"></div>
        <div className="flex gap-4 mb-6">
          <div className="h-6 bg-muted rounded w-24"></div>
          <div className="h-6 bg-muted rounded w-32"></div>
        </div>
      </div>

      {/* Image and content skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="h-96 bg-muted rounded-lg"></div>
        <div className="space-y-4">
          <div className="h-6 bg-muted rounded w-32"></div>
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="h-4 bg-muted rounded"></div>
          ))}
        </div>
      </div>

      {/* Instructions skeleton */}
      <div className="space-y-4">
        <div className="h-6 bg-muted rounded w-48"></div>
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-16 bg-muted rounded"></div>
        ))}
      </div>
    </div>
  )
}
