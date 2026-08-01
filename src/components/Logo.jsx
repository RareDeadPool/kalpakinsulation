"use client"

const Logo = ({ size = "default", className = "", onClick }) => {
  const sizeClasses = {
    small: "w-8 h-8",
    default: "w-12 h-12",
    large: "w-16 h-16",
    xl: "w-20 h-20",
  }

  return (
    <div className={`${sizeClasses[size]} ${className} relative cursor-pointer`} onClick={onClick}>
      <img
        src="/images/logo.png"
        alt="Kalpak Insulation Logo"
        className="w-full h-full object-contain transition-transform duration-300 hover:scale-105"
      />
    </div>
  )
}

export default Logo
