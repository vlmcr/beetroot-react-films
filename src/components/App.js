import React, {Component} from "react";

import {generate as id} from "shortid"

import { films } from "../data";
import FilmsList from "./films";
import {orderBy} from "lodash";
import FilmForm from "./forms/FilmForm";
import TopNavigation from "./TopNavigation";

const AppContext = React.createContext();
export {AppContext};

class App extends Component {

    state = {
        items: [],
        showAddForm: false,
    }

    showAddForm = e => this.setState({showAddForm: true})

    hideAddForm = e => this.setState({showAddForm: false})

    sortFilms = films => orderBy(films, ["featured", "title"], ["desc", "asc"])

    saveFilm = film =>
        this.setState(({items}) => ({
            items: this.sortFilms([...items, {...film, _id: id() }]),
            showAddForm: false,
        }))

    toggleFeatured = id =>
        this.setState(({items}) => ({
            items: this.sortFilms(items.map(item =>
                item._id === id ? {...item, featured: !item.featured } : item
            ))
        }))

    componentDidMount() {
        this.setState({
            items: this.sortFilms(films),
        })
    }

    render() {
        const {items, showAddForm} = this.state;

        return (
            <AppContext.Provider value={{toggleFeatured: this.toggleFeatured}} >
                <div className="ui container mt-3">
                    <TopNavigation showAddForm={this.showAddForm}/>

                    <div className="ui stackable grid">
                        {showAddForm && (
                           <div className="six wide column">
                               <FilmForm saveFilm={this.saveFilm} hideAddForm={this.hideAddForm}/>
                           </div>
                        )}

                        <div className={`${showAddForm ? "ten" : "sixteen"} wide column`}>
                            <FilmsList films={items}/>
                        </div>
                    </div>
                </div>
            </AppContext.Provider>
        )
    }
}

export default App;