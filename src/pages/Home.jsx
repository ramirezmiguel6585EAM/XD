import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import ProductCard from '../components/ProductCard';

export default function Home() {
  const { products, setSearchQuery } = useContext(AppContext);
  const [localSearch, setLocalSearch] = useState('');
  const navigate = useNavigate();

  const handleHeroSearch = (e) => {
    e.preventDefault();
    setSearchQuery(localSearch);
    navigate(`/search?q=${encodeURIComponent(localSearch)}`);
  };

  const handleCategorySelect = (category) => {
    setSearchQuery('');
    navigate(`/search?category=${category}`);
  };

  // Filter out products that are sold, or display them last
  const activeProducts = products.filter(p => !p.sold);
  const soldProducts = products.filter(p => p.sold);
  const displayProducts = [...activeProducts, ...soldProducts];

  const categories = [
    { id: 'electronics', name: 'Electronics', icon: 'devices' },
    { id: 'home', name: 'Home & Garden', icon: 'home' },
    { id: 'fashion', name: 'Fashion', icon: 'apparel' },
    { id: 'motors', name: 'Motors', icon: 'directions_car' },
    { id: 'collectibles', name: 'Collectibles', icon: 'workspace_premium' },
    { id: 'videogames', name: 'Video Games', icon: 'sports_esports' }
  ];

  return (
    <div className="flex-1 w-full flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full bg-gradient-to-r from-[#0052ff] to-[#003dbb] text-white py-xl px-lg flex flex-col items-center justify-center text-center shadow-md relative overflow-hidden">
        {/* Background glow effects */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-white/5 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-4xl w-full flex flex-col items-center gap-md z-10">
          <h1 className="font-headline-xl text-headline-xl md:text-[48px] font-extrabold tracking-tight text-white leading-tight">
            Connect locally. Buy & Sell securely.
          </h1>
          <p className="text-body-lg text-white/90 max-w-2xl text-[18px]">
            The high-velocity commerce engine built on trust. Browse listings nearby, chat in real-time, and purchase with secure holding protection.
          </p>

          {/* Large Hero Search Bar */}
          <form onSubmit={handleHeroSearch} className="w-full max-w-2xl mt-md">
            <div className="w-full flex items-center bg-white rounded-xl shadow-level-2 overflow-hidden h-[56px] border border-outline-variant/30 focus-within:ring-2 focus-within:ring-secondary-fixed transition-all">
              <span className="material-symbols-outlined text-on-surface-variant pl-md text-[24px]">search</span>
              <input
                className="w-full bg-transparent border-none focus:ring-0 text-body-lg text-on-background px-md h-full placeholder:text-on-surface-variant/50 outline-none"
                placeholder="What are you looking for today? (e.g. Office Chair, DSLR)"
                type="text"
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
              />
              <button
                type="submit"
                className="bg-secondary-fixed text-on-secondary-fixed font-bold px-lg h-full hover:bg-secondary-container transition-colors active:scale-95 text-body-md"
              >
                Search
              </button>
            </div>
          </form>

          {/* Sell CTA button */}
          <div className="mt-md flex flex-col items-center gap-xs">
            <span className="text-white/80 text-[14px] font-semibold">Have something to sell?</span>
            <button
              onClick={() => navigate('/sell')}
              className="bg-secondary-fixed text-on-secondary-fixed px-xl py-sm rounded-xl font-bold hover:bg-secondary-container hover:shadow-level-2 transition-all cursor-pointer active:scale-95 flex items-center gap-xs text-[15px]"
            >
              <span className="material-symbols-outlined text-[20px]">storefront</span>
              Start Selling
            </button>
          </div>
        </div>
      </section>

      {/* Category Section */}
      <section className="w-full max-w-container-max px-md md:px-lg py-xl">
        <h2 className="font-headline-md text-headline-md text-on-background mb-lg text-center md:text-left">
          Browse by Category
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-md">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategorySelect(cat.id)}
              className="bg-surface-container-lowest border border-outline-variant/20 rounded-[16px] p-lg flex flex-col items-center justify-center gap-sm text-center shadow-sm hover:shadow-level-2 hover:-translate-y-1 hover:border-primary/50 transition-all duration-300 group cursor-pointer"
            >
              <div className="w-12 h-12 rounded-full bg-primary-container/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                <span className="material-symbols-outlined text-[24px]">{cat.icon}</span>
              </div>
              <span className="font-semibold text-body-md text-on-background group-hover:text-primary transition-colors">
                {cat.name}
              </span>
            </button>
          ))}
        </div>
      </section>



      {/* Main Listings Grid */}
      <section className="w-full max-w-container-max px-md md:px-lg pb-[64px]">
        <div className="flex justify-between items-center mb-lg">
          <div>
            <h2 className="font-headline-md text-headline-md text-on-background">
              Recent Listings
            </h2>
            <p className="text-body-md text-on-surface-variant">Check out what's new in your area</p>
          </div>
          <button
            onClick={() => {
              setSearchQuery('');
              navigate('/search');
            }}
            className="text-primary font-semibold hover:underline flex items-center gap-xs text-body-md"
          >
            See All Items
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </button>
        </div>

        {displayProducts.length === 0 ? (
          <div className="text-center py-xl bg-surface-container-lowest rounded-xl border border-outline-variant/30">
            <span className="material-symbols-outlined text-[48px] text-on-surface-variant/40">shopping_bag</span>
            <p className="font-semibold mt-md text-on-background">No items listed yet.</p>
            <button
              onClick={() => navigate('/sell')}
              className="mt-sm bg-primary text-on-primary px-lg py-sm rounded-xl font-bold active:scale-95 transition-all"
            >
              List an Item
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-lg">
            {displayProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
