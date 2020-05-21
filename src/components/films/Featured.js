import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import {AppContext} from "../App";

const Featured = ({id, featured}) => {
    const cls = featured ? "yellow" : "empty";
    const {toggleFeatured} = useContext(AppContext)
    return (
        <span onClick={() => toggleFeatured(id)} className={"ui right corner label"}>
            <i className={`star icon ${cls}`}/>
        </span>
    )
}

Featured.propTypes = {
    featured: PropTypes.bool.isRequired
}

export default Featured;