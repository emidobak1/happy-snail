"use client"
import React, { useState, useEffect } from 'react';

// Instagram Feed Component
interface InstagramPost {
  id: string;
  imageUrl: string;
  caption: string;
  permalink: string;
  timestamp: string;
}

interface InstagramFeedProps {
  username: string;
}

const InstagramFeed: React.FC<InstagramFeedProps> = ({ username }) => {
  const [posts, setPosts] = useState<InstagramPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    // This would be where you would fetch from Instagram API in a real implementation
    // For demo purposes, we'll use placeholder data
    const fetchInstagramPosts = async () => {
      try {
        setLoading(true);
        
        // In a real implementation, you would use something like:
        // const response = await fetch(`your-instagram-api-endpoint/${username}`);
        // const data = await response.json();
        
        // Mock data - in production, replace with actual API call
        const mockPosts: InstagramPost[] = [
          {
            id: '1',
            imageUrl: '/img1.png',
            caption: 'Our new spring collection has arrived! 🌸 #TorontoFlorist #SpringFlowers',
            permalink: 'https://instagram.com/p/mock1',
            timestamp: '2025-02-20T12:00:00Z'
          },
          {
            id: '2',
            imageUrl: '/img2.png',
            caption: 'Beautiful wedding arrangement for Sarah & Michael\'s special day 💍 #WeddingFlowers',
            permalink: 'https://instagram.com/p/mock2',
            timestamp: '2025-02-18T15:30:00Z'
          },
          {
            id: '3',
            imageUrl: '/img3.png',
            caption: 'Behind the scenes at our Ossington studio today! #FloristLife',
            permalink: 'https://instagram.com/p/mock3',
            timestamp: '2025-02-15T09:45:00Z'
          },
          {
            id: '4',
            imageUrl: '/img4.png',
            caption: 'Our dried flower collection is perfect for long-lasting beauty. #SustainableFlowers',
            permalink: 'https://instagram.com/p/mock4',
            timestamp: '2025-02-12T14:20:00Z'
          },
          {
            id: '5',
            imageUrl: '/img5.png',
            caption: 'Last chance to order our Valentine\'s Day special arrangements! #LoveIsInTheAir',
            permalink: 'https://instagram.com/p/mock5',
            timestamp: '2025-02-10T11:15:00Z'
          },
          {
            id: '6',
            imageUrl: '/img6.png',
            caption: 'Fresh flowers just arrived from our local farms! #FreshFlowers #LocallySourced',
            permalink: 'https://instagram.com/p/mock6',
            timestamp: '2025-02-08T16:40:00Z'
          }
        ];
        
        // Simulate API delay
        setTimeout(() => {
          setPosts(mockPosts);
          setLoading(false);
        }, 1000);
        
      } catch (err) {
        setError('Failed to fetch Instagram posts');
        setLoading(false);
        console.error('Instagram fetch error:', err);
      }
    };
    
    fetchInstagramPosts();
  }, [username]);
  
  if (loading) {
    return (
      <div className="w-full grid place-items-center py-12">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-8 w-8 border-4 border-gray-300 border-t-gray-800 rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-500">Loading latest posts...</p>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="w-full text-center py-8">
        <p className="text-gray-500">{error}</p>
        <p className="mt-2">Please check our Instagram directly at @{username}</p>
      </div>
    );
  }
  
  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {posts.slice(0, 6).map((post) => (
          <a 
            key={post.id} 
            href={post.permalink} 
            target="_blank" 
            rel="noopener noreferrer"
            className="group relative overflow-hidden rounded-lg"
          >
            <img 
              src={post.imageUrl} 
              alt={post.caption} 
              className="w-full aspect-square object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
              <div className="text-white p-4 text-center">
                <svg className="w-8 h-8 mx-auto mb-2" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.254 1.216.598 1.772 1.153.509.5.902 1.105 1.153 1.772.247.637.415 1.363.465 2.428.047 1.066.06 1.405.06 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.218 1.79-.465 2.428a4.883 4.883 0 01-1.153 1.772c-.5.508-1.105.902-1.772 1.153-.637.247-1.363.415-2.428.465-1.066.047-1.405.06-4.122.06-2.717 0-3.056-.01-4.122-.06-1.065-.05-1.79-.218-2.428-.465a4.89 4.89 0 01-1.772-1.153 4.904 4.904 0 01-1.153-1.772c-.247-.637-.415-1.363-.465-2.428C2.013 15.056 2 14.717 2 12c0-2.717.01-3.056.06-4.122.05-1.066.217-1.79.465-2.428a4.88 4.88 0 011.153-1.772A4.897 4.897 0 015.45 2.525c.638-.247 1.362-.415 2.428-.465C8.944 2.013 9.283 2 12 2zm0 1.802c-2.67 0-2.986.01-4.04.059-.976.045-1.505.207-1.858.344-.466.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 4.041 0 2.691.01 3.018.058 4.041.045.976.207 1.505.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058 2.67 0 2.986-.01 4.04-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.352.3-.882.344-1.857.048-1.055.058-1.37.058-4.041 0-2.67-.01-2.986-.058-4.04-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-4.04-.058zm.001 3.06a5.14 5.14 0 110 10.279 5.14 5.14 0 010-10.28zm0 8.474a3.334 3.334 0 100-6.668 3.334 3.334 0 000 6.668zm6.538-8.682a1.2 1.2 0 11-2.4 0 1.2 1.2 0 012.4 0z" />
                </svg>
                <span className="text-sm">View Post</span>
              </div>
            </div>
          </a>
        ))}
      </div>
      
      <div className="mt-6">
        <div className="flex items-center justify-center animate-pulse">
          <div className="h-1 w-1 rounded-full bg-gray-400 mx-1"></div>
          <div className="h-1 w-1 rounded-full bg-gray-400 mx-1"></div>
          <div className="h-1 w-1 rounded-full bg-gray-400 mx-1"></div>
        </div>
      </div>
    </div>
  );
};

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

