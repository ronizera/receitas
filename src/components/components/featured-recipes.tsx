import { RecipeCard } from "@/components/components/recipe-card"

// Tipos para a API do TheMealDB
interface Meal {
  idMeal: string
  strMeal: string
  strMealThumb: string
  strCategory: string
  strArea: string
}

interface MealResponse {
  meals: Meal[]
}

async function getFeaturedRecipes(): Promise<Meal[]> {
  try {
    const promises = Array.from({ length: 8 }, () =>
      fetch("https://www.themealdb.com/api/json/v1/1/random.php")
        .then((res) => res.json())
        .then((data: MealResponse) => data.meals[0])
    )

    const recipes = await Promise.all(promises)
    return recipes.filter(Boolean)
  } catch (error) {
    console.error("Erro ao buscar receitas:", error)
    return []
  }
}

export async function FeaturedRecipes() {
  const recipes = await getFeaturedRecipes()

  if (recipes.length === 0) {
    return (
      <section className="py-8">
        <h2 className="text-3xl font-bold text-center mb-8">Receitas em Destaque</h2>
        <div className="text-center text-muted-foreground">
          Não foi possível carregar as receitas. Tente novamente mais tarde.
        </div>
      </section>
    )
  }

  // Filtrar duplicados pelo idMeal
  const uniqueRecipes = recipes.filter(
    (recipe, index, self) =>
      index === self.findIndex(r => r.idMeal === recipe.idMeal)
  )

  return (
    <section className="py-8">
      <h2 className="text-3xl font-bold text-center mb-8 text-foreground">Receitas em Destaque</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {uniqueRecipes.map((recipe, index) => (
          <RecipeCard key={`${recipe.idMeal}-${index}`} recipe={recipe} />
        ))}
      </div>
    </section>
  )
}
