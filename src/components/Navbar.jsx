"use client"

import { useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { Menu, X, User, LogIn, UserPlus, ChevronDown } from "lucide-react"
import Logo from "./Logo"
import { useAuth } from "../context/AuthContext"

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [showAuthMenu, setShowAuthMenu] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const { user, logout, isAdmin } = useAuth()

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Projects", path: "/projects" },
    { name: "Contact", path: "/contact" },
  ]

  const handleLogout = async () => {
    await logout()
    navigate("/")
  }

  return (
    <>
      {/* Main Professional Navbar */}
      <nav className="navbar-professional fixed w-full z-50 py-4">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-center">
            {/* Logo Section */}
            <Link to="/" className="flex items-center space-x-4 group">
              <Logo size="default" />
              <div className="hidden sm:block">
                <h1 className="text-2xl font-bold text-gray-800">KALPAK INSULATION</h1>
                <p className="text-sm text-gray-600 font-medium">Professional Insulation Solutions</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`relative font-semibold transition-all duration-300 py-2 ${
                    location.pathname === link.path ? "text-primary-600" : "text-gray-700 hover:text-primary-600"
                  }`}
                >
                  {link.name}
                  <span
                    className={`absolute bottom-0 left-0 h-0.5 bg-primary-600 transition-all duration-300 ${
                      location.pathname === link.path ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  ></span>
                </Link>
              ))}

              {/* Auth Menu */}
              <div className="relative">
                <button
                  onClick={() => setShowAuthMenu(!showAuthMenu)}
                  className="flex items-center space-x-2 text-gray-700 hover:text-primary-600 transition-colors duration-300 font-semibold"
                >
                  <User size={18} />
                  <span>Account</span>
                  <ChevronDown
                    size={16}
                    className={`transition-transform duration-300 ${showAuthMenu ? "rotate-180" : ""}`}
                  />
                </button>

                {showAuthMenu && (
                  <div className="absolute right-0 mt-3 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                    {user ? (
                      <div className="space-y-3">
                        <Link
                          to="/admin/dashboard"
                          className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors flex items-center space-x-3 text-amber-700 font-semibold"
                          onClick={() => setShowAuthMenu(false)}
                        >
                          <span>Admin Dashboard</span>
                        </Link>
                        {user && (
                          <button
                            onClick={handleLogout}
                            className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors flex items-center space-x-3 text-gray-700"
                          >
                            <span>Logout</span>
                          </button>
                        )}
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <Link
                          to="/admin/dashboard"
                          className="w-full px-4 py-3 text-left hover:bg-amber-50 transition-colors flex items-center space-x-3 text-amber-700 font-semibold"
                          onClick={() => setShowAuthMenu(false)}
                        >
                          <span>Admin Dashboard</span>
                        </Link>
                        <Link
                          to="/login"
                          className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors flex items-center space-x-3 text-gray-700"
                        >
                          <span>Login</span>
                        </Link>
                        <Link
                          to="/signup"
                          className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors flex items-center space-x-3 text-gray-700"
                        >
                          <span>Sign Up</span>
                        </Link>
                      </div>
                    )}
                  </div>
                )}
              </div>

              <Link to="/contact" className="btn-primary">
                Get Quote
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-300"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={24} className="text-primary-600" /> : <Menu size={24} className="text-primary-600" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isOpen && (
            <div className="lg:hidden mt-6 pb-6">
              <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6 space-y-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`block font-semibold py-3 px-4 rounded-lg transition-all duration-300 ${
                      location.pathname === link.path
                        ? "bg-primary-600 text-white"
                        : "text-gray-700 hover:bg-gray-50 hover:text-primary-600"
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                  </Link>
                ))}

                <div className="pt-4 border-t border-gray-200 space-y-3">
                  {user ? (
                    <div className="flex items-center gap-4">
                      {isAdmin && (
                        <Link
                          to="/admin/dashboard"
                          className="text-gray-700 hover:text-red-600 transition-colors"
                          onClick={() => setIsOpen(false)}
                        >
                          Admin Dashboard
                        </Link>
                      )}
                      <button
                        onClick={handleLogout}
                        className="text-gray-700 hover:text-red-600 transition-colors"
                      >
                        Logout
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-4">
                      <Link
                        to="/login"
                        className="text-gray-700 hover:text-red-600 transition-colors"
                      >
                        Login
                      </Link>
                      <Link
                        to="/signup"
                        className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                      >
                        Sign Up
                      </Link>
                    </div>
                  )}
                </div>

                <Link to="/contact" className="block btn-primary text-center mt-4" onClick={() => setIsOpen(false)}>
                  Get Quote
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Click outside to close auth menu */}
      {showAuthMenu && <div className="fixed inset-0 z-40" onClick={() => setShowAuthMenu(false)}></div>}
    </>
  )
}

export default Navbar
