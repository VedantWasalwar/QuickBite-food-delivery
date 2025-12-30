/**
 * Home Page Component
 * Displays all available food items in a grid layout
 * This is the main landing page where users can browse the menu
 */
import { useState, useEffect, useRef } from 'react'
import { getFoods } from '../api/api'
import FoodCard from '../components/FoodCard'

function Home() {
  const [foods, setFoods] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [videoLoaded, setVideoLoaded] = useState(false)
  const videoRef = useRef(null)

  // Fetch food items when component mounts
  useEffect(() => {
    fetchFoods()
  }, [])

  // Handle video loading with timeout
  useEffect(() => {
    if (videoRef.current) {
      // Set timeout - show content even if video doesn't load
      const timeout = setTimeout(() => {
        setVideoLoaded(true)
      }, 3000) // Show content after 3 seconds even if video not loaded

      videoRef.current.addEventListener('loadeddata', () => {
        setVideoLoaded(true)
        clearTimeout(timeout)
      })

      videoRef.current.addEventListener('error', () => {
        // If video fails to load, show content anyway
        setVideoLoaded(true)
        clearTimeout(timeout)
      })

      return () => clearTimeout(timeout)
    }
  }, [])

  const fetchFoods = async () => {
    try {
      setLoading(true)
      const data = await getFoods()
      setFoods(data)
      setError(null)
    } catch (err) {
      setError('Failed to load food items. Please check if backend server is running.')
      console.error('Error fetching foods:', err)
      // Set empty array so page still shows
      setFoods([])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section with Video Background */}
      <div className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Food Video Background - Optional */}
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-2000 ${
            videoLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          preload="auto"
          onError={() => setVideoLoaded(true)} // Show content if video fails
        >
          {/* Food video from Pexels - High Quality */}
          <source 
            src="https://videos.pexels.com/video-files/3045163/3045163-hd_1920_1080_30fps.mp4" 
            type="video/mp4" 
          />
          {/* Alternative food video option 1 */}
          <source 
            src="https://videos.pexels.com/video-files/3045163/3045163-sd_640_360_30fps.mp4" 
            type="video/mp4" 
          />
          {/* Alternative food video option 2 - Pizza making */}
          <source 
            src="https://videos.pexels.com/video-files/3045163/3045163-uhd_2560_1440_25fps.mp4" 
            type="video/mp4" 
          />
        </video>

        {/* Fallback Gradient Background (shown if video doesn't load) */}
        <div className={`absolute inset-0 bg-gradient-to-r from-blue-600 via-blue-700 to-purple-700 transition-opacity duration-1000 ${videoLoaded ? 'opacity-0' : 'opacity-100'}`}>
          {/* Animated Background Elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-bounce-slow"></div>
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-bounce-slow" style={{ animationDelay: '1s' }}></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-bounce-slow" style={{ animationDelay: '2s' }}></div>
          </div>
        </div>

        {/* Dark Overlay for better text readability */}
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>

        {/* Gradient Overlay for visual appeal */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/60"></div>

        {/* Content - Always visible */}
        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="space-y-8 opacity-100 translate-y-0">
            {/* Animated Title */}
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white drop-shadow-2xl animate-fadeIn">
              🍕 Delicious Food Delivery
            </h1>

            {/* Animated Subtitle */}
            <p className="text-xl md:text-3xl mb-10 text-white/90 font-light animate-slideIn" style={{ animationDelay: '0.2s' }}>
              Order your favorite meals and get them delivered fresh to your door!
            </p>

            {/* Animated Buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-6 animate-scaleIn" style={{ animationDelay: '0.4s' }}>
              <a 
                href="#food-menu" 
                className="btn-animate bg-white text-blue-600 px-10 py-4 rounded-full font-bold text-lg hover:bg-blue-50 transform hover:scale-110 shadow-2xl transition-all duration-300"
              >
                Browse Menu
              </a>
              <a 
                href="#food-menu" 
                className="btn-animate border-3 border-white text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-blue-600 transform hover:scale-110 shadow-2xl transition-all duration-300 backdrop-blur-sm bg-white/10"
              >
                Order Now
              </a>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce-slow">
            <a href="#food-menu" className="flex flex-col items-center text-white/80 hover:text-white transition-colors">
              <span className="text-sm mb-2 font-light">Scroll Down</span>
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div id="food-menu" className="container mx-auto px-4 py-12">
        {/* Section Header */}
        <div className="text-center mb-12 animate-fadeIn">
          <h2 className="text-4xl font-bold text-gray-800 mb-3">Our Menu</h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Choose from our delicious selection of meals</p>
        </div>

        {/* Loading State with Animation */}
        {loading && (
          <div className="text-center py-20">
            <div className="relative inline-block">
              <div className="absolute inset-0 border-4 border-blue-200 rounded-full"></div>
              <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
            <p className="mt-6 text-gray-600 text-lg animate-pulse">Loading delicious food items...</p>
            <p className="mt-4 text-gray-500 text-sm">Make sure backend server is running on port 8000</p>
          </div>
        )}

        {/* Error State with Animation */}
        {error && (
          <div className="max-w-md mx-auto bg-yellow-50 border-2 border-yellow-200 text-yellow-800 px-6 py-4 rounded-lg mb-8 animate-scaleIn shadow-lg">
            <div className="flex items-center">
              <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <div>
                <p className="font-semibold">Connection Error</p>
                <p className="text-sm">{error}</p>
                <p className="text-sm mt-2">Please start the backend server: <code className="bg-yellow-100 px-2 py-1 rounded">python manage.py runserver</code></p>
              </div>
            </div>
          </div>
        )}

        {/* Food Items Grid with Stagger Animation */}
        {!loading && !error && (
          <>
            {foods.length === 0 ? (
              <div className="text-center py-20 animate-fadeIn">
                <div className="text-6xl mb-4">🍽️</div>
                <p className="text-gray-600 text-xl mb-2">No food items available at the moment.</p>
                <p className="text-gray-500 text-sm">Add food items through Django admin panel</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {foods.map((food, index) => (
                  <div key={food.id} className="stagger-item">
                    <FoodCard food={food} />
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {/* Show food items even if there was an error (for testing) */}
        {error && foods.length > 0 && (
          <div className="mt-8">
            <div className="bg-blue-50 border-2 border-blue-200 text-blue-800 px-6 py-4 rounded-lg mb-8">
              <p className="text-sm">Showing cached data. Backend connection failed.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {foods.map((food, index) => (
                <div key={food.id} className="stagger-item">
                  <FoodCard food={food} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Home