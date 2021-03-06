import axios from 'axios'


const PopularShows = (props) => {
    return(
        props.popularShows.map((show) => {
            let img = show.poster_path
            let full = 'http://image.tmdb.org/t/p/w200' + img;
            return(
                <div key={show.id} className="image-container d-flex justify-content-start m-3 col">
                    <img src= {full}/>
                    <div className ='overlay d-flex flex-row align-items-start justify-content-between'>
                    <div>
                      <p className='movie-title text-left'>{show.name}</p>
                      <p className="year">Year:{show.first_air_date.substring(0,4)}</p>
                      </div>
                      <div className="d-flex flex-column justify-content-around">
                        <i class="bi bi-heart-fill heart-icon"></i>
                        <i class="bi bi-plus-circle-fill plus-icon"></i>
                        <i class="bi bi-check-circle-fill check-icon"></i>
                      </div>
                    </div>
                </div>
            )
        })
    )
}

export default PopularShows
