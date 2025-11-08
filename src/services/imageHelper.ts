export async function downloadImageAsBase64(imageUrl: string): Promise<string | null> {
   try {
      console.log("📥 Downloading image from:", imageUrl);

      // ✅ Try direct fetch first
      const response = await fetch(imageUrl, {
         mode: "cors",
         credentials: "omit",
      });

      if (!response.ok) {
         throw new Error(`HTTP error! status: ${response.status}`);
      }

      const blob = await response.blob();
      console.log("📦 Image downloaded:", blob.size, "bytes, type:", blob.type);

      return new Promise((resolve, reject) => {
         const reader = new FileReader();
         reader.onloadend = () => {
            const base64 = reader.result as string;
            console.log("✅ Converted to base64");
            resolve(base64);
         };
         reader.onerror = reject;
         reader.readAsDataURL(blob);
      });
   } catch (error) {
      console.error("❌ Error downloading image:", error);
      return null;
   }
}
