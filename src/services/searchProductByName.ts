export interface ProductSearchResult {
  name: string;
  calories: string;
  carbohydrates: string;
  fat: string;
  protein: string;
  saturatedFat: string;
  sugar: string;
  salt: string;
  imageUrl?: string;
}

export async function searchProductByName(
  query: string
): Promise<ProductSearchResult[]> {
  try {
    console.log("Searching for:", query);

    // Open Food Facts text search API
    const response = await fetch(
      `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${encodeURIComponent(
        query
      )}&search_simple=1&action=process&json=1&page_size=10`
    );

    const data = await response.json();
    console.log("Search API response:", data);

    if (data.products && data.products.length > 0) {
      const results: ProductSearchResult[] = data.products.map((product: any) => {
        const nutrients = product.nutriments || {};

        const getNutrient = (key: string): string => {
          const value = nutrients[key];
          if (value === null || value === undefined || value === "") {
            return "0";
          }
          return String(value);
        };

        return {
          name:
            product.product_name ||
            product.product_name_en ||
            product.product_name_de ||
            "Unknown Product",
          calories: getNutrient("energy-kcal_100g"),
          carbohydrates: getNutrient("carbohydrates_100g"),
          fat: getNutrient("fat_100g"),
          protein: getNutrient("proteins_100g"),
          saturatedFat: getNutrient("saturated-fat_100g"),
          sugar: getNutrient("sugars_100g"),
          salt: getNutrient("salt_100g"),
          imageUrl: product.image_url || product.image_front_url || "",
        };
      });

      console.log("Formatted search results:", results);
      return results;
    }

    console.log("No products found");
    return [];
  } catch (error) {
    console.error("Error searching products:", error);
    return [];
  }
}