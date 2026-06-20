import React, { useState, useContext, useEffect } from 'react';
import { useParams, useNavigate, Link, useSearchParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

export default function Checkout() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, buyProduct, cart, updateCartQuantity, removeFromCart } = useContext(AppContext);
  const [searchParams] = useSearchParams();

  const qtyParam = searchParams.get('qty');
  const qty = qtyParam ? parseInt(qtyParam) : 1;

  // Form inputs state
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [zip, setZip] = useState('');
  
  // Checkout flow states
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [generatedOrderId, setGeneratedOrderId] = useState('');

  // Local state for checkout list (confirmed/rejected states)
  const [checkoutList, setCheckoutList] = useState([]);

  // Initialize checkoutList from direct link (id) or from context cart
  useEffect(() => {
    if (id) {
      const prod = products.find((p) => p.id === id);
      if (prod) {
        setCheckoutList([{ productId: id, quantity: qty, confirmed: true }]);
      }
    } else {
      setCheckoutList(cart.map((item) => ({ ...item, confirmed: true })));
    }
  }, [id, qty, cart, products]);

  const toggleConfirmItem = (productId) => {
    setCheckoutList((prev) =>
      prev.map((item) =>
        item.productId === productId ? { ...item, confirmed: !item.confirmed } : item
      )
    );
  };

  const handleQtyChange = (productId, newQty) => {
    const prod = products.find((p) => p.id === productId);
    if (!prod) return;
    const available = prod.quantity !== undefined ? prod.quantity : 1;
    const finalQty = Math.max(1, Math.min(newQty, available));
    
    if (!id) {
      updateCartQuantity(productId, finalQty);
    }
    
    setCheckoutList((prev) =>
      prev.map((item) =>
        item.productId === productId ? { ...item, quantity: finalQty } : item
      )
    );
  };

  const handleRemoveItem = (productId) => {
    if (!id) {
      removeFromCart(productId);
    }
    setCheckoutList((prev) => prev.filter((item) => item.productId !== productId));
  };

  // Resolve products
  const resolvedItems = checkoutList.map((item) => {
    const product = products.find((p) => p.id === item.productId);
    return {
      ...item,
      product,
    };
  }).filter(item => item.product !== undefined);

  const confirmedItems = resolvedItems.filter(item => item.confirmed && !item.product.sold);

  // Fees calculation
  const subtotal = parseFloat(confirmedItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0).toFixed(2));
  const protectionFee = confirmedItems.length > 0 ? 4.99 : 0;
  const localTax = parseFloat((subtotal * 0.0825).toFixed(2));
  const totalAmount = parseFloat((subtotal + protectionFee + localTax).toFixed(2));

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (confirmedItems.length === 0) {
      alert("Please confirm at least one item to proceed with checkout.");
      return;
    }
    if (paymentMethod === 'card' && (!address || !city || !zip)) {
      alert("Please fill in your delivery/shipping details");
      return;
    }

    setIsPlacingOrder(true);

    // Simulate payment transaction delay
    setTimeout(() => {
      const orderIds = [];
      confirmedItems.forEach((item) => {
        const orderId = buyProduct(item.productId, paymentMethod, item.quantity);
        orderIds.push(orderId);
        if (!id) {
          removeFromCart(item.productId);
        }
      });
      setGeneratedOrderId(orderIds.join(', '));
      setIsPlacingOrder(false);
      setOrderSuccess(true);
    }, 2000);
  };

  if (resolvedItems.length === 0) {
    if (id) {
      return (
        <div className="flex-1 flex flex-col items-center justify-center py-[100px] text-center max-w-container-max mx-auto px-md">
          <span className="material-symbols-outlined text-[80px] text-error">error</span>
          <h2 className="font-headline-lg font-bold text-on-background mt-md">Item Not Found</h2>
          <p className="text-body-lg text-on-surface-variant max-w-md mt-xs">
            The listing you are trying to purchase does not exist or has been sold.
          </p>
          <Link to="/" className="mt-lg bg-primary text-on-primary font-bold px-lg py-sm rounded-xl hover:bg-primary/95 transition-all shadow-md">
            Return to Shop
          </Link>
        </div>
      );
    }

    return (
      <div className="flex-1 flex flex-col items-center justify-center py-[100px] text-center max-w-container-max mx-auto px-md">
        <span className="material-symbols-outlined text-[80px] text-on-surface-variant/40">shopping_cart_off</span>
        <h2 className="font-headline-lg font-bold text-on-background mt-md">Your Cart is Empty</h2>
        <p className="text-body-lg text-on-surface-variant max-w-md mt-xs">
          You don't have any items ready for checkout. Add items to your cart to see them here!
        </p>
        <Link to="/" className="mt-lg bg-primary text-on-primary font-bold px-lg py-sm rounded-xl hover:bg-primary/95 transition-all shadow-md">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="flex-1 w-full max-w-container-max mx-auto px-md md:px-lg py-xl flex justify-center relative">
      
      {/* 1. Loading Overlay */}
      {isPlacingOrder && (
        <div className="absolute inset-0 bg-surface-container-lowest/80 backdrop-blur-md z-40 flex flex-col items-center justify-center min-h-[400px]">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <h3 className="font-bold text-headline-md mt-lg text-on-background">Processing Payment</h3>
          <p className="text-body-md text-on-surface-variant mt-xs">Please do not refresh or close this page.</p>
        </div>
      )}

      {/* 2. Success Overlay */}
      {orderSuccess && (
        <div className="w-full max-w-xl bg-surface-container-lowest border border-outline-variant/30 rounded-xl p-lg md:p-xl shadow-level-2 z-50 flex flex-col items-center text-center gap-md">
          <div className="w-[80px] h-[80px] rounded-full bg-tertiary-container/20 text-tertiary flex items-center justify-center mb-sm">
            <span className="material-symbols-outlined text-[48px]" data-weight="fill">check_circle</span>
          </div>
          <h2 className="font-headline-lg font-black text-on-background">Order Placed Successfully!</h2>
          <p className="text-body-lg text-on-surface-variant max-w-md text-[15px]">
            Thank you for your purchase! Your payment of <span className="font-bold text-primary">${totalAmount}</span> is securely held in escrow under OmniMarket Protection.
          </p>

          <div className="w-full bg-surface-container-low rounded-xl p-md text-left flex flex-col gap-xs text-[13px] text-on-surface-variant border border-outline-variant/20 mt-sm max-h-[300px] overflow-y-auto custom-scrollbar">
            <div>Order References: <span className="font-bold text-on-background">{generatedOrderId}</span></div>
            <div className="border-t border-outline-variant/10 my-xs"></div>
            <span className="font-semibold text-on-background block mb-xs">Items Purchased:</span>
            <div className="flex flex-col gap-xs">
              {confirmedItems.map((item) => (
                <div key={item.productId} className="flex justify-between items-center text-[12px] bg-surface-bright p-sm rounded-lg border border-outline-variant/10">
                  <span className="font-semibold text-on-background truncate max-w-xs">{item.product.title} (x{item.quantity})</span>
                  <span className="font-bold text-primary">${(item.product.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-md w-full mt-md">
            <Link
              to="/purchases"
              className="flex-1 bg-primary text-on-primary py-sm rounded-xl font-bold text-center hover:bg-primary/95 transition-all text-body-md shadow-sm"
            >
              Go to Purchases
            </Link>
            <Link
              to="/"
              className="flex-1 bg-surface-container-highest text-on-surface border border-outline-variant/80 py-sm rounded-xl font-bold text-center hover:bg-surface-container-high transition-all text-body-md"
            >
              Back to Shop
            </Link>
          </div>
        </div>
      )}

      {/* 3. Main Checkout Screen */}
      {!orderSuccess && !isPlacingOrder && (
        <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-12 gap-lg items-start">
          
          {/* Left Column: Form Details & Item Stack */}
          <form onSubmit={handlePlaceOrder} className="md:col-span-7 bg-surface-container-lowest rounded-xl border border-outline-variant/30 shadow-sm p-lg md:p-xl flex flex-col gap-lg w-full">
            <h1 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-background border-b border-outline-variant/20 pb-sm">
              Checkout
            </h1>

            {/* Checkout Items Stack */}
            <section className="flex flex-col gap-md">
              <h2 className="font-headline-md text-[18px] font-bold text-on-background flex justify-between items-center">
                <span>Items in Order</span>
                <span className="text-[11px] font-normal text-on-surface-variant">
                  Confirm or reject items below
                </span>
              </h2>
              
              <div className="flex flex-col gap-sm">
                {resolvedItems.map((item) => {
                  const isConfirmed = item.confirmed;
                  const prod = item.product;
                  const itemPrice = prod.price;
                  const itemTotal = itemPrice * item.quantity;

                  return (
                    <div
                      key={item.productId}
                      className={`border rounded-xl p-md flex flex-col items-start justify-between gap-md ${
                        isConfirmed
                          ? 'bg-surface-bright border-outline-variant/30 shadow-sm'
                          : 'bg-surface-container-low/50 border-outline-variant/20 opacity-70'
                      }`}
                    >
                      {/* Checkbox / Confirm state toggle */}
                      <div className="flex items-center gap-md w-full sm:w-auto">
                        <button
                          type="button"
                          onClick={() => toggleConfirmItem(item.productId)}
                          className={`w-6 h-6 rounded-lg flex items-center justify-center cursor-pointer transition-all border ${
                            isConfirmed
                              ? 'bg-tertiary border-tertiary text-white shadow-sm font-bold'
                              : 'bg-surface border-outline-variant text-transparent hover:border-outline'
                          }`}
                          title={isConfirmed ? "Reject this item" : "Confirm this item"}
                        >
                          <span className="material-symbols-outlined text-[16px] font-bold">check</span>
                        </button>

                        <div className="flex items-center gap-md flex-1">
                          {/* Image */}
                          <div className="w-14 h-14 rounded-lg overflow-hidden bg-surface-container border border-outline-variant/20 shrink-0">
                            <img className="w-full h-full object-cover" src={prod.images[0]} alt={prod.title} />
                          </div>
                          
                          {/* Text info */}
                          <div className="min-w-0">
                            <h3 className={`font-semibold text-body-md text-on-background truncate max-w-full ${!isConfirmed && 'line-through text-on-surface-variant/60'}`}>
                              {prod.title}
                            </h3>
                            <p className="text-[12px] text-on-surface-variant">
                              Seller: <span className="font-semibold text-primary">{prod.seller.name}</span>
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Quantity & Actions */}
                      <div className="flex items-center justify-between gap-md w-full sm:w-auto border-t sm:border-t-0 border-outline-variant/10 pt-sm sm:pt-0 mt-2">
                        {/* Quantity controls */}
                        <div className="flex items-center gap-xs">
                          <button
                            type="button"
                            disabled={item.quantity <= 1 || !isConfirmed}
                            onClick={() => handleQtyChange(item.productId, item.quantity - 1)}
                            className="w-8 h-8 rounded-lg bg-surface border border-outline-variant hover:bg-surface-container-low disabled:opacity-40 disabled:hover:bg-surface flex items-center justify-center font-bold text-[14px] cursor-pointer"
                          >
                            -
                          </button>
                          <span className="w-8 text-center text-body-md font-bold text-on-background">{item.quantity}</span>
                          <button
                            type="button"
                            disabled={item.quantity >= (prod.quantity || 1) || !isConfirmed}
                            onClick={() => handleQtyChange(item.productId, item.quantity + 1)}
                            className="w-8 h-8 rounded-lg bg-surface border border-outline-variant hover:bg-surface-container-low disabled:opacity-40 disabled:hover:bg-surface flex items-center justify-center font-bold text-[14px] cursor-pointer"
                          >
                            +
                          </button>
                        </div>

                        {/* Prices */}
                        <div className="flex flex-col items-end min-w-[70px]">
                          <span className={`font-bold text-[14px] ${isConfirmed ? 'text-primary' : 'line-through text-on-surface-variant/60'}`}>
                            ${itemTotal.toFixed(2)}
                          </span>
                          <span className="text-[10px] text-on-surface-variant/80">${itemPrice} each</span>
                        </div>

                        {/* Remove button */}
                        <button
                          type="button"
                          onClick={() => handleRemoveItem(item.productId)}
                          className="text-on-surface-variant hover:text-error transition-colors p-xs flex items-center justify-center cursor-pointer"
                          title="Remove item"
                        >
                          <span className="material-symbols-outlined text-[20px]">delete</span>
                        </button>
                      </div>

                    </div>
                  );
                })}
              </div>
            </section>

            <div className="border-t border-outline-variant/20 my-xs"></div>

            {/* Payment Method Selector */}
            <section className="flex flex-col gap-md">
              <h2 className="font-headline-md text-[18px] font-bold text-on-background">Payment Method</h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-sm">
                <label className={`border rounded-xl p-md flex items-center justify-between cursor-pointer transition-all ${
                  paymentMethod === 'card' ? 'bg-primary/5 border-primary shadow-sm' : 'border-outline-variant/50 hover:bg-surface'
                }`}>
                  <div className="flex items-center gap-sm">
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'card'}
                      onChange={() => setPaymentMethod('card')}
                      className="text-primary focus:ring-primary"
                    />
                    <div className="flex flex-col">
                      <span className="font-semibold text-body-md text-on-background">Credit / Debit Card</span>
                      <span className="text-[12px] text-on-surface-variant">Instant processing</span>
                    </div>
                  </div>
                  <span className="material-symbols-outlined text-[24px] text-on-surface-variant/70">credit_card</span>
                </label>

                <label className={`border rounded-xl p-md flex items-center justify-between cursor-pointer transition-all ${
                  paymentMethod === 'meetup' ? 'bg-primary/5 border-primary shadow-sm' : 'border-outline-variant/50 hover:bg-surface'
                }`}>
                  <div className="flex items-center gap-sm">
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'meetup'}
                      onChange={() => setPaymentMethod('meetup')}
                      className="text-primary focus:ring-primary"
                    />
                    <div className="flex flex-col">
                      <span className="font-semibold text-body-md text-on-background">Escrow on Meetup</span>
                      <span className="text-[12px] text-on-surface-variant">Release funds when picking up</span>
                    </div>
                  </div>
                  <span className="material-symbols-outlined text-[24px] text-on-surface-variant/70">handshake</span>
                </label>
              </div>
            </section>

            {/* Billing / Meetup Details */}
            {paymentMethod === 'card' ? (
              <section className="flex flex-col gap-md">
                <h2 className="font-headline-md text-[18px] font-bold text-on-background">Billing &amp; Delivery Details</h2>
                
                <div className="flex flex-col gap-sm">
                  <div>
                    <label className="font-label-sm text-[12px] text-on-background block mb-xs font-semibold">Street Address *</label>
                    <input
                      required
                      type="text"
                      className="w-full bg-surface text-on-surface border border-outline-variant rounded-xl px-md py-[10px] text-body-md focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                      placeholder="123 Main St"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-sm">
                    <div>
                      <label className="font-label-sm text-[12px] text-on-background block mb-xs font-semibold">City *</label>
                      <input
                        required
                        type="text"
                        className="w-full bg-surface text-on-surface border border-outline-variant rounded-xl px-md py-[10px] text-body-md focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                        placeholder="Brooklyn"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="font-label-sm text-[12px] text-on-background block mb-xs font-semibold">ZIP Code *</label>
                      <input
                        required
                        type="text"
                        className="w-full bg-surface text-on-surface border border-outline-variant rounded-xl px-md py-[10px] text-body-md focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                        placeholder="11201"
                        value={zip}
                        onChange={(e) => setZip(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </section>
            ) : (
              <section className="bg-secondary-fixed/5 border border-secondary-fixed/20 p-md rounded-xl flex items-start gap-sm">
                <span className="material-symbols-outlined text-secondary-fixed-dim mt-0.5" data-weight="fill">info</span>
                <div className="flex flex-col gap-xs text-[13px] text-on-surface-variant">
                  <span className="font-bold text-on-background">Escrow Setup</span>
                  <span>
                    Your funds will be secured in the OmniMarket registry. Once you meet the seller and verify the item's condition, you can click "Confirm Pickup" in the app, which instantly transfers the funds to the seller.
                  </span>
                </div>
              </section>
            )}

            {/* Place Order CTA */}
            <button
              type="submit"
              disabled={confirmedItems.length === 0}
              className="w-full bg-secondary-fixed text-on-secondary-fixed font-headline-md text-headline-md font-bold py-[14px] px-xl rounded-xl hover:bg-secondary-container transition-all duration-200 active:scale-[0.98] shadow-sm flex items-center justify-center gap-sm cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-secondary-fixed"
            >
              <span>Confirm Purchase</span>
              <span className="material-symbols-outlined text-[22px]">lock</span>
            </button>
          </form>

          {/* Right Column: Order Summary Card */}
          <aside className="md:col-span-5 bg-surface-container-lowest rounded-xl border border-outline-variant/30 p-lg shadow-sm flex flex-col gap-md w-full">
            <h2 className="font-headline-md text-[18px] font-bold text-on-background border-b border-outline-variant/20 pb-sm">
              Order Summary
            </h2>

            {/* Stacked Confirmed Items List */}
            <div className="flex flex-col gap-sm max-h-[220px] overflow-y-auto custom-scrollbar pr-xs">
              {confirmedItems.length === 0 ? (
                <div className="text-center py-md text-[13px] text-on-surface-variant/80">
                  No items confirmed.
                </div>
              ) : (
                confirmedItems.map((item) => (
                  <div key={item.productId} className="flex gap-sm items-center justify-between text-[13px]">
                    <div className="flex gap-sm items-center min-w-0">
                      <div className="w-10 h-10 bg-surface-container rounded overflow-hidden border border-outline-variant/20 shrink-0">
                        <img className="w-full h-full object-cover" src={item.product.images[0]} alt={item.product.title} />
                      </div>
                      <div className="min-w-0">
                        <div className="font-semibold text-on-background truncate">{item.product.title}</div>
                        <div className="text-[11px] text-on-surface-variant">Qty: {item.quantity} • {item.product.condition}</div>
                      </div>
                    </div>
                    <span className="font-bold text-on-background shrink-0">${(item.product.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))
              )}
            </div>

            <div className="border-t border-outline-variant/20 my-xs"></div>

            {/* Subtotal fee breakdowns */}
            <div className="flex flex-col gap-sm text-body-md text-on-surface-variant">
              <div className="flex justify-between">
                <span>Subtotal ({confirmedItems.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
                <span className="font-medium text-on-surface">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="flex items-center gap-xs">
                  Escrow Protection Fee
                  <span className="material-symbols-outlined text-[14px] cursor-help" title="Covers buyer protection escrows">help</span>
                </span>
                <span className="font-medium text-on-surface">${protectionFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Sales Tax</span>
                <span className="font-medium text-on-surface">${localTax.toFixed(2)}</span>
              </div>

              <div className="border-t border-outline-variant/20 my-xs"></div>

              <div className="flex justify-between text-body-lg font-bold text-on-background text-[16px]">
                <span>Total</span>
                <span className="text-primary">${totalAmount.toFixed(2)}</span>
              </div>
            </div>

            {/* Buyer protection policy label */}
            <div className="bg-surface-container-low p-sm rounded-lg flex items-start gap-sm mt-xs border border-outline-variant/20">
              <span className="material-symbols-outlined text-tertiary-container shrink-0" data-weight="fill">verified_user</span>
              <span className="text-[11px] text-on-surface-variant leading-normal">
                Your purchase is fully covered by <span className="font-bold text-on-background">OmniMarket Buyer Protection</span>. Money back guaranteed if the item is not as described.
              </span>
            </div>
          </aside>

        </div>
      )}

    </div>
  );
}
