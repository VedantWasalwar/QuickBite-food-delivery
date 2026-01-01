/**
 * Auth Context - Manages user authentication state globally
 * This allows any component to access user info and login/logout functions
 */
import { createContext, useState, useEffect, useContext } from 'react'
import axios from 'axios'

// Create the context
const AuthContext = createContext()

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}

// AuthProvider component - wraps the app to provide auth state
export const AuthProvider = ({ children }) => {
  // State to store user info and token
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(localStorage.getItem('token'))
  const [loading, setLoading] = useState(true)

  // Set axios default header with token if available
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Token ${token}`
      // Try to get user info (optional - you can enhance this)
      setUser({ username: localStorage.getItem('username') })
    } else {
      delete axios.defaults.headers.common['Authorization']
    }
    setLoading(false)
  }, [token])

  // Login function
  const login = (token, username, userId) => {
    localStorage.setItem('token', token)
    localStorage.setItem('username', username)
    localStorage.setItem('userId', userId)
    setToken(token)
    setUser({ username, id: userId })
    axios.defaults.headers.common['Authorization'] = `Token ${token}`
  }

  // Logout function
  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('username')
    localStorage.removeItem('userId')
    setToken(null)
    setUser(null)
    delete axios.defaults.headers.common['Authorization']
  }

  // Check if user is authenticated
  const isAuthenticated = () => {
    return !!token
  }

  return (
    <AuthContext.Provider value={{ user, token, login, logout, isAuthenticated, loading }}>
      {children}
    </AuthContext.Provider>
  )
}











