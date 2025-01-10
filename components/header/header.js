"use client";
import Image from "next/image";
import Logo from "../../assets/logo_web.png";
import styles from "./header.module.css";
import { useState } from "react";
import { getWeatherData } from "@/utils/api-help";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  addRecentSearches,
  setWeatherData,
} from "@/lib/features/weather/weatherSlice";

export default function Header() {
  const [city, setCity] = useState("");
  const dispatch = useAppDispatch();
  //Keep Updating Favourites and Recent Searches Data
  const recentSearches = useAppSelector((state) => state.recentsearches);
  const favourites = useAppSelector((state) => state.favourites);

  //City Search Handler
  const handleEnter = async (e) => {
    //Button Pressed Should be Enter(keyCode = 13)
    if (e.keyCode === 13) {
      let data = await getWeatherData(e.target.value, "metric"); //Get city weather data.
      if (data) {
        //Update Favourite Status to the WeatherData object.
        const cityfavStatus = favourites.some(({ id }) => id === data.id);
        data = { ...data, favStatus: cityfavStatus };
        dispatch(setWeatherData(data));

        //Add data to RecentSearches
        const dupSearch = recentSearches.some(({ id }) => id === data.id);
        !dupSearch ? dispatch(addRecentSearches(data)) : "";
      }
      setCity("");
    }
  };
  return (
    <div className={styles.header}>
      <>
        <Image
          src={Logo}
          alt="weather-app-logo"
          width="142px"
          height="30px"
          priority
        ></Image>
      </>
      <input
        type="text"
        id="fname"
        placeholder="Search city"
        onChange={(e) => setCity(e.target.value)}
        value={city}
        className={styles.searchbox}
        onKeyDown={handleEnter}
      ></input>
    </div>
  );
}
