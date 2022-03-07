import {useState, useEffect} from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import axios from 'axios'
// import bootstrap from 'bootstrap'
import Navbar from 'react-bootstrap/Navbar'
import MovieType from '../components/headingTitle'
import 'bootstrap/dist/css/bootstrap.min.css'
import Search from '../components/search'
import 'bootstrap-icons/font/bootstrap-icons.css'

const Horror = () => {
  const [opacity, setOpacity] = useState(0)
  const [zIndex, setzIndex] = useState(0)
  const [recommended, setRecommended] = useState([])
  const [searchString, setSearchString] = useState('')
  const [search, setSearch] = useState([])
  const [genre, setGenre] = useState({
    "id": 27,
    "name": "Horror"
  })
  const [moviesByGenre, setMoviesByGenre] = useState([])

  const searchByGenre = () => {
    axios({
      url: '/discover/movie',
      method: 'get',
      baseURL: 'https://api.themoviedb.org/3',
      params: {
        api_key: process.env.REACT_APP_TMDB_KEY,
        language: 'en-US',
        with_genres: genre.id
    }}).then((response) => {
      setMoviesByGenre(response.data.results)
      //console.log(moviesByGenre)
    })
  }

  const handleSearch = (event) => {
    event.preventDefault()
    // setSearchString(event.target.value);
    axios({
      url: '/search/movie',
      method: 'get',
      baseURL: 'https://api.themoviedb.org/3',
      params: {
        api_key: process.env.REACT_APP_TMDB_KEY,
        language: 'en-US',
        query: searchString
      }
    }).then((response) => {
      setSearch(response.data.results)
    })}

    const handleMovieAdd = (movie) => {
      axios({
        method: 'post',
        url: '/favorites',
        baseURL:'http://localhost:3000',
        data:[
          movie
        ]
      })
      console.log(movie);
    }

    const handleWatchListAdd = (movie) => {
      axios({
        method: 'post',
        url: '/watchlist',
        baseURL:'http://localhost:3000',
        data:[
          movie
        ]
      })
      console.log(movie);
    }

  const setMenuOpacity = (event) => {
    if (opacity == 1) {
      setOpacity(0)
      setzIndex(0)
    }else if(opacity == 0){
      setOpacity(1)
      setzIndex(2)
    }
  }


  useEffect(() => {
    searchByGenre()
  }, [])

  return (
    <>
      <header>
      <div>
        <Link to="/"><img className='logo' src='/SeenLogo.png' /></Link>
      </div>
        <div className='head-button-container d-flex align-items-center'>
          <button className="signup">Sign Up</button>
          <button className="login">Log In</button>
          <Link to="/profile"><i class="bi bi-person user"></i></Link>
          <svg onClick={setMenuOpacity} className="nav-list"  xmlns="http://www.w3.org/2000/svg" width="46" height="46" fill="currentColor" className="bi bi-search drop dropdown-toggle" id="navbarDropdown" role="button" viewBox="0 0 16 16" data-toggle="dropdown">
          <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
          </svg>
          </div>
        </header>
        <div style={{opacity, zIndex}} className="d-flex flex-column  align-items-end nav-list">
        <form onSubmit={handleSearch}>
        <input onChange={event => setSearchString(event.target.value)} className='search-box'value={searchString} placeholder='Search for a movie..'/>
        <input type="submit" value="search" id="submit-button"/>
        </form>
        <h2>Search By Genre</h2>
          <Link to="/action">Action</Link>
          <Link to="/adventure">Adventure</Link>
          <Link to="/comedy">Comedy</Link>
          <Link to="/documentary">Documentary</Link>
          <Link to="/drama">Drama</Link>
          <Link to="/family">Family</Link>
          <Link to="/fantasy">Fantasy</Link>
          <Link to="/horror">Horror</Link>
          <Link to="/romance">Romance</Link>
          <Link to="/thriller">Thriller</Link>
        </div>
        <h1 className="movie-heading2 text-center mb-5">{genre.name}</h1>
        <div className="container d-flex flex-wrap justify-content-around p-1 align-items-start">
          {moviesByGenre.map((movie) => {
          const img = movie.poster_path
          const full = 'http://image.tmdb.org/t/p/w300' + img
          return (
            <div key={movie.id} className="movie image-container mb-5">
              <img src={full}/>
              <div className ='overlay d-flex flex-row align-items-start justify-content-between' id='overlay-genres'>
                <div>
                  <p className='movie-title text-left'>{movie.title}</p>
                  <p className="year">{movie.release_date.substring(0,4)}</p>
                  </div>
                  <div className="d-flex flex-column justify-content-around">
                    <i onClick={event => handleMovieAdd(movie)} class="bi bi-heart-fill heart-icon"></i>
                    <i onClick={event => handleWatchListAdd(movie)}class="bi bi-plus-circle-fill plus-icon"></i>
                    <i className="bi bi-check-circle-fill check-icon"></i>
                  </div>
                </div>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default Horror
