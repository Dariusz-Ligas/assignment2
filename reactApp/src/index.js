import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Navigate, Routes } from "react-router-dom";
import HomePage from "./pages/homePage";
import MoviePage from "./pages/movieDetailsPage";
import FavoriteMoviesPage from "./pages/favoriteMoviesPage";
import MovieReviewPage from "./pages/movieReviewPage";
import SiteHeader from './components/siteHeader';
import UpcomingMoviesPage from "./pages/upcomingMovies";
import PopularMoviesPage from "./pages/popularMovies";
import MostRatedMoviesPage from "./pages/mostRatedMovies";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from 'react-query/devtools';
import MoviesContextProvider from "./contexts/moviesContext";
import AddMovieReviewPage from './pages/addMovieReviewPage'
import PlayingMoviesPage from "./pages/playingMovies";
import SignUpPage from "./signUpPage";
import LoginPage from "./loginPage";
import AuthProvider from "./authContext";
import AuthHeader from "./authHeader";
import ProtectedRoutes from "./protectedRoutes";


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 360000,
      refetchInterval: 360000, 
      refetchOnWindowFocus: false
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
      <AuthProvider>
      <SiteHeader />
      <AuthHeader />
      <MoviesContextProvider>
        <Routes>
          <Route path="/reviews/form" element={ <AddMovieReviewPage /> } />
          <Route path="/reviews/:id" element={ <MovieReviewPage /> } />
          <Route path="/movies/favorites" element={<FavoriteMoviesPage />} />
          <Route path="/movies/:id" element={<MoviePage />} />
          <Route path="/signup" element={ <SignUpPage /> } />
          <Route path="/login" element={ <LoginPage /> } />
          <Route element={<ProtectedRoutes />}>
          <Route path="/movies/upcoming" element={< UpcomingMoviesPage />} />
          <Route path="/movies/popular" element={< PopularMoviesPage />} />
          <Route path="/movies/playing" element={< PlayingMoviesPage />} />
          <Route path="/movies/mostRated" element={< MostRatedMoviesPage />} />
          </Route>
          <Route path="/" element={<HomePage />} />
          <Route path="*" element={ <Navigate to="/" /> } />
        </Routes>
      </MoviesContextProvider>
      </AuthProvider>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));