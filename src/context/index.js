import React, { useCallback, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../api/api";

import MovieData from "../data/results.json";
import {
  handleDeleteAllFiles,
  handleDeleteOneFile,
  handleGetBase64,
  handleSaveBase64,
} from "../services/fileSystemSave";

const MoviesContext = React.createContext({});

const MoviesProvider = (props) => {
  const [data, setData] = useState([]);
  const [howMany, setHowMany] = useState(0);
  const [inputText, setInputText] = useState("");
  const [textSearched, setTextSearched] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [isSearchingPopular, setIsSearchingPopular] = useState(false);
  const [netflixPopular, setNetflixPopular] = useState([])
  const [toggleFilter, setToggleFilter] = useState(false);
  const [error404, setError404] = useState(false);
  const [error404Popular, setError404Popular] = useState(false);
  const [justOne, setJustOne] = useState(true);
  const [savedMovies, setSavedMovies] = useState([]);
  const [watchedMovies, setWatchedMovies] = useState([]);

  async function getSavedMovies() {
    try {
      const jsonValue = await AsyncStorage.getItem(
        "@saved_movies_movieskeeper"
      );
      if (jsonValue !== null) {
        console.log("Movies loaded");
        jsonValue != null ? setSavedMovies(JSON.parse(jsonValue)) : null;
      }
    } catch (e) {
      setSavedMovies([]);
      console.log(e);
    }
  }
  async function getWatchedMovies() {
    try {
      const jsonValue = await AsyncStorage.getItem(
        "@watched_movies_movieskeeper"
      );
      if (jsonValue !== null) {
        console.log("Movies loaded");
        jsonValue != null ? setWatchedMovies(JSON.parse(jsonValue)) : null;
      }
    } catch (e) {
      setWatchedMovies([]);
      console.log(e);
    }
  }

  useEffect(() => {
    getWatchedMovies();
    getSavedMovies();
  }, []);

  useEffect(() => {
    (async function () {
      try {
        const jsonValue = JSON.stringify(savedMovies);
        await AsyncStorage.setItem("@saved_movies_movieskeeper", jsonValue);
        console.log("Movies saved in LocalStorage");
      } catch (e) {
        console.log("Algún error al guardar");
      }
    })();
  }, [savedMovies]);

  useEffect(() => {
    (async function () {
      try {
        const jsonValue = JSON.stringify(watchedMovies);
        await AsyncStorage.setItem("@watched_movies_movieskeeper", jsonValue);
        console.log("Watched Movies saved in LocalStorage");
      } catch (e) {
        console.log("Algún error al guardar watched");
      }
    })();
  }, [watchedMovies]);

  useEffect(() => {
    if (inputText) {
      setIsSearching(true);
      setHowMany();
      setTextSearched(inputText);
      setError404(false);
      setData();
      searchData();
      console.log("searching...");
    }
  }, [inputText]);

  const searchData = async () => {
    try {
      if (inputText) {
        console.log(`Se ha buscado: ${inputText}`);
        const payload = { data: inputText, isJustOne: justOne };
        const response = await api.post("/search", payload);
        // console.log(response.data.response);
        if (response.data.response === "error: 404") {
          setIsSearching(false);
          setError404(true);
          setData();
          setHowMany();
          setInputText("");
        } else {
          setIsSearching(false);
          setData(response.data.response);
          setHowMany(response.data.response.results.length);
          setInputText("");
        }

        // const response = await api.get('/')
      }
    } catch (err) {
      console.log(err);
    }
  };

  const searchPopular = async (tag) => {
    try {
      console.log(`Buscando popular...`);
      setNetflixPopular()
      setIsSearchingPopular(true);
      setError404Popular();
      const response = await api.get(`/popular/${tag}`);
      if (response.data.response === "error: 404") {
        setIsSearchingPopular(false);
        setError404Popular(true);
        setNetflixPopular()
        console.log("error");
      } else {
        setIsSearchingPopular(false);
        setNetflixPopular(response.data.response.results.movieData)
        console.log('successful')
      }
    } catch (err) {
      console.log(err);
    }
  };

  const saveMovie = (movie) => {
    console.log("saving movie");
    let newMovie = {
      ...movie,
      imgKey:
        movie.title.replace(/( )/gm, "") + Math.floor(Math.random(8) * 10000),
      savedDate: new Date(),
      movieId: movie.title.replace(/( )/gm, "").toLowerCase() + movie.year,
    };
    if (savedMovies?.find((movie) => movie.movieId === newMovie.movieId)) {
      return "error";
    } else {
      handleSaveBase64(newMovie.imgKey, newMovie.url_img);
      let movieWoutBase64 = { ...newMovie, url_img: "data:image/jpeg;base64," };
      setSavedMovies([...savedMovies, movieWoutBase64]);
      return "saved";
    }
  };

  const sortNameSavedMovies = (state) => {
    console.log("sorted by name");
    if (state) {
      setSavedMovies(
        savedMovies.sort((a, b) => {
          if (a.title == b.title) {
            return 0;
          }
          if (a.title > b.title) {
            return -1;
          }
          return 1;
        })
      );
    } else if (!state) {
      setSavedMovies(
        savedMovies.sort((a, b) => {
          if (a.title == b.title) {
            return 0;
          }
          if (a.title < b.title) {
            return -1;
          }
          return 1;
        })
      );
    }
  };

  const sortSavedDateMovies = (state) => {
    console.log("sorted by save date");
    if (state) {
      setSavedMovies(
        savedMovies.sort((a, b) => {
          if (a.savedDate == b.savedDate) {
            return 0;
          }
          if (a.savedDate > b.savedDate) {
            return -1;
          }
          return 1;
        })
      );
    } else if (!state) {
      setSavedMovies(
        savedMovies.sort((a, b) => {
          if (a.savedDate == b.savedDate) {
            return 0;
          }
          if (a.savedDate < b.savedDate) {
            return -1;
          }
          return 1;
        })
      );
    }
  };

  const deleteMovie = (movieId) => {
    let { title, imgKey } = savedMovies?.find(
      (movie) => movie.movieId === movieId
    );
    handleDeleteOneFile(imgKey);
    setSavedMovies(savedMovies.filter((movies) => movies.movieId !== movieId));
    return `${title} — Eliminada`;
  };

  const handleWatchedMovie = (movieId) => {
    console.log("handle watched movie");
    let whichMovie = savedMovies.find((movie) => movie.movieId === movieId);
    let isIn = watchedMovies.some(
      (movie) => movie.movieId === whichMovie.movieId
    );
    if (isIn) {
      console.log("AGAIN!");
      let setData = watchedMovies.map((movie) => {
        if (movie.movieId === whichMovie.movieId) {
          let { date } = movie;
          return { ...movie , date: [...date, new Date()] };
        } else {
          return movie;
        }
      });
      setWatchedMovies(setData);
      return "again";
    } else {
      let { title, runing_time, year, movieId } = whichMovie;
      console.log(`El titulo es ${title}`);
      setWatchedMovies([
        ...watchedMovies,
        {
          title,
          runing_time,
          year,
          movieId,
          justAdded: true,
          date: [new Date()],
        },
      ]);
      return title;
    }
  };

  const sortWatchedMovies = (state) => {
    console.log("sorted");
    if (state) {
      setWatchedMovies(
        watchedMovies.sort((a, b) => {
          if (a.date.length == b.date.length) {
            return 0;
          }
          if (a.date.length > b.date.length) {
            return -1;
          }
          return 1;
        })
      );
    } else if (!state) {
      setWatchedMovies(
        watchedMovies.sort((a, b) => {
          if (a.date.length == b.date.length) {
            return 0;
          }
          if (a.date.length < b.date.length) {
            return -1;
          }
          return 1;
        })
      );
    }
  };

  const sortNameMovies = (state) => {
    console.log("sorted");
    if (state) {
      setWatchedMovies(
        watchedMovies.sort((a, b) => {
          if (a.title == b.title) {
            return 0;
          }
          if (a.title > b.title) {
            return -1;
          }
          return 1;
        })
      );
    } else if (!state) {
      setWatchedMovies(
        watchedMovies.sort((a, b) => {
          if (a.title == b.title) {
            return 0;
          }
          if (a.title < b.title) {
            return -1;
          }
          return 1;
        })
      );
    }
  };

  const sortDurationMovies = (state) => {
    console.log("sorted");
    let regex = /(\d+)/g;
    if (state) {
      setWatchedMovies(
        watchedMovies.sort((a, b) => {
          if (parseInt(a.runing_time) == parseInt(b.runing_time)) {
            return 0;
          }
          if (parseInt(a.runing_time) > parseInt(b.runing_time)) {
            return -1;
          }
          return 1;
        })
      );
    } else if (!state) {
      setWatchedMovies(
        watchedMovies.sort((a, b) => {
          if (parseInt(a.runing_time) == parseInt(b.runing_time)) {
            return 0;
          }
          if (parseInt(a.runing_time) < parseInt(b.runing_time)) {
            return -1;
          }
          return 1;
        })
      );
    }
  };

  const deleteAllViewedMovies = useCallback(() => {
    setWatchedMovies([]);
    setTimeout(() => {
      getWatchedMovies();
    }, 0);
    console.log("ALL WATCHED MOVIES DELETED!!");
  }, [watchedMovies]);

  const deleteAllSavedMovies = useCallback(() => {
    setSavedMovies([]);
    handleDeleteAllFiles();
    console.log("ALL SAVED MOVIES DELETED!!");
  }, [savedMovies]);

  const deletingJustAdded = () => {
    if (!watchedMovies.some((movie) => movie.justAdded === true))
      return console.log("nothing to set");
    console.log("deleting just added");
    setWatchedMovies(
      watchedMovies.map((movie) => {
        if (movie.justAdded) {
          movie.justAdded = false;
        }
        return movie;
      })
    );
  };

  return (
    <MoviesContext.Provider
      value={{
        data,
        setData,
        setInputText,
        inputText,
        isSearching,
        isSearchingPopular,
        setIsSearchingPopular,
        howMany,
        error404,
        error404Popular,
        textSearched,
        setJustOne,
        saveMovie,
        savedMovies,
        deleteMovie,
        watchedMovies,
        handleWatchedMovie,
        sortWatchedMovies,
        sortNameMovies,
        sortDurationMovies,
        deletingJustAdded,
        deleteAllViewedMovies,
        deleteAllSavedMovies,
        toggleFilter,
        setToggleFilter,
        sortNameSavedMovies,
        sortSavedDateMovies,
        searchPopular,
        netflixPopular
      }}
    >
      {props.children}
    </MoviesContext.Provider>
  );
};

export { MoviesProvider, MoviesContext };
