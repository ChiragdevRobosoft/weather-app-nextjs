import { useEffect, useState } from "react";
import { RxBorderDotted } from "react-icons/rx";
import styles from "./date-time.module.css";

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const DateTime = () => {
  //dateTime state object format as per UI format.
  const [dateTime, setDateTime] = useState({
    dayName: "",
    day: "",
    month: "",
    year: "",
    hour: "",
    minutes: "",
    ampm: "",
  });

  const getDateTime = () => {
    const date = new Date(); //Get new Date Object

    //Destructure required data
    let day = date.getDate();
    let dayName = days[date.getDay()];
    let month = months[date.getMonth()];
    let year = date.getFullYear();

    //let hour = date.getHours();   //for 24 hour format
    let hour = date.getHours() % 12; //for 12 hour format
    hour = hour ? hour : 12; //whenever hour=0 i.e either 12AM or 12PM make hour=12

    let minutes = date.getMinutes();
    var ampm = date.getHours() >= 12 ? " PM" : " AM";

    setDateTime({
      dayName: dayName,
      day: day,
      month: month,
      year: year,
      hour: hour,
      minutes: minutes,
      ampm: ampm,
    });
  };

  useEffect(() => {
    getDateTime();
    let timer = setInterval(getDateTime, 1000);
    //returned function in useEffect are called cleanups which are executed when component is unmounted.
    return function cleanup() {
      clearInterval(timer);
    };
  }, []);

  return (
    <>
      {dateTime.day ? (
        <p>
          {`${dateTime.dayName}, ${dateTime.day} ${dateTime.month} ${
            dateTime.year
          }  \u00A0 ${
            dateTime.hour.toString().length === 1
              ? 0 + dateTime.hour
              : dateTime.hour
          }:${
            dateTime.minutes.toString().length === 1
              ? 0 + dateTime.minutes
              : dateTime.minutes
          } ${dateTime.ampm}`}
        </p>
      ) : (
        <>
          <RxBorderDotted />
        </>
      )}
    </>
  );
};

export default DateTime;
