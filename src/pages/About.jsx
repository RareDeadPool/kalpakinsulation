import { Users, Award, Target, Eye, Heart, Shield, Mail, Phone } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { getStaffMembers, getCompanyInfo } from "../services/dbServices"

const About = () => {
  const timelineRef = useRef(null)
  const timelineItemsRef = useRef([])
  const [team, setTeam] = useState([]);
  const [companyInfo, setCompanyInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [staffData, companyData] = await Promise.all([
          getStaffMembers(),
          getCompanyInfo()
        ]);
        setTeam(staffData || []);
        setCompanyInfo(companyData || {});
        setLoading(false);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to fetch data');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in")
            observer.unobserve(entry.target)
          }
        })
      },
      {
        threshold: 0.2,
        rootMargin: "0px 0px -100px 0px"
      }
    )

    timelineItemsRef.current.forEach((item) => {
      observer.observe(item)
    })

    return () => {
      if (timelineItemsRef.current) {
        timelineItemsRef.current.forEach((item) => {
          if (item) {
            observer.unobserve(item)
          }
        })
      }
    }
  }, [])

  const timeline = [
    {
      year: "2009",
      title: "Company Establishment",
      description: "Kalpak Insulation was established in 2009 with a vision to provide quality insulation solutions.",
    },
    {
      year: "2013",
      title: "Service Expansion",
      description: "Expanded services to include cold insulation and scaffolding solutions.",
    },
    {
      year: "2016",
      title: "Major Projects",
      description: "Completed several large-scale industrial insulation projects across Maharashtra.",
    },
    {
      year: "2019",
      title: "Team Growth",
      description: "Expanded our team of experts and enhanced our service capabilities.",
    },
    {
      year: "2022",
      title: "Technology Upgrade",
      description: "Invested in latest insulation technologies and equipment for better service delivery.",
    },
    {
      year: "2024",
      title: "Industry Leader",
      description: "Recognized as one of the leading insulation service providers in the region.",
    },
  ]

  const values = [
    {
      icon: <Target className="w-8 h-8 text-primary-500" />,
      title: "Quality Excellence",
      description:
        "We are committed to delivering the highest quality insulation solutions using premium materials and expert craftsmanship.",
    },
    {
      icon: <Users className="w-8 h-8 text-blue-600" />,
      title: "Customer Focus",
      description:
        "Our customers are at the heart of everything we do. We listen, understand, and deliver solutions that exceed expectations.",
    },
    {
      icon: <Award className="w-8 h-8 text-yellow-600" />,
      title: "Professional Integrity",
      description: "We conduct business with honesty, transparency, and ethical practices in all our interactions.",
    },
    {
      icon: <Shield className="w-8 h-8 text-green-600" />,
      title: "Safety First",
      description: "Safety is our top priority. We maintain strict safety protocols to protect our team and clients.",
    },
  ]

  const achievements = [
    { number: "500+", label: "Projects Completed", icon: "🏗️" },
    { number: "200+", label: "Happy Clients", icon: "😊" },
    { number: "15+", label: "Years Experience", icon: "⭐" },
    { number: "70+", label: "Skilled & Unskilled Laborers", icon: "👷" },
  ]

  if (loading) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="gradient-primary text-white section-padding relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 sm:px-6 text-center relative z-10">
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold mb-6 sm:mb-8 fade-in">About Kalpak Insulation</h1>
          <p className="text-base sm:text-xl max-w-4xl mx-auto leading-relaxed fade-in stagger-2">
            {companyInfo?.description || "Leading provider of thermal insulation, cold insulation, and scaffolding services in Maharashtra, India. With years of experience and a commitment to excellence, we deliver superior solutions for all your industrial needs."}
          </p>
        </div>
      </section>

      {/* Company Story */}
      <section className="section-padding">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-16 items-center">
            <div className="fade-in-left">
              <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-6 sm:mb-8">Our Story</h2>
              <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                {companyInfo?.story || "Kalpak Insulation is an ENERGY MANAGEMENT, EFFICIENCY development and consulting firm that concentrates on the technology needs of organizations."}
              </p>
              <p className="text-gray-600 mb-6 leading-relaxed">
                {companyInfo?.mission || "We are an industry Leader in Energy Management, offering a wide range of technical solutions, systems, integrations, and services."}
              </p>
              <p className="text-gray-600 mb-8 leading-relaxed">
                {companyInfo?.vision || "As an innovative solutions provider across a broad spectrum of industry sectors, our technical consulting service is our foremost and most invaluable product."}
              </p>

              <div className="grid grid-cols-2 gap-8">
                {achievements.slice(0, 2).map((achievement, index) => (
                  <div key={index} className="text-center card-professional p-6 hover-lift">
                    <div className="text-3xl mb-2">{achievement.icon}</div>
                    <div className="text-3xl font-bold text-primary-600 mb-2">{achievement.number}</div>
                    <div className="text-gray-600 font-medium">{achievement.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="fade-in-right">
              <img
                src={companyInfo?.image || "/placeholder.svg?height=600&width=800"}
                alt="About Kalpak Insulation"
                className="rounded-2xl shadow-2xl hover-lift"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="section-padding bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-10 sm:mb-16">
            <h2 className="text-2xl sm:text-4xl font-bold text-gray-800 mb-4 sm:mb-6 fade-in">Our Foundation</h2>
            <p className="text-base sm:text-xl text-gray-600 max-w-3xl mx-auto fade-in stagger-2">
              Built on strong values and clear vision, we strive for excellence in everything we do.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 mb-16 sm:mb-20">
            <div className="text-center card-professional p-8 hover-lift fade-in stagger-1">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Target className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Our Mission</h3>
              <p className="text-gray-600 leading-relaxed">
                {companyInfo?.mission || "To provide innovative, reliable, and cost-effective insulation solutions that help our clients achieve optimal energy efficiency and operational excellence."}
              </p>
            </div>

            <div className="text-center card-professional p-8 hover-lift fade-in stagger-2">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Eye className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Our Vision</h3>
              <p className="text-gray-600 leading-relaxed">
                {companyInfo?.vision || "To be the leading insulation service provider in India, recognized for our quality, innovation, and commitment to sustainable solutions."}
              </p>
            </div>

            <div className="text-center card-professional p-8 hover-lift fade-in stagger-3">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Our Values</h3>
              <p className="text-gray-600 leading-relaxed">
                {companyInfo?.values || "We are committed to excellence, integrity, and customer satisfaction in everything we do."}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="section-padding">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-10 sm:mb-16">
            <h2 className="text-2xl sm:text-4xl font-bold text-gray-800 mb-4 sm:mb-6 fade-in">Our Team</h2>
            <p className="text-base sm:text-xl text-gray-600 max-w-3xl mx-auto fade-in stagger-2">
              Meet our dedicated team of professionals who make it all possible.
            </p>
          </div>

          {/* Qualified Personnel */}
          <div className="mb-12 sm:mb-16">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6 sm:mb-8 text-center">Qualified Personnel with Designation</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {team
                .filter(member => ['Proprietor', 'Project Manager', 'Site - In charge', 'Supervisor'].includes(member.position))
                .sort((a, b) => {
                  const order = ['Proprietor', 'Project Manager', 'Site - In charge', 'Supervisor'];
                  return order.indexOf(a.position) - order.indexOf(b.position);
                })
                .map((member, index) => (
                  <div key={member.id} className={`card-professional text-center p-6 hover-lift fade-in stagger-${(index % 4) + 1}`}>
                    <div className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden">
                      <img
                        src={member.image || "/placeholder.svg?height=300&width=300"}
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{member.name}</h3>
                    <p className="text-primary-600 font-semibold mb-4">{member.position}</p>
                    {member.bio && <p className="text-gray-600 mb-4">{member.bio}</p>}
                    <div className="flex justify-center space-x-4">
                      {member.email && (
                        <a href={`mailto:${member.email}`} className="text-gray-600 hover:text-primary-600">
                          <Mail className="w-5 h-5" />
                        </a>
                      )}
                      {member.phone && (
                        <a href={`tel:${member.phone}`} className="text-gray-600 hover:text-primary-600">
                          <Phone className="w-5 h-5" />
                        </a>
                      )}
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Workers */}
          {team.some(member => member.position === 'Worker') && (
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6 sm:mb-8 text-center">Our Workers</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-8">
                {team
                  .filter(member => member.position === 'Worker')
                  .sort((a, b) => {
                    if (a.workerType === b.workerType) return 0;
                    return a.workerType === 'Skilled' ? -1 : 1;
                  })
                  .map((member, index) => (
                    <div key={member.id} className={`card-professional text-center p-6 hover-lift fade-in stagger-${(index % 4) + 1}`}>
                      <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden">
                        <img
                          src={member.image || "/placeholder.svg?height=300&width=300"}
                          alt={member.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <h3 className="text-lg font-bold text-gray-800 mb-2">{member.name}</h3>
                      <p className="text-primary-600 font-semibold mb-2">{member.workerType} Worker</p>
                      {member.bio && <p className="text-gray-600 text-sm">{member.bio}</p>}
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Timeline Section */}
      <section className="section-padding bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-10 sm:mb-16">
            <h2 className="text-2xl sm:text-4xl font-bold text-gray-800 mb-4 sm:mb-6 fade-in">Our Journey</h2>
            <p className="text-base sm:text-xl text-gray-600 max-w-3xl mx-auto fade-in stagger-2">
              A timeline of our growth and achievements over the years.
            </p>
          </div>

          <div className="relative" ref={timelineRef}>
            {/* Center line - hidden on mobile */}
            <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-primary-200"></div>
            {timeline.map((item, index) => (
              <div
                key={index}
                ref={(el) => (timelineItemsRef.current[index] = el)}
                className={`relative mb-8 sm:mb-12 ${
                  index % 2 === 0 ? "lg:ml-auto lg:mr-[50%] lg:pr-12" : "lg:mr-auto lg:ml-[50%] lg:pl-12"
                } max-w-full lg:max-w-[46%]`}
              >
                <div className="hidden lg:block absolute top-4 -right-2 lg:left-auto lg:right-auto w-4 h-4 rounded-full bg-primary-500"
                  style={index % 2 === 0 ? { right: '-2.25rem' } : { left: '-2.25rem' }}></div>
                <div className="bg-white rounded-lg shadow-lg p-5 sm:p-6 ml-0">
                  <div className="text-primary-600 font-bold mb-2">{item.year}</div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm sm:text-base">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default About