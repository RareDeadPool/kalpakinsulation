"use client"

import { useState, useEffect, useRef } from "react"
import { Building, Users, Award, Clock } from "lucide-react"

const StatsCounter = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [counts, setCounts] = useState({
    projects: 0,
    clients: 0,
    experience: 0,
    team: 0,
  })
  const sectionRef = useRef(null)

  const finalCounts = {
    projects: 500,
    clients: 200,
    experience: 15,
    team: 25,
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.3 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (isVisible) {
      const duration = 2000
      const steps = 60
      const stepDuration = duration / steps

      Object.keys(finalCounts).forEach((key) => {
        const finalValue = finalCounts[key]
        const increment = finalValue / steps
        let currentValue = 0

        const timer = setInterval(() => {
          currentValue += increment
          if (currentValue >= finalValue) {
            currentValue = finalValue
            clearInterval(timer)
          }
          setCounts((prev) => ({
            ...prev,
            [key]: Math.floor(currentValue),
          }))
        }, stepDuration)
      })
    }
  }, [isVisible])

  const stats = [
    {
      number: counts.projects,
      suffix: "+",
      label: "Projects Completed",
      icon: <Building className="w-8 h-8" />,
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      number: counts.clients,
      suffix: "+",
      label: "Happy Clients",
      icon: <Users className="w-8 h-8" />,
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-100",
      iconColor: "text-green-600",
    },
    {
      number: counts.experience,
      suffix: "+",
      label: "Years Experience",
      icon: <Award className="w-8 h-8" />,
      color: "from-yellow-500 to-yellow-600",
      bgColor: "bg-yellow-100",
      iconColor: "text-yellow-600",
    },
    {
      number: counts.team,
      suffix: "+",
      label: "Team Members",
      icon: <Clock className="w-8 h-8" />,
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-100",
      iconColor: "text-purple-600",
    },
  ]

  return (
    <section ref={sectionRef} className="gradient-primary text-white section-padding relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 fade-in">Our Achievements</h2>
          <p className="text-xl opacity-90 max-w-3xl mx-auto fade-in stagger-1">
            Numbers that speak for our commitment to excellence and customer satisfaction
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center group fade-in" style={{ animationDelay: `${index * 0.2}s` }}>
              <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 hover:bg-white/20 transition-all duration-300 hover:-translate-y-2 shadow-xl">
                {/* Icon */}
                <div
                  className={`w-16 h-16 ${stat.bgColor} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  <div className={stat.iconColor}>{stat.icon}</div>
                </div>

                {/* Number */}
                <div className="text-4xl lg:text-6xl font-bold mb-3 bg-gradient-to-r from-white to-gray-100 bg-clip-text text-transparent">
                  {stat.number}
                  {stat.suffix}
                </div>

                {/* Label */}
                <div className="text-lg opacity-90 font-medium">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="text-center mt-16 fade-in stagger-2">
          <p className="text-lg opacity-80 max-w-2xl mx-auto">
            Trusted by leading companies across Maharashtra for quality insulation and scaffolding solutions
          </p>
        </div>
      </div>
    </section>
  )
}

export default StatsCounter
