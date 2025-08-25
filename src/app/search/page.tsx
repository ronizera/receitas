import { Suspense } from "react"
import { Header } from "@/components/components/header"
import { SearchResults } from "@/components/components/search-results"
import { SearchSection } from "@/components/components/search-section"
import { Breadcrumbs } from "@/components/components/breadcrumbs"
import { Footer } from "@/components/components/footer"

interface SearchPageProps {
  searchParams: { q?: string }
}

export default function SearchPage({ searchParams }: SearchPageProps) {
  const query = searchParams.q || ""

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <Breadcrumbs items={[{ label: "Buscar" }]} />
        <SearchSection initialQuery={query} />
        {query && (
          <Suspense fallback={<SearchResultsSkeleton />}>
            <SearchResults query={query} />
          </Suspense>
        )}
      </main>
      <Footer />
    </div>
  )
}

function SearchResultsSkeleton() {
  return (
    <div className="mt-8">
      <div className="h-8 bg-muted rounded w-48 mb-6"></div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="bg-card rounded-lg border border-border">
            <div className="h-48 bg-muted rounded-t-lg"></div>
            <div className="p-4">
              <div className="h-6 bg-muted rounded mb-2"></div>
              <div className="h-4 bg-muted rounded w-3/4"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
