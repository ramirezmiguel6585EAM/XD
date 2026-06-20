import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

export default function Navbar() {
  const { currentUser, cart } = useContext(AppContext);
  const [searchParams] = useSearchParams();
  const queryParam = searchParams.get('q') || '';

  const [localSearch, setLocalSearch] = useState(queryParam);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [categoriesDropdownOpen, setCategoriesDropdownOpen] = useState(false);
  const navigate = useNavigate();

  // Sync Navbar input with query parameter of active URL
  useEffect(() => {
    setLocalSearch(queryParam);
  }, [queryParam]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    navigate(`/search?q=${encodeURIComponent(localSearch)}`);
  };

  const handleCategoryClick = (category) => {
    setLocalSearch('');
    navigate(`/search?category=${category}`);
  };

  return (
    <header className="bg-gradient-to-r from-[#0052ff] to-[#003dbb] text-white font-body-md text-body-md sticky top-0 left-0 w-full z-50 flex flex-col items-center px-lg py-sm shadow-[0_10px_20px_-5px_rgba(28,30,33,0.12)]">
      <div className="w-full flex items-center justify-between px-lg">
        {/* Brand Logo */}
        <div className="flex items-center gap-md">
          <Link to="/" className="font-headline-md text-headline-md font-bold text-white hover:opacity-90 active:scale-95 transition-all">
            OmniMarket
          </Link>
        </div>

        {/* Desktop Search Bar */}
        <form onSubmit={handleSearchSubmit} className="hidden md:flex flex-1 min-w-0 w-full ml-4">
          <div className="w-full relative flex items-center bg-white/10 hover:bg-white/15 focus-within:bg-white/20 focus-within:border-white/50 backdrop-blur-md rounded-[16px] h-[48px] shadow-level-1 overflow-hidden border border-white/20 transition-all duration-200">
            <button type="submit" className="pl-md pr-xs text-white/80 flex items-center justify-center h-full hover:bg-white/10 transition-colors cursor-pointer">
              <span className="material-symbols-outlined text-[20px]">search</span>
            </button>
            <input
              className="w-full bg-transparent border-none focus:outline-none focus:ring-0 text-body-md text-white h-full placeholder-white/60 outline-none pl-xs pr-md"
              placeholder="Search items..."
              type="text"
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
            />
            <div className="w-[1px] h-2/3 bg-white/20 mx-xs"></div>
            <button
              type="button"
              onClick={() => navigate('/search')}
              className="pr-md pl-xs text-white/80 flex items-center gap-xs text-[13px] font-semibold h-full hover:bg-white/10 transition-colors cursor-pointer"
            >
              <span>Map</span>
              <span className="material-symbols-outlined text-[18px]">location_on</span>
            </button>
          </div>
        </form>

        {/* Desktop Navigation / Actions */}
        <div className="flex items-center gap-sm">
          {/* Categories Dropdown */}
          <div className="relative hidden md:block">
            <button
              onClick={() => setCategoriesDropdownOpen(!categoriesDropdownOpen)}
              className="text-white/85 hover:text-white transition-colors px-sm py-xs rounded-xl flex items-center gap-xs cursor-pointer focus:outline-none"
            >
              <span>Categories</span>
              <span className="material-symbols-outlined text-[18px]">expand_more</span>
            </button>
            
            {categoriesDropdownOpen && (
              <div className="absolute left-0 mt-xs bg-surface-container-lowest text-on-background w-48 rounded-xl shadow-level-2 border border-outline-variant/30 py-sm flex flex-col z-50">
                <button
                  onClick={() => {
                    setCategoriesDropdownOpen(false);
                    handleCategoryClick('electronics');
                  }}
                  className="px-md py-sm hover:bg-surface-container-low text-left text-body-md text-[14px] flex items-center gap-sm cursor-pointer border-none bg-transparent w-full text-on-surface"
                >
                  <span className="material-symbols-outlined text-[18px]">devices</span>
                  Electronics
                </button>
                <button
                  onClick={() => {
                    setCategoriesDropdownOpen(false);
                    handleCategoryClick('home');
                  }}
                  className="px-md py-sm hover:bg-surface-container-low text-left text-body-md text-[14px] flex items-center gap-sm cursor-pointer border-none bg-transparent w-full text-on-surface"
                >
                  <span className="material-symbols-outlined text-[18px]">home</span>
                  Home &amp; Garden
                </button>
                <button
                  onClick={() => {
                    setCategoriesDropdownOpen(false);
                    handleCategoryClick('fashion');
                  }}
                  className="px-md py-sm hover:bg-surface-container-low text-left text-body-md text-[14px] flex items-center gap-sm cursor-pointer border-none bg-transparent w-full text-on-surface"
                >
                  <span className="material-symbols-outlined text-[18px]">apparel</span>
                  Fashion
                </button>
                <button
                  onClick={() => {
                    setCategoriesDropdownOpen(false);
                    handleCategoryClick('motors');
                  }}
                  className="px-md py-sm hover:bg-surface-container-low text-left text-body-md text-[14px] flex items-center gap-sm cursor-pointer border-none bg-transparent w-full text-on-surface"
                >
                  <span className="material-symbols-outlined text-[18px]">directions_car</span>
                  Motors
                </button>
                <button
                  onClick={() => {
                    setCategoriesDropdownOpen(false);
                    handleCategoryClick('collectibles');
                  }}
                  className="px-md py-sm hover:bg-surface-container-low text-left text-body-md text-[14px] flex items-center gap-sm cursor-pointer border-none bg-transparent w-full text-on-surface"
                >
                  <span className="material-symbols-outlined text-[18px]">workspace_premium</span>
                  Collectibles
                </button>
                <button
                  onClick={() => {
                    setCategoriesDropdownOpen(false);
                    handleCategoryClick('videogames');
                  }}
                  className="px-md py-sm hover:bg-surface-container-low text-left text-body-md text-[14px] flex items-center gap-sm cursor-pointer border-none bg-transparent w-full text-on-surface"
                >
                  <span className="material-symbols-outlined text-[18px]">sports_esports</span>
                  Video Games
                </button>
              </div>
            )}
          </div>

          {/* Support bot launcher */}
          <button
            onClick={() => navigate('/support')}
            className="text-white/80 hover:bg-white/10 p-xs rounded-full transition-colors cursor-pointer active:scale-95 transition-transform flex items-center justify-center"
            title="Help Support"
          >
            <span className="material-symbols-outlined">help</span>
          </button>

          {/* Cart Icon Button */}
          <button
            onClick={() => navigate('/checkout')}
            className="text-white/80 hover:bg-white/10 p-xs rounded-full transition-colors cursor-pointer active:scale-95 transition-transform flex items-center justify-center relative"
            title="Checkout Cart"
          >
            <span className="material-symbols-outlined">shopping_cart</span>
            {cart.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-secondary-fixed text-on-secondary-fixed text-[10px] font-black w-4.5 h-4.5 rounded-full flex items-center justify-center shadow-sm animate-pulse">
                {cart.reduce((sum, item) => sum + item.quantity, 0)}
              </span>
            )}
          </button>

          {/* Profile Dropdown Trigger */}
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-xs text-white/85 hover:text-white transition-all cursor-pointer focus:outline-none"
            >
              <div className="w-8 h-8 rounded-full overflow-hidden bg-surface border border-white/20 hover:border-white transition-colors">
                <img className="w-full h-full object-cover" src={currentUser.avatar} alt="Profile" />
              </div>
              <span className="material-symbols-outlined text-[20px] hidden md:block">arrow_drop_down</span>
            </button>
            
            {dropdownOpen && (
              <div className="absolute right-0 mt-xs bg-surface-container-lowest text-on-background w-48 rounded-xl shadow-level-2 border border-outline-variant/30 py-sm flex flex-col z-50">
                <div className="px-md py-xs border-b border-outline-variant/20 mb-xs font-semibold text-[13px] text-on-surface-variant truncate">
                  Hello, {currentUser.name}
                </div>
                <button
                  onClick={() => {
                    setDropdownOpen(false);
                    navigate('/profile/edit');
                  }}
                  className="px-md py-sm hover:bg-surface-container-low text-left text-body-md text-[14px] flex items-center gap-sm cursor-pointer border-none bg-transparent w-full text-on-surface"
                >
                  <span className="material-symbols-outlined text-[18px]">manage_accounts</span>
                  Edit Profile
                </button>
                <button
                  onClick={() => {
                    setDropdownOpen(false);
                    navigate(`/seller/${currentUser.id}`);
                  }}
                  className="px-md py-sm hover:bg-surface-container-low text-left text-body-md text-[14px] flex items-center gap-sm cursor-pointer border-none bg-transparent w-full text-on-surface"
                >
                  <span className="material-symbols-outlined text-[18px]">account_box</span>
                  My Seller Profile
                </button>
                <button
                  onClick={() => {
                    setDropdownOpen(false);
                    navigate('/chat');
                  }}
                  className="px-md py-sm hover:bg-surface-container-low text-left text-body-md text-[14px] flex items-center gap-sm cursor-pointer border-none bg-transparent w-full text-on-surface"
                >
                  <span className="material-symbols-outlined text-[18px]">chat</span>
                  Messages
                </button>
                <button
                  onClick={() => {
                    setDropdownOpen(false);
                    navigate('/purchases');
                  }}
                  className="px-md py-sm hover:bg-surface-container-low text-left text-body-md text-[14px] flex items-center gap-sm cursor-pointer border-none bg-transparent w-full text-on-surface"
                >
                  <span className="material-symbols-outlined text-[18px]">receipt_long</span>
                  My Purchases
                </button>
                <button
                  onClick={() => {
                    setDropdownOpen(false);
                    navigate('/support');
                  }}
                  className="px-md py-sm hover:bg-surface-container-low text-left text-body-md text-[14px] flex items-center gap-sm cursor-pointer border-none bg-transparent w-full text-on-surface"
                >
                  <span className="material-symbols-outlined text-[18px]">contact_support</span>
                  Help Center
                </button>
              </div>
            )}
          </div>

          <Link
            to="/sell"
            className="bg-secondary-fixed text-on-secondary-fixed px-md py-xs rounded-xl font-bold hover:shadow-level-2 transition-all ml-xs cursor-pointer active:scale-95 transition-transform text-body-md flex items-center justify-center"
          >
            Sell
          </Link>
        </div>
      </div>

      {/* Mobile Search Bar */}
      <form onSubmit={handleSearchSubmit} className="md:hidden w-full mt-sm px-md">
        <div className="w-full relative flex items-center bg-white/10 backdrop-blur-md rounded-[16px] h-[48px] shadow-level-1 overflow-hidden border border-white/20 focus-within:border-white/50 transition-all">
          <button type="submit" className="pl-md pr-xs text-white/80 flex items-center justify-center h-full cursor-pointer">
            <span className="material-symbols-outlined text-[20px]">search</span>
          </button>
          <input
            className="w-full bg-transparent border-none focus:outline-none focus:ring-0 text-body-md text-white h-full placeholder-white/60 outline-none pl-xs pr-md"
            placeholder="Search..."
            type="text"
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
          />
        </div>
      </form>
    </header>
  );
}
