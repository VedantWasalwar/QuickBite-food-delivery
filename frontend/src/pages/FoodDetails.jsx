/**
 * Food Details Page Component
 * Shows detailed information about a single food item
 * Allows users to add the item to their cart
 */
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getFoods, addToCart, getImageUrl } from '../api/api'
import { useAuth } from '../context/AuthContext'

function FoodDetails() {
  const { id } = useParams()  // Get food ID from URL
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()
  
  const [food, setFood] = useState(null)
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const [message, setMessage] = useState('')

  // Fetch food details when component mounts
  useEffect(() => {
    fetchFoodDetails()
  }, [id])

  const fetchFoodDetails = async () => {
    try {
      setLoading(true)
      // Since we only have list endpoint, get all and find the one we need
      const foods = await getFoods()
      const foundFood = foods.find(f => f.id === parseInt(id))
      if (foundFood) {
        setFood(foundFood)
      } else {
        setMessage('Food item not found')
      }
    } catch (err) {
      setMessage('Failed to load food details')
      console.error('Error fetching food:', err)
    } finally {
      setLoading(false)
    }
  }

  // Handle adding item to cart
  const handleAddToCart = async () => {
    // Check if user is logged in
    if (!isAuthenticated()) {
      navigate('/login')
      return
    }

    try {
      await addToCart(food.id, quantity)
      setMessage('Item added to cart successfully!')
      setTimeout(() => {
        setMessage('')
      }, 3000)
    } catch (err) {
      setMessage('Failed to add item to cart')
      console.error('Error adding to cart:', err)
    }
  }

  // Increase quantity
  const increaseQuantity = () => {
    setQuantity(prev => prev + 1)
  }

  // Decrease quantity (minimum 1)
  const decreaseQuantity = () => {
    setQuantity(prev => (prev > 1 ? prev - 1 : 1))
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <p className="mt-4 text-gray-600">Loading food details...</p>
      </div>
    )
  }

  if (!food) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <p className="text-red-600 text-lg">{message || 'Food item not found'}</p>
        <button
          onClick={() => navigate('/')}
          className="mt-4 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Back to Home
        </button>
      </div>
    )
  }

  // Get image URL using API helper
  const imageUrl = getImageUrl(food.image) || 'https://via.placeholder.com/600x400?text=No+Image'

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="mb-6 text-blue-600 hover:text-blue-800 flex items-center"
      >
        ← Back
      </button>

      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="md:flex">
            {/* Food Image */}
            <div className="md:w-1/2">
              <img
                src={imageUrl}
                alt={food.name}
                className="w-full h-64 md:h-full object-cover"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/600x400?text=No+Image'
                }}
              />
            </div>

            {/* Food Details */}
            <div className="md:w-1/2 p-6 md:p-8">
              <h1 className="text-3xl font-bold text-gray-800 mb-4">{food.name}</h1>
              <p className="text-gray-600 mb-6 leading-relaxed">{food.description}</p>
              
              <div className="mb-6">
                <span className="text-4xl font-bold text-blue-600">${food.price}</span>
              </div>

              {/* Quantity Selector */}
              <div className="mb-6">
                <label className="block text-gray-700 mb-2">Quantity:</label>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={decreaseQuantity}
                    className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded"
                  >
                    -
                  </button>
                  <span className="text-xl font-semibold w-12 text-center">{quantity}</span>
                  <button
                    onClick={increaseQuantity}
                    className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition text-lg font-semibold"
              >
                Add to Cart - ${(food.price * quantity).toFixed(2)}
              </button>

              {/* Success Message */}
              {message && (
                <div className={`mt-4 p-3 rounded ${message.includes('success') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                  {message}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FoodDetails

