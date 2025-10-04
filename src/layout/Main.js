import React from 'react';
import './Main.css';
 //import Movie from './components/Movie';
import MovieList from './components/MovieList';
import Preloader from './components/Preloader';

class Main extends React.Component
{
    state=
    {
        movies:[]
    }
    componentDidMount() // неявно вызывается после того, как компонент смонтировался на страницу
    {   // здесь нам нужно стащить набор киношек с сайта, на котором зарегистрировались
       // в качестве параметра передаем URL 
        fetch('https://www.omdbapi.com/?i=tt3896198&apikey=ee8c1054&s=matrix')
        // fetch возвращает объект, для которого можем вызывать методы
        .then(response => response.json())
        .then(data => this.setState({movies:data.Search}));
   
    }
    render()
    {
        return(
            <div className='main'>
                <div className='wrap'>
                    {/* <Movie Title="The Matrix" Year="1999" Type="Movie" Poster="https://m.media-amazon.com/images/M/MV5BN2NmN2VhMTQtMDNiOS00NDlhLTliMjgtODE2ZTY0ODQyNDRhXkEyXkFqcGc@._V1_SX300.jpg"/> */}
                  { 
                  this.state.movies.length ? <MovieList movies={this.state.movies}/> : <Preloader />
                  }
                </div>
            </div>
        )
    }
}
export default Main;