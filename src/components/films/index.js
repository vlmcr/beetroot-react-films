import FilmCard from "./FilmCard";
import React from "react";

import PropTypes from 'prop-types';
import Message from "../Message";


const FilmsList = ({films}) => (
    <div  className="ui four cards">
        {
            films.length === 0 ? (
                <Message msg={"No fims yet in our database"} color={"red"} />
            ) : (
                films.map((film) => <FilmCard key={film._id} film={film}/>)
            )
        }
    </div>
)


FilmsList.propTypes = {
    films: PropTypes.arrayOf(PropTypes.object).isRequired
}

FilmsList.defaultProps = {
    films: []
}

export default FilmsList;