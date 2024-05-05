import { Popular } from "../Popular";
import { TopRated } from "../Top Rated";
import { Upcoming } from "../Upcoming";
import { Carousel } from "../../components/Carousel";
import { movies } from "../../constants/moviesMock";

const Home = () => {
    // Convertir la propiedad release_date de string a Date
    const moviesWithDateConversion = movies.map(movie => ({
        ...movie,
        release_date: new Date(movie.release_date)
    }));

    // Dividir las películas en tres partes para tres filas de carrusel
    const chunkSize = Math.ceil(moviesWithDateConversion.length / 3);
    const movieChunks = Array.from({ length: 3 }, (_, index) =>
        moviesWithDateConversion.slice(index * chunkSize, (index + 1) * chunkSize)
    );

    return (
        <div className='block-page pt-14 pl-7'>
            {/* Renderizar la fila de películas populares */}
            <Carousel movies={movieChunks[0].map(movie => ({
                ...movie,
                backdrop_path: movie.backdrop_path || '' // Convertir backdrop_path null a string vacía
            }))}>
                <Popular />
            </Carousel>
            
            {/* Renderizar la fila de películas mejor calificadas */}
            <Carousel movies={movieChunks[1].map(movie => ({
                ...movie,
                backdrop_path: movie.backdrop_path || '' // Convertir backdrop_path null a string vacía
            }))}>
                <TopRated />
            </Carousel>
            
            {/* Renderizar la fila de películas próximas */}
            <Carousel movies={movieChunks[2].map(movie => ({
                ...movie,
                backdrop_path: movie.backdrop_path || '' // Convertir backdrop_path null a string vacía
            }))}>
                <Upcoming />
            </Carousel>
        </div>
    );
}

export default Home;
