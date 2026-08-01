import { useState } from "react"
import { FiSearch } from "react-icons/fi"
import { FaTools, FaHammer, FaWrench, FaCogs, FaCut, FaScrewdriver, FaDrumSteelpan } from "react-icons/fa"

const toolsData = [
  { name: "6 mtr. Scaffolding Pipe", qty: 500, category: "Pipe", icon: <FaTools /> },
  { name: "3 mtr. Scaffolding Pipe", qty: 1000, category: "Pipe", icon: <FaTools /> },
  { name: "Clamps", qty: 10000, category: "Tool", icon: <FaCogs /> },
  { name: "Grooving Machines", qty: 20, category: "Machine", icon: <FaDrumSteelpan /> },
  { name: "Rolling Machines", qty: 5, category: "Machine", icon: <FaDrumSteelpan /> },
  { name: "Drill Machines", qty: 30, category: "Machine", icon: <FaWrench /> },
  { name: "Tin Cutter", qty: 150, category: "Tool", icon: <FaCut /> },
  { name: "Screw Drivers", qty: 120, category: "Tool", icon: <FaScrewdriver /> },
  { name: "Hammers", qty: 1, category: "Tool", icon: <FaHammer /> },
]

const InventoryGrid = () => {
  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState("All")

  const filteredData = toolsData.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase())
    const matchesFilter = filter === "All" || item.category === filter
    return matchesSearch && matchesFilter
  })

  return (
    <div className="mt-16 bg-white rounded-xl shadow-lg p-6 max-w-7xl mx-auto">
      <h3 className="text-3xl font-bold text-center text-gray-800 mb-6">Detailed Inventory</h3>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8 justify-between items-center">
        <div className="relative w-full sm:w-1/2">
          <FiSearch className="absolute top-1/2 left-3 transform -translate-y-1/2 text-red-500" />
          <input
            type="text"
            placeholder="Search tools or machines..."
            className="w-full pl-10 pr-4 py-2 border border-red-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <select
          className="w-full sm:w-1/4 px-4 py-2 border border-red-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="All">All Categories</option>
          <option value="Machine">Machines</option>
          <option value="Tool">Tools</option>
          <option value="Pipe">Pipes</option>
        </select>
      </div>

      {/* Grid Inventory */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredData.map((item, i) => (
          <div
            key={i}
            className="bg-red-50 border-2 border-red-500 text-red-600 p-5 rounded-lg shadow-md hover:shadow-lg transition duration-200"
          >
            <div className="flex items-center justify-center mb-4 text-3xl">
              {item.icon}
            </div>
            <h4 className="text-lg font-semibold text-center mb-2">{item.name}</h4>
            <p className="text-center text-sm">Qty: {item.qty}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default InventoryGrid 