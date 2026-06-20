import React, { useContext, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import ProductCard from '../components/ProductCard';

export default function SellerProfile() {
  const { sellerId } = useParams();
  const { sellers, products, currentUser } = useContext(AppContext);
  const [activeTab, setActiveTab] = useState('listings');

  // Load profile based on sellerId
  let sellerData = null;
  if (sellerId === currentUser.id || sellerId === 'current_user') {
    sellerData = currentUser;
  } else {
    sellerData = sellers.find((s) => s.id === sellerId);
  }

  // Filter listings posted by this seller
  const sellerListings = products.filter(
    (p) => p.seller && (p.seller.id === sellerId || (sellerId === 'current_user' && p.seller.id === currentUser.id))
  );

  if (!sellerData) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center py-[100px] text-center max-w-container-max mx-auto px-md">
        <span className="material-symbols-outlined text-[80px] text-error">person_off</span>
        <h2 className="font-headline-lg font-bold text-on-background mt-md">Profile Not Found</h2>
        <p className="text-body-lg text-on-surface-variant max-w-md mt-xs">
          The seller profile you are trying to view does not exist.
        </p>
        <Link to="/" className="mt-lg bg-primary text-on-primary font-bold px-lg py-sm rounded-xl hover:bg-primary/95 transition-all shadow-md">
          Back to Shop
        </Link>
      </div>
    );
  }

  const reviews = sellerData.reviews || [];

  return (
    <div className="flex-1 w-full max-w-container-max mx-auto px-md md:px-lg py-lg flex flex-col gap-lg items-stretch">
      {/* Top Banner Seller Header */}
      <section className="bg-surface-container-lowest border border-outline-variant/30 rounded-xl p-lg md:p-xl shadow-sm flex flex-col md:flex-row gap-lg items-start md:items-center">
        {/* Avatar */}
        <div className="w-24 h-24 rounded-full overflow-hidden bg-surface-container border-2 border-primary/20 shrink-0 self-center md:self-auto">
          <img className="w-full h-full object-cover" src={sellerData.avatar} alt={sellerData.name} />
        </div>

        {/* Info detail */}
        <div className="flex-grow flex flex-col gap-xs text-center md:text-left">
          <div className="flex flex-col md:flex-row md:items-center gap-sm justify-center md:justify-start">
            <h1 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-background font-bold">
              {sellerData.name}
            </h1>
            {sellerData.isVerified && (
              <span className="bg-primary text-on-primary text-[12px] font-semibold px-3 py-1 rounded-full flex items-center gap-1 self-center md:self-auto shadow-sm">
                <span className="material-symbols-outlined text-[14px]" data-weight="fill">verified</span>
                Verified Seller
              </span>
            )}
          </div>

          {/* Rating stars display */}
          <div className="flex items-center justify-center md:justify-start gap-xs text-body-md text-on-surface-variant mt-1">
            {reviews.length > 0 ? (
              <>
                <span className="material-symbols-outlined text-[20px] text-secondary-fixed-dim" data-weight="fill">star</span>
                <span className="font-bold text-on-background text-[16px]">{sellerData.rating}</span>
                <span>•</span>
                <span className="font-semibold text-primary">{reviews.length} Customer reviews</span>
              </>
            ) : (
              <span className="text-[13px] text-on-surface-variant/80">No reviews yet</span>
            )}
          </div>

          {sellerData.location && (
            <div className="text-body-md text-on-surface-variant mt-1 flex items-center justify-center md:justify-start gap-xs text-[14px]">
              <span className="material-symbols-outlined text-[16px]">location_on</span>
              <span>Based in: <span className="font-semibold text-on-surface">{sellerData.location}</span></span>
            </div>
          )}

          {sellerData.bio && (
            <p className="text-body-md text-on-surface-variant mt-sm max-w-2xl text-[14px] leading-relaxed">
              {sellerData.bio}
            </p>
          )}
        </div>

        {/* Action / Responsive time stats */}
        {sellerData.id !== currentUser.id && (
          <div className="flex flex-col gap-sm justify-center items-center w-full md:w-auto shrink-0 bg-surface-container-low p-md rounded-xl border border-outline-variant/20">
            <span className="text-[12px] font-semibold text-on-surface-variant uppercase tracking-wider">Communication</span>
            <div className="flex items-center gap-xs text-primary font-bold">
              <span className="material-symbols-outlined text-[20px]">bolt</span>
              <span>{sellerData.responseTime || "Typically responds in 1 hr"}</span>
            </div>
          </div>
        )}
      </section>

      {/* Tabs list */}
      <div className="flex border-b border-outline-variant/30 gap-sm shrink-0">
        <button
          onClick={() => setActiveTab('listings')}
          className={`py-sm px-md font-bold text-body-lg cursor-pointer transition-all border-b-2 ${
            activeTab === 'listings'
              ? 'border-primary text-primary'
              : 'border-transparent text-on-surface-variant hover:text-on-background'
          }`}
        >
          Active Listings ({sellerListings.length})
        </button>
        <button
          onClick={() => setActiveTab('reviews')}
          className={`py-sm px-md font-bold text-body-lg cursor-pointer transition-all border-b-2 ${
            activeTab === 'reviews'
              ? 'border-primary text-primary'
              : 'border-transparent text-on-surface-variant hover:text-on-background'
          }`}
        >
          Customer Reviews ({reviews.length})
        </button>
      </div>

      {/* Tab Panels */}
      <div className="flex-1 w-full">
        {activeTab === 'listings' ? (
          sellerListings.length === 0 ? (
            <div className="text-center py-[80px] bg-surface-container-lowest rounded-xl border border-outline-variant/30 shadow-sm flex flex-col items-center">
              <span className="material-symbols-outlined text-[64px] text-on-surface-variant/40">inventory_2</span>
              <h3 className="font-bold text-headline-md mt-md text-on-background">No active listings</h3>
              <p className="text-body-md text-on-surface-variant max-w-sm mt-xs">
                This seller has no items listed for sale at the moment.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-lg">
              {sellerListings.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )
        ) : (
          reviews.length === 0 ? (
            <div className="text-center py-[80px] bg-surface-container-lowest rounded-xl border border-outline-variant/30 shadow-sm flex flex-col items-center">
              <span className="material-symbols-outlined text-[64px] text-on-surface-variant/40">rate_review</span>
              <h3 className="font-bold text-headline-md mt-md text-on-background">No reviews yet</h3>
              <p className="text-body-md text-on-surface-variant max-w-sm mt-xs">
                This seller has not received any transaction feedback reviews yet.
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-md max-w-3xl">
              {reviews.map((rev) => (
                <div
                  key={rev.id}
                  className="bg-surface-container-lowest border border-outline-variant/20 rounded-xl p-md shadow-sm hover:shadow-md transition-shadow flex flex-col gap-xs"
                >
                  <div className="flex justify-between items-center text-[13px] text-on-surface-variant">
                    <span className="font-bold text-on-background">{rev.reviewer}</span>
                    <span>{rev.date}</span>
                  </div>
                  
                  {/* Review Stars */}
                  <div className="flex gap-base">
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        className={`material-symbols-outlined text-[16px] ${
                          i < rev.rating ? 'text-secondary-fixed-dim' : 'text-surface-container-high'
                        }`}
                        data-weight="fill"
                      >
                        star
                      </span>
                    ))}
                  </div>

                  <p className="text-body-md text-on-surface mt-sm italic">
                    "{rev.comment}"
                  </p>
                </div>
              ))}
            </div>
          )
        )}
      </div>

    </div>
  );
}
