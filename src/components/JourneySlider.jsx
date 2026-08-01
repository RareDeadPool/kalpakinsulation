"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, MapPin, Users, Award } from "lucide-react"

const JourneySlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0)

  const journeySteps = [
    {
      year: "2010",
      title: "Company Founded",
      description: "Kalpak Insulation was established with a vision to provide quality insulation solutions.",
      image: "/placeholder.svg?height=400&width=600",
      icon: <Award className="w-8 h-8" />,
      color: "from-blue-500 to-blue-600",
      achievements: ["First office established", "Initial team of 5 members", "Local market focus"],
    },
    {
      year: "2013",
      title: "Service Expansion",
      description: "Expanded services to include cold insulation and scaffolding solutions.",
      image: "/placeholder.svg?height=400&width=600",
      icon: <Users className="w-8 h-8" />,
      color: "from-green-500 to-green-600",
      achievements: ["Added cold insulation", "Scaffolding services launched", "Team expanded to 12"],
    },
    {
      year: "2016",
      title: "Major Projects",
      description: "Completed several large-scale industrial insulation projects across Maharashtra.",
      image: "/placeholder.svg?height=400&width=600",
      icon: <MapPin className="w-8 h-8" />,
      color: "from-purple-500 to-purple-600",
      achievements: ["100+ projects completed", "State-wide operations", "Industry recognition"],
    },
    {
      year: "2019",
      title: "Team Growth",
      description: "Expanded our team of experts and enhanced our service capabilities.",
      image: "/placeholder.svg?height=400&width=600",
      icon: <Users className="w-8 h-8" />,
      color: "from-orange-500 to-orange-600",
      achievements: ["Team of 20+ experts", "Advanced equipment", "Quality certifications"],
    },
    {
      year: "2022",
      title: "Technology Upgrade",
      description: "Invested in latest insulation technologies and equipment for better service delivery.",
      image: "/placeholder.svg?height=400&width=600",
      icon: <Award className="w-8 h-8" />,
      color: "from-red-500 to-red-600",
      achievements: ["Latest technology", "Improved efficiency", "Enhanced safety protocols"],
    },
    {
      year: "2024",
      title: "Industry Leader",
      description: "Recognized as one of the leading insulation service providers in the region.",
      image: "/placeholder.svg?height=400&width=600",
      icon: <Award className="w-8 h-8" />,
      color: "from-primary-500 to-primary-600",
      achievements: ["500+ projects", "200+ clients", "Industry leadership"],
    },
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % journeySteps.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [journeySteps.length])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % journeySteps.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + journeySteps.length) % journeySteps.length)
  }

  return (
    <div className="relative bg-gray-50 py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-6 fade-in">Our Journey Through Time</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto fade-in stagger-1">
            From humble beginnings to industry leadership, explore the milestones that shaped our success story.
          </p>
        </div>

        <div className="relative">
          {/* Main Slider */}
          <div className="overflow-hidden rounded-2xl shadow-2xl">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {journeySteps.map((step, index) => (
                <div key={index} className="w-full flex-shrink-0">
                  <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[500px]">
                    {/* Content Side */}
                    <div className={`bg-gradient-to-br ${step.color} text-white p-12 flex flex-col justify-center`}>
                      <div className="flex items-center mb-6">
                        <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mr-4">
                          {step.icon}
                        </div>
                        <div className="text-3xl font-bold">{step.year}</div>
                      </div>

                      <h3 className="text-3xl font-bold mb-4">{step.title}</h3>
                      <p className="text-lg mb-8 opacity-90 leading-relaxed">{step.description}</p>

                      <div className="space-y-3">
                        <h4 className="text-lg font-semibold mb-4">Key Achievements:</h4>
                        {step.achievements.map((achievement, idx) => (
                          <div key={idx} className="flex items-center">
                            <div className="w-2 h-2 bg-white rounded-full mr-3"></div>
                            <span className="opacity-90">{achievement}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Image Side */}
                    <div className="relative">
                      <img
                        src={step.image || "/placeholder.svg"}
                        alt={step.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/20"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
          >
            <ChevronLeft size={24} />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
          >
            <ChevronRight size={24} />
          </button>

          {/* Timeline Indicators */}
          <div className="flex justify-center mt-8 space-x-2">
            {journeySteps.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`transition-all duration-300 ${
                  index === currentSlide
                    ? "w-12 h-3 bg-primary-600 rounded-full"
                    : "w-3 h-3 bg-gray-300 rounded-full hover:bg-gray-400"
                }`}
              />
            ))}
          </div>

          {/* Year Navigation */}
          <div className="flex justify-center mt-6 space-x-4 flex-wrap">
            {journeySteps.map((step, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
                  index === currentSlide
                    ? "bg-primary-600 text-white shadow-lg"
                    : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
                }`}
              >
                {step.year}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default JourneySlider
