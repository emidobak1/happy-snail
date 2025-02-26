"use client"
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

// Define TypeScript interfaces for our data structures
interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  categories: string[];
}

interface CartItem extends Product {
  quantity: number;
}

// CartCheckoutPage component
const CartCheckoutPage: React.FC = () => {
  // State for cart items
  const [cart, setCart] = useState<CartItem[]>([]);
  // State for checkout process
  const [checkoutStep, setCheckoutStep] = useState<number>(1);
  // State for coupon code
  const [coupon, setCoupon] = useState<string>('');
  const [couponApplied, setCouponApplied] = useState<boolean>(false);
  const [discount, setDiscount] = useState<number>(0);
  // State for form data
  const [formData, setFormData] = useState({
    // Customer information
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    // Shipping information
    address: '',
    city: 'Toronto',
    province: 'ON',
    postalCode: '',
    // Delivery options
    deliveryMethod: 'delivery',
    deliveryDate: '',
    deliveryNote: '',
    // Payment information
    cardNumber: '',
    cardName: '',
    expiry: '',
    cvv: '',
  });
  
  // Load cart from localStorage on component mount
  useEffect(() => {
    // Get cart data from localStorage
    const savedCart = localStorage.getItem('happySnailCart');
    
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        setCart(parsedCart);
      } catch (error) {
        console.error('Failed to parse cart data from localStorage:', error);
        // If there's an error parsing the data, start with an empty cart
        setCart([]);
      }
    }
  }, []);
  
  // Calculate subtotal
  const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  // Calculate delivery fee - based on subtotal
  const deliveryFee = formData.deliveryMethod === 'pickup' ? 0 : (subtotal > 100 ? 0 : 12);
  // Calculate tax (13% HST for Ontario)
  const tax = (subtotal - discount) * 0.13;
  // Calculate total
  const total = subtotal + deliveryFee + tax - discount;
  
  // Handle quantity changes
  const updateQuantity = (id: number, newQuantity: number): void => {
    if (newQuantity < 1) return;
    
    const updatedCart = cart.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    );
    
    setCart(updatedCart);
    // Update localStorage
    localStorage.setItem('happySnailCart', JSON.stringify(updatedCart));
  };
  
  // Remove item from cart
  const removeItem = (id: number): void => {
    const updatedCart = cart.filter(item => item.id !== id);
    setCart(updatedCart);
    
    // Update localStorage
    localStorage.setItem('happySnailCart', JSON.stringify(updatedCart));
  };
  
  // Apply coupon
  const applyCoupon = (): void => {
    // In a real app, you would validate the coupon against a database
    if (coupon.toLowerCase() === 'spring25') {
      // 25% off coupon
      setDiscount(subtotal * 0.25);
      setCouponApplied(true);
    } else if (coupon.toLowerCase() === 'welcome10') {
      // $10 off coupon
      setDiscount(10);
      setCouponApplied(true);
    } else {
      alert('Invalid coupon code');
      setCouponApplied(false);
      setDiscount(0);
    }
  };
  
  // Remove coupon
  const removeCoupon = (): void => {
    setCoupon('');
    setCouponApplied(false);
    setDiscount(0);
  };
  
  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>): void => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  // Handle continue to next step
  const continueToNextStep = (): void => {
    // Validate current step before proceeding
    if (checkoutStep === 1) {
      // Validate cart is not empty
      if (cart.length === 0) {
        alert('Your cart is empty. Please add items before checkout.');
        return;
      }
    } else if (checkoutStep === 2) {
      // Validate customer info
      if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone) {
        alert('Please fill in all customer information fields.');
        return;
      }
      // Basic email validation
      if (!/\S+@\S+\.\S+/.test(formData.email)) {
        alert('Please enter a valid email address.');
        return;
      }
    } else if (checkoutStep === 3) {
      // Validate shipping info if delivery is selected
      if (formData.deliveryMethod === 'delivery') {
        if (!formData.address || !formData.city || !formData.province || !formData.postalCode) {
          alert('Please fill in all shipping information fields.');
          return;
        }
        // Basic postal code validation (Canadian format: A1A 1A1)
        if (!/^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/.test(formData.postalCode)) {
          alert('Please enter a valid Canadian postal code.');
          return;
        }
      }
      // Validate delivery date
      if (!formData.deliveryDate) {
        alert('Please select a delivery date.');
        return;
      }
    }
    
    setCheckoutStep(checkoutStep + 1);
    // Scroll to top when changing steps
    window.scrollTo(0, 0);
  };
  
  // Handle back to previous step
  const goBackToPreviousStep = (): void => {
    setCheckoutStep(checkoutStep - 1);
    // Scroll to top when changing steps
    window.scrollTo(0, 0);
  };
  
  // Handle order submission
  const submitOrder = (): void => {
    // Validate payment information
    if (!formData.cardNumber || !formData.cardName || !formData.expiry || !formData.cvv) {
      alert('Please fill in all payment information fields.');
      return;
    }
    
    // Basic card number validation (16 digits)
    if (!/^\d{16}$/.test(formData.cardNumber.replace(/\s/g, ''))) {
      alert('Please enter a valid card number.');
      return;
    }
    
    // Basic expiry validation (MM/YY format)
    if (!/^\d{2}\/\d{2}$/.test(formData.expiry)) {
      alert('Please enter a valid expiry date in MM/YY format.');
      return;
    }
    
    // Basic CVV validation (3 or 4 digits)
    if (!/^\d{3,4}$/.test(formData.cvv)) {
      alert('Please enter a valid CVV code.');
      return;
    }
    
    // In a real app, you would send the order data to your server/API
    alert('Order submitted successfully! A confirmation email will be sent shortly.');
    
    // Clear the cart after successful order
    setCart([]);
    localStorage.removeItem('happySnailCart');
    
    // Proceed to confirmation
    setCheckoutStep(5);
  };

  // Generate available delivery dates (next 14 days, excluding Sundays and Mondays)
  const getAvailableDates = () => {
    const dates = [];
    const today = new Date();
    
    for (let i = 0; i < 14; i++) {
      const date = new Date();
      date.setDate(today.getDate() + i);
      
      // Skip Sundays (0) and Mondays (1)
      if (date.getDay() !== 0 && date.getDay() !== 1) {
        dates.push(date);
      }
    }
    
    return dates;
  };
  
  const availableDates = getAvailableDates();
  
  // Format date for display
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };
  
  return (
    <div className="min-h-screen bg-white font-sans text-gray-800">
      {/* Header - reuse from main page */}
      <header className="w-full bg-white shadow-md py-2 fixed top-0 z-50">
        <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
          <Link href="/" className="flex items-center text-2xl font-medium text-gray-800">
            <img src="/favico.ico" alt="Happy Snail" className="w-6 h-6 mr-2" />
            Happy Snail
          </Link>
          
          <div className="hidden md:flex space-x-8 items-center">
            <Link href="/#shop" className="text-gray-600 hover:text-gray-900 transition-colors">Shop</Link>
            <Link href="/#about" className="text-gray-600 hover:text-gray-900 transition-colors">About</Link>
            <Link href="/#custom" className="text-gray-600 hover:text-gray-900 transition-colors">Custom</Link>
            <Link href="/#delivery" className="text-gray-600 hover:text-gray-900 transition-colors">Delivery</Link>
            <div className="relative">
              <Link href="/cart" className="text-teal-900 font-medium transition-colors">
                Cart
                <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {cart.length}
                </span>
              </Link>
            </div>
          </div>
        </div>
      </header>
      
      {/* Main content with padding for header */}
      <main className="container mx-auto px-4 md:px-6 pt-28 pb-16">
        {/* Page title */}
        <h1 className="text-3xl md:text-4xl font-light text-center mb-8">
          {checkoutStep === 1 ? 'Your Cart' : 
           checkoutStep === 5 ? 'Order Confirmation' : 
           'Checkout'}
        </h1>
        
        {/* Checkout progress indicator */}
        {checkoutStep > 1 && checkoutStep < 5 && (
          <div className="mb-10 max-w-3xl mx-auto">
            <div className="flex justify-between items-center relative">
              {/* Line connecting steps */}
              <div className="absolute left-0 right-0 top-1/2 h-1 bg-gray-200 -z-10"></div>
              
              {/* Step 1: Cart */}
              <div className="flex flex-col items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm mb-2 ${
                  checkoutStep > 1 ? 'bg-teal-800 text-white' : 'bg-gray-200 text-gray-600'
                }`}>1</div>
                <span className="text-xs md:text-sm text-gray-600">Cart</span>
              </div>
              
              {/* Step 2: Information */}
              <div className="flex flex-col items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm mb-2 ${
                  checkoutStep > 2 ? 'bg-teal-800 text-white' : 
                  checkoutStep === 2 ? 'bg-teal-800 text-white' : 'bg-gray-200 text-gray-600'
                }`}>2</div>
                <span className="text-xs md:text-sm text-gray-600">Information</span>
              </div>
              
              {/* Step 3: Shipping */}
              <div className="flex flex-col items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm mb-2 ${
                  checkoutStep > 3 ? 'bg-teal-800 text-white' : 
                  checkoutStep === 3 ? 'bg-teal-800 text-white' : 'bg-gray-200 text-gray-600'
                }`}>3</div>
                <span className="text-xs md:text-sm text-gray-600">Shipping</span>
              </div>
              
              {/* Step 4: Payment */}
              <div className="flex flex-col items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm mb-2 ${
                  checkoutStep === 4 ? 'bg-teal-800 text-white' : 'bg-gray-200 text-gray-600'
                }`}>4</div>
                <span className="text-xs md:text-sm text-gray-600">Payment</span>
              </div>
            </div>
          </div>
        )}
        
        <div className="flex flex-col md:flex-row gap-8">
          {/* Main checkout form area */}
          <div className={`${checkoutStep === 1 ? 'w-full' : 'md:w-2/3'}`}>
            {/* Step 1: Cart Items */}
            {checkoutStep === 1 && (
              <>
                {cart.length > 0 ? (
                  <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                    {/* Cart items */}
                    <div className="divide-y divide-gray-100">
                      {cart.map((item) => (
                        <div key={item.id} className="p-4 md:p-6 flex flex-col sm:flex-row items-start sm:items-center">
                          {/* Product image */}
                          <div className="w-20 h-20 md:w-24 md:h-24 flex-shrink-0 bg-gray-50 rounded-md overflow-hidden mr-4 mb-4 sm:mb-0">
                            <img 
                              src={item.image} 
                              alt={item.name} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                          
                          {/* Product info */}
                          <div className="flex-1">
                            <h3 className="text-lg font-medium text-gray-900">{item.name}</h3>
                            <p className="text-sm text-gray-500 line-clamp-1">{item.description}</p>
                            <div className="mt-2 flex flex-wrap items-center gap-4">
                              {/* Quantity selector */}
                              <div className="flex items-center border rounded-full overflow-hidden">
                                <button 
                                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                  className="w-8 h-8 flex items-center justify-center text-gray-500 hover:bg-gray-100"
                                >
                                  -
                                </button>
                                <span className="w-8 text-center">{item.quantity}</span>
                                <button 
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                  className="w-8 h-8 flex items-center justify-center text-gray-500 hover:bg-gray-100"
                                >
                                  +
                                </button>
                              </div>
                              
                              {/* Remove button */}
                              <button 
                                onClick={() => removeItem(item.id)}
                                className="text-sm text-gray-500 hover:text-gray-700"
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                          
                          {/* Price */}
                          <div className="mt-4 sm:mt-0 sm:ml-4">
                            <p className="text-lg font-medium text-gray-900">${(item.price * item.quantity).toFixed(2)}</p>
                            <p className="text-sm text-gray-500">${item.price.toFixed(2)} each</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    {/* Coupon code */}
                    <div className="p-4 md:p-6 bg-gray-50 border-t border-gray-100">
                      <div className="flex flex-col md:flex-row gap-2 md:items-center">
                        <div className="flex-1">
                          <label htmlFor="coupon" className="block text-sm font-medium text-gray-700 mb-1">
                            Promo Code
                          </label>
                          <div className="flex gap-2">
                            <input
                              type="text"
                              id="coupon"
                              name="coupon"
                              value={coupon}
                              onChange={(e) => setCoupon(e.target.value)}
                              disabled={couponApplied}
                              placeholder="Enter promo code"
                              className="px-4 py-2 border border-gray-300 rounded-full w-full focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500"
                            />
                            {couponApplied ? (
                              <button
                                onClick={removeCoupon}
                                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 transition-colors whitespace-nowrap"
                              >
                                Remove
                              </button>
                            ) : (
                              <button
                                onClick={applyCoupon}
                                disabled={!coupon.trim()}
                                className="px-4 py-2 bg-teal-800 text-white rounded-full hover:bg-teal-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed whitespace-nowrap"
                              >
                                Apply
                              </button>
                            )}
                          </div>
                          {couponApplied && (
                            <p className="text-sm text-green-600 mt-1">
                              Coupon applied: ${discount.toFixed(2)} off
                            </p>
                          )}
                          <p className="text-xs text-gray-500 mt-1">
                            Try &quot;SPRING25&quot; for 25% off or &quot;WELCOME10&quot; for $10 off
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-16 bg-white rounded-lg shadow-sm border border-gray-100">
                    <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
                    </svg>
                    <h2 className="text-xl font-medium text-gray-900 mb-2">Your cart is empty</h2>
                    <p className="text-gray-500 mb-6">Looks like you haven&apos;t added any items yet.</p>
                    <Link href="/#shop" className="px-6 py-3 bg-teal-900 text-white rounded-full hover:bg-teal-800 transition-colors inline-block">
                      Continue Shopping
                    </Link>
                  </div>
                )}
                
                {/* Continue shopping and checkout buttons */}
                {cart.length > 0 && (
                  <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-between">
                    <Link href="/#shop" className="px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-full hover:bg-gray-50 transition-colors inline-block text-center">
                      ← Continue Shopping
                    </Link>
                    <button 
                      onClick={continueToNextStep}
                      className="px-8 py-3 bg-teal-900 text-white rounded-full hover:bg-teal-800 transition-colors"
                    >
                      Proceed to Checkout
                    </button>
                  </div>
                )}
              </>
            )}
            
            {/* Step 2: Customer Information */}
            {checkoutStep === 2 && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden p-6">
                <h2 className="text-xl font-medium text-gray-900 mb-6">Customer Information</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                      First Name *
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                      className="px-4 py-2 border border-gray-300 rounded-full w-full focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                      className="px-4 py-2 border border-gray-300 rounded-full w-full focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="px-4 py-2 border border-gray-300 rounded-full w-full focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      placeholder="(416) 555-1234"
                      className="px-4 py-2 border border-gray-300 rounded-full w-full focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500"
                    />
                  </div>
                </div>
                
                <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-between">
                  <button 
                    onClick={goBackToPreviousStep}
                    className="px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-full hover:bg-gray-50 transition-colors"
                  >
                    ← Back to Cart
                  </button>
                  <button 
                    onClick={continueToNextStep}
                    className="px-8 py-3 bg-teal-900 text-white rounded-full hover:bg-teal-800 transition-colors"
                  >
                    Continue to Shipping
                  </button>
                </div>
              </div>
            )}
            
            {/* Step 3: Shipping & Delivery */}
            {checkoutStep === 3 && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden p-6">
                <h2 className="text-xl font-medium text-gray-900 mb-6">Shipping & Delivery</h2>
                
                {/* Delivery Method */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Delivery Method
                  </label>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <label className={`border rounded-lg p-4 flex items-start cursor-pointer ${
                      formData.deliveryMethod === 'delivery' ? 'border-teal-500 bg-teal-50' : 'border-gray-200'
                    }`}>
                      <input
                        type="radio"
                        name="deliveryMethod"
                        value="delivery"
                        checked={formData.deliveryMethod === 'delivery'}
                        onChange={handleInputChange}
                        className="mt-1 mr-3"
                      />
                      <div>
                        <span className="block font-medium">Delivery</span>
                        <span className="block text-sm text-gray-500 mt-1">
                          {subtotal > 100 ? 'Free delivery on orders over $100' : 'From $12'}
                        </span>
                      </div>
                    </label>
                    
                    <label className={`border rounded-lg p-4 flex items-start cursor-pointer ${
                      formData.deliveryMethod === 'pickup' ? 'border-teal-500 bg-teal-50' : 'border-gray-200'
                    }`}>
                      <input
                        type="radio"
                        name="deliveryMethod"
                        value="pickup"
                        checked={formData.deliveryMethod === 'pickup'}
                        onChange={handleInputChange}
                        className="mt-1 mr-3"
                      />
                      <div>
                        <span className="block font-medium">Store Pickup</span>
                        <span className="block text-sm text-gray-500 mt-1">
                          Free at 34 Wolfrey Avenue
                        </span>
                      </div>
                    </label>
                  </div>
                </div>
                
                {/* Shipping Address - only show if delivery is selected */}
                {formData.deliveryMethod === 'delivery' && (
                  <div className="mb-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Shipping Address</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="md:col-span-2">
                        <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                          Street Address *
                        </label>
                        <input
                          type="text"
                          id="address"
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                          required
                          className="px-4 py-2 border border-gray-300 rounded-full w-full focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                          City *
                        </label>
                        <input
                          type="text"
                          id="city"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          required
                          className="px-4 py-2 border border-gray-300 rounded-full w-full focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="province" className="block text-sm font-medium text-gray-700 mb-1">
                            Province *
                        </label>
                        <input
                            type="text"
                            id="province"
                            name="province"
                            value="Ontario"
                            readOnly
                            className="px-4 py-2 border border-gray-300 rounded-full w-full focus:outline-none bg-gray-50 text-gray-700"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700 mb-1">
                          Postal Code *
                        </label>
                        <input
                          type="text"
                          id="postalCode"
                          name="postalCode"
                          value={formData.postalCode}
                          onChange={handleInputChange}
                          required
                          placeholder="A1A 1A1"
                          className="px-4 py-2 border border-gray-300 rounded-full w-full focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500"
                        />
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Delivery Date Selection */}
                <div className="mb-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    {formData.deliveryMethod === 'delivery' ? 'Delivery Date' : 'Pickup Date'}
                  </h3>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                    {availableDates.map((date, index) => (
                      <label 
                        key={index} 
                        className={`border rounded-lg p-3 flex flex-col items-center cursor-pointer ${
                          formData.deliveryDate === formatDate(date) ? 'border-teal-500 bg-teal-50' : 'border-gray-200'
                        }`}
                      >
                        <input
                          type="radio"
                          name="deliveryDate"
                          value={formatDate(date)}
                          checked={formData.deliveryDate === formatDate(date)}
                          onChange={handleInputChange}
                          className="sr-only"
                        />
                        <span className="block font-medium text-center">{formatDate(date)}</span>
                        
                        {/* Delivery time slot info */}
                        <span className="text-xs text-gray-500 mt-1">
                          {formData.deliveryMethod === 'delivery' ? '10am - 6pm' : '10am - 6pm'}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
                
                {/* Delivery Note */}
                <div className="mb-6">
                  <label htmlFor="deliveryNote" className="block text-sm font-medium text-gray-700 mb-1">
                    {formData.deliveryMethod === 'delivery' ? 'Delivery Instructions (Optional)' : 'Pickup Note (Optional)'}
                  </label>
                  <textarea
                    id="deliveryNote"
                    name="deliveryNote"
                    value={formData.deliveryNote}
                    onChange={handleInputChange}
                    placeholder={formData.deliveryMethod === 'delivery' ? 'E.g., Doorman, gate code, etc.' : 'Any special instructions for pickup'}
                    rows={3}
                    className="px-4 py-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500"
                  />
                </div>
                
                <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-between">
                  <button 
                    onClick={goBackToPreviousStep}
                    className="px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-full hover:bg-gray-50 transition-colors"
                  >
                    ← Back to Information
                  </button>
                  <button 
                    onClick={continueToNextStep}
                    className="px-8 py-3 bg-teal-900 text-white rounded-full hover:bg-teal-800 transition-colors"
                  >
                    Continue to Payment
                  </button>
                </div>
              </div>
            )}
            
            {/* Step 4: Payment */}
            {checkoutStep === 4 && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden p-6">
                <h2 className="text-xl font-medium text-gray-900 mb-6">Payment Information</h2>
                
                <div className="mb-8">
                  <div className="flex justify-center mb-4">
                    <div className="flex space-x-2">
                      <img src="/visa.svg" alt="Visa" className="h-8" />
                      <img src="/mastercard.svg" alt="Mastercard" className="h-8" />
                      <img src="/amex.svg" alt="American Express" className="h-8" />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
                        Card Number *
                      </label>
                      <input
                        type="text"
                        id="cardNumber"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                        required
                        placeholder="1234 5678 9012 3456"
                        maxLength={19}
                        className="px-4 py-2 border border-gray-300 rounded-full w-full focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="cardName" className="block text-sm font-medium text-gray-700 mb-1">
                        Name on Card *
                      </label>
                      <input
                        type="text"
                        id="cardName"
                        name="cardName"
                        value={formData.cardName}
                        onChange={handleInputChange}
                        required
                        className="px-4 py-2 border border-gray-300 rounded-full w-full focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500"
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="expiry" className="block text-sm font-medium text-gray-700 mb-1">
                          Expiry Date *
                        </label>
                        <input
                          type="text"
                          id="expiry"
                          name="expiry"
                          value={formData.expiry}
                          onChange={handleInputChange}
                          required
                          placeholder="MM/YY"
                          maxLength={5}
                          className="px-4 py-2 border border-gray-300 rounded-full w-full focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">
                          CVV *
                        </label>
                        <input
                          type="text"
                          id="cvv"
                          name="cvv"
                          value={formData.cvv}
                          onChange={handleInputChange}
                          required
                          placeholder="123"
                          maxLength={4}
                          className="px-4 py-2 border border-gray-300 rounded-full w-full focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 bg-gray-50 rounded-lg mb-6">
                  <p className="text-sm text-gray-600">
                    Your payment information is encrypted and secure. We never store your full credit card details.
                  </p>
                </div>
                
                <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-between">
                  <button 
                    onClick={goBackToPreviousStep}
                    className="px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-full hover:bg-gray-50 transition-colors"
                  >
                    ← Back to Shipping
                  </button>
                  <button 
                    onClick={submitOrder}
                    className="px-8 py-3 bg-teal-900 text-white rounded-full hover:bg-teal-800 transition-colors"
                  >
                    Complete Order
                  </button>
                </div>
              </div>
            )}
            
            {/* Step 5: Order Confirmation */}
            {checkoutStep === 5 && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden p-6 text-center">
                <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-teal-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                
                <h2 className="text-2xl font-medium text-gray-900 mb-2">Thank You for Your Order!</h2>
                <p className="text-gray-600 mb-6">
                  Order #{Math.floor(Math.random() * 10000).toString().padStart(4, '0')}
                </p>
                
                <div className="max-w-md mx-auto mb-8">
                  <p className="text-gray-600">
                    A confirmation email has been sent to <span className="font-medium">{formData.email}</span>. We&apos;ll notify you when your order ships.
                  </p>
                </div>
                
                <div className="p-4 mb-6 rounded-lg bg-gray-50 max-w-md mx-auto text-left">
                  <h3 className="font-medium text-gray-900 mb-2">
                    {formData.deliveryMethod === 'delivery' ? 'Delivery Details' : 'Pickup Details'}
                  </h3>
                  <p className="text-gray-600 text-sm mb-1">
                    <span className="font-medium">Date:</span> {formData.deliveryDate}
                  </p>
                  {formData.deliveryMethod === 'delivery' ? (
                    <p className="text-gray-600 text-sm">
                      <span className="font-medium">Address:</span> {formData.address}, {formData.city}, {formData.province} {formData.postalCode}
                    </p>
                  ) : (
                    <p className="text-gray-600 text-sm">
                      <span className="font-medium">Location:</span> 34 Wolfrey Avenue, Toronto, ON M4K 1K8
                    </p>
                  )}
                </div>
                
                <Link 
                  href="/"
                  className="px-8 py-3 bg-teal-900 text-white rounded-full hover:bg-teal-800 transition-colors inline-block"
                >
                  Return to Home
                </Link>
              </div>
            )}
          </div>
          
          {/* Order Summary Sidebar - Only show on steps 2-4 */}
          {checkoutStep > 1 && checkoutStep < 5 && (
            <div className="md:w-1/3">
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden p-6 sticky top-28">
                <h2 className="text-xl font-medium text-gray-900 mb-6">Order Summary</h2>
                
                {/* Cart items summary */}
                <div className="divide-y divide-gray-100 mb-6">
                  {cart.map((item) => (
                    <div key={item.id} className="flex items-center py-3">
                      <div className="relative flex-shrink-0 mr-3">
                        <div className="w-16 h-16 rounded-md overflow-hidden bg-gray-50">
                          <img 
                            src={item.image} 
                            alt={item.name} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="absolute -top-2 -right-2 w-5 h-5 bg-gray-200 text-gray-800 rounded-full text-xs flex items-center justify-center">
                          {item.quantity}
                        </div>
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-medium text-gray-900 truncate">{item.name}</h3>
                      </div>
                      
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">${(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Cost breakdown */}
                <div className="space-y-2 text-sm mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">${subtotal.toFixed(2)}</span>
                  </div>
                  
                  {discount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount</span>
                      <span>-${discount.toFixed(2)}</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium">
                      {deliveryFee === 0 ? 'Free' : `$${deliveryFee.toFixed(2)}`}
                    </span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax (13% HST)</span>
                    <span className="font-medium">${tax.toFixed(2)}</span>
                  </div>
                  
                  <div className="border-t border-gray-200 pt-2 mt-2 flex justify-between">
                    <span className="text-base font-medium text-gray-900">Total</span>
                    <span className="text-base font-medium text-gray-900">${total.toFixed(2)}</span>
                  </div>
                </div>
                
                {/* Secure checkout badge */}
                <div className="flex items-center justify-center border-t border-gray-200 pt-4">
                  <svg className="w-4 h-4 text-gray-500 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                  </svg>
                  <span className="text-xs text-gray-500">Secure Checkout</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      
      {/* Footer */}
      <footer className="bg-white py-12 mt-12 border-t border-gray-200">
        <div className="container mx-auto px-4 md:px-6">          
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm mb-4 md:mb-0">
              © 2025 Happy Snail Flowers. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-500 hover:text-gray-900 transition-colors text-sm">Privacy Policy</a>
              <a href="#" className="text-gray-500 hover:text-gray-900 transition-colors text-sm">Terms of Service</a>
              <a href="#" className="text-gray-500 hover:text-gray-900 transition-colors text-sm">Shipping Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CartCheckoutPage;