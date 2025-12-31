/**
 * Cart Page Component
 * Shows all items in the user's cart
 * Allows users to update quantities, remove items, and place orders
 */
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getCart, updateCartItem, removeFromCart, createOrder, getImageUrl } from '../api/api'
import { useAuth } from '../context/AuthContext'

function Cart() {
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()
  
  const [cart, setCart] = useState({ items: [], total: 0 })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // Check authentication and fetch cart on mount
  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/login')
      return
    }
    fetchCart()
  }, [isAuthenticated, navigate])

  // Fetch cart items from API
  const fetchCart = async () => {
    try {
      setLoading(true)
      const data = await getCart()
      setCart(data)
      setError('')
    } catch (err) {
      setError('Failed to load cart. Please try again.')
      console.error('Error fetching cart:', err)
    } finally {
      setLoading(false)
    }
  }

  // Update item quantity
  const handleUpdateQuantity = async (itemId, newQuantity) => {
    if (newQuantity < 1) {
      handleRemoveItem(itemId)
      return
    }

    try {
      await updateCartItem(itemId, newQuantity)
      fetchCart()  // Refresh cart
    } catch (err) {
      setError('Failed to update cart item')
      console.error('Error updating cart:', err)
    }
  }

  // Remove item from cart
  const handleRemoveItem = async (itemId) => {
    try {
      await removeFromCart(itemId)
      fetchCart()  // Refresh cart
    } catch (err) {
      setError('Failed to remove item from cart')
      console.error('Error removing item:', err)
    }
  }

  // Place order
  const handlePlaceOrder = async () => {
    if (cart.items.length === 0) {
      setError('Your cart is empty!')
      return
    }

    try {
      const order = await createOrder()
      navigate('/order-success', { state: { order } })
    } catch (err) {
      setError('Failed to place order. Please try again.')
      console.error('Error placing order:', err)
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <p className="mt-4 text-gray-600">Loading your cart...</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Your Cart</h1>

      {/* Error Message */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {/* Empty Cart */}
      {cart.items.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg mb-4">Your cart is empty!</p>
          <button
            onClick={() => navigate('/')}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Browse Food Items
          </button>
        </div>
      ) : (
        <div className="max-w-4xl mx-auto">
          {/* Cart Items */}
          <div className="bg-white rounded-lg shadow-md mb-6">
            {cart.items.map((item) => {
              // Get image URL using API helper
              const imageUrl = getImageUrl(item.food.image) || 'https://via.placeholder.com/150x150?text=No+Image'
              
              return (
                <div
                  key={item.id}
                  className="border-b border-gray-200 p-4 flex items-center space-x-4 last:border-b-0"
                >
                  {/* Food Image */}
                  <img
                    src={imageUrl}
                    alt={item.food.name}
                    className="w-24 h-24 object-cover rounded"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/150x150?text=No+Image'
                    }}
                  />

                  {/* Food Info */}
                  <div className="flex-grow">
                    <h3 className="text-lg font-semibold text-gray-800">{item.food.name}</h3>
                    <p className="text-gray-600 text-sm">${item.food.price} each</p>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                      className="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded"
                    >
                      -
                    </button>
                    <span className="text-lg font-semibold w-8 text-center">{item.quantity}</span>
                    <button
                      onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                      className="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded"
                    >
                      +
                    </button>
                  </div>

                  {/* Price */}
                  <div className="text-right">
                    <p className="text-lg font-bold text-blue-600">
                      ${(item.food.price * item.quantity).toFixed(2)}
                    </p>
                    <button
                      onClick={() => handleRemoveItem(item.id)}
                      className="text-red-600 hover:text-red-800 text-sm mt-1"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Cart Summary */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <span className="text-xl font-semibold text-gray-800">Total:</span>
              <span className="text-3xl font-bold text-blue-600">${cart.total.toFixed(2)}</span>
            </div>
            <button
              onClick={handlePlaceOrder}
              className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition text-lg font-semibold"
            >
              Place Order
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Cart

