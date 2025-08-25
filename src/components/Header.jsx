import { useState, useEffect } from 'react'
import { Link } from 'react-scroll'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const navItems = [
    { name: 'Home', to: 'home' },
    { name: 'Search', to: 'search' },
    { name: 'Trending', to: 'trending' },
    { name: 'About', to: 'about' },
  ]

  return (
    <nav className={`fixed top-0 left-0 w-full py-4 z-50 transition-all duration-300 ${isScrolled ? 'bg-black/80 backdrop-blur-md shadow-lg' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <Link 
          to="home" 
          smooth={true} 
          duration={500} 
          className="text-2xl font-bold cursor-pointer flex items-center group"
        >
          <span className="bg-gradient-to-tr from-red-600 via-white to-red-600 bg-clip-text text-transparent">
            MOVORA
          </span>

        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-1">
          {navItems.map((item, index) => (
            <Link 
              key={item.to}
              to={item.to} 
              smooth={true} 
              duration={500} 
              className="relative px-4 py-2 cursor-pointer group/nav-item"
              activeClass="text-accent"
              spy={true}
              offset={-80}
            >
              <span className="text-white/90 group-hover/nav-item:text-white transition-colors duration-300 z-10 relative">
                {item.name}
              </span>
              <span className="absolute inset-0 bg-accent rounded-lg scale-0 group-hover/nav-item:scale-100 transition-transform duration-300 opacity-0 group-hover/nav-item:opacity-10 z-0"></span>
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="lg:hidden flex flex-col items-center justify-center w-10 h-10 relative focus:outline-none"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
          <span className={`w-6 h-0.5 bg-white transition-all duration-300 mt-1.5 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
          <span className={`w-6 h-0.5 bg-white transition-all duration-300 mt-1.5 ${isMenuOpen ? '-rotate-45 -translate-y-2.5' : ''}`}></span>
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`lg:hidden absolute top-full left-0 w-full bg-black/95 backdrop-blur-lg transition-all duration-300 ease-out overflow-hidden ${isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="container mx-auto px-4 sm:px-6 py-4">
          <div className="flex flex-col space-y-3">
            {navItems.map((item) => (
              <Link 
                key={item.to}
                to={item.to} 
                smooth={true} 
                duration={500} 
                className="py-3 px-4 rounded-lg cursor-pointer transition-all duration-300 hover:bg-white/10 group/mobile-item"
                onClick={() => setIsMenuOpen(false)}
                activeClass="bg-accent/20 text-accent"
                spy={true}
                offset={-80}
              >
                <span className="text-white/90 group-hover/mobile-item:text-white transition-colors duration-300 flex items-center">
                  {item.name}
                  <svg 
                    className="w-4 h-4 ml-2 opacity-0 group-hover/mobile-item:opacity-100 transition-opacity duration-300" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Header
