import { Popular } from "../Popular";
import { TopRated } from "../Top Rated";
import { Upcoming } from "../Upcoming";
import { Carousel } from "../../components/Carousel";
import { movies } from "../../constants/moviesMock";
import React, { useState, useEffect } from "react";
import { getPopularMovies, getTopRated, getUpcoming } from "../../services";
import { Link, useLocation } from "react-router-dom";
import { ROUTES } from "../../routes/constants";



const Home = () => {
    const [popularMovies, setPopularMovies] = useState([]);
    const [topRatedMovies, setTopRatedMovies] = useState([]);
    const [upcomingMovies, setUpcomingMovies] = useState([]);
    const location = useLocation();

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
                <div className="flex items-center justify-between px-28 p-3">
                <h2 className=" text-slate-600 border border-slate-900 w-fit p-1 rounded-lg text-3xl font-bold">POPULAR</h2>
                <div className=" bg-gray-800 text-white rounded-full text-xl py-1 px-3"><Link to={ROUTES.POPULAR}>Show</Link>
                </div>
            </div>
                <Carousel movies={popularMovies}>
                <Popular />
                </Carousel>
            </div>

            
            {/* Renderizar la fila de películas mejor calificadas */}
            <div>
                <div className="flex items-center justify-between px-28 p-3">
                <h2 className=" text-slate-600 border border-slate-900 w-fit p-1 rounded-lg text-3xl font-bold">TOP RATED</h2>
                <div className=" bg-gray-800 text-white rounded-full text-xl py-1 px-3"><Link to={ROUTES.TOPRATED}>Show</Link>
                </div>
            </div>
                <Carousel movies={topRatedMovies}>
                    <TopRated />
                </Carousel>
            </div>
            
            {/* Renderizar la fila de películas próximas */}
            <div>
                <div className="flex items-center justify-between px-28 p-3">
                <h2 className=" text-slate-600 border border-slate-900 w-fit p-1 rounded-lg text-3xl font-bold">UPCOMING</h2>
                <div className=" bg-gray-800 text-white rounded-full text-xl py-1 px-3"><Link to={ROUTES.UPCOMING}>Show</Link>
                </div>
            </div>
                <Carousel movies={upcomingMovies}>
                    <Upcoming />
                </Carousel>
            </div>
        </div>
    );
}

export default Home;