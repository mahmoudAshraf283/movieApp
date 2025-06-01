import { useState } from "react"
import WatchListCard from "../components/WatchListCard";
import { useSelector } from "react-redux";

export default function WatchList (){
    //Read from the redux, not a state
    const watchList = useSelector (state => state.watchList.data)
    return (
        <div className="container">
            <div className="row">
                <h1 className="col-12 my-3">Watch list</h1>
            </div>
        {   
            watchList.length > 0 ?
            <div className="row row-cols-1 row-cols-md-2 g-4 justify-content-around">
                {
                    watchList.map ((movie) => <WatchListCard movie={movie}></WatchListCard>)
                }
            </div>
            :
            <>
                
                    <div className="row justify-content-center mt-3"><img src="/no_items.svg" alt="" className="img-fluid col-3" /></div>
                    <div className="row justify-content-center my-3">
                        <p className="col-8 text-center">No Movies in Watch list</p>
                    </div>
                    <div className="row justify-content-center">
                        <button type="button" className="btn col-4 rounded" style={{backgroundColor:"#FFE353"}}>Back to home</button>
                    </div>
            </>
            
        }
        </div>
    )
}