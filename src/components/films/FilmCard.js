import React, {useState} from 'react';
import PropTypes from 'prop-types';
import Featured from "./Featured";

const FilmCard = ({film}) => {

    const [showDescription, setShowDescription] = useState(false)

    const handleDescription = e => setShowDescription(show => !show)

    return (
        <div className="ui card">
            {showDescription ? (
                <div className="content">
                    <p>{film.description}</p>
                </div>
            ) : (
                <div className="image">
                    <span className="ui green label ribbon">{film.title}</span>
                    <Featured featured={film.featured} filmId={film._id} />
                    <img src={film.img} alt={film.title} />
                </div>
            )}

            <div className="content">
                <a href="/" className="header">
                    {film.title}
                </a>
                <div className="meta">
                    <i className="icon users" />
                    {film.director}
                    <span className="right floated">
              <i className="icon wait right" />
                        {film.duration} min
            </span>
                </div>

                <div className="content">
                    <i  onClick={handleDescription}
                        className={`icon link eye ${showDescription ? "slash" : ""}`}
                    />
                </div>
            </div>
        </div>
    )
}



FilmCard.propTypes = {
    film: PropTypes.shape({
        price: PropTypes.number.isRequired,
        img: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        director: PropTypes.string.isRequired,
        duration: PropTypes.number.isRequired,
        featured: PropTypes.bool.isRequired,
    })
}


export default React.memo(FilmCard);