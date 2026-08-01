import { Link } from "react-router-dom"
import { Thermometer, Snowflake, Building, CheckCircle, Star, ArrowRight, Award, Users, Clock } from "lucide-react"
import { useState, useEffect } from "react"
import HeroSlider from "../components/HeroSlider"
import StatsCounter from "../components/StatsCounter"
import ReviewSection from "../components/ReviewSection"
import { Avatar, AvatarFallback } from "../components/ui/avatar"
import { getServices, getFeaturedProjects, getTestimonials, getWhyChooseUs, getHomepageContent } from "../services/dbServices"

const Home = () => {
  const [services, setServices] = useState([]);
  const [featuredProjects, setFeaturedProjects] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [whyChooseUs, setWhyChooseUs] = useState([]);
  const [homepageContent, setHomepageContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          servicesData,
          projectsData,
          testimonialsData,
          whyChooseUsData,
          homepageData
        ] = await Promise.all([
          getServices(),
          getFeaturedProjects(),
          getTestimonials(),
          getWhyChooseUs(),
          getHomepageContent()
        ]);

        setServices(servicesData);
        setFeaturedProjects(projectsData);
        setTestimonials(testimonialsData);
        setWhyChooseUs(whyChooseUsData);
        setHomepageContent(homepageData);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch data');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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
      {/* Hero Slider */}
      <HeroSlider />

      {/* Services Section */}
      <section className="section-padding">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-10 sm:mb-16">
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-4 sm:mb-6">Our Professional Services</h2>
            <p className="text-base sm:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              {homepageContent?.servicesDescription || "We provide comprehensive insulation and scaffolding solutions for industrial, commercial, and residential projects across Maharashtra."}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {services.map((service, index) => (
              <div key={service.id} className="card-professional p-8 h-full">
                <div className="w-16 h-16 bg-primary-100 rounded-xl flex items-center justify-center mb-6">
                  {service.icon === 'thermometer' && <Thermometer className="w-8 h-8 text-primary-500" />}
                  {service.icon === 'snowflake' && <Snowflake className="w-8 h-8 text-primary-500" />}
                  {service.icon === 'building' && <Building className="w-8 h-8 text-primary-500" />}
                </div>

                <h3 className="text-2xl font-bold text-gray-800 mb-4">{service.title}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>

                <ul className="space-y-3 mb-8">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-gray-700">
                      <CheckCircle className="w-5 h-5 text-primary-500 mr-3 flex-shrink-0" />
                      <span className="font-medium">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  to="/services"
                  className="inline-flex items-center text-primary-600 font-semibold hover:text-primary-700 transition-colors"
                >
                  Learn More
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-padding bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-10 sm:mb-16">
            <h2 className="text-2xl sm:text-4xl font-bold text-gray-800 mb-4 sm:mb-6">Why Choose Kalpak Insulation?</h2>
            <p className="text-base sm:text-xl text-gray-600 max-w-3xl mx-auto">
              {homepageContent?.whyChooseUsDescription || "With years of experience and a commitment to excellence, we deliver superior insulation solutions that meet your specific needs."}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
            {whyChooseUs.map((item) => (
              <div key={item.id} className="text-center">
                <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                  {item.icon === 'award' && <Award className="w-8 h-8 text-yellow-600" />}
                  {item.icon === 'users' && <Users className="w-8 h-8 text-blue-600" />}
                  {item.icon === 'clock' && <Clock className="w-8 h-8 text-green-600" />}
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Counter */}
      <StatsCounter />

      {/* Featured Projects */}
      <section className="section-padding">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-10 sm:mb-16">
            <h2 className="text-2xl sm:text-4xl font-bold text-gray-800 mb-4 sm:mb-6">Featured Projects</h2>
            <p className="text-base sm:text-xl text-gray-600 max-w-3xl mx-auto">
              {homepageContent?.projectsDescription || "Explore some of our recent successful projects across different industries and applications."}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {featuredProjects.map((project) => (
              <div key={project.id} className="card-professional overflow-hidden">
                <div className="relative">
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    className="w-full h-48 sm:h-64 object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-primary-600 text-white rounded-full text-sm font-semibold">
                      {project.category}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-3">{project.title}</h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">{project.description}</p>

                  <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                    <span>{project.client}</span>
                    <span>{project.year}</span>
                  </div>

                  <Link
                    to="/projects"
                    className="inline-flex items-center text-primary-600 font-semibold hover:text-primary-700 transition-colors"
                  >
                    View Details
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/projects" className="btn-primary">
              View All Projects
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-10 sm:mb-16">
            <h2 className="text-2xl sm:text-4xl font-bold text-gray-800 mb-4 sm:mb-6">What Our Clients Say</h2>
            <p className="text-base sm:text-xl text-gray-600 max-w-3xl mx-auto">
              {homepageContent?.testimonialsDescription || "Don't just take our word for it. Here's what our satisfied clients have to say about our services."}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="card-professional p-8">
                <div className="flex mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>

                <p className="text-gray-600 mb-6 italic leading-relaxed">"{testimonial.content}"</p>

                <div className="flex items-center">
                  <Avatar className="w-12 h-12 rounded-full mr-4 bg-gray-200 flex items-center justify-center">
                    {testimonial.avatar ? (
                      <img
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      <AvatarFallback className="text-sm font-semibold text-gray-700">
                        {testimonial.name ? testimonial.name.split(" ").map(n => n[0]).join("") : '??'}
                      </AvatarFallback>
                    )}
                  </Avatar>
                  <div>
                    <h4 className="font-bold text-gray-800">{testimonial.name}</h4>
                    <p className="text-gray-600 text-sm">{testimonial.company}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Review Section */}
      <ReviewSection />

      {/* CTA Section */}
      <section className="gradient-primary text-white section-padding">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-4xl font-bold mb-4 sm:mb-6">Ready to Start Your Project?</h2>
          <p className="text-base sm:text-xl mb-6 sm:mb-8 max-w-3xl mx-auto opacity-90 leading-relaxed">
            Get in touch with our experts today for a free consultation and quote. We're here to help you with all your
            insulation and scaffolding needs.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
            <Link to="/contact" className="btn-secondary bg-white text-primary-600 hover:bg-gray-100">
              Get Free Quote
            </Link>
            <Link
              to="/services"
              className="btn-secondary border-white text-white hover:bg-white hover:text-primary-600"
            >
              View Services
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
