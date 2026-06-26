import React, { createContext, useState, useEffect } from 'react';
import { initialProducts, initialPurchases, initialChats, initialSellers } from '../data/mockData';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('omnimarket_products');
    let loadedProducts = initialProducts;
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          if (parsed.length >= 25) {
            loadedProducts = parsed;
          } else {
            const merged = [...parsed];
            initialProducts.forEach(initP => {
              if (!merged.some(p => p.id === initP.id)) {
                merged.push(initP);
              }
            });
            loadedProducts = merged;
          }
        }
      } catch (e) {
        console.error("Error parsing products", e);
      }
    }

    // Filter out deleted product IDs
    const deletedIds = ["25", "26", "30", "31", "32", "34", "35", "36", "40", "43"];
    loadedProducts = loadedProducts.filter(p => p && !deletedIds.includes(p.id));
 
    // Clean expired googleusercontent URLs from loaded data
    return loadedProducts.map(p => {
      const updatedImages = Array.isArray(p.images)
        ? p.images.map((img, idx) => {
            if (typeof img === 'string' && img.includes('lh3.googleusercontent.com')) {
              const chairImages = [
                "https://images.unsplash.com/photo-1505797149-43b0069ec26b?w=600&auto=format&fit=crop&q=60",
                "https://images.unsplash.com/photo-1580481072645-022f9a6dbf27?w=600&auto=format&fit=crop&q=60",
                "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=600&auto=format&fit=crop&q=60",
                "https://images.unsplash.com/photo-1589384267710-7a259678a59a?w=600&auto=format&fit=crop&q=60"
              ];
              return chairImages[idx % chairImages.length];
            }
            return img;
          })
        : p.images;

      const updatedSellerAvatar = p.seller && typeof p.seller.avatar === 'string' && p.seller.avatar.includes('lh3.googleusercontent.com')
        ? "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=60"
        : (p.seller ? p.seller.avatar : "");

      const updatedMapUrl = typeof p.mapUrl === 'string' && p.mapUrl.includes('lh3.googleusercontent.com')
        ? "https://images.unsplash.com/photo-1524661135-423995f22d0b?w=600&auto=format&fit=crop&q=60"
        : p.mapUrl;

      return {
        ...p,
        images: updatedImages,
        mapUrl: updatedMapUrl,
        seller: p.seller ? { ...p.seller, avatar: updatedSellerAvatar } : p.seller
      };
    });
  });

  const [purchases, setPurchases] = useState(() => {
    const saved = localStorage.getItem('omnimarket_purchases');
    return saved ? JSON.parse(saved) : initialPurchases;
  });

  const [chats, setChats] = useState(() => {
    const saved = localStorage.getItem('omnimarket_chats');
    return saved ? JSON.parse(saved) : initialChats;
  });

  const [sellers, setSellers] = useState(() => {
    const saved = localStorage.getItem('omnimarket_sellers');
    return saved ? JSON.parse(saved) : initialSellers;
  });

  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('omnimarket_current_user');
    return saved ? JSON.parse(saved) : {
      id: "current_user",
      name: "John Doe",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=60",
      rating: 5.0,
      reviewsCount: 0,
      isVerified: true,
      email: "john@example.com",
      location: "New York, NY",
      bio: "Avid local deal hunter and gear collector. Fast responder and flexible with pickup times.",
      reviews: []
    };
  });

  const [searchQuery, setSearchQuery] = useState('');

  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('omnimarket_cart');
    return saved ? JSON.parse(saved) : [];
  });

  // Persist state to localStorage
  useEffect(() => {
    localStorage.setItem('omnimarket_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('omnimarket_purchases', JSON.stringify(purchases));
  }, [purchases]);

  useEffect(() => {
    localStorage.setItem('omnimarket_chats', JSON.stringify(chats));
  }, [chats]);

  useEffect(() => {
    localStorage.setItem('omnimarket_sellers', JSON.stringify(sellers));
  }, [sellers]);

  useEffect(() => {
    localStorage.setItem('omnimarket_current_user', JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('omnimarket_cart', JSON.stringify(cart));
  }, [cart]);

  // Operations
  const addProduct = (productData) => {
    const newProduct = {
      ...productData,
      id: Date.now().toString(),
      views: 0,
      timeListed: "Listed just now",
      sold: false,
      seller: {
        id: currentUser.id,
        name: currentUser.name,
        rating: currentUser.rating,
        reviewsCount: currentUser.reviewsCount,
        isVerified: currentUser.isVerified,
        avatar: currentUser.avatar,
        responseTime: "Instant"
      }
    };
    setProducts((prev) => [newProduct, ...prev]);
    return newProduct.id;
  };

  const updateProduct = (id, updatedData) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updatedData } : p))
    );
  };

  const buyProduct = (productId, paymentMethod, quantityToBuy = 1) => {
    const product = products.find((p) => p.id === productId);
    if (!product) return null;

    const buyQty = Math.min(quantityToBuy, product.quantity || 1);
    const newQty = (product.quantity || 1) - buyQty;
    const isSoldOut = newQty <= 0;

    // Add to purchases
    const newPurchase = {
      id: `ord_${Date.now()}`,
      productId: product.id,
      productTitle: product.title,
      productImage: product.images[0] || "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=150&auto=format&fit=crop&q=60",
      price: product.price,
      quantityPurchased: buyQty,
      purchaseDate: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      status: "Processing",
      sellerName: product.seller.name,
      sellerId: product.seller.id,
      paymentMethod,
      rated: false
    };

    setPurchases((prev) => [newPurchase, ...prev]);

    // Update product quantity and sold status
    setProducts((prev) =>
      prev.map((p) =>
        p.id === productId ? { ...p, quantity: newQty, sold: isSoldOut } : p
      )
    );

    return newPurchase.id;
  };

  const releaseEscrow = (purchaseId) => {
    setPurchases((prev) =>
      prev.map((order) => (order.id === purchaseId ? { ...order, status: "Completed" } : order))
    );
  };

  const rateSeller = (sellerId, rating, comment) => {
    const newReview = {
      id: `rev_${Date.now()}`,
      reviewer: currentUser.name,
      rating,
      comment,
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
    };

    // Update in Sellers list
    setSellers((prevSellers) => {
      const existingSeller = prevSellers.find((s) => s.id === sellerId);
      
      if (existingSeller) {
        const updatedReviews = [newReview, ...(existingSeller.reviews || [])];
        const avgRating = parseFloat(
          (updatedReviews.reduce((sum, r) => sum + r.rating, 0) / updatedReviews.length).toFixed(1)
        );
        return prevSellers.map((s) =>
          s.id === sellerId
            ? { ...s, rating: avgRating, reviewsCount: updatedReviews.length, reviews: updatedReviews }
            : s
        );
      } else {
        // Create new seller profile (e.g. for current_user if rated by someone)
        return [
          ...prevSellers,
          {
            id: sellerId,
            name: sellerId === currentUser.id ? currentUser.name : "Seller",
            avatar: sellerId === currentUser.id ? currentUser.avatar : "",
            rating,
            reviewsCount: 1,
            isVerified: false,
            reviews: [newReview]
          }
        ];
      }
    });

    // Mark purchase as rated
    setPurchases((prev) =>
      prev.map((order) => {
        if (order.sellerId === sellerId && !order.rated) {
          return { ...order, rated: true };
        }
        return order;
      })
    );
  };

  const updateUserProfile = (profileData) => {
    setCurrentUser((prev) => ({ ...prev, ...profileData }));
    
    // Also update current seller name/avatar in products
    setProducts((prevProducts) =>
      prevProducts.map((p) => {
        if (p.seller && p.seller.id === currentUser.id) {
          return {
            ...p,
            seller: {
              ...p.seller,
              name: profileData.name || prev.name,
              avatar: profileData.avatar || prev.avatar
            }
          };
        }
        return p;
      })
    );
  };

  const getOrCreateChat = (sellerId, sellerName, sellerAvatar, productTitle, productId) => {
    const existing = chats.find((c) => c.sellerId === sellerId && c.productId === productId);
    if (existing) return existing;

    const newChat = {
      sellerId,
      sellerName,
      sellerAvatar: sellerAvatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=60",
      productTitle,
      productId,
      messages: []
    };

    setChats((prev) => [newChat, ...prev]);
    return newChat;
  };

  const sendChatMessage = (sellerId, productId, text, sender = 'buyer') => {
    setChats((prevChats) => {
      return prevChats.map((chat) => {
        if (chat.sellerId === sellerId && chat.productId === productId) {
          const now = new Date();
          const timeString = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
          const newMsg = {
            id: `msg_${Date.now()}`,
            sender,
            text,
            time: timeString
          };
          return {
            ...chat,
            messages: [...chat.messages, newMsg]
          };
        }
        return chat;
      });
    });

    if (sender === 'buyer') {
      setTimeout(() => {
        const autoReplies = [
          "Thanks for messaging! I'm currently away but will reply shortly.",
          "That sounds good. Let's arrange a time to meet.",
          "I can confirm that the item is still available and in great condition.",
          "Yes, we can meet up at a public location.",
          "I'm firm on the price, but thanks for the offer!"
        ];
        const randomReply = autoReplies[Math.floor(Math.random() * autoReplies.length)];
        
        setChats((prevChats) => {
          return prevChats.map((chat) => {
            if (chat.sellerId === sellerId && chat.productId === productId) {
              const now = new Date();
              const timeString = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
              const replyMsg = {
                id: `msg_reply_${Date.now()}`,
                sender: 'seller',
                text: randomReply,
                time: timeString
              };
              return {
                ...chat,
                messages: [...chat.messages, replyMsg]
              };
            }
            return chat;
          });
        });
      }, 1500);
    }
  };

  const addToCart = (productId, quantityToBuy = 1) => {
    const product = products.find((p) => p.id === productId);
    if (!product) return;

    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.productId === productId);
      const availableQty = product.quantity !== undefined ? product.quantity : 1;

      if (existing) {
        const newQty = Math.min(existing.quantity + quantityToBuy, availableQty);
        return prevCart.map((item) =>
          item.productId === productId ? { ...item, quantity: newQty } : item
        );
      } else {
        const newQty = Math.min(quantityToBuy, availableQty);
        return [...prevCart, { productId, quantity: newQty }];
      }
    });
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.productId !== productId));
  };

  const updateCartQuantity = (productId, quantity) => {
    const product = products.find((p) => p.id === productId);
    if (!product) return;

    setCart((prevCart) => {
      const availableQty = product.quantity !== undefined ? product.quantity : 1;
      const finalQty = Math.max(1, Math.min(quantity, availableQty));
      return prevCart.map((item) =>
        item.productId === productId ? { ...item, quantity: finalQty } : item
      );
    });
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <AppContext.Provider
      value={{
        products,
        purchases,
        chats,
        sellers,
        currentUser,
        searchQuery,
        setSearchQuery,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        addProduct,
        updateProduct,
        buyProduct,
        releaseEscrow,
        rateSeller,
        updateUserProfile,
        getOrCreateChat,
        sendChatMessage
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
