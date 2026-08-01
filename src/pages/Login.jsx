"use client"

import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Mail, Lock, CheckCircle, ShieldCheck } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { toast } from 'react-toastify'

const Login = () => {
  const navigate = useNavigate()
  const { login, loginAsAdmin, isAdmin } = useAuth()
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      await login(formData.email, formData.password)
      toast.success('Login successful!')
      if (isAdmin) {
        navigate('/admin/dashboard')
      } else {
        navigate('/')
      }
    } catch (error) {
      console.error('Login error:', error)
      setError(error.message || 'An error occurred during login')
      toast.error(error.message || 'Login failed')
    } finally {
      setIsLoading(false)
    }
  }

  const loginBenefits = [
    "Access your project dashboard",
    "View project updates and documentation",
    "Manage your service requests",
    "Communicate directly with your account manager",
    "Receive personalized recommendations",
    "Access exclusive client resources",
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-32 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 fade-in">
          <h1 className="text-5xl font-bold text-gradient mb-4">Welcome Back!</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Sign in to your Kalpak Insulation account to continue managing your projects and services.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Side - Login Benefits */}
          <div className="lg:col-span-1 fade-in-left">
            <div className="card-professional p-8 sticky top-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Your Account Benefits</h3>
              <div className="space-y-4">
                {loginBenefits.map((benefit, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-3 fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-4 h-4 text-red-600" />
                    </div>
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-4 bg-red-50 rounded-lg">
                <h4 className="font-semibold text-red-800 mb-2">New to Kalpak Insulation?</h4>
                <Link to="/signup" className="text-red-600 hover:text-red-700 font-medium">
                  Create an account →
                </Link>
              </div>
            </div>
          </div>

          {/* Right Side - Login Form */}
          <div className="lg:col-span-2 fade-in-right">
            <div className="card-professional p-8">
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 fade-in">
                  <p className="text-red-600 text-sm">{error}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">Sign In</h2>
                  <p className="text-gray-600">Enter your credentials to access your account</p>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 pl-10 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                    Password *
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="password"
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 pl-10 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200"
                      placeholder="••••••••"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                      Remember me
                    </label>
                  </div>
                  <div className="text-sm">
                    <a href="#" className="font-medium text-red-600 hover:text-red-700">
                      Forgot your password?
                    </a>
                  </div>
                </div>

                <div className="space-y-3">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3 px-4 bg-red-600 hover:bg-red-700 text-white font-medium rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? 'Signing in...' : 'Sign In'}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      if (loginAsAdmin) loginAsAdmin();
                      navigate('/admin/dashboard');
                    }}
                    className="w-full py-3 px-4 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
                  >
                    <ShieldCheck className="w-5 h-5" />
                    Direct Admin Access (No Password Required)
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
