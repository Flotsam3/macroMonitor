export async function lookupBarcode(barcode: string) {
  try {
    const response = await fetch(
      `https://world.openfoodfacts.org/api/v0/product/${barcode}.json`
    );
    const data = await response.json();

    console.log("API Response:", data);

    if (data.status === 1 && data.product) {
      const product = data.product;
      const nutrients = product.nutriments || {};

      // Helper to safely get nutrient value
      const getNutrient = (key: string): string => {
        const value = nutrients[key];
        if (value === null || value === undefined || value === "") {
          return "0";
        }
        return String(value);
      };

      const productData = {
        name: product.product_name || product.product_name_de || product.product_name_en || "Unknown Product",
        calories: getNutrient("energy-kcal_100g"),
        carbohydrates: getNutrient("carbohydrates_100g"),
        fat: getNutrient("fat_100g"),
        protein: getNutrient("proteins_100g"),
        saturatedFat: getNutrient("saturated-fat_100g"),
        sugar: getNutrient("sugars_100g"),
        salt: getNutrient("salt_100g"),
      };

      return productData;
    }

    console.warn("Product not found in database");
    return null;
  } catch (error) {
    console.error("Error looking up barcode:", error);
    return null;
  }
}