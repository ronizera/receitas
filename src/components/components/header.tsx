"use client"

import { useState } from "react"
import Link from "next/link"
import { ChefHat, Grid3X3, Menu, X, Search } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <header className="bg-card border-b border-border sticky top-0 z-50 backdrop-blur-sm bg-card/95">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <div className="p-2 bg-primary rounded-lg">
              <ChefHat className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">ReceitasDB</h1>
              <p className="text-sm text-muted-foreground hidden sm:block">Descubra receitas incríveis</p>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/search"
              className="flex items-center gap-2 text-foreground hover:text-primary transition-colors font-medium"
            >
              <Search className="h-4 w-4" />
              Buscar
            </Link>
            <Link
              href="/categories"
              className="flex items-center gap-2 text-foreground hover:text-primary transition-colors font-medium"
            >
              <Grid3X3 className="h-4 w-4" />
              Categorias
            </Link>
          </nav>

          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {isMobileMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 border-t border-border pt-4">
            <div className="flex flex-col gap-4">
              <Link
                href="/search"
                className="flex items-center gap-2 text-foreground hover:text-primary transition-colors font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Search className="h-4 w-4" />
                Buscar Receitas
              </Link>
              <Link
                href="/categories"
                className="flex items-center gap-2 text-foreground hover:text-primary transition-colors font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Grid3X3 className="h-4 w-4" />
                Categorias
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}

