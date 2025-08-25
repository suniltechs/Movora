import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import { API_KEY, BASE_URL } from '../utils/constants'

const MovieModal = ({ isOpen, onClose, movie }) => {
  const [movieDetails, setMovieDetails] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (isOpen && movie) {
      const fetchMovieDetails = async () => {
        setIsLoading(true)
        try {
          const response = await fetch(`${BASE_URL}?i=${movie.imdbID}&apikey=${API_KEY}`)
          const data = await response.json()
          setMovieDetails(data)
        } catch (error) {
          console.error('Error fetching movie details:', error)
        } finally {
          setIsLoading(false)
        }
      }

      fetchMovieDetails()
    }
  }, [isOpen, movie])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  if (!movie) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-gradient-to-br from-red-700 via-black to-red-700 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent"></div>
              </div>
            ) : movieDetails ? (
              <div className="p-6">
                <div className="flex text-white justify-between items-start mb-6">
                  <h2 className="text-2xl md:text-3xl font-bold">
                    {movieDetails.Title} ({movieDetails.Year})
                  </h2>
                  <button
                    onClick={onClose}
                    className="text-white hover:text-red-600 text-2xl"
                  >
                    &times;
                  </button>
                </div>

                <div className="flex flex-col md:flex-row gap-6">
                  <div className="md:w-1/3">
                    {movieDetails.Poster && movieDetails.Poster !== 'N/A' ? (
                      <img
                        src={movieDetails.Poster}
                        alt={movieDetails.Title}
                        className="w-full rounded-lg shadow-lg"
                      />
                    ) : (
                      <div className="w-full h-64 bg-gradient-to-br from-secondary to-light rounded-lg flex items-center justify-center">
                        <span className="text-primary font-medium">No Poster Available</span>
                      </div>
                    )}
                  </div>

                  <div className="md:w-2/3">
                    <div className="flex flex-wrap gap-3 mb-4">
                      {movieDetails.Rated && movieDetails.Rated !== 'N/A' && (
                        <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                          {movieDetails.Rated}
                        </span>
                      )}
                      {movieDetails.Runtime && movieDetails.Runtime !== 'N/A' && (
                        <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                          {movieDetails.Runtime}
                        </span>
                      )}
                      {movieDetails.imdbRating && movieDetails.imdbRating !== 'N/A' && (
                        <span className="bg-accent text-white px-3 py-1 rounded-full text-sm">
                          ⭐ {movieDetails.imdbRating}/10
                        </span>
                      )}
                    </div>

                    {movieDetails.Plot && movieDetails.Plot !== 'N/A' && (
                      <div className="mb-6">
                        <h3 className="text-lg text-white font-semibold mb-2">Plot</h3>
                        <p className="text-gray-200">{movieDetails.Plot}</p>
                      </div>
                    )}

                    <div className=" text-gray-200 grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      {movieDetails.Director && movieDetails.Director !== 'N/A' && (
                        <div>
                          <h4 className="text-sm text-white">Director</h4>
                          <p className="font-medium">{movieDetails.Director}</p>
                        </div>
                      )}
                      {movieDetails.Writer && movieDetails.Writer !== 'N/A' && (
                        <div>
                          <h4 className="text-sm text-white">Writer</h4>
                          <p className="font-medium">{movieDetails.Writer}</p>
                        </div>
                      )}
                      {movieDetails.Actors && movieDetails.Actors !== 'N/A' && (
                        <div>
                          <h4 className="text-sm text-white">Cast</h4>
                          <p className="font-medium">{movieDetails.Actors}</p>
                        </div>
                      )}
                      {movieDetails.Genre && movieDetails.Genre !== 'N/A' && (
                        <div>
                          <h4 className="text-sm text-white">Genre</h4>
                          <p className="font-medium">{movieDetails.Genre}</p>
                        </div>
                      )}
                      {movieDetails.Language && movieDetails.Language !== 'N/A' && (
                        <div>
                          <h4 className="text-sm text-white">Language</h4>
                          <p className="font-medium">{movieDetails.Language}</p>
                        </div>
                      )}
                      {movieDetails.Country && movieDetails.Country !== 'N/A' && (
                        <div>
                          <h4 className="text-sm text-white">Country</h4>
                          <p className="font-medium">{movieDetails.Country}</p>
                        </div>
                      )}
                      {movieDetails.Awards && movieDetails.Awards !== 'N/A' && (
                        <div>
                          <h4 className="text-sm text-white">Awards</h4>
                          <p className="font-medium">{movieDetails.Awards}</p>
                        </div>
                      )}
                    </div>

                    {movieDetails.Ratings && movieDetails.Ratings.length > 0 && (
                      <div>
                        <h3 className="text-lg text-white font-semibold mb-3">Ratings</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                          {movieDetails.Ratings.map((rating, index) => (
                            <div key={index} className="bg-gray-100 p-3 rounded-lg">
                              <h4 className="text-sm font-medium text-gray-700">{rating.Source}</h4>
                              <p className="text-accent font-bold">{rating.Value}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-6 text-center">
                <p className="text-gray-200">Failed to load movie details.</p>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default MovieModal