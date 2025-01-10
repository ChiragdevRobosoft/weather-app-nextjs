import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  weatherData: {},
  favourites: [],
  recentsearches: [],
};

export const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    setWeatherData: (state, action) => {
      state.weatherData = action.payload;
    },
    updateWeatherDataFav: (state) => {
      state.weatherData = {
        ...state.weatherData,
        favStatus: !state.weatherData.favStatus,
      };
    },
    //payload = weatherDataObject with updated
    addFavourites: (state, action) => {
      state.favourites.push(action.payload);
    },
    removeFavourites: (state, action) => {
      state.favourites = state.favourites.filter(
        ({ id }) => id !== action.payload
      );
    },
    clearFavourites: (state) => {
      state.favourites = [];
    },
    addRecentSearches: (state, action) => {
      state.recentsearches.unshift(action.payload);
    },
    clearRecentSearches: (state) => {
      state.recentsearches = [];
    },
    updateSearchesFav: (state, action) => {
      state.recentsearches = state.recentsearches.map((search) =>
        search.id === action.payload
          ? { ...search, favStatus: !search.favStatus }
          : search
      );
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setWeatherData,
  updateWeatherDataFav,
  addFavourites,
  removeFavourites,
  clearFavourites,
  addRecentSearches,
  clearRecentSearches,
  updateSearchesFav,
} = weatherSlice.actions;

export default weatherSlice.reducer;

//reducer rules
// Redux Toolkit allows us to write "mutating" logic in reducers. It
// doesn't actually mutate the state because it uses the Immer library,
// which detects changes to a "draft state" and produces a brand new
// immutable state based off those changes
