import React, {useContext, useState} from 'react';
import PropTypes from 'prop-types';
import Featured from "./Featured";
import {AppContext} from "../App";

const FilmCard = ({film}) => {

    const {editFilm, deleteFilm} = useContext(AppContext)

    const { selectFilmForEdit } = useContext(AppContext)
    const [confirm, setConfirm] = useState(false)
    const showConfirm = () => setConfirm(true)
    const hideConfirm = () => setConfirm(false)

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
                <a href="#" className="header">
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

                <div className="extra content">
                    {confirm ? (
                        <div className="ui two buttons">
                            <span  className="ui red basic button"  onClick={() => deleteFilm(film)}>
                              <i className="ui icon check" /> YES
                            </span>
                            <span className="ui grey basic button" onClick={hideConfirm}>
                              <i className="ui icon trash" /> NO
                            </span>
                        </div>
                    ) : (
                        <div className="ui two buttons">
                            <span  className="ui green basic button"  onClick={() => selectFilmForEdit(film)}>
                              <i className="ui icon edit" />
                            </span>
                            <span className="ui red basic button" onClick={showConfirm}>
                              <i className="ui icon trash" />
                            </span>
                        </div>
                    )}
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