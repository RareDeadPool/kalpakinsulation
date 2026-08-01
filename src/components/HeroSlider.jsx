"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, Play, Star, Award, Users } from "lucide-react"

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = [
    {
      id: 1,
      title: "Professional Thermal Insulation",
      subtitle: "Expert Solutions for Industrial & Commercial Applications",
      description: "Transform your energy efficiency with cutting-edge thermal insulation technology",
      image: "/src/assets/hero-bg.jpg",
      cta: "Get Quote",
      ctaSecondary: "Learn More",
      stats: { projects: "500+", experience: "15 Years", rating: "4.9" },
      features: ["High Temperature Resistance", "Energy Efficient", "Expert Installation"],
    },
    {
      id: 2,
      title: "Advanced Cold Storage",
      subtitle: "Specialized Refrigeration Insulation Solutions",
      description: "Maintain optimal temperatures with precision-engineered cold insulation systems",
      image: "/placeholder.svg?height=1080&width=1920",
      cta: "Explore Solutions",
      ctaSecondary: "View Projects",
      stats: { projects: "300+", experience: "12 Years", rating: "4.8" },
      features: ["Temperature Control", "Moisture Protection", "Energy Savings"],
    },
    {
      id: 3,
      title: "Complete Scaffolding",
      subtitle: "Safe & Reliable Construction Solutions",
      description: "Building safety and trust through professional scaffolding excellence",
      image: "/placeholder.svg?height=1080&width=1920",
      cta: "View Projects",
      ctaSecondary: "Contact Us",
      stats: { projects: "800+", experience: "20 Years", rating: "5.0" },
      features: ["Safety Compliant", "Quick Installation", "Professional Support"],
    },
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [slides.length])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  return (
    <div className="relative min-h-[85vh] sm:h-screen overflow-hidden bg-gradient-to-br from-red-900 via-red-800 to-red-900">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fillRule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fillOpacity%3D%220.1%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] animate-pulse"></div>
      </div>

      {/* Background Images with Overlay */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
            index === currentSlide ? "opacity-30 scale-100" : "opacity-0 scale-105"
          }`}
        >
          <img src={slide.image || "/placeholder.svg"} alt={slide.title} className="w-full h-full object-cover" />
        </div>
      ))}

      {/* Main Content */}
      <div className="absolute inset-0 z-20 flex items-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-0">
          <div className="max-w-3xl">
            {/* Left Content */}
            <div className="text-white space-y-5 sm:space-y-8">
              {slides.map((slide, index) => (
                <div
                  key={slide.id}
                  className={`transition-all duration-700 ${
                    index === currentSlide ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8 absolute"
                  }`}
                >
                  {index === currentSlide && (
                    <>
                      {/* Category Badge */}
                      <div className="inline-flex items-center px-3 py-1.5 sm:px-4 sm:py-2 bg-white/20 backdrop-blur-sm rounded-full text-xs sm:text-sm font-semibold border border-white/30 mb-4 sm:mb-0">
                        <Award className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                        Premium Service
                      </div>

                      {/* Main Title */}
                      <div className="space-y-2 sm:space-y-4">
                        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                          {slide.title}
                        </h1>
                        <p className="text-base sm:text-xl lg:text-2xl text-red-100 font-medium">
                          {slide.subtitle}
                        </p>
                        <p className="text-sm sm:text-lg text-red-200 max-w-lg leading-relaxed hidden sm:block">
                          {slide.description}
                        </p>
                      </div>

                      {/* Stats */}
                      <div className="grid grid-cols-3 gap-3 sm:gap-6 py-4 sm:py-6">
                        <div className="text-center">
                          <div className="text-xl sm:text-3xl font-bold text-white">{slide.stats.projects}</div>
                          <div className="text-xs sm:text-sm text-red-200">Projects</div>
                        </div>
                        <div className="text-center">
                          <div className="text-xl sm:text-3xl font-bold text-white">{slide.stats.experience}</div>
                          <div className="text-xs sm:text-sm text-red-200">Experience</div>
                        </div>
                        <div className="text-center">
                          <div className="flex items-center justify-center space-x-1">
                            <span className="text-xl sm:text-3xl font-bold text-white">{slide.stats.rating}</span>
                            <Star className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 fill-current" />
                          </div>
                          <div className="text-xs sm:text-sm text-red-200">Rating</div>
                        </div>
                      </div>

                      {/* CTA Buttons */}
                      <div className="flex flex-col xs:flex-row gap-3 sm:gap-4">
                        <button className="group bg-white text-red-600 px-6 py-3 sm:px-8 sm:py-4 rounded-xl font-semibold text-base sm:text-lg transition-all duration-300 hover:bg-red-50 hover:shadow-xl hover:-translate-y-1 flex items-center justify-center space-x-2 w-full xs:w-auto">
                          <span>{slide.cta}</span>
                          <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </button>
                        <button className="group bg-transparent border-2 border-white text-white px-6 py-3 sm:px-8 sm:py-4 rounded-xl font-semibold text-base sm:text-lg transition-all duration-300 hover:bg-white hover:text-red-600 flex items-center justify-center space-x-2 w-full xs:w-auto">
                          <Play className="w-4 h-4 sm:w-5 sm:h-5" />
                          <span>{slide.ctaSecondary}</span>
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Progress Indicators */}
      <div className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2 z-30 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`transition-all duration-500 ${
              index === currentSlide
                ? "w-10 sm:w-12 h-2.5 sm:h-3 bg-white rounded-full shadow-lg"
                : "w-2.5 sm:w-3 h-2.5 sm:h-3 bg-white/40 rounded-full hover:bg-white/60"
            }`}
          />
        ))}
      </div>

      {/* Slide Counter */}
      <div className="absolute top-6 sm:top-8 right-4 sm:right-8 z-30 bg-white/20 backdrop-blur-sm text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-full border border-white/30">
        <span className="text-xs sm:text-sm font-semibold">
          {currentSlide + 1} / {slides.length}
        </span>
      </div>
    </div>
  )
}

export default HeroSlider
