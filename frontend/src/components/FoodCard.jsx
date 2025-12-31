/**
 * FoodCard Component
 * Displays a single food item in a card format
 * Used on the home page to show all available food items
 */
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { getImageUrl } from '../api/api'

function FoodCard({ food }) {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageError, setImageError] = useState(false)

  // Handle case where image might not be available
  const getFoodImageUrl = (imagePath) => {
    if (!imagePath || imageError) {
      // Use food-specific placeholder images from Unsplash
      const foodImages = {
        'pizza': 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=300&fit=crop',
        'salad': 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop',
        'burger': 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop',
        'wings': 'https://images.unsplash.com/photo-1527477396000-e27163b481c2?w=400&h=300&fit=crop',
        'pasta': 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=400&h=300&fit=crop',
        'fish': 'https://images.unsplash.com/photo-1544943910-4c1dc44aab44?w=400&h=300&fit=crop',
        'brownie': 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400&h=300&fit=crop',
        'default': 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop'
      }
      
      // Match food name to image type
      const name = food.name.toLowerCase()
      if (name.includes('pizza')) return foodImages.pizza
      if (name.includes('salad')) return foodImages.salad
      if (name.includes('burger')) return foodImages.burger
      if (name.includes('wing')) return foodImages.wings
      if (name.includes('pasta')) return foodImages.pasta
      if (name.includes('fish')) return foodImages.fish
      if (name.includes('brownie')) return foodImages.brownie
      return foodImages.default
    }
    // Use the API helper function to get proper image URL
    return getImageUrl(imagePath) || foodImages.default
  }
  
  const imageUrl = getFoodImageUrl(food.image)

  const handleImageLoad = () => {
    setImageLoaded(true)
  }

  const handleImageError = () => {
    setImageError(true)
    setImageLoaded(true)
  }

  return (
    <Link
      to={`/food/${food.id}`}
      className="block card-hover bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105"
    >
      {/* Food Image with Loading State */}
      <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
        {!imageLoaded && (
          <div className="absolute inset-0 skeleton"></div>
        )}
        <img
          src={imageUrl}
          alt={food.name}
          className={`w-full h-full object-cover transition-all duration-500 ${imageLoaded ? 'img-fade loaded scale-100' : 'opacity-0 scale-110'}`}
          onLoad={handleImageLoad}
          onError={handleImageError}
          loading="lazy"
        />
        {/* Price Badge */}
        <div className="absolute top-3 right-3 bg-blue-600 text-white px-3 py-1 rounded-full font-bold text-sm shadow-lg animate-scaleIn">
          ${food.price}
        </div>
      </div>

      {/* Food Info */}
      <div className="p-5">
        <h3 className="text-xl font-bold mb-2 text-gray-800 hover:text-blue-600 transition-colors">
          {food.name}
        </h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2 min-h-[2.5rem]">
          {food.description}
        </p>
        <button className="btn-animate w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-2.5 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transform hover:scale-105 shadow-md">
          View Details →
        </button>
      </div>
    </Link>
  )
}

export default FoodCard

