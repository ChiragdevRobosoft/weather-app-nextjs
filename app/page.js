"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import DescriptionCard from "@/components/description-card/descriptionCard";
import { getWeatherData } from "@/utils/api-help";
import { AiOutlineHeart } from "react-icons/ai";
import { RiLoader2Line } from "react-icons/ri";
import TempIcon from "@/assets/description/icon_temperature_info.png";
import PreIcon from "@/assets/description/icon_precipitation_info.png";
import HumIcon from "@/assets/description/icon_humidity_info.png";
import WindIcon from "@/assets/description/icon_wind_info.png";
import VisIcon from "@/assets/description/icon_visibility_info.png";
import favActvIcon from "@/assets/icon_favourite_Active.png";
import styles from "./page.module.css";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  addFavourites,
  removeFavourites,
  setWeatherData,
  updateSearchesFav,
} from "@/lib/features/weather/weatherSlice";

export default function Home() {
  const [fahStatus, setFahStatus] = useState(false); //Fahrenheit & Celcius Toggle state.
  const dispatch = useAppDispatch();
  let weatherData = useAppSelector((state) => state.weatherData);
  let favourites = useAppSelector((state) => state.favourites);

  const initialRender = useRef(true); //Load weatherData from geolocation on First Render.
  useEffect(() => {
    const loadData = async () => {
      //Initial Render Code
      if (initialRender.current) {
        initialRender.current = false;

        //Initial Render + searched data available check.
        if (weatherData && weatherData.id) {
          weatherData = useAppSelector((state) => state.weatherData);
          return;
        }

        //Load weather data using system geolocation.
        try {
          navigator.geolocation.getCurrentPosition(
            async (pos) => {
              let coordWeatherData = await getWeatherData(
                undefined,
                "metric",
                pos.coords.latitude,
                pos.coords.longitude
              );
              console.log(coordWeatherData);
              updateWeatherData(coordWeatherData);
            },
            async (err) => {
              console.log(err.message);
              const defCity = "Udupi";
              let defWeatherData = await getWeatherData(defCity, "metric");
              console.log(defWeatherData);
              updateWeatherData(defWeatherData);
            }
          );
        } catch (err) {
          console.error("Geolocation Position Error", err.message);
        }
      }
    };

    //Update city favourite status.
    const updateWeatherData = (interWeatherdata) => {
      let isFav = favourites.some(({ id }) => id === interWeatherdata.id);
      let data = { ...interWeatherdata, favStatus: isFav };
      dispatch(setWeatherData(data));
    };

    loadData();
  }, []);

  const swapFav = (data) => {
    let updated = { ...data, favStatus: !data.favStatus };
    let isFav = favourites.some(({ id }) => id === updated.id);
    dispatch(setWeatherData(updated));
    if (updated.favStatus && !isFav) {
      dispatch(addFavourites(updated));
    }
    if (!updated.favStatus && isFav) {
      dispatch(removeFavourites(updated.id));
    }
    dispatch(updateSearchesFav(updated.id));
  };

  return (
    <>
      {weatherData.id ? (
        <div className={styles.container}>
          <div className={styles["text-content"]}>
            <p>
              {weatherData.name}, {weatherData.country}
            </p>
            <div
              className={
                styles[`${weatherData.favStatus ? "factive" : "add-fav"}`]
              }
              onClick={() => swapFav(weatherData)}
            >
              {weatherData.favStatus ? (
                <>
                  <Image src={favActvIcon} /> Add to favourite
                </>
              ) : (
                <>
                  <AiOutlineHeart /> Remove from favourite
                </>
              )}
            </div>
          </div>
          <div className={styles["weather-details"]}>
            <div className={styles["box-content"]}>
              <img
                src={`https://openweathermap.org/img/wn/${weatherData.icon}@2x.png`}
                className={styles["status-icon"]}
              />
              <div className={styles["temp-container"]}>
                <p className={styles.temp}>
                  {fahStatus
                    ? Math.round((weatherData.temp * 9) / 5 + 32)
                    : Math.round(weatherData.temp)}
                </p>
                <div className={styles["deg-cont"]}>
                  <div
                    className={`${styles.deg} ${
                      fahStatus ? "" : styles["active"]
                    }`}
                    onClick={() => setFahStatus(false)}
                  >
                    °C
                  </div>
                  <div
                    className={`${styles.deg}  ${
                      fahStatus ? styles["active"] : ""
                    }`}
                    onClick={() => setFahStatus(true)}
                  >
                    °F
                  </div>
                </div>
              </div>
              <p className={styles["weather-type"]}>{weatherData.main}</p>
            </div>
          </div>
          <div className={styles["description-container"]}>
            <DescriptionCard
              icon={TempIcon}
              w="16"
              h="32"
              title="Min - Max"
              value={`${Math.round(weatherData.temp_min)}° - ${Math.round(
                weatherData.temp_max
              )}°`}
            />
            <DescriptionCard
              icon={PreIcon}
              w="30"
              h="29"
              title="Precipitation"
              value="0%"
            />
            <DescriptionCard
              icon={HumIcon}
              w="19"
              h="25"
              title="Humidity"
              value={`${weatherData.humidity}%`}
            />

            <DescriptionCard
              icon={WindIcon}
              w="23"
              h="22"
              title="Wind"
              value={`${weatherData.humidity} mph`}
            />
            <DescriptionCard
              icon={VisIcon}
              w="34"
              h="20"
              title="Visibility"
              value={`${weatherData.visibility}`}
            />
          </div>
        </div>
      ) : (
        <div className={styles["loading-container"]}>
          <RiLoader2Line />
          Loading
        </div>
      )}
    </>
  );
}
