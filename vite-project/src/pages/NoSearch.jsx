import noSearch from "../assets/noSearch.jpg"
import "./NoSearch.css"

function NoSearch(){
    return(<>
        <div className="noSearch-container">
            <img src={noSearch} alt="" />
            <div className="description-container">
                <h2>No Search value found</h2> 
            </div>
        </div>
        
    </>)
}

export default NoSearch;