interface Testimonial {
  id: number;
  text: string;
  author: string;
  location: string;
}

interface Category {
  id: string;
  name: string;
}

const HappySnailWebsite: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = (): void => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = (): void => {
    setIsMenuOpen(!isMenuOpen);
  };

  const openModal = (product: Product): void => {
    setSelectedProduct(product);
    setQuantity(1);
    setIsModalOpen(true);
  };

  const closeModal = (): void => {
    setIsModalOpen(false);
  };

  const addToCart = (): void => {
    if (!selectedProduct) return;
    
    const newItem: CartItem = {
      ...selectedProduct,
      quantity,
    };
    setCart([...cart, newItem]);
    closeModal();
  };

  const incrementQuantity = (): void => {
    setQuantity(quantity + 1);
  };

  const decrementQuantity = (): void => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const filterProducts = (category: string): void => {
    setActiveCategory(category);
  };

  const products: Product[] = [
    {
      id: 1,
      name: "Pastel Dream",
      price: 65,
      description: "A soft and dreamy arrangement of pastel roses, ranunculus, and seasonal foliage. Perfect for birthdays or just because.",
      image: "/sc1.png",
      categories: ["bestseller", "birthday", "congratulations"]
    },
    {
      id: 2,
      name: "Elegant White",
      price: 75,
      description: "Inspired by cottage gardens, this lush arrangement features garden roses, dahlias, and wildflowers.",
      image: "/sc2.png",
      categories: ["premium", "anniversary", "congratulations"]
    },
    {
      id: 3,
      name: "Wild Garden",
      price: 85,
      description: "A sophisticated all-white arrangement featuring lilies, roses, and delicate texture. Perfect for weddings or formal events.",
      image: "/sc3.png",
      categories: ["wedding"]
    },
    {
      id: 4,
      name: "Summer Sunset",
      price: 65,
      description: "Warm-toned blooms in sunset hues of orange, coral, and peach. Captures the essence of long summer evenings.",
      image: "/sc4.png",
      categories: ["bestseller", "congratulations"]
    },
    {
      id: 5,
      name: "Verdant Bliss",
      price: 70,
      description: "A texture-rich arrangement featuring unusual foliage, ferns, and architectural flowers. Modern and statement-making.",
      image: "/sc5.png",
      categories: ["premium", "house-warming"]
    },
    {
      id: 6,
      name: "Petite Posy",
      price: 45,
      description: "Our smaller signature arrangement, perfect for office desks or compact spaces. Changes seasonally.",
      image: "/sc6.png",
      categories: ["bestseller", "congratulations", "birthday"]
    },
    {
      id: 7,
      name: "Exotic Dream",
      price: 95,
      description: "Our smaller signature arrangement, perfect for office desks or compact spaces. Changes seasonally.",
      image: "/sc7.png",
      categories: ["bestseller", "congratulations", "birthday"]
    },
    {
      id: 8,
      name: "Japanese Spring",
      price: 85,
      description: "Our smaller signature arrangement, perfect for office desks or compact spaces. Changes seasonally.",
      image: "/sc8.png",
      categories: ["bestseller", "congratulations", "birthday"]
    },
    {
      id: 9,
      name: "Summer Bloom",
      price: 100,
      description: "Our smaller signature arrangement, perfect for office desks or compact spaces. Changes seasonally.",
      image: "/sc9.png",
      categories: ["bestseller", "wedding", "birthday"]
    }
  ];

  const categories: Category[] = [
    { id: 'all', name: 'All' },
    { id: 'bestseller', name: 'Bestsellers' },
    { id: 'premium', name: 'Premium' },
    { id: 'birthday', name: 'Birthday' },
    { id: 'wedding', name: 'Wedding' },
    { id: 'congratulations', name: 'Congratulations' }
  ];

  const filteredProducts = activeCategory === 'all'
    ? products
    : products.filter(product => product.categories.includes(activeCategory));

  const testimonials: Testimonial[] = [
    {
      id: 1,
      text: "The arrangement was even more beautiful than the photos. Fresh flowers, timely delivery, and amazing customer service.",
      author: "Sarah M.",
      location: "Yorkville, Toronto"
    },
    {
      id: 2,
      text: "Happy Snail's unique style sets them apart from other Toronto florists. I've been a repeat customer for over a year now.",
      author: "Michael K.",
      location: "The Annex, Toronto"
    },
    {
      id: 3,
      text: "My wedding flowers were absolute perfection. They understood my vision completely and executed it flawlessly.",
      author: "Jessica T.",
      location: "Leslieville, Toronto"
    }
  ];

  return (
    <div className="min-h-screen bg-white font-sans text-gray-800">
      {/* Header */}
      <header className={`w-full fixed top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'}`}>
        <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
          <a href="#" className="flex items-center text-2xl font-meduim text-gray-800">
            <img src="/favico.ico" alt="" className="w-6 h-6 mr-2" />
            Happy Snail
          </a>
          
          <div className="hidden md:flex space-x-8 items-center">
            <a href="#shop" className="text-gray-600 hover:text-gray-900 transition-colors">Shop</a>
            <a href="#about" className="text-gray-600 hover:text-gray-900 transition-colors">About</a>
            <a href="#custom" className="text-gray-600 hover:text-gray-900 transition-colors">Custom</a>
            <a href="#delivery" className="text-gray-600 hover:text-gray-900 transition-colors">Delivery</a>
            <div className="relative">
              <a href="#cart" className="text-gray-600 hover:text-gray-900 transition-colors">
                Cart
                <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {cart.length}
                </span>
              </a>
            </div>
          </div>
          
          <button 
            className="md:hidden text-gray-800 focus:outline-none"
            onClick={toggleMenu}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
        
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white w-full py-4 px-6 shadow-lg">
            <div className="flex flex-col space-y-4">
              <a href="#shop" className="text-gray-600 hover:text-gray-900 transition-colors" onClick={() => setIsMenuOpen(false)}>Shop</a>
              <a href="#about" className="text-gray-600 hover:text-gray-900 transition-colors" onClick={() => setIsMenuOpen(false)}>About</a>
              <a href="#custom" className="text-gray-600 hover:text-gray-900 transition-colors" onClick={() => setIsMenuOpen(false)}>Custom</a>
              <a href="#delivery" className="text-gray-600 hover:text-gray-900 transition-colors" onClick={() => setIsMenuOpen(false)}>Delivery</a>
              <a href="#cart" className="text-gray-600 hover:text-gray-900 transition-colors" onClick={() => setIsMenuOpen(false)}>
                Cart ({cart.length})
              </a>
            </div>
          </div>
        )}
      </header>
      
      {/* Hero Section */}
      <section className="pt-28 md:pt-36 pb-16 md:pb-24 relative">
        {/* Container for the text content */}
        <div className="container mx-auto px-4 md:px-6">
          <div className="md:max-w-xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light leading-tight mb-6">
              Artisanal Florals for Toronto&apos;s<br /> 
              <span className="text-teal-800 font-medium">Modern Romantics</span>
            </h1>
            <p className="text-gray-600 mb-8 text-lg">
              Locally sourced, sustainably crafted flower arrangements delivered across the Greater Toronto Area.
            </p>
            <div className="flex space-x-4">
              <a href="#shop" className="px-8 py-3 bg-teal-900 text-white rounded-full hover:bg-gray-800 transition-colors">
                Shop Now
              </a>
              <a href="#custom" className="px-8 py-3 bg-transparent border border-gray-300 text-gray-800 rounded-full hover:bg-gray-100 transition-colors">
                Custom Order
              </a>
            </div>
          </div>
        </div>
        
        {/* Absolutely positioned image on the right */}
        <div className="hidden md:block absolute top-1/2 right-0 transform -translate-y-1/2 w-1/2 max-w-xl h-auto z-10">
          <img 
            src="/bg1.png" 
            alt="Floral arrangement" 
            className="w-full h-auto object-contain"
          />
        </div>
        
        {/* Mobile-only image (shown below text on small screens) */}
        <div className="md:hidden w-full mt-8">
          <img 
            src="/bg1.png" 
            alt="Floral arrangement" 
            className="w-full h-auto object-contain"
          />
        </div>
      </section>
      
      {/* Shop Section */}
      <section id="shop" className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl md:text-4xl font-light text-center mb-12">Our Collections</h2>
          
          {/* Categories */}
          <div className="flex flex-wrap justify-center mb-12 gap-2">
            {categories.map(category => (
              <button
                key={category.id}
                className={`px-6 py-2 rounded-full text-sm transition-colors ${
                  activeCategory === category.id
                    ? 'bg-gray-900 text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-200'
                }`}
                onClick={() => filterProducts(category.id)}
              >
                {category.name}
              </button>
            ))}
          </div>
          
          {/* Products */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map(product => (
              <div key={product.id} className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="h-64 overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-medium">{product.name}</h3>
                    <span className="text-lg">${product.price}</span>
                  </div>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>
                  <button 
                    className="w-full py-3 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition-colors"
                    onClick={() => openModal(product)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* About Section */}
      <section id="about" className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <img src="/tb2.png" alt="About Happy Snail" className="w-full h-auto rounded-lg shadow-lg" />
            </div>
            <div className="md:w-1/2 md:pl-16">
              <h2 className="text-3xl md:text-4xl font-light mb-6">The Happy Snail Story</h2>
              <p className="text-gray-600 mb-6">
                Founded in 2024, Happy Snail grew from a passion project to a beloved Toronto floral studio known for our distinctive aesthetic and commitment to sustainability.
              </p>
              <p className="text-gray-600 mb-6">
                We source our blooms from local Ontario farms whenever possible, reducing our carbon footprint while supporting the local economy.
              </p>
              <p className="text-gray-600 mb-8">
                Each arrangement is thoughtfully designed and handcrafted in our Toronto studio, bringing a touch of nature&apos;s beauty into homes and businesses across the city.
              </p>
              <a href="#custom" className="px-8 py-3 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition-colors inline-block">
                Work with Us
              </a>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-pink-50 to-white relative overflow-hidden">
       {/* Decorative floral elements */}
        <div className="absolute top-0 left-0 w-40 h-40 opacity-20 md:opacity-30">
          <div className="w-full h-full bg-contain bg-no-repeat bg-left-top" style={{ backgroundImage: "url('/floral-corner.png')" }}></div>
        </div>
        <div className="absolute bottom-0 right-0 w-40 h-40 opacity-20 md:opacity-30 transform rotate-180">
          <div className="w-full h-full bg-contain bg-no-repeat bg-right-bottom" style={{ backgroundImage: "url('/floral-corner.png')" }}></div>
        </div>
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          {/* Decorative heading with floral accents */}
          <div className="text-center mb-12 relative">
            <h2 className="text-3xl md:text-4xl font-light text-center relative inline-block">
              <span className="relative z-10 px-4">Client Love</span>
              <span className="absolute left-0 right-0 bottom-0 h-3 bg-pink-100 opacity-70 -z-10"></span>
            </h2>
            <div className="flex justify-center mt-3">
              <div className="w-24 h-1 bg-gradient-to-r from-transparent via-pink-300 to-transparent"></div>
            </div>
          </div>
          
          {/* Testimonial cards with softer styling */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map(testimonial => (
              <div key={testimonial.id} className="bg-white p-8 rounded-xl shadow-sm border border-pink-100 hover:shadow-md transition-shadow duration-300 relative overflow-hidden">
                {/* Quote icon */}
                <div className="absolute top-4 right-4 text-pink-100 opacity-50">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                </div>
                
                {/* Testimonial text with fancy quote styling */}
                <div className="relative">
                  <p className="text-gray-600 mb-6 italic">{testimonial.text}</p>
                  <div className="pt-4 border-t border-pink-50">
                    <p className="font-medium text-gray-800">{testimonial.author}</p>
                    <p className="text-pink-400 text-sm">{testimonial.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Custom Orders */}
      <section id="custom" className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 md:pr-16 mb-10 md:mb-0">
              <h2 className="text-3xl md:text-4xl font-light mb-6">Custom Orders & Events</h2>
              <p className="text-gray-600 mb-6">
                From intimate dinner parties to grand weddings, our custom floral services bring your vision to life with our signature Happy Snail touch.
              </p>
              <p className="text-gray-600 mb-6">
                We offer personal consultations to discuss your event&apos;s needs, style preferences, and budget to create the perfect floral experience.
              </p>
              <p className="text-gray-600 mb-8">
                Our team handles everything from initial concept to final installation, ensuring a seamless experience from start to finish.
              </p>
              <a href="#contact" className="px-8 py-3 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition-colors inline-block">
                Book a Consultation
              </a>
            </div>
            <div className="md:w-1/2">
              <img src="/tb1.png" alt="Custom Floral Events" className="w-full h-auto rounded-lg shadow-lg" />
            </div>
          </div>
        </div>
      </section>
      
      {/* Delivery */}
      <section id="delivery" className="py-16 md:py-24 bg-gradient-to-b from-lime-700/10 to-white relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-40 h-40 opacity-20">
          <div className="w-full h-full bg-contain bg-no-repeat bg-right-top" style={{ backgroundImage: "url('/leaf-corner.png')" }}></div>
        </div>
        <div className="absolute bottom-0 left-0 w-40 h-40 opacity-20 transform rotate-180">
          <div className="w-full h-full bg-contain bg-no-repeat bg-left-bottom" style={{ backgroundImage: "url('/leaf-corner.png')" }}></div>
        </div>
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          {/* Heading with decorative elements */}
          <div className="text-center mb-12 relative">
            <h2 className="text-3xl md:text-4xl font-light text-center relative inline-block">
              <span className="relative z-10 px-4">Delivery Information</span>
              <span className="absolute left-0 right-0 bottom-0 h-3 bg-lime-700/10 opacity-70 -z-10"></span>
            </h2>
            <div className="flex justify-center mt-3">
              <div className="w-24 h-1 bg-gradient-to-r from-transparent via-lime-700/20 to-transparent"></div>
            </div>
          </div>
          
          {/* Delivery cards with sage theme */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-white p-8 rounded-xl shadow-sm border border-lime-700/10 hover:shadow-md transition-shadow duration-300 text-center">
              <div className="w-16 h-16 bg-lime-700/10 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
                <svg className="w-8 h-8 text-lime-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-medium mb-4 text-green-800">Toronto & GTA</h3>
              <p className="text-gray-600">
                We deliver throughout Toronto and the Greater Toronto Area, with delivery fees starting at $12.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-sm border border-lime-700/10 hover:shadow-md transition-shadow duration-300 text-center">
              <div className="w-16 h-16 bg-lime-700/10 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
                <svg className="w-8 h-8 text-lime-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-medium mb-4 text-green-800">Delivery Times</h3>
              <p className="text-gray-600">
                Order by 12pm for same-day delivery Tuesday through Saturday. All deliveries arrive between 10am and 6pm.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-sm border border-lime-700/10 hover:shadow-md transition-shadow duration-300 text-center">
              <div className="w-16 h-16 bg-lime-700/10 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
                <svg className="w-8 h-8 text-lime-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-medium mb-4 text-green-800">Pickup Options</h3>
              <p className="text-gray-600">
                Free pickup available from our Riverdale studio during business hours, Tuesday through Saturday, 10am to 6pm.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Contact / Instagram */}
      <section id="contact" className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2 md:pr-16 mb-10 md:mb-0">
              <h2 className="text-3xl md:text-4xl font-light mb-6">Get in Touch</h2>
              <p className="text-gray-600 mb-8">
                Have questions or special requests? We&apos;d love to hear from you.
              </p>
              
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-3">Studio Location</h3>
                <p className="text-gray-600">
                  123 Ossington Avenue<br />
                  Toronto, ON M6J 2Z4
                </p>
              </div>
              
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-3">Studio Hours</h3>
                <p className="text-gray-600">
                  Tuesday - Saturday: 10am - 6pm<br />
                  Sunday & Monday: Closed
                </p>
              </div>
              
              <div className="mb-8">
                <h3 className="text-lg font-medium mb-3">Contact</h3>
                <p className="text-gray-600">
                  Email: hello@happysnail.ca<br />
                  Phone: (416) 555-1234
                </p>
              </div>
              
              <div className="flex space-x-4">
                <a href="#" className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors">
                  <svg className="w-5 h-5 text-gray-800" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" />
                  </svg>
                </a>
                <a href="#" className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors">
                  <svg className="w-5 h-5 text-gray-800" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                  </svg>
                </a>
                <a href="#" className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors">
                  <svg className="w-5 h-5 text-gray-800" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
              </div>
            </div>
            
            <div className="md:w-1/2">
              <h2 className="text-3xl md:text-4xl font-light mb-6">@happy_snail.ca</h2>
              
              <InstagramFeed username="happy_snail.ca" />
              
              <div className="mt-6 text-center">
                <a href="https://instagram.com/happy_snail.ca" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900 transition-colors">
                  View more on Instagram
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Newsletter */}
      <section className="py-16 md:py-24 bg-teal-900 text-white">
        <div className="container mx-auto px-4 md:px-6 text-center max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-light mb-6">Join Our Bloom Letter</h2>
          <p className="text-gray-300 mb-8">
            Subscribe to receive updates on seasonal offerings, workshops, and exclusive promotions.
          </p>
          <div className="flex flex-col md:flex-row items-center gap-3">
            <input
              type="email"
              placeholder="Your email address"
              className="px-6 py-3 w-full md:flex-1 rounded-full bg-teal-800 border border-gray-700 text-white focus:outline-none focus:border-gray-500"
            />
            <button className="px-8 py-3 w-full md:w-auto bg-white text-gray-900 rounded-full hover:bg-gray-200 transition-colors">
              Subscribe
            </button>
          </div>
          <p className="text-gray-400 text-sm mt-4">
            We respect your privacy and will never share your information.
          </p>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-white py-12">
        <div className="container mx-auto px-4 md:px-6">          
          <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center">
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
      
      {/* Product Modal */}
      {isModalOpen && selectedProduct && (
        <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" onClick={closeModal}></div>
            
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                        {selectedProduct.name}
                      </h3>
                      <button
                        type="button"
                        className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none"
                        onClick={closeModal}
                      >
                        <span className="sr-only">Close</span>
                        <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                    
                    <div className="mb-4">
                      <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full h-64 object-cover rounded-lg" />
                    </div>
                    
                    <div className="mb-4">
                      <p className="text-lg font-medium text-gray-900">${selectedProduct.price}</p>
                      <p className="mt-2 text-sm text-gray-500">{selectedProduct.description}</p>
                    </div>
                    
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-gray-900 mb-2">Quantity</h4>
                      <div className="flex items-center">
                        <button
                          type="button"
                          className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200"
                          onClick={decrementQuantity}
                        >
                          -
                        </button>
                        <input
                          type="number"
                          className="mx-3 w-16 text-center border border-gray-300 rounded-md"
                          value={quantity}
                          readOnly
                        />
                        <button
                          type="button"
                          className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200"
                          onClick={incrementQuantity}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-full border border-transparent shadow-sm px-4 py-2 bg-gray-900 text-base font-medium text-white hover:bg-gray-800 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={addToCart}
                >
                  Add to Cart - ${selectedProduct.price * quantity}
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-full border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={closeModal}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HappySnailWebsite;