import React, { useState, useContext, useEffect, useRef } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

export default function Chat() {
  const { chats, sendChatMessage, getOrCreateChat, purchases, releaseEscrow, rateSeller } = useContext(AppContext);
  const [searchParams, setSearchParams] = useSearchParams();

  // Search parameters to optionally open a specific chat
  const sellerParam = searchParams.get('seller');
  const productParam = searchParams.get('product');

  const [activeChat, setActiveChat] = useState(null);
  const [messageText, setMessageText] = useState('');
  const messagesEndRef = useRef(null);

  // Escrow & Rating Modal states
  const [ratingModalOpen, setRatingModalOpen] = useState(false);
  const [ratingSellerId, setRatingSellerId] = useState('');
  const [ratingSellerName, setRatingSellerName] = useState('');
  const [stars, setStars] = useState(5);
  const [reviewComment, setReviewComment] = useState('');

  // Find processing purchase for current active chat's product
  const activePurchase = activeChat
    ? purchases.find((p) => p.productId === activeChat.productId && p.status === 'Processing')
    : null;

  const handleConfirmReceipt = (order) => {
    const isSure = window.confirm(
      "Are you sure you have the item in your possession? After confirmation, the money will be released."
    );
    if (isSure) {
      releaseEscrow(order.id);
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

  // Initialize active chat based on query params or first chat in list
  useEffect(() => {
    if (sellerParam && productParam) {
      const targetChat = getOrCreateChat(sellerParam, '', '', '', productParam);
      if (targetChat) {
        setActiveChat(targetChat);
      }
    } else if (chats.length > 0 && !activeChat) {
      setActiveChat(chats[0]);
    }
  }, [sellerParam, productParam, chats]);

  // Keep activeChat in sync with changes to chats list (such as replies or new messages)
  useEffect(() => {
    if (activeChat) {
      const refreshed = chats.find(
        (c) => c.sellerId === activeChat.sellerId && c.productId === activeChat.productId
      );
      if (refreshed) {
        setActiveChat(refreshed);
      }
    }
  }, [chats]);

  // Scroll to bottom when messages load or change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeChat?.messages]);

  const handleSelectChat = (chat) => {
    setActiveChat(chat);
    setSearchParams({ seller: chat.sellerId, product: chat.productId });
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!messageText.trim() || !activeChat) return;

    sendChatMessage(activeChat.sellerId, activeChat.productId, messageText.trim());
    setMessageText('');
  };

  return (
    <div className="flex-1 w-full max-w-container-max mx-auto px-md md:px-lg py-lg flex flex-col md:flex-row gap-lg items-stretch h-[calc(100vh-140px)] min-h-[500px]">
      
      {/* Chats List Sidebar */}
      <aside className="w-full md:w-[320px] shrink-0 bg-surface-container-lowest border border-outline-variant/30 rounded-xl p-md flex flex-col gap-md shadow-sm h-full overflow-hidden">
        <h2 className="font-headline-md text-[18px] font-bold text-on-background border-b border-outline-variant/20 pb-sm">
          Conversations
        </h2>
        
        {chats.length === 0 ? (
          <div className="text-center py-lg text-[13px] text-on-surface-variant flex flex-col items-center">
            <span className="material-symbols-outlined text-[32px] text-on-surface-variant/40 mb-xs">chat_bubble_outline</span>
            No conversations started.
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto flex flex-col gap-xs custom-scrollbar pr-xs">
            {chats.map((chat, index) => {
              const isActive = activeChat && activeChat.sellerId === chat.sellerId && activeChat.productId === chat.productId;
              const lastMsg = chat.messages[chat.messages.length - 1];

              return (
                <button
                  key={`${chat.sellerId}-${chat.productId}`}
                  onClick={() => handleSelectChat(chat)}
                  className={`w-full flex gap-sm p-sm rounded-xl border text-left cursor-pointer transition-all duration-200 ${
                    isActive
                      ? 'bg-primary/10 border-primary/45 shadow-sm'
                      : 'bg-surface-bright border-transparent hover:bg-surface-container-low'
                  }`}
                >
                  {/* Seller Avatar */}
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-surface-container shrink-0 border border-outline-variant/20">
                    <img className="w-full h-full object-cover" src={chat.sellerAvatar} alt={chat.sellerName} />
                  </div>
                  
                  {/* Chat Preview details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-baseline">
                      <span className="font-bold text-body-md text-on-background truncate">
                        {chat.sellerName}
                      </span>
                      {lastMsg && (
                        <span className="text-[10px] text-on-surface-variant/80 shrink-0">
                          {lastMsg.time}
                        </span>
                      )}
                    </div>
                    <div className="text-[12px] font-semibold text-primary truncate">
                      {chat.productTitle}
                    </div>
                    <div className="text-[12px] text-on-surface-variant/90 truncate mt-0.5">
                      {lastMsg ? lastMsg.text : "No messages yet"}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </aside>

      {/* Main Conversation Window */}
      <section className="flex-1 w-full bg-surface-container-lowest border border-outline-variant/30 rounded-xl overflow-hidden shadow-sm flex flex-col h-full">
        {activeChat ? (
          <>
            {/* Header info */}
            <div className="p-md border-b border-surface-container-high bg-surface-bright/50 flex justify-between items-center shrink-0">
              <div className="flex items-center gap-md">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-surface-container border border-outline-variant/20 shrink-0">
                  <img className="w-full h-full object-cover" src={activeChat.sellerAvatar} alt={activeChat.sellerName} />
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-xs">
                    <span className="font-bold text-body-lg text-on-background">{activeChat.sellerName}</span>
                    <span className="bg-primary text-on-primary text-[10px] font-semibold px-2 py-0.5 rounded-full flex items-center gap-0.5">
                      <span className="material-symbols-outlined text-[10px]" data-weight="fill">verified</span>
                      Seller
                    </span>
                  </div>
                  <span className="text-[12px] font-semibold text-on-surface-variant">
                    Regarding: <Link to={`/product/${activeChat.productId}`} className="text-primary hover:underline">{activeChat.productTitle}</Link>
                  </span>
                </div>
              </div>
              <Link
                to={`/product/${activeChat.productId}`}
                className="bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 px-md py-sm rounded-xl font-bold text-[13px] transition-colors"
              >
                View Item
              </Link>
            </div>

            {/* Escrow Banner */}
            {activePurchase && (
              <div className="bg-secondary-fixed/15 border-b border-outline-variant/20 p-md flex flex-col sm:flex-row justify-between items-start sm:items-center gap-sm shrink-0">
                <div className="flex items-start gap-xs">
                  <span className="material-symbols-outlined text-secondary-fixed-dim text-[20px] mt-0.5" data-weight="fill">security</span>
                  <div>
                    <p className="text-body-md font-bold text-on-background text-[13px]">
                      Escrow Protection Active
                    </p>
                    <p className="text-body-sm text-on-surface-variant text-[11px] leading-snug">
                      Your funds are held securely. Once you confirm you have the item, the payment is released to the seller.
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => handleConfirmReceipt(activePurchase)}
                  className="bg-secondary-fixed text-on-secondary-fixed hover:bg-secondary-container px-md py-[6px] rounded-lg font-bold text-[12px] transition-all active:scale-95 cursor-pointer shadow-sm shrink-0 whitespace-nowrap self-stretch sm:self-auto text-center"
                >
                  Confirm Purchase Received
                </button>
              </div>
            )}

            {/* Messages Bubble Panel */}
            <div className="flex-1 p-md overflow-y-auto bg-surface-container-low custom-scrollbar flex flex-col gap-md">
              {activeChat.messages.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center text-center text-on-surface-variant py-lg">
                  <span className="material-symbols-outlined text-[48px] opacity-40 mb-sm">waving_hand</span>
                  <p className="font-semibold text-on-background">Say Hello!</p>
                  <p className="text-[13px] max-w-xs mt-xs">Ask the seller questions about condition, pickup options, or negotiating the price.</p>
                </div>
              ) : (
                activeChat.messages.map((msg) => {
                  const isUser = msg.sender === 'buyer';
                  return (
                    <div
                      key={msg.id}
                      className={`flex flex-col max-w-[70%] ${isUser ? 'self-end items-end' : 'self-start items-start'}`}
                    >
                      <div
                        className={`rounded-2xl p-md text-body-md shadow-sm leading-relaxed ${
                          isUser
                            ? 'bg-primary text-on-primary rounded-tr-none'
                            : 'bg-surface-container-lowest text-on-background border border-outline-variant/20 rounded-tl-none'
                        }`}
                      >
                        {msg.text}
                      </div>
                      <span className="text-[9px] text-on-surface-variant/70 mt-1 px-sm">
                        {msg.time}
                      </span>
                    </div>
                  );
                })
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Footer Panel */}
            <form onSubmit={handleSendMessage} className="p-md border-t border-surface-container-high bg-surface-bright/30 flex gap-sm items-center shrink-0">
              <input
                type="text"
                placeholder="Type a message..."
                className="flex-1 bg-surface text-on-surface border border-outline-variant rounded-xl px-md py-[12px] text-body-md focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
              />
              <button
                type="submit"
                disabled={!messageText.trim()}
                className="bg-primary text-on-primary p-md rounded-xl font-bold flex items-center justify-center hover:bg-primary/95 transition-all active:scale-95 disabled:opacity-40 disabled:scale-100 disabled:hover:bg-primary cursor-pointer shrink-0"
              >
                <span className="material-symbols-outlined text-[20px]">send</span>
              </button>
            </form>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-center text-on-surface-variant py-lg">
            <span className="material-symbols-outlined text-[64px] text-on-surface-variant/40 mb-md">chat</span>
            <h3 className="font-bold text-headline-md text-on-background">No chat selected</h3>
            <p className="text-body-md max-w-sm mt-xs">Select a conversation from the list to start messaging.</p>
          </div>
        )}
      </section>

      {/* Rating Modal Popup */}
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
