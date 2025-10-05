// Main.js
import React from 'react';
import './Main.css';
import MovieList from './components/MovieList';
import Preloader from './components/Preloader';

class Main extends React.Component {
    state = {
        movies: [],
        query: '',       
        loading: true     // для управления Preloader'ом
    };

    //  можно оставить пустым или загрузить что-то по умолчанию
    componentDidMount() {
        this.searchMovies('matrix');
    }

    searchMovies = (searchQuery) => {
        this.setState({ loading: true });
        fetch(`https://www.omdbapi.com/?apikey=ee8c1054&s=${encodeURIComponent(searchQuery)}`)
            .then(response => response.json())
            .then(data => {
                if (data.Response === "True") {
                    this.setState({ movies: data.Search, loading: false });
                } else {
                    this.setState({ movies: [], loading: false });
                    console.warn("No movies found:", data.Error);
                }
            })
            .catch(error => {
                console.error("Error fetching movies:", error);
                this.setState({ movies: [], loading: false });
            });
    };

    // обработчик изменения ввода
    handleInputChange = (e) => {
        this.setState({ query: e.target.value });
    };

    // обработчик отправки формы
    handleSubmit = (e) => {
        e.preventDefault();
        if (this.state.query.trim()) {
            this.searchMovies(this.state.query.trim());
        }
    };

    render() {
        const { movies, loading } = this.state;

        return (
            <div className='main'>
                <div className='wrap'>
                    <form onSubmit={this.handleSubmit} className="search-form">
                        <input
                            type="text"
                            value={this.state.query}
                            onChange={this.handleInputChange}
                            placeholder="Поиск фильма..."
                            className='search-input'
                        />
                        <button type="submit" className='search-button'>Найти</button>
                    </form>
                    {loading ? (
                        <Preloader />
                    ) : movies.length > 0 ? (
                        <MovieList movies={movies} />
                    ) : (
                        <p>Фильмов не найдено.</p>
                    )}
                </div>
            </div>
        );
    }
}

export default Main;