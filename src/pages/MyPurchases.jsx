import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

export default function MyPurchases() {
  const { purchases, releaseEscrow, rateSeller } = useContext(AppContext);

  // Rating Modal states
  const [ratingModalOpen, setRatingModalOpen] = useState(false);
  const [ratingSellerId, setRatingSellerId] = useState('');
  const [ratingSellerName, setRatingSellerName] = useState('');
  const [stars, setStars] = useState(5);
  const [reviewComment, setReviewComment] = useState('');

  const handleConfirmReceipt = (order) => {
    const isSure = window.confirm(
      "Are you sure you have the item in your possession? After receiving the purchase, the money will be released."
    );
    if (isSure) {
      releaseEscrow(order.id);
      // Automatically prompt rating modal
      handleOpenRating(order);
    }
  };

  const handleOpenRating = (order) => {
    setRatingSellerId(order.sellerId);
    setRatingSellerName(order.sellerName);
    setStars(5);
    setReviewComment('');
    setRatingModalOpen(true);
  };

  const handleSubmitRating = (e) => {
    e.preventDefault();
    if (!ratingSellerId) return;
    rateSeller(ratingSellerId, stars, reviewComment.trim());
    setRatingModalOpen(false);
    alert(`Thank you! Your ${stars}-star rating for ${ratingSellerName} has been submitted.`);
  };

  return (
    <div className="flex-1 w-full max-w-container-max mx-auto px-md md:px-lg py-xl">
      <div className="bg-surface-container-lowest rounded-xl shadow-[0_10px_20px_-5px_rgba(28,30,33,0.12)] border border-outline-variant/30 overflow-hidden">
        
        {/* Header */}
        <div className="p-lg md:p-xl border-b border-surface-container-high bg-surface-bright/50">
          <h1 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-background">
            My Purchases
          </h1>
          <p className="font-body-md text-body-md text-on-surface-variant mt-xs">
            Review your order history and check the status of your purchases.
          </p>
        </div>

        {/* Content */}
        <div className="p-lg md:p-xl">
          {purchases.length === 0 ? (
            <div className="text-center py-[60px] flex flex-col items-center">
              <span className="material-symbols-outlined text-[64px] text-on-surface-variant/40">receipt_long</span>
              <p className="font-semibold text-body-lg text-on-background mt-md">No purchases yet.</p>
              <p className="text-body-md text-on-surface-variant max-w-xs mt-xs">
                Once you purchase items using OmniMarket protection, they will show up here.
              </p>
              <Link
                to="/"
                className="mt-md bg-primary text-on-primary font-bold px-lg py-sm rounded-xl hover:bg-primary/95 active:scale-95 transition-all text-body-md inline-block shadow-sm"
              >
                Start Shopping
              </Link>
            </div>
          ) : (
            <div className="flex flex-col gap-lg">
              {purchases.map((order) => {
                const isProcessing = order.status === 'Processing';
                const isCompleted = order.status === 'Completed' || order.status === 'Delivered';

                return (
                  <div
                    key={order.id}
                    className="border border-outline-variant/30 rounded-xl overflow-hidden shadow-sm bg-surface-bright hover:shadow-md transition-shadow"
                  >
                    {/* Order Top Bar */}
                    <div className="bg-surface-container-low px-md py-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-xs border-b border-outline-variant/20 text-[13px] text-on-surface-variant">
                      <div className="flex flex-wrap gap-md">
                        <span>Order ID: <span className="font-bold text-on-background">{order.id}</span></span>
                        <span className="hidden sm:inline">•</span>
                        <span>Placed on: <span className="font-bold text-on-background">{order.purchaseDate}</span></span>
                        <span className="hidden sm:inline">•</span>
                        <span>Qty: <span className="font-bold text-on-background">{order.quantityPurchased || 1}</span></span>
                      </div>
                      <div className="flex items-center gap-base">
                        <span className={`w-2.5 h-2.5 rounded-full ${isProcessing ? 'bg-[#ff9800]' : 'bg-tertiary'}`}></span>
                        <span className={`font-semibold uppercase text-[11px] tracking-wider ${isProcessing ? 'text-[#e65100]' : 'text-tertiary'}`}>
                          {order.status}
                        </span>
                      </div>
                    </div>

                    {/* Order Details Body */}
                    <div className="p-md md:p-lg flex flex-col sm:flex-row justify-between items-start sm:items-center gap-md">
                      <div className="flex items-center gap-md">
                        {/* Product Thumbnail */}
                        <div className="w-20 h-20 bg-surface-container rounded-lg overflow-hidden border border-outline-variant/30 shrink-0">
                          <img className="w-full h-full object-cover" src={order.productImage} alt={order.productTitle} />
                        </div>
                        
                        {/* Product Title / Seller */}
                        <div className="flex flex-col gap-base">
                          <h3 className="font-semibold text-body-lg text-on-background line-clamp-1">
                            {order.productTitle}
                          </h3>
                          <span className="text-[13px] text-on-surface-variant flex items-center gap-xs">
                            <span className="material-symbols-outlined text-[16px]">store</span>
                            Seller: <Link to={`/seller/${order.sellerId}`} className="font-semibold text-primary hover:underline">{order.sellerName}</Link>
                          </span>
                        </div>
                      </div>

                      {/* Order Price & Actions */}
                      <div className="w-full sm:w-auto flex flex-row sm:flex-col justify-between sm:items-end gap-sm border-t sm:border-t-0 border-outline-variant/20 pt-sm sm:pt-0">
                        <div className="flex flex-col items-start sm:items-end">
                          <span className="text-[11px] text-on-surface-variant">Amount Paid</span>
                          <span className="font-price-display text-price-display text-primary font-bold">
                            ${(order.price * (order.quantityPurchased || 1)).toFixed(2)}
                          </span>
                        </div>

                        <div className="flex gap-sm">
                          <Link
                            to={`/product/${order.productId}`}
                            className="bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 px-md py-xs rounded-lg font-bold text-[13px] transition-colors flex items-center justify-center"
                          >
                            View Item
                          </Link>

                          {isProcessing && (
                            <button
                              onClick={() => handleConfirmReceipt(order)}
                              className="bg-secondary-fixed text-on-secondary-fixed hover:bg-secondary-container px-md py-xs rounded-lg font-bold text-[13px] transition-colors flex items-center justify-center active:scale-95 cursor-pointer shadow-sm"
                            >
                              Confirm Receipt
                            </button>
                          )}

                          {isCompleted && !order.rated && (
                            <button
                              onClick={() => handleOpenRating(order)}
                              className="bg-tertiary-container text-on-tertiary hover:bg-tertiary px-md py-xs rounded-lg font-bold text-[13px] transition-colors flex items-center justify-center active:scale-95 cursor-pointer"
                            >
                              Rate Seller
                            </button>
                          )}

                          {isCompleted && order.rated && (
                            <span className="text-tertiary font-bold text-[13px] flex items-center gap-xs px-sm py-xs">
                              <span className="material-symbols-outlined text-[16px]" data-weight="fill">check_circle</span>
                              Rated
                            </span>
                          )}

                          <button
                            onClick={() => alert(`Contacting support regarding order ${order.id}...`)}
                            className="bg-surface-container-highest text-on-surface border border-outline hover:bg-surface-container-high px-md py-xs rounded-lg font-bold text-[13px] transition-colors flex items-center justify-center cursor-pointer"
                          >
                            Support
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

      </div>

      {/* 4. Rating Modal Popup */}
      {ratingModalOpen && (
        <div className="fixed inset-0 bg-on-background/60 z-50 flex items-center justify-center p-md backdrop-blur-sm">
          <div className="bg-surface-container-lowest max-w-2xl w-full rounded-xl border border-outline-variant/30 shadow-level-2 overflow-hidden flex flex-col">
            <div className="p-lg border-b border-surface-container-high bg-surface-bright flex justify-between items-center">
              <h3 className="font-headline-md text-[18px] font-bold text-on-background">
                Rate your Transaction
              </h3>
              <button
                onClick={() => setRatingModalOpen(false)}
                className="text-on-surface-variant hover:text-on-background flex items-center justify-center cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>
            
            <form onSubmit={handleSubmitRating} className="p-lg flex flex-col gap-md">
              <p className="text-body-md text-on-surface-variant text-[14px]">
                Please rate your purchase experience with <span className="font-bold text-on-background">{ratingSellerName}</span>:
              </p>

              {/* Stars Clicker */}
              <div className="flex gap-sm justify-center py-sm">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setStars(star)}
                    className="text-on-surface hover:scale-110 active:scale-95 transition-transform flex items-center justify-center cursor-pointer"
                  >
                    <span
                      className={`material-symbols-outlined text-[36px] ${
                        star <= stars ? 'text-secondary-fixed-dim' : 'text-surface-container-high'
                      }`}
                      data-weight={star <= stars ? "fill" : "line"}
                    >
                      star
                    </span>
                  </button>
                ))}
              </div>

              {/* Review Comment */}
              <div>
                <label className="font-label-sm text-[12px] text-on-background block mb-xs font-semibold">Write a Review (Optional)</label>
                <textarea
                  className="w-full bg-surface text-on-surface border border-outline-variant rounded-xl px-md py-[10px] text-body-md focus:border-primary focus:ring-1 focus:ring-primary outline-none custom-scrollbar"
                  placeholder="e.g. Great communication, item in perfect condition. Thanks!"
                  rows="3"
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                />
              </div>

              <div className="flex justify-end gap-sm pt-sm border-t border-surface-container-high">
                <button
                  type="button"
                  onClick={() => setRatingModalOpen(false)}
                  className="px-md py-xs rounded-xl font-semibold hover:bg-surface-container-low transition-all text-body-md text-[14px]"
                >
                  Skip
                </button>
                <button
                  type="submit"
                  className="bg-primary text-on-primary font-bold px-lg py-xs rounded-xl hover:bg-primary/95 transition-all text-body-md text-[14px] shadow-sm cursor-pointer"
                >
                  Submit Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
