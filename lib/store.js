import { configureStore } from "@reduxjs/toolkit";
import weatherReducer from "./features/weather/weatherSlice";

export const makeStore = () => {
  return configureStore({
    reducer: weatherReducer,
  });
};
