import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import MovieCard from './MovieCard'
import { API_KEY, BASE_URL, TRENDING_MOVIES } from '../utils/constants'

const TrendingSection = ({ openModal }) => {
  const [trendingMovies, setTrendingMovies] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [cardsToShow, setCardsToShow] = useState(4)

  // Calculate responsive card count
  useEffect(() => {
    const updateCardsToShow = () => {
      const width = window.innerWidth
      if (width < 640) {
        setCardsToShow(1)
      } else if (width < 768) {
        setCardsToShow(2)
      } else if (width < 1024) {
        setCardsToShow(3)
      } else {
        setCardsToShow(4)
      }
    }

    updateCardsToShow()
    window.addEventListener('resize', updateCardsToShow)
    
    return () => window.removeEventListener('resize', updateCardsToShow)
  }, [])

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      try {
        const moviePromises = TRENDING_MOVIES.map(title =>
          fetch(`${BASE_URL}?t=${encodeURIComponent(title)}&apikey=${API_KEY}`)
            .then(response => response.json())
        )

        const movies = await Promise.all(moviePromises)
        const validMovies = movies.filter(movie => movie.Response === 'True')
        setTrendingMovies(validMovies)
      } catch (error) {
        console.error('Error fetching trending movies:', error)
      }
    }

    fetchTrendingMovies()
  }, [])

  const totalSlides = Math.ceil(trendingMovies.length / cardsToShow)

  const nextSlide = useCallback(() => {
    setCurrentIndex(prev => 
      prev >= totalSlides - 1 ? 0 : prev + 1
    )
  }, [totalSlides])

  const prevSlide = useCallback(() => {
    setCurrentIndex(prev => 
      prev === 0 ? totalSlides - 1 : prev - 1
    )
  }, [totalSlides])

  const goToSlide = (index) => {
    setCurrentIndex(index)
  }

  // Auto-play carousel
  useEffect(() => {
    if (trendingMovies.length > 0) {
      const interval = setInterval(nextSlide, 5000)
      return () => clearInterval(interval)
    }
  }, [trendingMovies.length, nextSlide])

  if (trendingMovies.length === 0) return null

  return (
    <section id='trending' className="py-16 bg-gradient-to-tl from-black via-black/90 to-red-700 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-white mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Trending Now
          </motion.h2>
          <motion.p 
            className="text-gray-200 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Explore the most popular movies of all time
          </motion.p>
        </div>

        <div className="relative">
          {/* Navigation Arrows */}
          <motion.button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 z-10 bg-white p-3 rounded-full shadow-lg hover:bg-accent hover:text-white transition-all duration-300 hidden md:flex items-center justify-center w-12 h-12"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Previous movies"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </motion.button>

          <motion.button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 z-10 bg-white p-3 rounded-full shadow-lg hover:bg-accent hover:text-white transition-all duration-300 hidden md:flex items-center justify-center w-12 h-12"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Next movies"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </motion.button>

          {/* Carousel Container */}
          <div className="overflow-hidden">
            <motion.div 
              className="flex"
              animate={{ x: `-${currentIndex * 100}%` }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
            >
              {trendingMovies.map((movie, index) => (
                <div 
                  key={movie.imdbID} 
                  className="flex-shrink-0 px-3"
                  style={{ width: `${100 / cardsToShow}%` }}
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <MovieCard movie={movie} onClick={() => openModal(movie)} />
                  </motion.div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Mobile Navigation & Indicators */}
        <div className="flex flex-col sm:flex-row justify-center items-center mt-8 space-y-4 sm:space-y-0 sm:space-x-4">
          {/* Mobile Arrows */}
          <div className="flex space-x-4 md:hidden">
            <button
              onClick={prevSlide}
              className="bg-white p-3 rounded-full shadow-md hover:bg-accent hover:text-white transition-colors flex items-center justify-center w-12 h-12"
              aria-label="Previous movies"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <button
              onClick={nextSlide}
              className="bg-white p-3 rounded-full shadow-md hover:bg-accent hover:text-white transition-colors flex items-center justify-center w-12 h-12"
              aria-label="Next movies"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Indicators */}
          <div className="flex space-x-2">
            {Array.from({ length: totalSlides }).map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-accent scale-125' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Slide counter */}
          <div className="text-sm text-gray-600 md:absolute md:right-4 md:bottom-4">
            {currentIndex + 1} / {totalSlides}
          </div>
        </div>
      </div>
    </section>
  )
}

export default TrendingSection