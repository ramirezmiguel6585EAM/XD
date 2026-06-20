import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

export default function EditProfile() {
  const { currentUser, updateUserProfile } = useContext(AppContext);
  const navigate = useNavigate();

  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [avatar, setAvatar] = useState('');
  const [location, setLocation] = useState('');
  const [bio, setBio] = useState('');

  useEffect(() => {
    if (currentUser) {
      setName(currentUser.name || '');
      setEmail(currentUser.email || '');
      setAvatar(currentUser.avatar || '');
      setLocation(currentUser.location || '');
      setBio(currentUser.bio || '');
    }
  }, [currentUser]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name.trim() || !email.trim()) {
      alert("Name and Email are required fields.");
      return;
    }

    updateUserProfile({
      name: name.trim(),
      email: email.trim(),
      avatar: avatar.trim() || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=60",
      location: location.trim(),
      bio: bio.trim()
    });

    navigate(`/seller/${currentUser.id}`);
  };

  return (
    <div className="flex-1 w-full px-md py-xl md:px-lg md:py-[48px] max-w-container-max mx-auto flex justify-center">
      <div className="w-full max-w-[800px] bg-surface-container-lowest rounded-xl shadow-[0_10px_20px_-5px_rgba(28,30,33,0.12)] border border-outline-variant/30 overflow-hidden">
        
        <div className="p-lg md:p-xl border-b border-surface-container-high bg-surface-bright/50 flex justify-between items-center">
          <div>
            <h1 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-background">
              Edit Profile
            </h1>
            <p className="font-body-md text-body-md text-on-surface-variant mt-xs">
              Update your public profile information.
            </p>
          </div>
          <Link to="/" className="text-primary font-semibold hover:underline text-body-md">
            Cancel
          </Link>
        </div>

        <form onSubmit={handleSubmit} className="p-lg md:p-xl flex flex-col gap-lg">
          {/* Avatar Preview */}
          <div className="flex flex-col sm:flex-row items-center gap-md bg-surface-container-low/50 p-md rounded-xl border border-outline-variant/20 mb-xs">
            <div className="w-20 h-20 rounded-full overflow-hidden bg-surface-container border border-outline-variant/30 shrink-0">
              <img className="w-full h-full object-cover" src={avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=60"} alt="Avatar Preview" />
            </div>
            <div className="flex-grow w-full">
              <label className="font-label-sm text-[12px] text-on-background block mb-xs font-semibold">Avatar Image URL</label>
              <input
                type="url"
                className="w-full bg-surface text-on-surface border border-outline-variant rounded-xl px-md py-[10px] text-body-md focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                placeholder="https://images.unsplash.com/photo-..."
                value={avatar}
                onChange={(e) => setAvatar(e.target.value)}
              />
            </div>
          </div>

          {/* Name */}
          <div>
            <label className="font-label-sm text-[12px] text-on-background block mb-xs font-semibold">Display Name *</label>
            <input
              required
              type="text"
              className="w-full bg-surface text-on-surface border border-outline-variant rounded-xl px-md py-[10px] text-body-md focus:border-primary focus:ring-1 focus:ring-primary outline-none"
              placeholder="e.g. John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* Email */}
          <div>
            <label className="font-label-sm text-[12px] text-on-background block mb-xs font-semibold">Email Address *</label>
            <input
              required
              type="email"
              className="w-full bg-surface text-on-surface border border-outline-variant rounded-xl px-md py-[10px] text-body-md focus:border-primary focus:ring-1 focus:ring-primary outline-none"
              placeholder="john@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Location */}
          <div>
            <label className="font-label-sm text-[12px] text-on-background block mb-xs font-semibold">Location</label>
            <input
              type="text"
              className="w-full bg-surface text-on-surface border border-outline-variant rounded-xl px-md py-[10px] text-body-md focus:border-primary focus:ring-1 focus:ring-primary outline-none"
              placeholder="e.g. Brooklyn, NY"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>

          {/* Bio */}
          <div>
            <label className="font-label-sm text-[12px] text-on-background block mb-xs font-semibold">Bio</label>
            <textarea
              className="w-full bg-surface text-on-surface border border-outline-variant rounded-xl px-md py-[10px] text-body-md focus:border-primary focus:ring-1 focus:ring-primary outline-none custom-scrollbar"
              placeholder="Tell buyers about yourself, your preferred pickup zones, etc."
              rows="4"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
          </div>

          {/* Save Button */}
          <div className="pt-md border-t border-surface-container-high mt-sm flex justify-end">
            <button
              type="submit"
              className="bg-primary text-on-primary font-bold px-xl py-sm rounded-xl hover:bg-primary/95 active:scale-95 transition-all text-body-md shadow-sm cursor-pointer"
            >
              Save Profile Changes
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
