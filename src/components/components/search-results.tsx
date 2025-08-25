import { RecipeCard } from "@/components/components/recipe-card"

interface Meal {
  idMeal: string
  strMeal: string
  strMealThumb: string
  strCategory: string
  strArea: string
}

interface MealResponse {
  meals: Meal[] | null
}

async function searchRecipes(query: string): Promise<Meal[]> {
  try {
    // Buscar por nome da receita
    const nameResponse = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(query)}`,
    )
    const nameData: MealResponse = await nameResponse.json()

    // Buscar por ingrediente principal
    const ingredientResponse = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?i=${encodeURIComponent(query)}`,
    )
    const ingredientData: MealResponse = await ingredientResponse.json()

    // Combinar resultados e remover duplicatas
    const allMeals = [...(nameData.meals || []), ...(ingredientData.meals || [])]

    // Remover duplicatas baseado no ID
    const uniqueMeals = allMeals.filter(
      (meal, index, self) => index === self.findIndex((m) => m.idMeal === meal.idMeal),
    )

    return uniqueMeals
  } catch (error) {
    console.error("Erro ao buscar receitas:", error)
    return []
  }
}

interface SearchResultsProps {
  query: string
}

export async function SearchResults({ query }: SearchResultsProps) {
  const recipes = await searchRecipes(query)

  if (recipes.length === 0) {
    return (
      <div className="mt-8 text-center py-12">
        <div className="text-6xl mb-4">🔍</div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Nenhuma receita encontrada</h2>
        <p className="text-muted-foreground mb-6">Não encontramos receitas para `{query}`. Tente buscar por:</p>
        <div className="flex flex-wrap justify-center gap-2 max-w-md mx-auto">
          <span className="px-3 py-1 bg-muted rounded-full text-sm">chicken</span>
          <span className="px-3 py-1 bg-muted rounded-full text-sm">pasta</span>
          <span className="px-3 py-1 bg-muted rounded-full text-sm">beef</span>
          <span className="px-3 py-1 bg-muted rounded-full text-sm">dessert</span>
          <span className="px-3 py-1 bg-muted rounded-full text-sm">vegetarian</span>
        </div>
      </div>
    )
  }

  return (
    <div className="mt-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-foreground">Resultados para `{query}`</h2>
        <p className="text-muted-foreground">
          {recipes.length} receita{recipes.length !== 1 ? "s" : ""} encontrada{recipes.length !== 1 ? "s" : ""}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.idMeal} recipe={recipe} />
        ))}
      </div>
    </div>
  )
}
