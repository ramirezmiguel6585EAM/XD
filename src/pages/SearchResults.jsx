import React, { useContext, useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import ProductCard from '../components/ProductCard';

export default function SearchResults() {
  const { products } = useContext(AppContext);
  const [searchParams, setSearchParams] = useSearchParams();

  // Get filter values from URL search params
  const queryParam = searchParams.get('q') || '';
  const categoryParam = searchParams.get('category') || '';

  // Local filter states
  const [searchVal, setSearchVal] = useState(queryParam);
  const [selectedCategory, setSelectedCategory] = useState(categoryParam);
  const [maxPrice, setMaxPrice] = useState('');
  const [selectedCondition, setSelectedCondition] = useState('');

  // Sync state with URL params
  useEffect(() => {
    setSearchVal(queryParam);
    setSelectedCategory(categoryParam);
  }, [queryParam, categoryParam]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    updateParams({ q: searchVal });
  };

  const updateParams = (newParams) => {
    const nextParams = new URLSearchParams(searchParams);
    Object.entries(newParams).forEach(([key, val]) => {
      if (val === null || val === undefined || val === '') {
        nextParams.delete(key);
      } else {
        nextParams.set(key, val);
      }
    });
    setSearchParams(nextParams);
  };

  const clearAllFilters = () => {
    setSearchVal('');
    setSelectedCategory('');
    setMaxPrice('');
    setSelectedCondition('');
    setSearchParams({});
  };

  // Filter products based on search value, category, price, and condition
  const filteredProducts = products.filter((product) => {
    // 1. Search Query
    if (queryParam) {
      const q = queryParam.toLowerCase();
      const matchTitle = product.title ? product.title.toLowerCase().includes(q) : false;
      const matchDesc = product.description ? product.description.toLowerCase().includes(q) : false;
      const matchCat = product.categoryLabel ? product.categoryLabel.toLowerCase().includes(q) : false;
      if (!matchTitle && !matchDesc && !matchCat) return false;
    }

    // 2. Category
    if (selectedCategory && product.category !== selectedCategory) {
      return false;
    }

    // 3. Max Price
    if (maxPrice && product.price > parseFloat(maxPrice)) {
      return false;
    }

    // 4. Condition
    if (selectedCondition && product.conditionValue !== selectedCondition) {
      return false;
    }

    return true;
  });

  return (
    <div className="flex-1 w-full max-w-container-max mx-auto px-md md:px-lg py-lg flex flex-col md:flex-row gap-lg items-start">
      {/* Sidebar Filter Panel */}
      <aside className="w-full md:w-[280px] shrink-0 bg-surface-container-lowest border border-outline-variant/30 rounded-xl p-lg flex flex-col gap-lg shadow-sm">
        <div className="flex items-center justify-between pb-sm border-b border-outline-variant/20">
          <h2 className="font-headline-md text-[18px] font-bold text-on-background">Filters</h2>
          <button
            onClick={clearAllFilters}
            className="text-[12px] font-semibold text-primary hover:underline cursor-pointer"
          >
            Clear All
          </button>
        </div>

        {/* Category Filter */}
        <div>
          <label className="font-label-sm text-[12px] text-on-background block mb-sm">Category</label>
          <select
            className="w-full bg-surface text-on-surface border border-outline-variant rounded-xl px-sm py-[10px] text-body-md focus:border-primary focus:ring-1 focus:ring-primary outline-none cursor-pointer"
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value);
              updateParams({ category: e.target.value });
            }}
          >
            <option value="">All Categories</option>
            <option value="electronics">Electronics</option>
            <option value="home">Home & Garden</option>
            <option value="fashion">Fashion</option>
            <option value="motors">Motors</option>
            <option value="collectibles">Collectibles</option>
            <option value="videogames">Video Games</option>
          </select>
        </div>

        {/* Max Price Filter */}
        <div>
          <label className="font-label-sm text-[12px] text-on-background block mb-sm">Max Price ($)</label>
          <div className="relative">
            <span className="absolute left-sm top-1/2 -translate-y-1/2 text-on-surface-variant font-bold text-body-md">$</span>
            <input
              type="number"
              min="0"
              placeholder="Any price"
              className="w-full bg-surface text-on-surface border border-outline-variant rounded-xl pl-lg pr-sm py-[10px] text-body-md focus:border-primary focus:ring-1 focus:ring-primary outline-none"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
            />
          </div>
        </div>

        {/* Condition Filter */}
        <div>
          <label className="font-label-sm text-[12px] text-on-background block mb-sm">Condition</label>
          <select
            className="w-full bg-surface text-on-surface border border-outline-variant rounded-xl px-sm py-[10px] text-body-md focus:border-primary focus:ring-1 focus:ring-primary outline-none cursor-pointer"
            value={selectedCondition}
            onChange={(e) => setSelectedCondition(e.target.value)}
          >
            <option value="">All Conditions</option>
            <option value="new">New (Unused)</option>
            <option value="like-new">Used - Like New</option>
            <option value="good">Used - Good</option>
            <option value="fair">Used - Fair</option>
          </select>
        </div>
      </aside>

      {/* Main Results Panel */}
      <div className="flex-1 w-full flex flex-col gap-lg">
        {/* Results Header / Search Sub-bar */}
        <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-xl p-md md:p-lg shadow-sm flex flex-col sm:flex-row items-center justify-between gap-md">
          {/* Duplicate search bar removed */}

          <div className="text-[14px] text-on-surface-variant/90 font-medium">
            Found <span className="font-bold text-primary">{filteredProducts.length}</span> items
            {queryParam && <span> for "{queryParam}"</span>}
          </div>
        </div>

        {/* Results Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-[80px] bg-surface-container-lowest rounded-xl border border-outline-variant/30 shadow-sm flex flex-col items-center">
            <span className="material-symbols-outlined text-[64px] text-on-surface-variant/30">search_off</span>
            <h3 className="font-bold text-headline-md mt-md text-on-background">No items found</h3>
            <p className="text-body-md text-on-surface-variant max-w-sm mt-xs">
              Try adjusting your keywords, expanding your filters, or clearing all filters to see more results.
            </p>
            <button
              onClick={clearAllFilters}
              className="mt-md bg-primary text-on-primary font-bold px-lg py-sm rounded-xl hover:bg-primary/95 active:scale-95 transition-all text-body-md"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-lg">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
