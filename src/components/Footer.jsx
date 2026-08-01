"use client"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Phone, Mail, MapPin, Clock, Facebook, Twitter, Linkedin, Instagram, User } from "lucide-react"
import Logo from "./Logo"
import { useAuth } from "../context/AuthContext"

const Footer = () => {
  const [adminClickCount, setAdminClickCount] = useState(0)
  const [showAdminModal, setShowAdminModal] = useState(false)
  const navigate = useNavigate()
  const { loginAsAdmin } = useAuth() || {}

  // Admin access functionality moved to footer logo
  const handleAdminLogoClick = () => {
    setAdminClickCount((prev) => {
      const newCount = prev + 1
      if (newCount >= 5) {
        setShowAdminModal(true)
        return 0
      }
      return newCount
    })

    setTimeout(() => setAdminClickCount(0), 3000)
  }

  const handleAdminAccess = () => {
    setShowAdminModal(false)
    if (loginAsAdmin) loginAsAdmin()
    navigate("/admin/dashboard")
  }

  return (
    <>
      <footer className="bg-gray-900 text-white">
        <div className="container mx-auto px-4 sm:px-6 py-10 sm:py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12">
            {/* Company Info */}
            <div>
              <div className="flex items-center space-x-3 mb-4 sm:mb-6 cursor-pointer" onClick={handleAdminLogoClick}>
                <div className="relative">
                  <Logo size="default" className="text-white" />
                  {adminClickCount > 0 && (
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white text-xs rounded-full flex items-center justify-center animate-pulse font-bold">
                      {adminClickCount}
                    </div>
                  )}
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold">KALPAK INSULATION</h3>
                  <p className="text-gray-400 text-xs sm:text-sm">Professional Solutions</p>
                </div>
              </div>
              <p className="text-gray-300 mb-4 sm:mb-6 text-sm leading-relaxed">
                Leading provider of thermal insulation, cold insulation, and scaffolding services in Maharashtra, India.
                Committed to excellence and customer satisfaction.
              </p>
              <div className="flex space-x-3">
                <a
                  href="#"
                  className="w-9 h-9 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-primary-600 transition-colors"
                >
                  <Facebook size={16} />
                </a>
                <a
                  href="#"
                  className="w-9 h-9 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-primary-600 transition-colors"
                >
                  <Twitter size={16} />
                </a>
                <a
                  href="#"
                  className="w-9 h-9 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-primary-600 transition-colors"
                >
                  <Linkedin size={16} />
                </a>
                <a
                  href="#"
                  className="w-9 h-9 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-primary-600 transition-colors"
                >
                  <Instagram size={16} />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-base sm:text-lg font-semibold mb-4 sm:mb-6">Quick Links</h4>
              <ul className="space-y-2.5 text-sm">
                <li>
                  <Link to="/" className="text-gray-300 hover:text-primary-400 transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="text-gray-300 hover:text-primary-400 transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="/services" className="text-gray-300 hover:text-primary-400 transition-colors">
                    Services
                  </Link>
                </li>
                <li>
                  <Link to="/projects" className="text-gray-300 hover:text-primary-400 transition-colors">
                    Projects
                  </Link>
                </li>
                <li>
                  <Link to="/verify-certificate" className="text-gray-300 hover:text-primary-400 transition-colors font-medium text-red-400">
                    Verify Certificate
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-gray-300 hover:text-primary-400 transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-base sm:text-lg font-semibold mb-4 sm:mb-6">Our Services</h4>
              <ul className="space-y-2.5 text-sm text-gray-300">
                <li>Thermal Insulation</li>
                <li>Cold Insulation</li>
                <li>Scaffolding Services</li>
                <li>Industrial Solutions</li>
                <li>Maintenance Services</li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-base sm:text-lg font-semibold mb-4 sm:mb-6">Contact Info</h4>
              <div className="space-y-3 sm:space-y-4 text-sm">
                <div className="flex items-start space-x-3">
                  <MapPin size={18} className="text-primary-400 mt-1 flex-shrink-0" />
                  <p className="text-gray-300 leading-relaxed text-xs sm:text-sm">
                    Malhar Palace No. 1, Flat no. 403,
                    <br />
                    Opp. Kasturi plaza, Manpada Road,
                    <br />
                    Dombivli (East), Thane - 421 201
                  </p>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone size={18} className="text-primary-400 flex-shrink-0" />
                  <div className="text-gray-300 text-xs sm:text-sm">
                    <p>+91 97256 32918</p>
                    <p>+91 98696 03709</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail size={18} className="text-primary-400 flex-shrink-0" />
                  <p className="text-gray-300 text-xs sm:text-sm truncate">info@kalpakinsulation.com</p>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock size={18} className="text-primary-400 flex-shrink-0" />
                  <p className="text-gray-300 text-xs sm:text-sm">Mon - Sat: 9:00 AM - 6:00 PM</p>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 sm:mt-12 pt-6 sm:pt-8 text-center">
            <p className="text-gray-400 text-xs sm:text-sm">
              © 2024 Kalpak Insulation. All rights reserved. | Professional insulation solutions you can trust.
            </p>
          </div>
        </div>
      </footer>

      {/* Admin Access Modal */}
      {showAdminModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowAdminModal(false)}></div>
          <div className="relative bg-white rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <User className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Admin Access</h3>
              <p className="text-gray-600 mb-8">
                You've discovered the admin portal. Continue to access the dashboard?
              </p>
              <div className="flex space-x-4">
                <button onClick={() => setShowAdminModal(false)} className="flex-1 btn-secondary">
                  Cancel
                </button>
                <button onClick={handleAdminAccess} className="flex-1 btn-primary">
                  Continue
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Footer
