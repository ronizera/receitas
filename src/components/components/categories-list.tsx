import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"

interface Category {
  idCategory: string
  strCategory: string
  strCategoryThumb: string
  strCategoryDescription: string
}

interface CategoriesResponse {
  categories: Category[]
}

async function getCategories(): Promise<Category[]> {
  try {
    const response = await fetch("https://www.themealdb.com/api/json/v1/1/categories.php")
    const data: CategoriesResponse = await response.json()
    return data.categories || []
  } catch (error) {
    console.error("Erro ao buscar categorias:", error)
    return []
  }
}

export async function CategoriesList() {
  const categories = await getCategories()

  if (categories.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">📂</div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Nenhuma categoria encontrada</h2>
        <p className="text-muted-foreground">Não foi possível carregar as categorias. Tente novamente mais tarde.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {categories.map((category) => (
        <Link key={category.idCategory} href={`/category/${category.strCategory.toLowerCase()}`}>
          <Card className="group cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105 bg-card border-border h-full">
            <CardContent className="p-6">
              <div className="relative overflow-hidden rounded-lg mb-4">
                <Image
                  src={category.strCategoryThumb || "/placeholder.svg"}
                  alt={category.strCategory}
                  width={200}
                  height={150}
                  className="w-full h-32 object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <h3 className="font-bold text-xl mb-2 text-card-foreground group-hover:text-primary transition-colors">
                {category.strCategory}
              </h3>
              <p className="text-sm text-muted-foreground line-clamp-3">{category.strCategoryDescription}</p>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  )
}
