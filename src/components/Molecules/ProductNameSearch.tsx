import { useState, useEffect } from "react";
import { Search, X } from "lucide-react";
import styles from "./ProductNameSearch.module.scss";
import { searchProductByName, ProductSearchResult } from "../../services/searchProductByName";
import { showToast } from "../Atoms/CustomToast";

interface ProductNameSearchProps {
   searchQuery: string;
   onSelect: (product: ProductSearchResult) => void;
   onModalStateChange?: (isOpen: boolean) => void;
}

export default function ProductNameSearch({
   searchQuery,
   onSelect,
   onModalStateChange,
}: ProductNameSearchProps) {
   const [isSearching, setIsSearching] = useState(false);
   const [showResults, setShowResults] = useState(false);
   const [results, setResults] = useState<ProductSearchResult[]>([]);

   useEffect(() => {
      onModalStateChange?.(showResults);
   }, [showResults, onModalStateChange]);

   const handleSearch = async () => {
      if (!searchQuery.trim()) {
         showToast.error("Please enter a product name first");
         return;
      }

      setIsSearching(true);
      showToast.info("Searching database...");

      const products = await searchProductByName(searchQuery);

      setIsSearching(false);

      if (products.length > 0) {
         setResults(products);
         setShowResults(true);
         showToast.success(`Found ${products.length} results`);
      } else {
         showToast.error("No products found. Try a different name or use barcode scan.");
      }
   };

   const handleSelectProduct = (product: ProductSearchResult) => {
      onSelect(product);
      setShowResults(false);
      showToast.success(`Selected: ${product.name}`);
   };

   const handleClose = () => {
      setShowResults(false);
   };

   return (
      <>
         {/* Search Button */}
         <button
            className={styles.searchButton}
            onClick={handleSearch}
            disabled={isSearching}
            title="Search product by name"
            type="button"
            aria-label="Search product database"
         >
            <Search size={24} />
         </button>

         {/* Results Modal */}
         {showResults && (
            <div className={styles.modalOverlay} onClick={handleClose}>
               <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                  <div className={styles.modalHeader}>
                     <h3>Search Results for "{searchQuery}"</h3>
                     <button
                        onClick={handleClose}
                        className={styles.closeButton}
                        aria-label="Close"
                     >
                        <X size={24} />
                     </button>
                  </div>

                  <div className={styles.resultsList}>
                     {results.map((product, index) => (
                        <div key={index} className={styles.resultItem}>
                           {product.imageUrl && (
                              <img
                                 src={product.imageUrl}
                                 alt={product.name}
                                 className={styles.productImage}
                              />
                           )}
                           <div className={styles.productInfo}>
                              <h4>{product.name}</h4>
                              <div className={styles.macros}>
                                 <span>Cal: {product.calories}</span>
                                 <span>C: {product.carbohydrates}g</span>
                                 <span>F: {product.fat}g</span>
                                 <span>P: {product.protein}g</span>
                              </div>
                           </div>
                           <button
                              className={styles.selectButton}
                              onClick={() => handleSelectProduct(product)}
                           >
                              Select
                           </button>
                        </div>
                     ))}
                  </div>

                  {results.length === 0 && (
                     <div className={styles.noResults}>
                        <p>No products found</p>
                     </div>
                  )}
               </div>
            </div>
         )}
      </>
   );
}
