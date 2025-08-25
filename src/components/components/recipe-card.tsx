import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface Recipe {
  idMeal: string
  strMeal: string
  strMealThumb: string
  strCategory: string
  strArea: string
}

interface RecipeCardProps {
  recipe: Recipe
}

export function RecipeCard({ recipe }: RecipeCardProps) {
  return (
    <Link href={`/recipe/${recipe.idMeal}`}>
      <Card className="group cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105 bg-card border-border">
        <div className="relative overflow-hidden rounded-t-lg">
          <Image
            src={recipe.strMealThumb || "/placeholder.svg"}
            alt={recipe.strMeal}
            width={300}
            height={200}
            className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
          />
          <div className="absolute top-2 right-2">
            <Badge variant="secondary" className="bg-secondary/90 text-secondary-foreground">
              {recipe.strCategory}
            </Badge>
          </div>
        </div>
        <CardContent className="p-4">
          <h3 className="font-semibold text-lg mb-2 text-card-foreground line-clamp-2 group-hover:text-primary transition-colors">
            {recipe.strMeal}
          </h3>
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span className="flex items-center gap-1">🌍 {recipe.strArea}</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
