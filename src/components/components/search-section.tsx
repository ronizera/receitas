"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface SearchSectionProps {
  initialQuery?: string
  onSearch?: (query: string) => void
}

export function SearchSection({ initialQuery = "", onSearch }: SearchSectionProps) {
  const [searchQuery, setSearchQuery] = useState(initialQuery)
  const router = useRouter()

  useEffect(() => {
    setSearchQuery(initialQuery)
  }, [initialQuery])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const trimmedQuery = searchQuery.trim()

    if (trimmedQuery) {
      router.push(`/search?q=${encodeURIComponent(trimmedQuery)}`)

      if (onSearch) {
        onSearch(trimmedQuery)
      }
    }
  }

  return (
    <section className="mb-12">
      {!initialQuery && (
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-foreground mb-4">Encontre sua próxima receita favorita</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore milhares de receitas deliciosas de todo o mundo. Digite um ingrediente, prato ou categoria para
            começar sua jornada culinária.
          </p>
        </div>
      )}

      <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              type="text"
              placeholder="Buscar por ingrediente, prato ou categoria..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12 text-base bg-input border-border focus:ring-2 focus:ring-ring"
            />
          </div>
          <Button type="submit" size="lg" className="h-12 px-8 bg-primary hover:bg-primary/90 text-primary-foreground">
            Buscar
          </Button>
        </div>
      </form>
    </section>
  )
}
