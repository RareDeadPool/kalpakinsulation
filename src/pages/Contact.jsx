"use client"

import { useState, useEffect } from "react"
import { Phone, Mail, MapPin, Clock, Send, CheckCircle, MessageSquare, Users, Award, AlertCircle } from "lucide-react"
import { toast } from "react-toastify"
import emailjs from '@emailjs/browser'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: "",
    message: "",
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState({})
  const [mapLoaded, setMapLoaded] = useState(false)

  useEffect(() => {
    // Load Google Maps script
    const script = document.createElement('script')
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&callback=initMap`
    script.async = true
    script.defer = true
    window.initMap = () => {
      const location = { lat: 19.215633, lng: 73.090781 }
      const map = new google.maps.Map(document.getElementById('map'), {
        zoom: 15,
        center: location,
      })
      new google.maps.Marker({
        position: location,
        map: map,
      })
      setMapLoaded(true)
    }
    document.head.appendChild(script)

    return () => {
      // Cleanup
      document.head.removeChild(script)
      delete window.initMap
    }
  }, [])

  const validateForm = () => {
    const newErrors = {}
    if (!formData.name.trim()) newErrors.name = "Name is required"
    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format"
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required"
    } else if (!/^\+?[0-9]{10,12}$/.test(formData.phone.replace(/\s+/g, ""))) {
      newErrors.phone = "Invalid phone number format"
    }
    if (!formData.message.trim()) newErrors.message = "Message is required"
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault() // Prevent default form submission

    if (!validateForm()) {
      toast.error("Please fix the errors in the form")
      return
    }

    setIsLoading(true)
    try {
      // Send data to Formspree for main email to kalpakinsulation@gmail.com
      const formspreeEndpoint = import.meta.env.VITE_FORMSPREE_ENDPOINT || 'https://formspree.io/f/xblyojgz';
      const formspreeResponse = await fetch(formspreeEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!formspreeResponse.ok) {
        throw new Error("Formspree submission failed.");
      }

      // Send auto-response email via EmailJS
      const templateParams = {
        from_name: "Kalpak Insulation",
        to_name: formData.name,
        to_email: formData.email,
        message: `Thank you for your inquiry! We received your message and will get back to you within 24 hours.\n\nYour details:\nName: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nCompany: ${formData.company || 'N/A'}\nService: ${formData.service || 'N/A'}\nMessage: ${formData.message}`
      };

      const emailjsServiceId = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_kby4qxt';
      const emailjsTemplateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_zyexre3';
      const emailjsPublicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'BNdzUFn5tWGrFMXPJ';

      await emailjs.send(emailjsServiceId, emailjsTemplateId, templateParams, emailjsPublicKey);

      setIsSubmitted(true)
      toast.success("Message sent successfully!")
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        service: "",
        message: "",
      })

    } catch (error) {
      console.error("Form submission or email sending failed:", error);
      toast.error(error.message || "Failed to send message. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const contactInfo = [
    {
      icon: <Phone className="w-6 h-6 text-primary-500" />,
      title: "Phone Numbers",
      details: ["+91 9594409122", "+91 96532 26606"],
      action: "tel:+919594409122",
    },
    {
      icon: <Mail className="w-6 h-6 text-primary-500" />,
      title: "Email Address",
      details: ["kalpakinsulation@gmail.com"],
      action: "mailto:kalpakinsulation@gmail.com",
    },
    {
      icon: <MapPin className="w-6 h-6 text-primary-500" />,
      title: "Office Address",
      details: [
        "Malhar Palace No. 1, Flat no. 403,",
        "Opp. Kasturi plaza, Manpada Road,",
        "Dombivli (East), Thane - 421 201",
      ],
      action: "https://maps.google.com",
    },
    {
      icon: <Clock className="w-6 h-6 text-primary-500" />,
      title: "Business Hours",
      details: ["Monday - Saturday: 9:00 AM - 6:00 PM", "Sunday: Closed", "Emergency services available 24/7"],
    },
  ]

  const services = [
    "Thermal Insulation",
    "Cold Insulation",
    "Scaffolding Services",
    "Maintenance Services",
    "Consultation Services",
    "Other",
  ]

  const whyContactUs = [
    {
      icon: <MessageSquare className="w-8 h-8 text-blue-500" />,
      title: "Quick Response",
      description: "We respond to all inquiries within 24 hours with detailed information.",
    },
    {
      icon: <Users className="w-8 h-8 text-green-500" />,
      title: "Expert Consultation",
      description: "Get professional advice from our experienced team of specialists.",
    },
    {
      icon: <Award className="w-8 h-8 text-yellow-500" />,
      title: "Free Quotes",
      description: "Receive detailed, no-obligation quotes for your project requirements.",
    },
  ]

  const faqs = [
    {
      question: "How long does a typical insulation project take?",
      answer:
        "Project duration varies based on scope and complexity. Small projects may take 1-3 days, while large industrial installations can take several weeks. We provide detailed timelines during consultation.",
    },
    {
      question: "Do you provide free quotes and consultations?",
      answer:
        "Yes, we offer free initial consultations and detailed quotes for all our services. Our experts will assess your requirements and provide comprehensive cost estimates.",
    },
    {
      question: "What areas do you serve in Maharashtra?",
      answer:
        "We serve all major cities and industrial areas across Maharashtra, including Mumbai, Pune, Thane, Aurangabad, Nashik, Nagpur, and surrounding regions.",
    },
    {
      question: "Are your services covered by warranty?",
      answer:
        "Yes, all our installations come with comprehensive warranties. Warranty periods vary by service type and materials used, typically ranging from 2-10 years.",
    },
    {
      question: "Do you handle emergency repairs?",
      answer:
        "Yes, we provide 24/7 emergency repair services for critical insulation and scaffolding issues. Contact us immediately for urgent requirements.",
    },
  ]

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="gradient-primary text-white section-padding relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-6 text-center relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold mb-8 fade-in">Contact Us</h1>
          <p className="text-xl max-w-4xl mx-auto leading-relaxed fade-in stagger-2">
            Ready to discuss your insulation or scaffolding project? Get in touch with our experts today for a free
            consultation and personalized quote.
          </p>
        </div>
      </section>

      {/* Why Contact Us */}
      <section className="section-padding bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-6 fade-in">Why Contact Us?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto fade-in stagger-2">
              Experience professional service and expert guidance for all your insulation needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {whyContactUs.map((item, index) => (
              <div key={index} className={`text-center card-professional p-8 hover-lift fade-in stagger-${index + 1}`}>
                <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form and Info */}
      <section className="section-padding">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div className="fade-in-left">
              <h2 className="text-4xl font-bold text-gray-800 mb-8">Send Us a Message</h2>
              <p className="text-gray-600 mb-8 text-lg leading-relaxed">
                Fill out the form below and we'll get back to you within 24 hours with a detailed response to your
                inquiry.
              </p>

              {isSubmitted && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8 flex items-center fade-in">
                  <CheckCircle className="w-6 h-6 text-green-500 mr-3" />
                  <div>
                    <h4 className="font-semibold text-green-800">Message Sent Successfully!</h4>
                    <p className="text-green-700">We'll get back to you within 24 hours.</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} action="https://formspree.io/f/xblyojgz" method="POST" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className={`w-full px-4 py-3 border ${
                        errors.name ? "border-red-500" : "border-gray-300"
                      } rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors`}
                      placeholder="Your full name"
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-500 flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.name}
                      </p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className={`w-full px-4 py-3 border ${
                        errors.email ? "border-red-500" : "border-gray-300"
                      } rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors`}
                      placeholder="your.email@example.com"
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-500 flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className={`w-full px-4 py-3 border ${
                        errors.phone ? "border-red-500" : "border-gray-300"
                      } rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors`}
                      placeholder="+91 XXXXX XXXXX"
                    />
                    {errors.phone && (
                      <p className="mt-1 text-sm text-red-500 flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.phone}
                      </p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="company" className="block text-sm font-semibold text-gray-700 mb-2">
                      Company Name
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                      placeholder="Your company name"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="service" className="block text-sm font-semibold text-gray-700 mb-2">
                    Service Required
                  </label>
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                  >
                    <option value="">Select a service</option>
                    {services.map((service, index) => (
                      <option key={index} value={service}>
                        {service}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                    Project Details *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className={`w-full px-4 py-3 border ${
                      errors.message ? "border-red-500" : "border-gray-300"
                    } rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors resize-none`}
                    placeholder="Please describe your project requirements, timeline, and any specific details..."
                  />
                  {errors.message && (
                    <p className="mt-1 text-sm text-red-500 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full btn-primary flex items-center justify-center space-x-3 disabled:opacity-50 disabled:cursor-not-allowed hover-lift"
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <Send className="w-5 h-5" />
                  )}
                  <span>{isLoading ? "Sending..." : "Send Message"}</span>
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="fade-in-right">
              <h2 className="text-4xl font-bold text-gray-800 mb-8">Get in Touch</h2>
              <p className="text-gray-600 mb-8 text-lg leading-relaxed">
                We're here to help with all your insulation and scaffolding needs. Reach out to us through any of the
                following channels.
              </p>

              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <div key={index} className="card-professional p-6 hover-lift">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0">
                        {info.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-gray-800 mb-3">{info.title}</h3>
                        {info.details.map((detail, idx) => (
                          <p key={idx} className="text-gray-600 mb-1">
                            {info.action && idx === 0 ? (
                              <a
                                href={info.action}
                                className="text-primary-600 hover:text-primary-700 transition-colors font-medium"
                              >
                                {detail}
                              </a>
                            ) : (
                              detail
                            )}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Quick Contact Buttons */}
              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                <a
                  href="tel:+919725632918"
                  className="btn-primary text-center flex items-center justify-center space-x-2 hover-lift"
                  >
                  <Phone className="w-5 h-5" />
                  <span>Call Now</span>
                </a>
                <a
                  href="https://wa.me/919725632918"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors duration-300 font-semibold text-center flex items-center justify-center space-x-2 hover-lift"
                >
                  <MessageSquare className="w-5 h-5" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-padding bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-6 fade-in">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto fade-in stagger-2">
              Quick answers to common questions about our services and processes.
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className={`card-professional p-8 hover-lift fade-in stagger-${index + 1}`}>
                <h3 className="text-lg font-bold text-gray-800 mb-4">{faq.question}</h3>
                <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-6 fade-in">Find Our Office</h2>
            <p className="text-gray-600 fade-in stagger-2">
              Visit us at our office in Dombivli (East), Thane for in-person consultations and project discussions.
            </p>
          </div>
          <div className="card-professional overflow-hidden hover-lift fade-in stagger-3">
            {!mapLoaded && (
              <div className="h-96 bg-gray-200 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                  <p className="text-gray-500 text-lg">Loading map...</p>
                </div>
              </div>
            )}
            <div id="map" className="w-full h-[400px]" style={{ display: mapLoaded ? 'block' : 'none' }}></div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Contact
