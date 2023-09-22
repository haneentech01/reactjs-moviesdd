import { Container } from "react-bootstrap";
import NavBar from "./Components/NavBar";
import MoveList from "./Components/MoveList";
// import AxiosArray from "./Axioses/AxiosArray";
import { useEffect, useState } from "react";
import axios from "axios";
import PaginationEx from "./Components/PaginationEx";
import MovieDetails from "./Components/MovieDetails";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  const [movies, setMovies] = useState([]);
  const [pageCount, setPageCount] = useState(0);

  //Get All Movies By Axios
  async function getAllMovies() {
    const res = await axios.get(
      "https://api.themoviedb.org/3/movie/popular?api_key=913eae2a497703cb595b7d2a562c50c4&language=ar"
    );
    setMovies(res.data.results);
    setPageCount(res.data.total_pages);
  }

  //Get Current Page
  async function getPage(page) {
    const res = await axios.get(
      `https://api.themoviedb.org/3/movie/popular?api_key=913eae2a497703cb595b7d2a562c50c4&language=ar&page=${page}`
    );
    setMovies(res.data.results);
    setPageCount(res.data.total_pages);
  }

  useEffect(() => {
    getAllMovies();
  }, []);

  //To Search In API
  async function search(word) {
    if (word === "") {
      getAllMovies();
    } else {
      const res = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=913eae2a497703cb595b7d2a562c50c4&query=${word}&language=ar`
      );
      setMovies(res.data.results);
      setPageCount(res.data.total_pages);
    }
  }

  return (
    <div className="fonts color-body">
      {/* <AxiosArray /> */}
      <NavBar search={search} />
      <Container>
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <MoveList
                  movies={movies}
                  getPage={getPage}
                  pageCount={pageCount}
                />
              }
            />
            <Route path="/movie/:id" element={<MovieDetails />} />
            {/* <PaginationEx /> */}
          </Routes>
        </BrowserRouter>
      </Container>
    </div>
  );
}

export default App;
