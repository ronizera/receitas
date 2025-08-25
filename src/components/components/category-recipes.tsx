import { RecipeCard } from "@/components/components/recipe-card"

interface CategoryMeal {
  idMeal: string
  strMeal: string
  strMealThumb: string
}

interface CategoryMealsResponse {
  meals: CategoryMeal[] | null
}

// Extend CategoryMeal to match Recipe interface
interface Recipe extends CategoryMeal {
  strCategory: string
  strArea: string
}

async function getCategoryRecipes(categoryName: string): Promise<Recipe[]> {
  try {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?c=${encodeURIComponent(categoryName)}`,
    )
    const data: CategoryMealsResponse = await response.json()

    // Transform CategoryMeal to Recipe by adding missing fields
    const recipes: Recipe[] = (data.meals || []).map((meal) => ({
      ...meal,
      strCategory: categoryName.charAt(0).toUpperCase() + categoryName.slice(1),
      strArea: "Unknown", // API doesn't provide area in category filter
    }))

    return recipes
  } catch (error) {
    console.error("Erro ao buscar receitas da categoria:", error)
    return []
  }
}

interface CategoryRecipesProps {
  categoryName: string
}

export async function CategoryRecipes({ categoryName }: CategoryRecipesProps) {
  const recipes = await getCategoryRecipes(categoryName)

  if (recipes.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">🍽️</div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Nenhuma receita encontrada</h2>
        <p className="text-muted-foreground">
          Não encontramos receitas para a categoria `{categoryName}`. Tente outra categoria.
        </p>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-6">
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
