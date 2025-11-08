import { useState } from "react";
import { Search, X, SlidersHorizontal } from "lucide-react";
import styles from "./ProductSearchFilter.module.scss";

interface ProductSearchFilterProps {
  onSearch: (query: string) => void;
  onFilter: (filters: FilterOptions) => void;
  totalProducts: number;
  filteredCount: number;
}

export interface FilterOptions {
  maxCalories?: number;
  minProtein?: number;
  maxCarbs?: number;
  maxFat?: number;
}

export default function ProductSearchFilter({
  onSearch,
  onFilter,
  totalProducts,
  filteredCount,
}: ProductSearchFilterProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>({});

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    onSearch(value);
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    onSearch("");
  };

  const handleFilterChange = (key: keyof FilterOptions, value: string) => {
    const numValue = value === "" ? undefined : Number(value);
    const newFilters = { ...filters, [key]: numValue };
    setFilters(newFilters);
    onFilter(newFilters);
  };

  const handleClearFilters = () => {
    setFilters({});
    onFilter({});
  };

  const hasActiveFilters = Object.values(filters).some((v) => v !== undefined);

  return (
    <div title="Configure filter options" className={styles.searchFilterWrapper}>
      {/* Search Bar */}
      <div className={styles.searchBar}>
        <Search className={styles.searchIcon} size={20} />
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => handleSearchChange(e.target.value)}
          className={styles.searchInput}
        />
        {searchQuery && (
          <button
            onClick={handleClearSearch}
            className={styles.clearButton}
            aria-label="Clear search"
          >
            <X size={18} />
          </button>
        )}
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`${styles.filterToggle} ${showFilters ? styles.active : ""} ${
            hasActiveFilters ? styles.hasFilters : ""
          }`}
          aria-label="Toggle filters"
        >
          <SlidersHorizontal size={20} />
          {hasActiveFilters && <span className={styles.filterDot} />}
        </button>
      </div>

      {/* Results Count */}
      <div className={styles.resultsCount}>
        Showing {filteredCount} of {totalProducts} products
      </div>

      {/* Advanced Filters */}
      {showFilters && (
        <div className={styles.filtersPanel}>
          <div className={styles.filtersHeader}>
            <h3>Filter by Macros (per 100g)</h3>
            {hasActiveFilters && (
              <button onClick={handleClearFilters} className={styles.clearFiltersBtn}>
                Clear all
              </button>
            )}
          </div>

          <div className={styles.filtersGrid}>
            <div className={styles.filterItem}>
              <label>Max Calories</label>
              <input
                type="number"
                placeholder="e.g. 200"
                value={filters.maxCalories || ""}
                onChange={(e) => handleFilterChange("maxCalories", e.target.value)}
              />
            </div>

            <div className={styles.filterItem}>
              <label>Min Protein (g)</label>
              <input
                type="number"
                placeholder="e.g. 10"
                value={filters.minProtein || ""}
                onChange={(e) => handleFilterChange("minProtein", e.target.value)}
              />
            </div>

            <div className={styles.filterItem}>
              <label>Max Carbs (g)</label>
              <input
                type="number"
                placeholder="e.g. 30"
                value={filters.maxCarbs || ""}
                onChange={(e) => handleFilterChange("maxCarbs", e.target.value)}
              />
            </div>

            <div className={styles.filterItem}>
              <label>Max Fat (g)</label>
              <input
                type="number"
                placeholder="e.g. 15"
                value={filters.maxFat || ""}
                onChange={(e) => handleFilterChange("maxFat", e.target.value)}
              />
            </div>
          </div>

          {/* Quick Filter Presets */}
          <div className={styles.quickFilters}>
            <span>Quick filters:</span>
            <button
              onClick={() => {
                const preset = { maxCalories: 100 };
                setFilters(preset);
                onFilter(preset);
              }}
            >
              Low Cal
            </button>
            <button
              onClick={() => {
                const preset = { minProtein: 15 };
                setFilters(preset);
                onFilter(preset);
              }}
            >
              High Protein
            </button>
            <button
              onClick={() => {
                const preset = { maxCarbs: 10 };
                setFilters(preset);
                onFilter(preset);
              }}
            >
              Low Carb
            </button>
            <button
              onClick={() => {
                const preset = { maxFat: 5 };
                setFilters(preset);
                onFilter(preset);
              }}
            >
              Low Fat
            </button>
          </div>
        </div>
      )}
    </div>
  );
}