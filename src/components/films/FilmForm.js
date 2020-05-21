import React, {useState} from 'react';

const initialState = {
    title: "",
    description: "",
    director: "",
    duration: "",
    price: "",
    img: "",
    featured: false,
}

function FilmForm() {

    const [data, setData] = useState(initialState);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(data)
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

    return (
        <form className="ui form" onSubmit={handleSubmit}>
            <div className="ui  grid">
                <div className="twelve wide column">
                    <div className="field">
                        <label>Film title</label>
                        <input type="text"  name="title"  id="title" placeholder="film title"
                               value={data.title}
                               onChange={handleStringChange}
                        />
                    </div>
                    <div className="field">
                        <label>Film description</label>
                        <textarea name="description" id="description" placeholder="film description"
                                  onChange={handleStringChange}
                                  value={data.description}
                        />
                    </div>
                </div>

                <div className="twelve wide column field">
                    <label>Image</label>
                    <input type="text" name="img" id="img"  placeholder="img"
                           onChange={handleStringChange}
                           value={data.img}
                    />
                </div>

                <div className="six wide column field">
                    <div className="field">
                        <label>Director</label>
                        <input   type="text"  name="director"  id="director"  placeholder="film director"
                                 onChange={handleStringChange}
                                 value={data.director}
                        />
                    </div>
                </div>

                <div className="six wide column field">
                    <div className="field">
                        <label>Duration</label>
                        <input type="number"  name="duration" id="duration"  placeholder="Duration"
                               value={data.duration}
                               onChange={handleNumberChange}
                        />
                    </div>
                </div>

                <div className="six wide column field">
                    <div className="field">
                        <label>Price</label>
                        <input type="number" name="price"  id="price"  placeholder="price"
                               value={data.price}
                               onChange={handleNumberChange}
                        />
                    </div>
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
                <span className="ui button">Hide form</span>
            </div>
        </form>
    )
}

export default FilmForm;