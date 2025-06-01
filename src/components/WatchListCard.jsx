import { removeFromwatchlist } from "../store/slicers/watchlistSlice"
import { useDispatch } from "react-redux"
import {Rating} from "react-simple-star-rating"

export default function WatchListCard({movie}){
    const dispatch = useDispatch()

    return(
    <div className="card mb-3 col-md-5 col-12" key={movie.id}>
        <div className="col">
            <div className="row g-0">
                <div className="col-md-4">
                    <img src={import.meta.env.VITE_APP_POSTER_PATH + movie.poster_path} className="img-fluid rounded my-2" alt="..."/>
                </div>
                <div className="col-md-8">
                    <div className="card-body">
                        <div className="d-flex justify-content-between">
                            <h1 className="card-title">{movie.original_title}</h1>
                            <i onClick={()=>(dispatch(removeFromwatchlist(movie.id)))} 
                            className="fa-solid fa-heart fs-2" style={{color:"#FFE353"}}/>
                        </div>
                        <Rating
                            readonly
                            allowFraction
                            initialValue={movie.vote_average/2}
                            size={25}
                            SVGstorkeWidth={1}
                            SVGstrokeColor="black"
                            fillColor="black"
                            emptyColor="white"
                        />
                        <p className="card-text"><small className="text-secondary">{movie.release_date}</small></p>
                        <p className="card-text">{movie.overview}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}