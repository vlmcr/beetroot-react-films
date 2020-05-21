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
        selectedFilm: {},
        items: [],
        showAddForm: false,
    }

    showAddForm = e => this.setState({showAddForm: true, selectedFilm: {}, })

    hideAddForm = e => this.setState({showAddForm: false, selectedFilm: {} })

    sortFilms = films => orderBy(films, ["featured", "title"], ["desc", "asc"])

    selectFilmForEdit = selectedFilm => {
        this.setState({
            selectedFilm,
            showAddForm: true,
        })
    }

    addFilm = film =>
        this.setState(({items}) => ({
            items: this.sortFilms([...items, {...film, _id: id()}]),
            showAddForm: false,
        }))

    deleteFilm = film =>
        this.setState(({items}) => ({
            items: items.filter(item => item._id !== film._id),
            selectedFilm: {},
            showAddForm: false,
        }))

    updateFilm = film =>
        this.setState(({items}) => ({
            items: this.sortFilms(
                items.map(item => (item._id === film._id ? film : item)),
            ),
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
            <AppContext.Provider
                value={{toggleFeatured: this.toggleFeatured, selectFilmForEdit: this.selectFilmForEdit, deleteFilm: this.deleteFilm}} >
                <div className="ui container mt-3">
                    <TopNavigation showAddForm={this.showAddForm}/>

                    <div className="ui stackable grid">
                        {showAddForm && (
                           <div className="six wide column">
                               <FilmForm film={this.state.selectedFilm} updateFilm={this.updateFilm} saveFilm={this.addFilm} hideAddForm={this.hideAddForm}/>
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