import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import SearchResults from './pages/SearchResults';
import ProductDetails from './pages/ProductDetails';
import SellItem from './pages/SellItem';
import EditListing from './pages/EditListing';
import MyPurchases from './pages/MyPurchases';
import Chat from './pages/Chat';
import Checkout from './pages/Checkout';
import EditProfile from './pages/EditProfile';
import SellerProfile from './pages/SellerProfile';
import SupportChat from './pages/SupportChat';

function App() {
  return (
    <AppProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow flex flex-col w-full">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/search" element={<SearchResults />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/sell" element={<SellItem />} />
              <Route path="/edit/:id" element={<EditListing />} />
              <Route path="/purchases" element={<MyPurchases />} />
              <Route path="/chat" element={<Chat />} />
              <Route path="/checkout/:id?" element={<Checkout />} />
              <Route path="/profile/edit" element={<EditProfile />} />
              <Route path="/seller/:sellerId" element={<SellerProfile />} />
              <Route path="/support" element={<SupportChat />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;
