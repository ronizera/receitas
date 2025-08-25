import { Suspense } from "react"
import { Header } from "@/components/components/header"
import { FeaturedRecipes } from "@/components/components/featured-recipes"
import { SearchSection } from "@/components/components/search-section"
import { Footer } from "@/components/components/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <SearchSection />
        <Suspense fallback={<div className="text-center py-8">Carregando receitas...</div>}>
          <FeaturedRecipes />
        </Suspense>
      </main>
      <Footer />
    </div>
  )
}
