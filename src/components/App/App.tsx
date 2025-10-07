import { useState, useEffect } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

import { fetchMovies } from "../../services/movieService";

import css from "./App.module.css";
import SearchBar from "../SearchBar/SearchBar";
import type { Movie } from "../../types/movie";
import { Toaster, toast } from "react-hot-toast";
import MovieGrid from "../MovieGrid/MovieGrid";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieModal from "../MovieModal/MovieModal";
import ReactPaginate from "react-paginate";

function App() {
  const [query, setQuery] = useState("");
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [page, setPage] = useState<number>(1);

  const { data, error, isLoading, isError, isSuccess } = useQuery({
    queryKey: ["movies", query, page],
    queryFn: query !== "" ? () => fetchMovies(query, page) : undefined,
    enabled: query !== "",
    placeholderData: keepPreviousData,
  });

  const totalPages = data?.total_pages ?? 0;

  function handleQuery(newQuery: string) {
    setQuery(newQuery);
    setPage(1);
  }

  useEffect(() => {
    if (isSuccess && data.results.length === 0) {
      toast.error("No movies found for your request");
    }
  }, [data, isSuccess]);

  function handleSelectMovie(movie: Movie | null) {
    setSelectedMovie(movie);
    setIsModalOpen(true);
  }

  return (
    <>
      <SearchBar onSubmit={handleQuery} />
      {isSuccess && totalPages > 1 && (
        <ReactPaginate
          pageCount={totalPages}
          pageRangeDisplayed={5}
          marginPagesDisplayed={1}
          onPageChange={({ selected }) => setPage(selected + 1)}
          forcePage={page - 1}
          containerClassName={css.pagination}
          activeClassName={css.active}
          nextLabel="→"
          previousLabel="←"
        />
      )}

      {isLoading && <Loader />}
      {isError && <ErrorMessage error={error?.message} />}
      {isSuccess && data.results.length > 0 && (
        <MovieGrid movies={data?.results} onSelect={handleSelectMovie} />
      )}

      {isModalOpen && (
        <MovieModal
          onClose={() => {
            setIsModalOpen(false);
            setSelectedMovie(null);
          }}
          movie={selectedMovie}
        />
      )}
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          duration: 5000,
          style: {
            background: "#363636",
            color: "#fff",
            fontSize: "16px",
            borderRadius: "10px",
            maxWidth: "100%",
          },
        }}
      />
    </>
  );
}

export default App;
