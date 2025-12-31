/**
 * Order Success Page Component
 * Shows confirmation after a successful order
 */
import { useNavigate, useLocation } from 'react-router-dom'

function OrderSuccess() {
  const navigate = useNavigate()
  const location = useLocation()
  const order = location.state?.order

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8 text-center">
        {/* Success Icon */}
        <div className="mb-6">
          <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
            <svg
              className="w-12 h-12 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>

        {/* Success Message */}
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Order Placed Successfully!</h1>
        <p className="text-gray-600 mb-6">
          Thank you for your order. We'll prepare your food and deliver it to you soon!
        </p>

        {/* Order Details */}
        {order && (
          <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
            <p className="text-sm text-gray-600 mb-2">
              <span className="font-semibold">Order ID:</span> #{order.id}
            </p>
            <p className="text-sm text-gray-600 mb-2">
              <span className="font-semibold">Total Amount:</span> ${order.total_price}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-semibold">Order Date:</span>{' '}
              {new Date(order.created_at).toLocaleString()}
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={() => navigate('/')}
            className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition font-semibold"
          >
            Continue Shopping
          </button>
          <button
            onClick={() => navigate('/cart')}
            className="w-full bg-gray-200 text-gray-800 py-3 rounded hover:bg-gray-300 transition font-semibold"
          >
            View Cart
          </button>
        </div>
      </div>
    </div>
  )
}

export default OrderSuccess







