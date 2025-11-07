export async function downloadImageAsBase64(imageUrl: string): Promise<string | null> {
  try {
    console.log("Downloading image from:", imageUrl);
    
    const response = await fetch(imageUrl);
    const blob = await response.blob();
    
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        console.log("Image converted to base64");
        resolve(base64);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch (error) {
    console.error("Error downloading image:", error);
    return null;
  }
}