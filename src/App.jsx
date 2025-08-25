import { useState } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import SearchSection from './components/SearchSection'
import TrendingSection from './components/TrendingSection'
import AboutSection from './components/AboutSection'
import Footer from './components/Footer'
import MovieModal from './components/MovieModal'
import { Element } from 'react-scroll'

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedMovie, setSelectedMovie] = useState(null)

  const openModal = (movie) => {
    setSelectedMovie(movie)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedMovie(null)
  }

  return (
    <div className="App">
      <Header />
      
      <Element name="home">
        <Hero />
      </Element>
      
      <Element name="search">
        <SearchSection openModal={openModal} />
      </Element>
      
      <Element name="trending">
        <TrendingSection openModal={openModal} />
      </Element>
      
      <Element name="about">
        <AboutSection />
      </Element>
      
      <Footer />
      
      <MovieModal 
        isOpen={isModalOpen} 
        onClose={closeModal} 
        movie={selectedMovie} 
      />
    </div>
  )
}

export default App