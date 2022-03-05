import {useState, useEffect} from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import axios from 'axios'
// import bootstrap from 'bootstrap'
import Navbar from 'react-bootstrap/Navbar'
import TrendingMovies from '../components/trendingmovies'
import UpcomingMovies from '../components/upcoming'
import 'bootstrap/dist/css/bootstrap.min.css'
import MovieType from '../components/headingTitle'
import TopRated from '../components/topRated'
import PopularMovies from '../components/popular'
import 'bootstrap-icons/font/bootstrap-icons.css'
import PopularShows from '../components/popularShows'
import TopRatedShows from '../components/topRatedShows'
import DailyShows from '../components/dailyShows'
import Search from '../components/search'


const HomePage = () => {
  const [trendingMovies, setTrendingMovies] = useState([])
  const [upcomingMovies, setUpcomingMovies] = useState([])
  const [selectedMovie, setSelectedMovie] = useState([])
  const [topRated, setTopRated] = useState([])
  const [recommended, setRecommended] = useState([])
  const [favorites, setFavorites] = useState([])
  const [wishList, setWishList] = useState([])
  const [popularMovies, setPopularMovies] = useState([])
  const [opacity, setOpacity] = useState(0)
  const [zIndex, setzIndex] = useState(0)
  const [searchString, setSearchString] = useState('')
  const [popularShows, setPopularShows] = useState([])
  const [topRatedShows, setTopRatedShows] = useState([])
  const [dailyShows, setDailyShows] = useState([])
  const [search, setSearch] = useState([])

  const getTrendingMovies = () => {
    axios({
      url: '/trending/movie/week',
      method: 'get',
      baseURL: 'https://api.themoviedb.org/3',
      params: {
        api_key: "dad5072890b975c25ff2358e550e5138"
      }
    }).then((response) => {
      setTrendingMovies(response.data.results)
    })
  };

  const getUpcomingMovies = () => {
    axios({
      url: '/movie/upcoming',
      method: 'get',
      baseURL: 'https://api.themoviedb.org/3',
      params: {
        api_key: "dad5072890b975c25ff2358e550e5138",
        language: 'en-US',
        region: 'US'
      }
    }).then((response) => {
      setUpcomingMovies(response.data.results)
    })
  };

  const getTopRated = () => {
    axios({
      url: '/movie/top_rated',
      method: 'get',
      baseURL: 'https://api.themoviedb.org/3',
      params: {
        api_key: "dad5072890b975c25ff2358e550e5138",
        language: 'en-US'
      }
    }).then((response) => {
      setTopRated(response.data.results)
    })
  };

  const getPopular = () => {
    axios({
      url: '/movie/popular',
      method: 'get',
      baseURL: 'https://api.themoviedb.org/3',
      params: {
        api_key: "dad5072890b975c25ff2358e550e5138",
        language: 'en-US'
      }
    }).then((response) => {
      setPopularMovies(response.data.results)
    })
  };

  const handleSearch = (event) => {
    event.preventDefault()
    // setSearchString(event.target.value);
    axios({
      url: '/search/movie',
      method: 'get',
      baseURL: 'https://api.themoviedb.org/3',
      params: {
        api_key: "dad5072890b975c25ff2358e550e5138",
        language: 'en-US',
        query: searchString
      }
    }).then((response) => {
      setSearch(response.data.results)
    })}

  const getPopularShows = () => {
    axios({
      url: '/tv/popular',
      method: 'get',
      baseURL: 'https://api.themoviedb.org/3',
      params: {
        api_key: "dad5072890b975c25ff2358e550e5138",
        language: 'en-US'
      }
    }).then((response) => {
      setPopularShows(response.data.results)
    })
  };
  const getTopRatedShows = () => {
    axios({
      url: '/tv/top_rated',
      method: 'get',
      baseURL: 'https://api.themoviedb.org/3',
      params: {
        api_key: "dad5072890b975c25ff2358e550e5138",
        language: 'en-US'
      }
    }).then((response) => {
      setTopRatedShows(response.data.results)
    })
  };
  const getDailyShows = () => {
    axios({
      url: '/tv/airing_today',
      method: 'get',
      baseURL: 'https://api.themoviedb.org/3',
      params: {
        api_key: "dad5072890b975c25ff2358e550e5138",
        language: 'en-US'
      }
    }).then((response) => {
      setDailyShows(response.data.results)
    })
  };
  // const Home = () => {
  //   return(
  //     <>
  //       <main>
  //         <h2>Welcome to the movie database</h2>
  //         <p>We can do it!!!</p>
  //       </main>
  //       <nav>
  //         <Link to="/about">About</Link>
  //       </nav>
  //     </>
  //   )
  // }


  // const About = () => {
  //   return (
  //     <>
  //       <main>
  //         <h2>We are Heather and Meredith</h2>
  //       </main>
  //       <nav>
  //         <Link to="/">Home</Link>
  //       </nav>
  //     </>
  //   )
  // }
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
    getTrendingMovies()
    getUpcomingMovies()
    getTopRated()
    getPopular()
    getPopularShows()
    getTopRatedShows()
    getDailyShows()

  }, [])


  return(
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
        <Link to="/comedy">Comedy</Link>
        <a href="#">Horror</a>
        <a href="#">Romance</a>
        <a href="#">Family</a>
        <a href="#">Action</a>
        <a href="#">Drama</a>
        <a href="#">Adventure</a>
        <a href="#">Documentary</a>
        <a href="#">Fantasy</a>
        <a href="#">Thriller</a>
      </div>
    <div className='start-image'>
      <h3>Spider-Man</h3>
      <p>No Way Home</p>
      <i class="bi bi-star-fill yellow "></i>
      <i class="bi bi-star-fill yellow "></i>
      <i class="bi bi-star-fill yellow "></i>
      <i class="bi bi-star-fill yellow "></i>
      <i class="bi bi-star-half yellow "></i>
    </div>
    <div className="row mt-4 mb-4">
      <MovieType heading={searchString}/>
      </div>
      <div className="container-fluid movies">
        <div className="row">
          <Search search={search}/>
        </div>
      </div>
    <div className="row mt-4 mb-4">
      <MovieType heading='Trending Movies'/>
    </div>
    <div className="container-fluid movies">
      <div className="row">
        <TrendingMovies trendingMovies={trendingMovies}/>
      </div>
    </div>
    <div className="row mt-4 mb-4">
      <MovieType heading='Upcoming Movies'/>
    </div>
    <div className="container-fluid movies">
      <div className="row">
        <UpcomingMovies upcomingMovies={upcomingMovies}/>
      </div>
    </div>
    <div className="row mt-4 mb-4">
      <MovieType heading='Top Rated Movies'/>
    </div>
    <div className="container-fluid movies">
      <div className="row">
        <TopRated topRated={topRated}/>
      </div>
    </div>
    <div className="row mt-4 mb-4">
      <MovieType heading='Popular Movies'/>
    </div>
    <div className="container-fluid movies">
      <div className="row">
        <PopularMovies popularMovies={popularMovies}/>
      </div>
    </div>
    <div className="row mt-4 mb-4">
      <MovieType heading='Popular Shows'/>
    </div>
    <div className="container-fluid movies">
      <div className="row">
        <PopularShows popularShows={popularShows}/>
      </div>
    </div>
    <div className="row mt-4 mb-4">
      <MovieType heading='Top Rated Shows'/>
    </div>
    <div className="container-fluid movies">
      <div className="row">
        <TopRatedShows topRatedShows={topRatedShows}/>
      </div>
    </div>
    <div className="row mt-4 mb-4">
      <MovieType heading='Shows Airing Today'/>
    </div>
    <div className="container-fluid movies">
      <div className="row">
        <DailyShows dailyShows={dailyShows}/>
      </div>
    </div>

    </>
  )
}

export default HomePage