import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-[#0052ff] to-[#003dbb] text-white font-body-md text-body-md w-full py-xl px-lg grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-lg mt-auto">
      <div className="col-span-2 lg:col-span-2 flex flex-col gap-sm">
        <div className="font-headline-sm text-headline-sm font-black text-white">OmniMarket</div>
        <p className="text-white/80">The high-velocity marketplace for secure, fast, and trusted local commerce.</p>
      </div>
      <div className="flex flex-col gap-sm">
        <span className="font-bold text-white">Links</span>
        <Link className="text-white/80 hover:text-white transition-colors" to="/">Shop Home</Link>
        <Link className="text-white/80 hover:text-white transition-colors" to="/sell">Sell an Item</Link>
        <Link className="text-white/80 hover:text-white transition-colors" to="/purchases">My Purchases</Link>
      </div>
      <div className="flex flex-col gap-sm">
        <span className="font-bold text-white">Support</span>
        <a className="text-white/80 hover:text-white transition-colors" href="#">Help Center</a>
        <a className="text-white/80 hover:text-white transition-colors" href="#">Privacy Policy</a>
        <a className="text-white/80 hover:text-white transition-colors" href="#">Terms of Service</a>
      </div>
      <div className="col-span-2 lg:col-span-6 border-t border-white/20 pt-md mt-md text-center text-white/70 text-[13px]">
        © {new Date().getFullYear()} OmniMarket Inc. All rights reserved.
      </div>
    </footer>
  );
}
