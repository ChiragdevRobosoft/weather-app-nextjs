"use client";
import { useState } from "react";
import Empty from "@/components/empty/empty";
import { AiOutlineHeart } from "react-icons/ai";
import favActvIcon from "@/assets/icon_favourite_Active.png";
import styles from "./recent-searches.module.css";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  addFavourites,
  clearRecentSearches,
  removeFavourites,
  updateSearchesFav,
  updateWeatherDataFav,
} from "@/lib/features/weather/weatherSlice";

export default function RecentSearches() {
  const [clearAll, setClearAll] = useState(false);
  const dispatch = useAppDispatch();

  const weatherData = useAppSelector((state) => state.weatherData);
  const searches = useAppSelector((state) => state.recentsearches);

  const handleClear = () => {
    dispatch(clearRecentSearches());
    setClearAll(false);
  };

  const removeFav = (id) => {
    dispatch(removeFavourites(id));
    dispatch(updateSearchesFav(id));
    id === weatherData.id ? dispatch(updateWeatherDataFav()) : "";
  };

  const addFav = (search) => {
    dispatch(addFavourites(search));
    dispatch(updateSearchesFav(search.id));
    search.id === weatherData.id ? dispatch(updateWeatherDataFav()) : "";
  };

  return (
    <>
      {clearAll && (
        <div className={styles["removeall-popup"]}>
          <div className={styles["popup-content"]}>
            <p className={styles["confirmation-text"]}>
              Are you sure want to remove all the recent searches?
            </p>
            <div className={styles["btn-holder"]}>
              <div
                className={styles["no-btn"]}
                onClick={() => setClearAll(false)}
              >
                No
              </div>
              <div className={styles["yes-btn"]} onClick={handleClear}>
                Yes
              </div>
            </div>
          </div>
        </div>
      )}
      {searches.length === 0 ? (
        <Empty name="Recent Search" />
      ) : (
        <div className={styles["searches-container"]}>
          <div className={styles.details}>
            <p>You recenty searched for</p>
            <div
              className={styles["remove-btn"]}
              onClick={() => setClearAll(true)}
            >
              Clear All
            </div>
          </div>
          <div className={styles["search-cities"]}>
            {searches.map((search, index) => (
              <div key={index} className={styles["city-detail"]}>
                <p className={styles["city-state"]}>
                  {search.name}, {search.country}
                </p>
                <div className={styles.center}>
                  <img
                    src={`https://openweathermap.org/img/wn/${search.icon}@2x.png`}
                    className={styles["w-icon"]}
                    alt={search.icon}
                  />
                  <div className={styles["temp-box"]}>
                    <p className={styles["city-temp"]}>
                      {Math.round(search.temp)}
                    </p>
                    <p className={styles["deg-symb"]}>°C</p>
                  </div>
                  <p className={styles["weather-status"]}>{search.main}</p>
                </div>
                <div className={styles["fav-icon"]}>
                  {search.favStatus ? (
                    <Image
                      src={favActvIcon}
                      alt=""
                      onClick={() => removeFav(search.id)}
                    />
                  ) : (
                    <AiOutlineHeart onClick={() => addFav(search)} />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
