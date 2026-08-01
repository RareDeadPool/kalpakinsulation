"use client"

import { useState, useEffect } from "react"
import { Eye, Calendar, MapPin, Search } from "lucide-react"
import { getProjectsFirestore } from "../services/firebase";

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const fetchedProjects = await getProjectsFirestore();
        setProjects(fetchedProjects);
      } catch (err) {
        console.error("Error fetching projects:", err);
        setError("Failed to load projects. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const categories = [
    { id: "all", name: "All Projects" },
    { id: "thermal", name: "Thermal Insulation" },
    { id: "cold", name: "Cold Insulation" },
    { id: "scaffolding", name: "Scaffolding" },
  ]

  const filteredProjects = projects.filter((project) => {
    const matchesFilter = activeFilter === "all" || project.category === activeFilter
    const matchesSearch =
      project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.location.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const stats = [
    { number: "500+", label: "Projects Completed", icon: "🏗️" },
    { number: "200+", label: "Happy Clients", icon: "😊" },
    { number: "15+", label: "Years Experience", icon: "⭐" },
    { number: "100%", label: "Quality Assurance", icon: "✅" },
  ]

  if (loading) {
    return <div className="pt-20 text-center text-lg">Loading projects...</div>;
  }

  if (error) {
    return <div className="pt-20 text-center text-red-500">Error: {error}</div>;
  }

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="gradient-primary text-white section-padding relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 sm:px-6 text-center relative z-10">
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold mb-6 sm:mb-8 fade-in">Our Project Portfolio</h1>
          <p className="text-base sm:text-xl max-w-4xl mx-auto leading-relaxed fade-in stagger-2">
            Explore our portfolio of successful insulation and scaffolding projects across Maharashtra. Each project
            showcases our commitment to quality, safety, and customer satisfaction.
          </p>
        </div>
      </section>

      {/* Filter and Search Section */}
      <section className="py-8 sm:py-12 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 items-stretch lg:items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md fade-in">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm sm:text-base"
              />
            </div>

            {/* Filter Buttons */}
            <div className="flex flex-wrap gap-2 sm:gap-4 fade-in stagger-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveFilter(category.id)}
                  className={`px-4 py-2 sm:px-6 sm:py-3 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-300 hover-lift ${
                    activeFilter === category.id
                      ? "bg-primary-600 text-white shadow-lg"
                      : "bg-white text-gray-700 hover:bg-primary-50 hover:text-primary-600 border border-gray-200"
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="section-padding">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProjects.map((project, index) => (
              <div
                key={project.id}
                className={`card-professional overflow-hidden hover-lift fade-in stagger-${(index % 6) + 1}`}
              >
                <div className="relative group">
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.name}
                    className="w-full h-48 sm:h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-primary-600 text-white rounded-full text-sm font-semibold capitalize">
                      {project.category}
                    </span>
                  </div>
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                    <Eye
                      className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      size={32}
                    />
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-3 leading-tight">{project.name}</h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">{project.description}</p>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-500">
                      <MapPin className="w-4 h-4 mr-2 text-primary-500" />
                      {project.location}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="w-4 h-4 mr-2 text-primary-500" />
                      {project.startDate} - {project.endDate}
                    </div>
                  </div>

                  <div className="border-t pt-4 space-y-2">
                    <div className="text-sm">
                      <span className="font-semibold text-gray-800">Client:</span>
                      <span className="text-gray-600 ml-2">{project.client}</span>
                    </div>
                    <div className="text-sm">
                      <span className="font-semibold text-gray-800">Status:</span>
                      <span className="text-gray-600 ml-2">{project.status}</span>
                    </div>
                    <div className="text-sm">
                      <span className="font-semibold text-gray-800">Budget:</span>
                      <span className="text-gray-600 ml-2">{project.budget}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {filteredProjects.length === 0 && !loading && !error && (
            <p className="text-center text-gray-600 text-lg mt-8">No projects found matching your criteria.</p>
          )}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-10 sm:py-16 bg-gray-800 text-white">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-4xl font-bold mb-8 sm:mb-12 fade-in">Our Achievements</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            {stats.map((stat, index) => (
              <div key={index} className={`flex flex-col items-center fade-in stagger-${index + 1}`}>
                <span className="text-3xl sm:text-5xl mb-2 sm:mb-3">{stat.icon}</span>
                <p className="text-2xl sm:text-4xl font-bold text-primary-300">{stat.number}</p>
                <p className="text-xs sm:text-sm text-gray-300 uppercase tracking-wider mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Projects;
