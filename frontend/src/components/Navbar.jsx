/**
 * Navbar Component
 * Navigation bar that appears on all pages
 * Shows links to different pages and login/logout buttons
 */
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Navbar() {
  const { user, logout, isAuthenticated } = useAuth()
  const navigate = useNavigate()

  // Handle logout
  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo/Title */}
          <Link to="/" className="text-2xl font-bold hover:text-blue-200">
            🍕 Food Delivery
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center space-x-6">
            <Link to="/" className="hover:text-blue-200 transition">
              Home
            </Link>
            <Link to="/cart" className="hover:text-blue-200 transition">
              Cart 🛒
            </Link>

            {/* Show login/register if not authenticated, or user info and logout if authenticated */}
            {isAuthenticated() ? (
              <>
                <span className="text-blue-200">Hi, {user?.username}!</span>
                <button
                  onClick={handleLogout}
                  className="bg-blue-700 px-4 py-2 rounded hover:bg-blue-800 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="bg-blue-700 px-4 py-2 rounded hover:bg-blue-800 transition"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-blue-800 px-4 py-2 rounded hover:bg-blue-900 transition"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar



