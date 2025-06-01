export default function WatchListCard(){
    return(
    <div className="card mb-3 col-md-5 col-12">
        <div className="col">
            <div className="row g-0">
                <div className="col-md-4">
                    <img src="https://placehold.co/800" className="img-fluid rounded my-2" alt="..."/>
                </div>
                <div className="col-md-8">
                    <div className="card-body">
                        <div className="d-flex justify-content-between"><h1 className="card-title">Card title</h1><i className="fa-regular fa-heart fs-2" style={{color:"#FFE353"}}></i></div>
                        <p className="card-text"><small className="text-secondary">Last updated 3 mins ago</small></p>
                        <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}