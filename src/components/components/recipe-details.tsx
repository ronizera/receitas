import Image from "next/image"
import { notFound } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Globe } from "lucide-react"

interface DetailedMeal {
  idMeal: string
  strMeal: string
  strDrinkAlternate?: string
  strCategory: string
  strArea: string
  strInstructions: string
  strMealThumb: string
  strTags?: string
  strYoutube?: string
  [key: `strIngredient${number}`]: string | undefined
  [key: `strMeasure${number}`]: string | undefined
}

interface MealDetailResponse {
  meals: DetailedMeal[] | null
}

interface Ingredient {
  name: string
  measure: string
}

async function getRecipeDetails(id: string): Promise<DetailedMeal | null> {
  try {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    const data: MealDetailResponse = await response.json()
    return data.meals?.[0] || null
  } catch (error) {
    console.error("Erro ao buscar detalhes da receita:", error)
    return null
  }
}

function extractIngredients(meal: DetailedMeal): Ingredient[] {
  const ingredients: Ingredient[] = []

  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}` as keyof DetailedMeal] as string
    const measure = meal[`strMeasure${i}` as keyof DetailedMeal] as string

    if (ingredient && ingredient.trim()) {
      ingredients.push({
        name: ingredient.trim(),
        measure: measure?.trim() || "",
      })
    }
  }

  return ingredients
}

function formatInstructions(instructions: string): string[] {
  return instructions
    .split(/\r?\n/)
    .map((step) => step.trim())
    .filter((step) => step.length > 0)
    .map((step, index) => {
      // Remove numeração existente se houver
      const cleanStep = step.replace(/^\d+\.?\s*/, "")
      return `${index + 1}. ${cleanStep}`
    })
}

interface RecipeDetailsProps {
  recipeId: string
}

export async function RecipeDetails({ recipeId }: RecipeDetailsProps) {
  const recipe = await getRecipeDetails(recipeId)

  if (!recipe) {
    notFound()
  }

  const ingredients = extractIngredients(recipe)
  const instructions = formatInstructions(recipe.strInstructions)
  const tags = recipe.strTags?.split(",").map((tag) => tag.trim()) || []

  return (
    <div className="max-w-6xl mx-auto">
      {/* Recipe Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-4">{recipe.strMeal}</h1>
        <div className="flex flex-wrap gap-4 items-center mb-6">
          <Badge variant="secondary" className="bg-secondary text-secondary-foreground">
            {recipe.strCategory}
          </Badge>
          <div className="flex items-center gap-1 text-muted-foreground">
            <Globe className="h-4 w-4" />
            <span>{recipe.strArea}</span>
          </div>
          {tags.length > 0 && (
            <div className="flex gap-2">
              {tags.slice(0, 3).map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Recipe Image */}
        <div className="relative">
          <Image
            src={recipe.strMealThumb || "/placeholder.svg"}
            alt={recipe.strMeal}
            width={600}
            height={400}
            className="w-full h-96 object-cover rounded-lg shadow-lg"
            priority
          />
        </div>

        {/* Ingredients */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-2xl text-card-foreground">Ingredientes</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {ingredients.map((ingredient, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center py-2 border-b border-border last:border-b-0"
                >
                  <span className="text-card-foreground font-medium">{ingredient.name}</span>
                  <span className="text-muted-foreground text-sm">{ingredient.measure}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Instructions */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-2xl text-card-foreground">Modo de Preparo</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {instructions.map((instruction, index) => (
              <div key={index} className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                  {index + 1}
                </div>
                <p className="text-card-foreground leading-relaxed pt-1">{instruction.replace(/^\d+\.?\s*/, "")}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* YouTube Video Link */}
      {recipe.strYoutube && (
        <Card className="mt-8 bg-card border-border">
          <CardHeader>
            <CardTitle className="text-xl text-card-foreground">Vídeo Tutorial</CardTitle>
          </CardHeader>
          <CardContent>
            <a
              href={recipe.strYoutube}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
              Assistir no YouTube
            </a>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
