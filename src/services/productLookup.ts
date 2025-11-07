// Using Open Food Facts API (free, global food database)
export async function lookupBarcode(barcode: string) {
  try {
    const response = await fetch(
      `https://world.openfoodfacts.org/api/v0/product/${barcode}.json`
    );
    const data = await response.json();

    if (data.status === 1 && data.product) {
      const product = data.product;
      const nutrients = product.nutriments || {};

      return {
        name: product.product_name || "Unknown Product",
        calories: nutrients["energy-kcal_100g"] || 0,
        carbohydrates: nutrients.carbohydrates_100g || 0,
        fat: nutrients.fat_100g || 0,
        protein: nutrients.proteins_100g || 0,
        saturatedFat: nutrients["saturated-fat_100g"] || 0,
        sugar: nutrients.sugars_100g || 0,
        salt: nutrients.salt_100g || 0,
        image: product.image_url || "",
        barcode: barcode,
      };
    }

    return null;
  } catch (error) {
    console.error("Error looking up barcode:", error);
    return null;
  }
}