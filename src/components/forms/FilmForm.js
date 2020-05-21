import React, {useState} from 'react';
import {genres, tags} from "../../data";
import ReactImageFallback from "react-image-fallback"
import FormMessage from "./FormMessage";

const initialState = {
    title: "",
    description: "",
    director: "",
    duration: "",
    price: "",
    img: "",
    featured: false,
    tags: [],
    select: [],
}

function FilmForm({hideAddForm, saveFilm}) {

    const [data, setData] = useState(initialState);
    const [errors, setErrors] = useState({});

    const handleSubmit = (e) => {
        e.preventDefault();
        const errors = validate(data)
        setErrors(errors);

        if (Object.keys(errors).length === 0) {
            console.log("OK: ", data);

            saveFilm(data)
        }
    }

    const handleStringChange = ({target}) => setData((data) => ({
        ...data,
        [target.name]: target.value,
    }));

    const handleNumberChange = ({target}) => setData((data) => ({
        ...data,
        [target.name]: Number(target.value),
    }));

    const handleCheckboxChange = ({target}) => setData((data) => ({
        ...data,
        [target.name]: target.checked,
    }));

    const handleCheckboxes = (id) => setData((data) => ({
        ...data,
        tags: data.tags.includes(id) ?
            data.tags.filter((_tag) => _tag._id !== id) : [...data.tags, id],
    }))

    const toggleMultiSel = ({target}) => {
        const select = Array.from(target.selectedOptions).map(o => o.value)
        setData(data => ({...data, select}))
    }

    const validate = (data) => {
        const errors = {}
        if (!data.title) errors.title = "This field cant be blank"
        if (!data.description) errors.description = "This field cant be blank"
        if (!data.price) errors.price = "This field cant be blank"
        if (!data.director) errors.director = "This field cant be blank"
        if (!data.duration) errors.duration = "This field cant be blank"

        if (parseInt(data.price) <= 0) errors.price = "Error price"
        if (parseInt(data.duration) <= 0) errors.duration = "Error duration"

        return errors
    }

    return (
        <form className="ui form" onSubmit={handleSubmit}>
            <div className="ui  grid">
                <div className="twelve wide column">
                    <div className={errors.title ? "field error" : "field"}>
                        <label>Film title</label>
                        <input type="text"  name="title"  id="title" placeholder="film title"
                               value={data.title}
                               onChange={handleStringChange}
                        />
                        <FormMessage type="error">{errors.title}</FormMessage>
                    </div>
                    <div className={errors.description ? "field error" : "field"}>
                        <label>Film description</label>
                        <textarea name="description" id="description" placeholder="film description"
                                  onChange={handleStringChange}
                                  value={data.description}
                        />
                        <FormMessage type="error">{errors.description}</FormMessage>
                    </div>
                </div>

                <div className="four wide column field">
                    <ReactImageFallback
                        src={data.img}
                        fallbackImage={"http://via.placeholder.com/250x250"}
                        alt="user avatar"
                        className={"ui image"}
                    />
                </div>

                <div className={`twelve wide column field`}>
                    <label>Image</label>
                    <input type="text" name="img" id="img"  placeholder="img"
                           onChange={handleStringChange}
                           value={data.img}
                    />
                </div>

                <div className={`six wide column field ${errors.director ? "error" : ""}`}>
                    <div className="field">
                        <label>Director</label>
                        <input   type="text"  name="director"  id="director"  placeholder="film director"
                                 onChange={handleStringChange}
                                 value={data.director}
                        />
                    </div>
                    <FormMessage type="error">{errors.director}</FormMessage>
                </div>

                <div className={`six wide column field ${errors.duration ? "error" : ""}`}>
                    <div className="field">
                        <label>Duration</label>
                        <input type="number"  name="duration" id="duration"  placeholder="Duration"
                               value={data.duration}
                               onChange={handleNumberChange}
                        />
                    </div>
                    <FormMessage type="error">{errors.duration}</FormMessage>

                </div>

                <div className={`six wide column field ${errors.price ? "error" : ""}`}>
                    <div className="field">
                        <label>Price</label>
                        <input type="number" name="price"  id="price"  placeholder="price"
                               value={data.price}
                               onChange={handleNumberChange}
                        />
                    </div>
                    <FormMessage type="error">{errors.price}</FormMessage>
                </div>

                <div className="six wide column inline field">
                    <label htmlFor="featured">Featured</label>
                    <input  type="checkbox" name="featured"  id="featured"
                            value={data.featured}
                            onChange={handleCheckboxChange}
                    />
                </div>

            </div>


            <div className="ui fluid buttons">
                <button className="ui button primary" type="submit">Save</button>
                <div className="or" />
                <span onClick={hideAddForm} className="ui button">
                    Hide form
                </span>
            </div>


                {/*<label>Tags</label>*/}
            {/*{tags.map((tag) => <div key={tag._id} className="grouped fields">*/}
            {/*    <div className="ui checkbox">*/}
            {/*        <input type="checkbox" onChange={() => handleCheckboxes(tag._id)}  name="tags[]" />*/}
            {/*        <label>{tag.title}</label>*/}
            {/*    </div>*/}
            {/*</div>)}*/}

            {/*<select multiple size={genres.length}*/}
            {/*        onChange={toggleMultiSel}*/}
            {/*        value={data.select}*/}
            {/*>*/}
            {/*    {genres.map(genre =>  <option key={genre._id} value={genre._id}>*/}
            {/*            {genre.title}*/}
            {/*        </option>*/}
            {/*    )}*/}
            {/*</select>*/}
        </form>
    )
}

export default FilmForm;