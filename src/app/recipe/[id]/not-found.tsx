import Link from "next/link"
import { Header } from "@/components/components/header"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-16">
        <div className="text-center max-w-md mx-auto">
          <div className="text-8xl mb-6">🍽️</div>
          <h1 className="text-3xl font-bold text-foreground mb-4">Receita não encontrada</h1>
          <p className="text-muted-foreground mb-8">A receita que você está procurando não existe ou foi removida.</p>
          <div className="space-y-4">
            <Button asChild className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
              <Link href="/">Voltar ao início</Link>
            </Button>
            <Button asChild variant="outline" className="w-full bg-transparent">
              <Link href="/search">Buscar receitas</Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}
