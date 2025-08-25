import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import MovieCard from './MovieCard'
import { API_KEY, BASE_URL } from '../utils/constants'

const SearchSection = ({ openModal }) => {
  const [query, setQuery] = useState('')
  const [movies, setMovies] = useState([])
  const [filter, setFilter] = useState('all')
  const [sortBy, setSortBy] = useState('relevance')
  const [isLoading, setIsLoading] = useState(false)
  const [totalResults, setTotalResults] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [hasSearched, setHasSearched] = useState(false)

  const filters = [
    { id: 'all', label: 'All' },
    { id: 'movie', label: 'Movies' },
    { id: 'series', label: 'TV Series' },
    { id: 'game', label: 'Games' }
  ]

  const sortOptions = [
    { id: 'relevance', label: 'Relevance' },
    { id: 'year', label: 'Newest First' },
    { id: 'year_oldest', label: 'Oldest First' },
    { id: 'rating', label: 'Highest Rated' },
    { id: 'title', label: 'A-Z' }
  ]

  const searchMovies = useCallback(async (page = 1, append = false) => {
    if (!query.trim()) return
    
    setIsLoading(true)
    setHasSearched(true)
    
    try {
      const params = new URLSearchParams({
        s: query.trim(),
        page: page.toString(),
        apikey: API_KEY
      })
      
      if (filter !== 'all') {
        params.append('type', filter)
      }
      
      const response = await fetch(`${BASE_URL}?${params}`)
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      
      if (data.Response === 'True') {
        setTotalResults(parseInt(data.totalResults))
        
        let moviesData = data.Search || []
        
        // Apply sorting
        if (sortBy === 'rating') {
          // For rating, fetch details for each movie
          const detailedMovies = await Promise.all(
            moviesData.map(async (movie) => {
              try {
                const detailResponse = await fetch(`${BASE_URL}?i=${movie.imdbID}&apikey=${API_KEY}`)
                if (!detailResponse.ok) throw new Error('Detail fetch failed')
                return await detailResponse.json()
              } catch (error) {
                console.error('Error fetching movie details:', error)
                return { ...movie, imdbRating: 'N/A' }
              }
            })
          )
          moviesData = detailedMovies.sort((a, b) => {
            const ratingA = a.imdbRating === 'N/A' ? 0 : parseFloat(a.imdbRating)
            const ratingB = b.imdbRating === 'N/A' ? 0 : parseFloat(b.imdbRating)
            return ratingB - ratingA
          })
        } else if (sortBy === 'title') {
          moviesData.sort((a, b) => a.Title.localeCompare(b.Title))
        } else if (sortBy === 'year_oldest') {
          moviesData.sort((a, b) => {
            const yearA = parseInt(a.Year) || 0
            const yearB = parseInt(b.Year) || 0
            return yearA - yearB
          })
        } else if (sortBy === 'year') {
          moviesData.sort((a, b) => {
            const yearA = parseInt(a.Year) || 0
            const yearB = parseInt(b.Year) || 0
            return yearB - yearA
          })
        }
        
        if (append) {
          setMovies(prev => [...prev, ...moviesData])
        } else {
          setMovies(moviesData)
        }
        
        setCurrentPage(page)
      } else {
        if (!append) {
          setMovies([])
          setTotalResults(0)
        }
      }
    } catch (error) {
      console.error('Error searching movies:', error)
      if (!append) {
        setMovies([])
        setTotalResults(0)
      }
    } finally {
      setIsLoading(false)
    }
  }, [query, filter, sortBy])

  const handleSearch = (e) => {
    e.preventDefault()
    setCurrentPage(1)
    searchMovies(1, false)
  }

  const handleLoadMore = () => {
    searchMovies(currentPage + 1, true)
  }

  // Reset search when filter or sort changes
  useEffect(() => {
    if (hasSearched) {
      searchMovies(1, false)
    }
  }, [filter, sortBy, searchMovies, hasSearched])

  return (
    <section id='search' className="py-6 md:py-10 lg:py-14 bg-gradient-to-tr from-red-700 via-black/90 to-black">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-6 md:mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2 md:mb-3">
            Discover Movies & Shows
          </h2>
          <p className="text-gray-200 max-w-2xl mx-auto text-sm md:text-base px-4">
            Explore thousands of movies, TV series, and games from all genres and eras
          </p>
        </motion.div>

        <motion.div 
          className="max-w-4xl mx-auto mb-6 md:mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <form onSubmit={handleSearch} className="relative mb-4 md:mb-6">
            <div className="flex flex-col sm:flex-row gap-3 items-stretch">
              <div className="relative flex-grow flex items-center bg-white rounded-xl shadow-sm border border-gray-300 focus-within:border-accent focus-within:ring-2 focus-within:ring-accent focus-within:ring-opacity-20 transition-all duration-300">
                <div className="absolute left-4 text-gray-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search for movies, series, or games..."
                  className="w-full py-3 pl-11 pr-4 focus:outline-none text-gray-800 placeholder-gray-500 text-sm md:text-base rounded-xl"
                />
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="bg-accent text-white px-6 py-3 hover:bg-red-700 transition-colors flex items-center justify-center space-x-2 disabled:opacity-70 disabled:cursor-not-allowed rounded-xl min-w-[120px] shadow-sm"
              >
                {isLoading ? (
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  <>
                    <span className="text-sm md:text-base">Search</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </>
                )}
              </button>
            </div>
          </form>

          <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-start">
            <div className="flex flex-col sm:flex-row items-start gap-3">
              <span className="text-sm font-medium text-gray-200 whitespace-nowrap pt-1">Filter by:</span>
              <div className="flex flex-wrap gap-2">
                {filters.map((filterItem) => (
                  <button
                    key={filterItem.id}
                    onClick={() => setFilter(filterItem.id)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                      filter === filterItem.id
                        ? 'bg-accent text-white shadow-sm'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {filterItem.label}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="flex flex-row xs:flex-col items-start gap-3">
              <span className="text-sm font-medium text-gray-200 whitespace-nowrap pt-1">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent bg-white text-gray-700 text-xs w-20px xs:w-auto"
              >
                {sortOptions.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </motion.div>

        {movies.length > 0 && (
          <motion.div 
            className="flex justify-center sm:justify-start mb-4 md:mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-gray-200 font-medium text-xs sm:text-sm text-center sm:text-left">
              Found {totalResults} results for "<span className="text-accent">{query}</span>"
            </p>
          </motion.div>
        )}

        {isLoading && !movies.length ? (
          <div className="flex justify-center mt-8 md:mt-12">
            <div className="animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-t-2 border-b-2 border-accent"></div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
              <AnimatePresence>
                {movies.map((movie, index) => (
                  <motion.div
                    key={`${movie.imdbID}-${index}`}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    whileHover={{ y: -4, transition: { duration: 0.2 } }}
                    className="w-full"
                  >
                    <MovieCard movie={movie} onClick={() => openModal(movie)} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {movies.length > 0 && movies.length < totalResults && (
              <div className="text-center mt-6 md:mt-10">
                <button
                  onClick={handleLoadMore}
                  disabled={isLoading}
                  className="bg-accent text-white px-5 py-2 sm:px-6 sm:py-2.5 rounded-xl font-medium hover:bg-red-700 disabled:opacity-50 flex items-center mx-auto shadow-sm hover:shadow-md transition-shadow text-xs sm:text-sm"
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Loading...
                    </>
                  ) : (
                    'Load More'
                  )}
                </button>
              </div>
            )}
          </>
        )}

        {!isLoading && hasSearched && movies.length === 0 && (
          <motion.div 
            className="text-center py-10 md:py-14"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-block p-3 bg-gray-100 rounded-full mb-3">
              <svg className="w-8 h-8 sm:w-10 sm:h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-gray-600 text-sm sm:text-base mb-1">No results found for "{query}"</p>
            <p className="text-gray-500 text-xs sm:text-sm">Try different keywords or filters</p>
          </motion.div>
        )}
      </div>
    </section>
  )
}

export default SearchSection