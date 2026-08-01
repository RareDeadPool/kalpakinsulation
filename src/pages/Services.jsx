import { Thermometer, Snowflake, Building, CheckCircle, ArrowRight, Shield, Clock, Award } from "lucide-react"
import { useState, useEffect } from "react"
import { FiSearch } from "react-icons/fi"
import { FaTools, FaHammer, FaWrench, FaCogs, FaCut, FaScrewdriver, FaDrumSteelpan } from "react-icons/fa"
import InventoryGrid from "../components/InventoryGrid"
import { getServices } from "../services/dbServices"

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        const servicesData = await getServices();
        setServices(servicesData || []);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching services:', err);
        setError('Failed to fetch services');
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const additionalServices = [
    {
      title: "Maintenance Services",
      description: "Regular maintenance and inspection of insulation systems to ensure optimal performance.",
      icon: <Shield className="w-8 h-8 text-primary-500" />,
    },
    {
      title: "Emergency Repairs",
      description: "24/7 emergency repair services for critical insulation and scaffolding needs.",
      icon: <Clock className="w-8 h-8 text-primary-500" />,
    },
    {
      title: "Consultation Services",
      description: "Expert consultation for insulation design and energy efficiency optimization.",
      icon: <Award className="w-8 h-8 text-primary-500" />,
    },
  ]

  const processSteps = [
    {
      step: "01",
      title: "Initial Consultation",
      description: "We assess your requirements and provide expert recommendations for your project.",
    },
    {
      step: "02",
      title: "Site Survey",
      description: "Our team conducts a detailed site survey to understand project specifications.",
    },
    {
      step: "03",
      title: "Design & Planning",
      description: "We create detailed plans and designs tailored to your specific needs.",
    },
    {
      step: "04",
      title: "Material Selection",
      description: "We select the best materials based on your requirements and budget.",
    },
    {
      step: "05",
      title: "Professional Installation",
      description: "Our expert team ensures precise installation following safety protocols.",
    },
    {
      step: "06",
      title: "Quality Assurance",
      description: "We conduct thorough quality checks and provide ongoing support.",
    },
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
        <div className="container mx-auto px-6 text-center relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold mb-8 fade-in">Our Services</h1>
          <p className="text-xl max-w-4xl mx-auto leading-relaxed fade-in stagger-2">
            Comprehensive insulation solutions for all your industrial needs
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section-padding">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={service.id}
                className={`card-professional p-6 hover-lift fade-in stagger-${(index % 3) + 1}`}
              >
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">{service.title}</h3>
                <p className="text-gray-600 mb-6">{service.description}</p>
                {service.features && (
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-gray-600">
                        <span className="w-2 h-2 bg-primary-500 rounded-full mr-2"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                )}
                {service.price && (
                  <div className="text-primary-600 font-bold text-xl mb-4">
                    Starting from ₹{service.price}
                  </div>
                )}
                {service.duration && (
                  <div className="text-gray-600">
                    Duration: {service.duration}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="section-padding bg-primary-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Additional Services</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Beyond our core services, we offer comprehensive support to ensure your projects run smoothly from start
              to finish.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {additionalServices.map((service, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-8 text-center hover-lift">
                <div className="bg-primary-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  {service.title}
                </h3>
                <p className="text-gray-600">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tools and Machineries */}
      <section className="section-padding">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Tools & Machineries</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We utilize state-of-the-art tools and machineries to deliver precision and efficiency in all our projects.
            </p>
          </div>

          <InventoryGrid />
        </div>
      </section>

      {/* Process Section */}
      <section className="section-padding">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Process</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We follow a systematic approach to ensure every project is completed to the highest standards of quality
              and safety.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {processSteps.map((step, index) => (
              <div key={index} className="relative">
                <div className="bg-white rounded-lg shadow-lg p-8 hover-lift">
                  <div className="text-primary-500 text-4xl font-bold mb-4">{step.step}</div>
                  <h3 className="text-xl font-bold text-gray-800 mb-4">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
                {index < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <ArrowRight className="w-8 h-8 text-primary-300" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary-500 text-white section-padding">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Need a Custom Solution?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Every project is unique. Let our experts design a custom insulation or scaffolding solution that perfectly
            fits your requirements and budget.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="bg-white text-primary-500 px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors duration-300 font-semibold"
            >
              Request Consultation
            </a>
            <a
              href="tel:+919725632918"
              className="border-2 border-white text-white px-8 py-3 rounded-lg hover:bg-white hover:text-primary-500 transition-colors duration-300 font-semibold"
            >
              Call Now
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Services
