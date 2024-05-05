import { Popular } from "../Popular";
import { TopRated } from "../Top Rated";
import { Upcoming } from "../Upcoming";
import { Carousel } from "../../components/Carousel";
import { movies } from "../../constants/moviesMock";
import React, { useState, useEffect } from "react";
import { getPopularMovies, getTopRated, getUpcoming } from "../../services";



const Home = () => {
    const [popularMovies, setPopularMovies] = useState([]);
    const [topRatedMovies, setTopRatedMovies] = useState([]);
    const [upcomingMovies, setUpcomingMovies] = useState([]);

    useEffect(() => {
        // Obtener películas populares
        getPopularMovies()
            .then((response) => {
                setPopularMovies(response.data.results); // Suponiendo que los datos de películas están en response.data.results
            })
            .catch((error) => {
                console.error("Error fetching popular movies:", error);
            });

        // Obtener películas mejor calificadas
        getTopRated()
            .then((response) => {
                setTopRatedMovies(response.data.results); // Suponiendo que los datos de películas están en response.data.results
            })
            .catch((error) => {
                console.error("Error fetching top rated movies:", error);
            });

        // Obtener películas próximas
        getUpcoming()
            .then((response) => {
                setUpcomingMovies(response.data.results); // Suponiendo que los datos de películas están en response.data.results
            })
            .catch((error) => {
                console.error("Error fetching upcoming movies:", error);
            });
    }, []);

    return (
        <div className='block-page pt-14 pl-7'>
            {/* Renderizar la fila de películas populares */}
            <div>
                <h2 className=" text-slate-600 bg-slate-100 w-fit p-1 rounded-lg">Populares</h2>
                <Carousel movies={popularMovies}>
                    <Popular />
                </Carousel>
            </div>
            
            {/* Renderizar la fila de películas mejor calificadas */}
            <div>
                <h2 className=" text-slate-600 bg-slate-100 w-fit p-1 rounded-lg">Mejor Calificadas</h2>
                <Carousel movies={topRatedMovies}>
                    <TopRated />
                </Carousel>
            </div>
            
            {/* Renderizar la fila de películas próximas */}
            <div>
                <h2 className=" text-slate-600 bg-slate-100 w-fit p-1 rounded-lg">Próximas</h2>
                <Carousel movies={upcomingMovies}>
                    <Upcoming />
                </Carousel>
            </div>
        </div>
    );
}

export default Home;