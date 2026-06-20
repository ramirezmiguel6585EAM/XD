import React from 'react';
import { Link } from 'react-router-dom';

export default function ProductCard({ product }) {
  const { id, title, price, originalPrice, discount, condition, location, timeListed, images, sold } = product;
  const mainImage = images && images[0] ? images[0] : "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=300&auto=format&fit=crop&q=60";

  return (
    <Link
      to={`/product/${id}`}
      className="bg-surface-container-lowest rounded-[12px] overflow-hidden shadow-level-1 hover:shadow-level-2 hover:-translate-y-1 transition-all duration-300 flex flex-col border border-outline-variant/30 group relative"
    >
      {/* Sold Overlay */}
      {sold && (
        <div className="absolute inset-0 bg-on-background/60 z-10 flex items-center justify-center">
          <span className="bg-error text-white font-bold text-headline-md px-lg py-sm rounded-xl transform -rotate-12 uppercase tracking-wider">
            Sold
          </span>
        </div>
      )}

      {/* Image Area */}
      <div className="aspect-[4/3] bg-surface-container relative overflow-hidden">
        <img
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          src={mainImage}
          alt={title}
        />
        {/* Condition Tag */}
        <div className="absolute top-xs left-xs flex gap-xs z-10">
          <span className="bg-surface-container-lowest/90 backdrop-blur-sm border border-outline-variant/50 text-on-surface px-sm py-base rounded-full font-label-sm text-[11px] font-semibold shadow-sm">
            {condition}
          </span>
        </div>
        
        {/* Discount tag if any */}
        {discount && !sold && (
          <div className="absolute top-xs right-xs z-10">
            <span className="bg-secondary-fixed text-on-secondary-fixed font-bold text-[11px] px-sm py-base rounded-full shadow-sm">
              {discount}
            </span>
          </div>
        )}
      </div>

      {/* Details Area */}
      <div className="p-md flex flex-col flex-1 gap-xs justify-between">
        <div className="flex flex-col gap-xs">
          {/* Title */}
          <h3 className="font-semibold text-body-lg text-on-background line-clamp-2 leading-snug group-hover:text-primary transition-colors">
            {title}
          </h3>
          
          {/* Pricing */}
          <div className="flex items-center gap-xs mt-xs">
            <span className="font-price-display text-price-display text-primary font-bold">
              ${price}
            </span>
            {originalPrice && (
              <span className="text-body-md text-on-surface-variant/70 line-through text-[13px]">
                ${originalPrice}
              </span>
            )}
          </div>
        </div>

        {/* Location & Time */}
        <div className="border-t border-outline-variant/20 pt-sm mt-sm flex items-center justify-between text-[12px] text-on-surface-variant/80">
          <span className="flex items-center gap-base">
            <span className="material-symbols-outlined text-[14px]">location_on</span>
            {location}
          </span>
          <span className="flex items-center gap-base">
            <span className="material-symbols-outlined text-[14px]">schedule</span>
            {timeListed}
          </span>
        </div>
      </div>
    </Link>
  );
}
