import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Menu, X, LogIn } from 'lucide-react'
import BrandHeader from './BrandHeader'
import { useAuth } from '../context/AuthContext'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const { isAuthenticated, logout } = useAuth()

  const navigation = [
    { name: 'Home', path: '/' },
    { name: 'Projects & Activities', path: '/projects' },
    { name: 'About Us', path: '/about' },
    { name: 'Our Services', path: '/services' },
    { name: 'Case Studies', path: '/case-studies' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' },
  ]

  const isActive = (path) => location.pathname === path

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-[160px]">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <BrandHeader
              size="md"
              markOnlyOnMobile={false}
              responsive={true}
              wrapperClass="h-[144px] sm:h-[144px]"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-sm font-medium transition-colors duration-200 ${
                  isActive(item.path)
                    ? 'text-teal-600 border-b-2 border-teal-600'
                    : 'text-gray-700 hover:text-teal-600'
                }`}
              >
                {item.name}
              </Link>
            ))}
            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className="bg-gray-100 text-navy-900 px-5 py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors"
              >
                Logout
              </button>
            ) : (
              <Link 
                to="/login"
                className="bg-blue-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors inline-flex items-center gap-2"
              >
                <LogIn size={18} />
                Login
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-md text-gray-700 hover:text-teal-600 hover:bg-gray-100"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4">
            <div className="flex flex-col space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    isActive(item.path)
                      ? 'bg-teal-50 text-teal-600'
                      : 'text-gray-700 hover:bg-gray-100 hover:text-teal-600'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              {isAuthenticated ? (
                <button
                  onClick={() => { setIsOpen(false); handleLogout() }}
                  className="bg-gray-100 text-navy-900 px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-200 transition-colors"
                >
                  Logout
                </button>
              ) : (
                <Link 
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="bg-blue-600 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors inline-flex items-center gap-2"
                >
                  <LogIn size={18} />
                  Login
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
