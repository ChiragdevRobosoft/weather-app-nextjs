const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

export const getWeatherData = async (
  cityName,
  units = "metric",
  lat = null,
  long = null
) => {
  const URL = `https://api.openweathermap.org/data/2.5/weather?${
    cityName ? `q=${cityName}` : ""
  }${
    lat && long ? `lat=${lat}&lon=${long}` : ""
  }&appid=${API_KEY}&units=${units}`;
  const data = await fetch(URL).then((res) => res.json().then((data) => data));
  console.log(data);
  const {
    name,
    sys: { country },
    weather,
    main: { temp, temp_min, temp_max, humidity },
    visibility,
    wind: { speed },
    id,
  } = data;
  const { description, main, icon } = weather[0];
  return {
    name,
    country,
    description,
    icon,
    main,
    temp,
    temp_min,
    temp_max,
    humidity,
    visibility,
    speed,
    id,
  };
};
