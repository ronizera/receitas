import { Suspense } from "react"
import { Header } from "@/components/components/header"
import { CategoriesList } from "@/components/components/categories-list"
import { Breadcrumbs } from "@/components/components/breadcrumbs"
import { Footer } from "@/components/components/footer"

export default function CategoriesPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <Breadcrumbs items={[{ label: "Categorias" }]} />
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">Categorias de Receitas</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore receitas organizadas por categoria. Desde pratos principais até sobremesas deliciosas.
          </p>
        </div>

        <Suspense fallback={<CategoriesListSkeleton />}>
          <CategoriesList />
        </Suspense>
      </main>
      <Footer />
    </div>
  )
}

function CategoriesListSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: 12 }).map((_, i) => (
        <div key={i} className="bg-card rounded-lg border border-border p-6">
          <div className="h-32 bg-muted rounded-lg mb-4"></div>
          <div className="h-6 bg-muted rounded mb-2"></div>
          <div className="h-4 bg-muted rounded w-3/4"></div>
        </div>
      ))}
    </div>
  )
}
