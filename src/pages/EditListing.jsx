import React, { useState, useContext, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

export default function EditListing() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, updateProduct } = useContext(AppContext);

  const product = products.find((p) => p.id === id);

  // Form states
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [condition, setCondition] = useState('');
  const [quantity, setQuantity] = useState('1');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [acceptOffers, setAcceptOffers] = useState(true);
  
  // Image input simulator state
  const [imageUrlInput, setImageUrlInput] = useState('');
  const [uploadedImages, setUploadedImages] = useState([]);

  // Pre-populate form when product loads
  useEffect(() => {
    if (product) {
      setTitle(product.title);
      setCategory(product.category);
      setCondition(product.conditionValue || 'like-new');
      setQuantity(product.quantity !== undefined ? product.quantity.toString() : '1');
      setDescription(product.description);
      setPrice(product.price.toString());
      setAcceptOffers(product.acceptOffers !== undefined ? product.acceptOffers : true);
      setUploadedImages(product.images || []);
    }
  }, [product]);

  if (!product) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center py-[100px] text-center max-w-container-max mx-auto px-md">
        <span className="material-symbols-outlined text-[80px] text-error">error</span>
        <h2 className="font-headline-lg font-bold text-on-background mt-md">Listing Not Found</h2>
        <p className="text-body-lg text-on-surface-variant max-w-md mt-xs">
          The listing you are trying to edit does not exist or has been removed.
        </p>
        <Link to="/" className="mt-lg bg-primary text-on-primary font-bold px-lg py-sm rounded-xl hover:bg-primary/95 transition-all shadow-md active:scale-95">
          Return to Shop
        </Link>
      </div>
    );
  }

  const categoryLabels = {
    electronics: 'Electronics',
    home: 'Home & Garden',
    fashion: 'Fashion',
    motors: 'Motors',
    collectibles: 'Collectibles',
    videogames: 'Video Games'
  };

  const conditionLabels = {
    new: 'New (Unused)',
    'like-new': 'Used - Like New',
    good: 'Used - Good',
    fair: 'Used - Fair'
  };

  const handleAddImage = (e) => {
    e.preventDefault();
    if (!imageUrlInput.trim()) return;
    setUploadedImages((prev) => [...prev, imageUrlInput.trim()]);
    setImageUrlInput('');
  };

  const handleRemoveImage = (index) => {
    setUploadedImages((prev) => prev.filter((_, idx) => idx !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim() || !category || !condition || !description.trim() || !price || !quantity) {
      alert("Please fill out all required fields marked with *");
      return;
    }

    const finalImages = uploadedImages.length > 0
      ? uploadedImages
      : ["https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=600&auto=format&fit=crop&q=60"];

    const updatedData = {
      title,
      category,
      categoryLabel: categoryLabels[category],
      condition: conditionLabels[condition],
      conditionValue: condition,
      quantity: parseInt(quantity || 1),
      description,
      price: parseFloat(price),
      acceptOffers,
      images: finalImages
    };

    updateProduct(id, updatedData);
    navigate(`/product/${id}`);
  };

  return (
    <div className="flex-1 w-full px-md py-xl md:px-lg md:py-[48px] max-w-container-max mx-auto flex justify-center">
      {/* Form Container */}
      <div className="w-full max-w-[800px] bg-surface-container-lowest rounded-xl shadow-[0_10px_20px_-5px_rgba(28,30,33,0.12)] border border-outline-variant/30 overflow-hidden">
        
        <div className="p-lg md:p-xl border-b border-surface-container-high bg-surface-bright/50 flex justify-between items-center">
          <div>
            <h1 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-background">
              Edit Listing
            </h1>
            <p className="font-body-md text-body-md text-on-surface-variant mt-xs">
              Modify the details of your listing.
            </p>
          </div>
          <Link
            to={`/product/${id}`}
            className="text-primary font-semibold hover:underline flex items-center gap-xs text-body-md"
          >
            Cancel
          </Link>
        </div>

        <form onSubmit={handleSubmit} className="p-lg md:p-xl flex flex-col gap-xl">
          
          {/* Section: Photos */}
          <section className="flex flex-col gap-md">
            <div className="flex justify-between items-end">
              <h2 className="font-headline-md text-headline-md text-on-background">Photos</h2>
              <span className="font-label-sm text-label-sm text-on-surface-variant">
                {uploadedImages.length} added
              </span>
            </div>

            {/* URL input for image simulator */}
            <div className="flex gap-sm">
              <input
                type="url"
                placeholder="Paste an image URL to add..."
                className="flex-1 bg-surface text-on-surface border border-outline-variant rounded-xl px-md py-[10px] text-body-md focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                value={imageUrlInput}
                onChange={(e) => setImageUrlInput(e.target.value)}
              />
              <button
                type="button"
                onClick={handleAddImage}
                className="bg-primary text-on-primary px-lg py-2 rounded-xl font-bold text-body-md hover:bg-primary/95 active:scale-95 transition-all shrink-0"
              >
                Add Image
              </button>
            </div>

            {/* Uploaded Thumbnails Preview */}
            {uploadedImages.length > 0 && (
              <div className="flex gap-md flex-wrap mt-xs p-sm bg-surface-container-low rounded-xl border border-outline-variant/20">
                {uploadedImages.map((url, idx) => (
                  <div key={idx} className="w-20 h-20 bg-surface rounded-lg overflow-hidden border border-outline-variant relative group">
                    <img className="w-full h-full object-cover" src={url} alt={`preview-${idx}`} />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(idx)}
                      className="absolute inset-0 bg-error/70 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer font-bold text-[12px]"
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="w-full border-2 border-dashed border-outline-variant rounded-xl bg-surface p-lg flex flex-col items-center justify-center py-[36px] relative text-center">
              <div className="w-[48px] h-[48px] rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant mb-sm">
                <span className="material-symbols-outlined text-[24px]">add_photo_alternate</span>
              </div>
              <p className="font-body-md text-body-md text-on-background font-semibold">
                Manage your photo links above.
              </p>
              <p className="font-label-sm text-[12px] text-outline mt-xs">
                Supports web image links (JPG, PNG). At least one image is recommended.
              </p>
            </div>
          </section>

          {/* Section: Item Details */}
          <section className="flex flex-col gap-lg">
            <h2 className="font-headline-md text-headline-md text-on-background border-b border-outline-variant/20 pb-sm">
              Item Details
            </h2>

            {/* Title */}
            <div>
              <label className="font-label-sm text-[12px] text-on-background block mb-sm font-semibold" htmlFor="item-title">
                Title <span className="text-error">*</span>
              </label>
              <input
                id="item-title"
                required
                className="w-full bg-surface text-on-surface border border-outline-variant rounded-xl px-md py-[14px] font-body-md text-body-md focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors placeholder:text-on-surface-variant/50"
                placeholder="e.g. Vintage Leather Jacket"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            {/* Category & Condition Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-lg">
              {/* Category */}
              <div>
                <label className="font-label-sm text-[12px] text-on-background block mb-sm font-semibold" htmlFor="item-category">
                  Category <span className="text-error">*</span>
                </label>
                <div className="relative">
                  <select
                    id="item-category"
                    required
                    className="w-full bg-surface text-on-surface border border-outline-variant rounded-xl px-md py-[14px] font-body-md text-body-md focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors appearance-none cursor-pointer"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value="" disabled>Select a category...</option>
                    <option value="electronics">Electronics</option>
                    <option value="home">Home &amp; Garden</option>
                    <option value="fashion">Fashion</option>
                    <option value="motors">Motors</option>
                    <option value="collectibles">Collectibles</option>
                    <option value="videogames">Video Games</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-md pointer-events-none text-on-surface-variant">
                    <span className="material-symbols-outlined text-[20px]">expand_more</span>
                  </div>
                </div>
              </div>

              {/* Condition */}
              <div>
                <label className="font-label-sm text-[12px] text-on-background block mb-sm font-semibold" htmlFor="item-condition">
                  Condition <span className="text-error">*</span>
                </label>
                <div className="relative">
                  <select
                    id="item-condition"
                    required
                    className="w-full bg-surface text-on-surface border border-outline-variant rounded-xl px-md py-[14px] font-body-md text-body-md focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors appearance-none cursor-pointer"
                    value={condition}
                    onChange={(e) => setCondition(e.target.value)}
                  >
                    <option value="" disabled>Select condition...</option>
                    <option value="new">New (Unused)</option>
                    <option value="like-new">Used - Like New</option>
                    <option value="good">Used - Good</option>
                    <option value="fair">Used - Fair</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-md pointer-events-none text-on-surface-variant">
                    <span className="material-symbols-outlined text-[20px]">expand_more</span>
                  </div>
                </div>
              </div>

              {/* Quantity */}
              <div>
                <label className="font-label-sm text-[12px] text-on-background block mb-sm font-semibold" htmlFor="item-quantity">
                  Quantity Available <span className="text-error">*</span>
                </label>
                <input
                  id="item-quantity"
                  required
                  min="1"
                  className="w-full bg-surface text-on-surface border border-outline-variant rounded-xl px-md py-[14px] font-body-md text-body-md focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="font-label-sm text-[12px] text-on-background block mb-sm font-semibold" htmlFor="item-description">
                Description <span className="text-error">*</span>
              </label>
              <textarea
                id="item-description"
                required
                className="w-full bg-surface text-on-surface border border-outline-variant rounded-xl px-md py-[14px] font-body-md text-body-md focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors placeholder:text-on-surface-variant/50 resize-y custom-scrollbar"
                placeholder="Describe your item in detail..."
                rows="5"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </section>

          {/* Section: Pricing */}
          <section className="flex flex-col gap-md">
            <h2 className="font-headline-md text-headline-md text-on-background border-b border-outline-variant/20 pb-sm">
              Pricing
            </h2>
            <div className="bg-secondary-container/10 border border-secondary-container/30 rounded-xl p-lg md:p-xl flex flex-col gap-lg relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-secondary-fixed/5 to-transparent pointer-events-none"></div>
              
              <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-lg">
                <div className="flex-1 w-full md:max-w-[240px]">
                  <label className="font-label-sm text-[12px] text-on-background block mb-sm font-semibold" htmlFor="item-price">
                    Price <span className="text-error">*</span>
                  </label>
                  <div className="relative brand-focus rounded-xl bg-surface-container-lowest">
                    <div className="absolute inset-y-0 left-0 pl-md flex items-center pointer-events-none">
                      <span className="font-price-display text-price-display text-on-surface-variant">$</span>
                    </div>
                    <input
                      id="item-price"
                      required
                      min="0"
                      step="0.01"
                      className="w-full bg-transparent text-on-surface border border-outline-variant rounded-xl pl-[40px] pr-md py-[14px] font-price-display text-price-display focus:ring-0 outline-none transition-colors"
                      placeholder="0.00"
                      type="number"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between w-full md:w-auto md:gap-lg bg-surface-container-lowest py-sm px-md rounded-xl border border-outline-variant shadow-sm shrink-0">
                  <div>
                    <p className="font-body-md text-body-md font-semibold text-on-background">Accept Offers</p>
                    <p className="font-label-sm text-[12px] text-on-surface-variant font-normal">Allow buyers to negotiate</p>
                  </div>
                  {/* Toggle Switch */}
                  <label className="relative inline-flex items-center cursor-pointer ml-lg">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={acceptOffers}
                      onChange={(e) => setAcceptOffers(e.target.checked)}
                    />
                    <div className="w-11 h-6 bg-surface-container-high peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>
              </div>
            </div>
          </section>

          {/* Submit Area */}
          <div className="pt-lg border-t border-surface-container-high mt-sm">
            <button
              type="submit"
              className="w-full bg-primary text-on-primary font-headline-md text-headline-md font-bold py-[16px] px-xl rounded-xl hover:bg-primary/95 transition-all duration-200 active:scale-[0.98] shadow-sm flex items-center justify-center gap-sm cursor-pointer"
            >
              <span>Save Changes</span>
              <span className="material-symbols-outlined text-[24px]">save</span>
            </button>
          </div>
          
        </form>
      </div>
    </div>
  );
}
