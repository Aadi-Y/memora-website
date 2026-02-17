import noSearch from "../assets/noSearch.jpg";
import "./NoSearch.css";

function NoSearch() {
    return (
        <div className="no-search">
            <img src={noSearch} alt="No results" className="no-search__img" />
            <h2 className="no-search__title">No results found</h2>
            <p className="no-search__text">Try a different keyword or clear your search.</p>
        </div>
    );
}

export default NoSearch;