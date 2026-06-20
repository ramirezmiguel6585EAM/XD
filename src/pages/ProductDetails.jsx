import React, { useContext, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, getOrCreateChat, addToCart, currentUser } = useContext(AppContext);

  const product = products.find((p) => p.id === id);

  // Toast notifications state
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [purchaseQty, setPurchaseQty] = useState(1);

  // If product is not found
  if (!product) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center py-[100px] text-center max-w-container-max mx-auto px-md">
        <span className="material-symbols-outlined text-[80px] text-error">error</span>
        <h2 className="font-headline-lg font-bold text-on-background mt-md">Item Not Found</h2>
        <p className="text-body-lg text-on-surface-variant max-w-md mt-xs">
          The listing you are trying to view does not exist or has been removed by the owner.
        </p>
        <Link
          to="/"
          className="mt-lg bg-primary text-on-primary font-bold px-lg py-sm rounded-xl hover:bg-primary/95 transition-all shadow-md active:scale-95"
        >
          Return to Shop
        </Link>
      </div>
    );
  }

  const {
    title,
    price,
    originalPrice,
    discount,
    condition,
    categoryLabel,
    quantity,
    description,
    details,
    meetupInfo,
    location,
    timeListed,
    views,
    images,
    mapUrl,
    seller,
    sold
  } = product;

  // Active Image State
  const mainImage = images && images[activeImageIndex] ? images[activeImageIndex] : "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=600&auto=format&fit=crop&q=60";

  // Handlers
  const handleMessageSeller = () => {
    getOrCreateChat(seller.id, seller.name, seller.avatar, title, id);
    navigate(`/chat?seller=${seller.id}&product=${id}`);
  };

  const handleBuyNow = () => {
    if (sold) return;
    addToCart(id, purchaseQty);
    navigate('/checkout');
  };

  const handleAddToCart = () => {
    if (sold) return;
    addToCart(id, purchaseQty);
    setToastMessage(`Added ${purchaseQty} unit(s) of "${title}" to your cart.`);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <div className="flex-1 w-full flex flex-col items-center">
      {/* Main Content Grid */}
      <main className="flex-1 w-full max-w-container-max mx-auto px-md md:px-lg py-lg grid grid-cols-1 lg:grid-cols-12 gap-lg items-start">
        
        {/* Left Column: Gallery & Details */}
        <div className="lg:col-span-8 flex flex-col gap-lg w-full">
          {/* Breadcrumbs */}
          <nav className="flex text-body-md text-on-surface-variant gap-xs items-center text-[14px]">
            <Link className="hover:text-primary transition-colors" to="/">Home</Link>
            <span className="material-symbols-outlined text-[16px]">chevron_right</span>
            <span className="hover:text-primary transition-colors cursor-pointer">{categoryLabel}</span>
            <span className="material-symbols-outlined text-[16px]">chevron_right</span>
            <span className="text-on-surface font-semibold truncate max-w-xs">{title}</span>
          </nav>

          {/* Image Gallery */}
          <div className="flex flex-col gap-sm">
            <div className="w-full aspect-[4/3] md:aspect-[16/9] bg-surface-container rounded-[12px] overflow-hidden relative shadow-level-1 border border-outline-variant/20">
              <img
                className="w-full h-full object-cover"
                src={mainImage}
                alt={title}
              />
              
              {/* Sold tag overlay */}
              {sold && (
                <div className="absolute inset-0 bg-on-background/50 flex items-center justify-center">
                  <span className="bg-error text-white font-bold text-headline-xl px-lg py-sm rounded-xl uppercase tracking-widest">
                    Sold
                  </span>
                </div>
              )}

              {/* Badges */}
              <div className="absolute top-sm left-sm flex gap-xs">
                <span className="bg-surface-container-lowest border border-outline-variant text-on-surface px-sm py-base rounded-full font-label-sm text-label-sm shadow-sm">
                  {condition}
                </span>
              </div>

              {/* Navigation Arrows for Gallery */}
              {images && images.length > 1 && (
                <>
                  <button
                    onClick={() => setActiveImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))}
                    className="absolute left-sm top-1/2 -translate-y-1/2 bg-surface-container-lowest/80 backdrop-blur-sm p-xs rounded-full shadow-sm hover:bg-surface-container-lowest transition-colors text-on-surface flex items-center justify-center cursor-pointer active:scale-90"
                  >
                    <span className="material-symbols-outlined">chevron_left</span>
                  </button>
                  <button
                    onClick={() => setActiveImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))}
                    className="absolute right-sm top-1/2 -translate-y-1/2 bg-surface-container-lowest/80 backdrop-blur-sm p-xs rounded-full shadow-sm hover:bg-surface-container-lowest transition-colors text-on-surface flex items-center justify-center cursor-pointer active:scale-90"
                  >
                    <span className="material-symbols-outlined">chevron_right</span>
                  </button>
                </>
              )}
            </div>

            {/* Thumbnails */}
            {images && images.length > 1 && (
              <div className="flex gap-sm overflow-x-auto pb-xs snap-x scrollbar-thin">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`w-20 h-20 shrink-0 bg-surface-container rounded-lg overflow-hidden border-2 snap-start cursor-pointer transition-all ${
                      activeImageIndex === idx ? 'border-primary opacity-100 scale-95 shadow-md' : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img className="w-full h-full object-cover" src={img} alt={`thumbnail-${idx}`} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Title & Basic Info */}
          <div className="flex flex-col gap-xs">
            <h1 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-background">
              {title}
            </h1>
            <div className="flex items-center gap-sm text-body-md text-on-surface-variant text-[14px]">
              <span className="flex items-center gap-base">
                <span className="material-symbols-outlined text-[16px]">schedule</span>
                {timeListed}
              </span>
              <span>•</span>
              <span className="flex items-center gap-base">
                <span className="material-symbols-outlined text-[16px]">visibility</span>
                {views} views
              </span>
              {seller.id === currentUser.id && (
                <>
                  <span>•</span>
                  <Link to={`/edit/${id}`} className="text-primary font-semibold hover:underline flex items-center gap-base">
                    <span className="material-symbols-outlined text-[16px]">edit</span>
                    Edit Listing
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Detailed Description */}
          <div className="bg-surface-container-lowest rounded-[12px] p-lg shadow-level-2 flex flex-col gap-md border border-primary/10">
            <h2 className="font-headline-md text-headline-md text-on-background border-b border-outline-variant/20 pb-sm">
              Description
            </h2>
            <div className="text-body-lg text-on-surface-variant flex flex-col gap-sm leading-relaxed text-[16px]">
              <p className="whitespace-pre-line">{description}</p>
              {details && details.length > 0 && (
                <ul className="list-disc pl-lg flex flex-col gap-xs mt-xs">
                  {details.map((detail, index) => (
                    <li key={index}>{detail}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* Location / Map */}
          <div className="bg-surface-container-lowest rounded-[12px] p-lg shadow-level-1 flex flex-col gap-md border border-surface-variant">
            <div className="flex justify-between items-center border-b border-outline-variant/20 pb-sm">
              <h2 className="font-headline-md text-headline-md text-on-background">Location &amp; Pickup</h2>
              <span className="text-body-md text-on-surface-variant bg-surface-container px-sm py-xs rounded-full font-semibold">
                {location}
              </span>
            </div>
            {mapUrl ? (
              <div className="w-full h-48 bg-surface-container rounded-lg overflow-hidden relative border border-outline-variant/30">
                <img className="w-full h-full object-cover" src={mapUrl} alt="Location Map" />
              </div>
            ) : (
              <div className="w-full h-48 bg-surface-container-low rounded-lg flex flex-col items-center justify-center border border-dashed border-outline-variant/50 text-on-surface-variant">
                <span className="material-symbols-outlined text-[48px]">map</span>
                <span className="mt-sm font-semibold">Location Map Available on Pickup arrangement</span>
              </div>
            )}
            <p className="text-body-md text-on-surface-variant mt-sm">{meetupInfo}</p>
          </div>
        </div>

        {/* Right Column: Sticky Action Panel & Seller Info */}
        <div className="lg:col-span-4 flex flex-col gap-lg sticky top-[100px] w-full">
          
          {/* Buy Panel Card */}
          <div className="bg-surface-container-lowest rounded-[12px] p-lg shadow-level-2 border border-surface-variant flex flex-col gap-md">
            <div className="flex justify-between items-end">
              <div className="bg-primary rounded-xl p-md flex flex-col gap-xs w-full">
                <div className="flex items-center gap-sm justify-between">
                  <span className="font-price-display text-[28px] font-black text-secondary-fixed">
                    ${price}
                  </span>
                  {discount && !sold && (
                    <span className="bg-secondary-fixed text-on-secondary-fixed text-label-sm font-bold px-2 py-0.5 rounded-full text-[12px]">
                      {discount}
                    </span>
                  )}
                </div>
                <div className="flex justify-between items-center mt-1 text-[13px] text-primary-fixed">
                  {originalPrice && (
                    <span className="line-through">
                      ${originalPrice} Retail value
                    </span>
                  )}
                  <span className="bg-white/10 px-sm py-0.5 rounded-lg">
                    {sold ? 'Sold Out' : `${quantity || 1} available`}
                  </span>
                </div>
              </div>
            </div>

            <div className="w-full h-[1px] bg-outline-variant my-xs"></div>

            <div className="flex flex-col gap-sm">
              {/* Quantity Selector dropdown for checkout */}
              {!sold && quantity > 1 && (
                <div className="flex items-center justify-between bg-surface-container-low p-sm rounded-xl border border-outline-variant/20 mb-xs">
                  <span className="text-body-md font-semibold text-on-surface text-[14px]">Quantity to Buy:</span>
                  <select
                    className="bg-surface-container-lowest border border-outline-variant rounded-lg px-md py-[6px] text-body-md focus:border-primary outline-none cursor-pointer font-semibold text-primary"
                    value={purchaseQty}
                    onChange={(e) => setPurchaseQty(parseInt(e.target.value))}
                  >
                    {[...Array(quantity)].map((_, i) => (
                      <option key={i + 1} value={i + 1}>{i + 1}</option>
                    ))}
                  </select>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-sm">
                <button
                  type="button"
                  disabled={sold}
                  onClick={handleAddToCart}
                  className={`flex-1 py-sm rounded-[12px] font-bold transition-all cursor-pointer text-body-lg flex justify-center items-center gap-xs text-[15px] border border-outline-variant/40 hover:bg-surface-container-low active:scale-95 ${
                    sold ? 'opacity-50 cursor-not-allowed text-on-surface-variant' : 'bg-surface text-on-surface hover:border-outline'
                  }`}
                >
                  <span className="material-symbols-outlined text-[20px]">add_shopping_cart</span>
                  Add to Cart
                </button>
                
                <button
                  type="button"
                  disabled={sold}
                  onClick={handleBuyNow}
                  className={`flex-1 py-sm rounded-[12px] font-bold transition-all cursor-pointer text-body-lg flex justify-center items-center gap-xs text-[15px] ${
                    sold
                      ? 'bg-outline-variant text-on-surface-variant cursor-not-allowed opacity-50'
                      : 'bg-secondary-fixed text-on-secondary-fixed hover:bg-secondary-container hover:shadow-level-2 active:scale-95'
                  }`}
                >
                  <span className="material-symbols-outlined text-[20px]">shopping_cart</span>
                  {sold ? 'Sold Out' : 'Buy Now'}
                </button>
              </div>

              {seller.id !== currentUser.id && (
                <button
                  onClick={handleMessageSeller}
                  className="w-full bg-gradient-to-r from-primary-fixed to-primary-container text-on-primary border-none py-sm rounded-[12px] font-bold hover:shadow-md transition-all cursor-pointer active:scale-95 text-body-lg flex justify-center items-center gap-xs text-[16px]"
                >
                  <span className="material-symbols-outlined text-[20px]">chat</span>
                  Message Seller
                </button>
              )}

              <button
                onClick={() => setIsFavorite(!isFavorite)}
                className="w-full text-on-surface-variant py-xs hover:text-primary transition-colors text-body-md flex justify-center items-center gap-xs mt-xs text-[14px]"
              >
                <span className={`material-symbols-outlined text-[18px] transition-transform duration-300 ${isFavorite ? 'text-error scale-110' : ''}`} data-weight={isFavorite ? "fill" : "line"}>
                  favorite
                </span>
                {isFavorite ? 'Saved' : 'Save for later'}
              </button>
            </div>
          </div>

          {/* Seller Card */}
          <div className="bg-surface-container-lowest rounded-[12px] p-lg shadow-level-1 border border-surface-variant flex flex-col gap-md">
            <h3 className="font-headline-md text-headline-md text-on-background border-b border-outline-variant/20 pb-sm">
              About the Seller
            </h3>
            <Link to={`/seller/${seller.id}`} className="flex items-center gap-md hover:bg-surface-container-low/30 p-xs rounded-xl transition-colors">
              <div className="w-16 h-16 rounded-full overflow-hidden bg-surface-container shrink-0 border border-outline-variant/30">
                <img className="w-full h-full object-cover" src={seller.avatar} alt={seller.name} />
              </div>
              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-xs flex-wrap">
                  <span className="font-bold text-body-lg text-on-background truncate">{seller.name}</span>
                  {seller.isVerified && (
                    <span className="bg-primary text-on-primary font-label-sm text-[11px] px-2 py-0.5 rounded-full flex items-center gap-1 shrink-0">
                      <span className="material-symbols-outlined text-[12px]" data-weight="fill">verified</span>
                      Verified
                    </span>
                  )}
                </div>
                {seller.reviewsCount > 0 ? (
                  <div className="flex items-center gap-xs text-body-md text-on-surface-variant mt-1 text-[13px]">
                    <span className="material-symbols-outlined text-[16px] text-secondary-fixed-dim" data-weight="fill">star</span>
                    <span className="font-semibold text-on-surface">{seller.rating}</span>
                    <span>({seller.reviewsCount} reviews)</span>
                  </div>
                ) : (
                  <div className="text-[12px] text-on-surface-variant mt-1">New Seller</div>
                )}
              </div>
            </Link>
            
            {seller.responseTime && (
              <div className="bg-secondary-fixed/10 border border-secondary-fixed/30 rounded-lg p-sm flex items-start gap-sm mt-xs">
                <span className="material-symbols-outlined text-secondary-fixed-dim text-[20px] shrink-0 mt-0.5">bolt</span>
                <div className="flex flex-col">
                  <span className="font-semibold text-body-md text-on-surface text-[14px]">Response Rate</span>
                  <span className="text-body-md text-on-surface-variant text-[13px]">{seller.responseTime}</span>
                </div>
              </div>
            )}

            <Link to={`/seller/${seller.id}`} className="text-primary text-body-md font-semibold text-center hover:underline mt-sm block text-[14px]">
              View Seller Profile &amp; Reviews
            </Link>
          </div>


          {/* Trust / Buyer Protection */}
          <div className="flex items-start gap-sm p-sm rounded-lg border border-outline-variant/50 bg-surface-container-lowest shadow-sm">
            <span className="material-symbols-outlined text-tertiary-container shrink-0" data-weight="fill">shield</span>
            <div className="flex flex-col text-body-md">
              <span className="font-semibold text-on-surface text-[14px]">OmniMarket Protection</span>
              <span className="text-on-surface-variant text-[12px]">Your payment is held securely until you confirm receipt of the item.</span>
            </div>
          </div>

        </div>
      </main>

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-lg right-lg bg-surface-container-lowest text-on-background border border-outline-variant/60 p-md rounded-xl shadow-level-2 z-50 flex items-center gap-sm animate-bounce">
          <span className="material-symbols-outlined text-tertiary-container" data-weight="fill">check_circle</span>
          <span className="font-bold text-body-md text-[14px] text-tertiary">{toastMessage}</span>
        </div>
      )}

    </div>
  );
}
