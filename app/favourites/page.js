"use client";
import { useState } from "react";
import Image from "next/image";
import Empty from "@/components/empty/empty";
import favActvIcon from "../../assets/icon_favourite_Active.png";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  clearFavourites,
  removeFavourites,
} from "@/lib/features/weather/weatherSlice";
import styles from "./favourites.module.css";

export default function Favourites() {
  const [removeAll, setRemoveAll] = useState(false);
  const dispatch = useAppDispatch();
  const favourites = useAppSelector((state) => state.favourites);

  const swapFav = (data) => {
    dispatch(removeFavourites(data.id));
  };

  const handleClear = () => {
    dispatch(clearFavourites());
    setRemoveAll(false);
  };

  return (
    <>
      {removeAll && (
        <div className={styles["removeall-popup"]}>
          <div className={styles["popup-content"]}>
            <p className={styles["confirmation-text"]}>
              Are you sure want to remove all the favourites?
            </p>
            <div className={styles["btn-holder"]}>
              <div
                className={styles["no-btn"]}
                onClick={() => setRemoveAll(false)}
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
      {favourites.length === 0 ? (
        <Empty name="Favourites added" />
      ) : (
        <div className={styles["fav-container"]}>
          <div className={styles.details}>
            <p>{favourites.length} City added as favourite</p>
            <div
              className={styles["remove-btn"]}
              onClick={() => setRemoveAll(true)}
            >
              Remove All
            </div>
          </div>
          <div className={styles["fav-cities"]}>
            {favourites.map((favCity, indx) => (
              <div className={styles["city-detail"]} key={indx}>
                <p className={styles["city-state"]}>
                  {favCity.name}, {favCity.country}
                </p>
                <div className={styles.center}>
                  <img
                    src={`https://openweathermap.org/img/wn/${favCity.icon}@2x.png`}
                    className={styles["w-icon"]}
                  />
                  <div className={styles["temp-box"]}>
                    <p className={styles["city-temp"]}>{`${Math.round(
                      favCity.temp
                    )}`}</p>
                    <p className={styles["deg-symb"]}>°C</p>
                  </div>
                  <p className={styles["weather-status"]}>{favCity.main}</p>
                </div>
                <div
                  className={styles["fav-icon"]}
                  onClick={() => swapFav(favCity)}
                >
                  <Image src={favActvIcon} alt="active-fav-icon" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      ;
    </>
  );
}
