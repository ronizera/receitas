import { Suspense } from "react"
import { Header } from "@/components/components/header"
import { CategoryRecipes } from "@/components/components/category-recipes"
import { Breadcrumbs } from "@/components/components/breadcrumbs"
import { Footer } from "@/components/components/footer"

interface CategoryPageProps {
  params: { name: string }
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const categoryName = decodeURIComponent(params.name)
  const displayName = categoryName.charAt(0).toUpperCase() + categoryName.slice(1)

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <Breadcrumbs items={[{ label: "Categorias", href: "/categories" }, { label: displayName }]} />
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">Receitas de {displayName}</h1>
          <p className="text-lg text-muted-foreground">
            Descubra todas as receitas deliciosas da categoria {displayName.toLowerCase()}.
          </p>
        </div>

        <Suspense fallback={<CategoryRecipesSkeleton />}>
          <CategoryRecipes categoryName={categoryName} />
        </Suspense>
      </main>
      <Footer />
    </div>
  )
}

function CategoryRecipesSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: 12 }).map((_, i) => (
        <div key={i} className="bg-card rounded-lg border border-border">
          <div className="h-48 bg-muted rounded-t-lg"></div>
          <div className="p-4">
            <div className="h-6 bg-muted rounded mb-2"></div>
            <div className="h-4 bg-muted rounded w-3/4"></div>
          </div>
        </div>
      ))}
    </div>
  )
}
