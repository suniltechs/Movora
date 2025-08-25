import { motion } from 'framer-motion'

const MovieCard = ({ movie, onClick }) => {
  return (
    <motion.div 
      className="bg-white rounded-lg overflow-hidden shadow-lg cursor-pointer transform transition-transform hover:scale-105"
      whileHover={{ y: -5 }}
      onClick={onClick}
    >
      <div className="h-96 overflow-hidden">
        {movie.Poster && movie.Poster !== 'N/A' ? (
          <img 
            src={movie.Poster} 
            alt={movie.Title} 
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-secondary to-light flex items-center justify-center">
            <span className="text-primary font-medium">No Poster Available</span>
          </div>
        )}
      </div>
      
      <div className="p-4 relative">
        {movie.Type && movie.Type !== 'N/A' && (
          <span className="absolute -top-3 right-4 bg-accent text-white text-xs px-3 py-1 rounded-full capitalize">
            {movie.Type}
          </span>
        )}
        
        <h3 className="font-bold text-lg mb-1 truncate">{movie.Title}</h3>
        <p className="text-gray-600 text-sm">{movie.Year}</p>
      </div>
    </motion.div>
  )
}

export default MovieCard