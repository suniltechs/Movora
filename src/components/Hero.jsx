import { motion } from 'framer-motion'
import { Link } from 'react-scroll'

const Hero = () => {
  return (
    <section className="py-16 flex items-center justify-center relative overflow-hidden bg-gradient-to-tl from-black via-black/90 to-red-700">
      {/* Content */}
      <div className="container mt-10 mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Text content */}
          <motion.div 
            className="text-center lg:text-left lg:w-1/2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6"
            >
              <span className="w-2 h-2 bg-accent rounded-full mr-2 animate-pulse"></span>
              <span className="text-sm font-medium text-white">Explore thousands of films</span>
            </motion.div>
            
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Discover Your Next <span className="text-accent">Favorite</span> Film
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl mb-8 text-gray-200 max-w-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Search through thousands of movies and find detailed information, ratings, and recommendations.
            </motion.p>
            
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Link 
                to="search" 
                smooth={true} 
                duration={500}
                className="group relative inline-flex items-center justify-center px-8 py-4 bg-accent text-white font-semibold rounded-lg overflow-hidden transition-all duration-300 hover:bg-red-700 hover:shadow-2xl hover:shadow-accent/30"
              >
                <span className="relative z-10">Start Searching</span>
                <div className="absolute inset-0 bg-gradient-to-r from-accent to-red-950 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
              
              <Link 
                to="trending" 
                smooth={true} 
                duration={500}
                className="group inline-flex items-center justify-center px-8 py-4 bg-transparent text-white font-semibold rounded-lg border-2 border-white/20 hover:border-white/40 transition-all duration-300"
              >
                <span>Trending Now</span>
                <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </motion.div>
            
            {/* Stats */}
            <motion.div 
              className="flex flex-wrap justify-center lg:justify-start gap-6 mt-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <div className="text-center">
                <div className="text-2xl font-bold text-white">10K+</div>
                <div className="text-gray-100">Movies</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">5K+</div>
                <div className="text-gray-100">TV Shows</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">98%</div>
                <div className="text-gray-100">Satisfied Users</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right side decorative elements */}
          <motion.div 
            className="lg:w-1/2 flex justify-center"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <div className="relative w-full max-w-md">
              {/* Floating movie elements */}
              <motion.div
                className="absolute -top-8 -left-8 w-24 h-24 bg-accent/20 rounded-xl backdrop-blur-sm border border-accent/30"
                animate={{
                  y: [0, -15, 0],
                  rotate: [0, -5, 0],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <div className="flex items-center justify-center h-full">
                  <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17 10.5V7a2 2 0 0 0-2-2H5C3.9 5 3 5.9 3 7v10c0 1.1.9 2 2 2h10a2 2 0 0 0 2-2v-3.5l4 4v-11l-4 4z"/>
                  </svg>
                </div>
              </motion.div>
              
              <motion.div
                className="absolute -bottom-8 -right-8 w-20 h-20 bg-white/10 rounded-xl backdrop-blur-sm border border-white/20"
                animate={{
                  y: [0, 15, 0],
                  rotate: [0, 5, 0],
                }}
                transition={{
                  duration: 7,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1
                }}
              >
                <div className="flex items-center justify-center h-full">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </motion.div>
              
              <motion.div
                className="absolute top-1/2 -right-12 w-16 h-16 bg-purple-500/20 rounded-xl backdrop-blur-sm border border-purple-500/30"
                animate={{
                  y: [0, -10, 0],
                  rotate: [0, 8, 0],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 2
                }}
              >
                <div className="flex items-center justify-center h-full">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                </div>
              </motion.div>
              
              {/* Main center element */}
              <motion.div 
                className="relative"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.7 }}
              >
                <img className='rotate-[0.102rad]' src="/assets/popcorn-bucket.png" alt="popcorn-bucket" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Hero