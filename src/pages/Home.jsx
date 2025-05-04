import React, { useEffect, useState } from "react";
import { getCountry } from "../reuest";
import Skeleton from "../Components/Skeleton";
import { Link} from "react-router-dom";
import Aboute from "./Aboute";
export default function Home() {
  const [country, setCountry] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("");
  const [countryList] = useState([
    "France",
    "Japan",
    "Indonesia",
    "USA",
    "Italy",
    "Greece",
    "Peru",
    "UAE",
    "South Africa",
    "Spain",
    "Australia",
    "Turkey",
    "Maldives",
    "Netherlands",
    "Brazil",
    "Egypt",
    "Canada",
    "Thailand",
    "South Korea",
    "Jordan",
    "Czech Republic",
    "Iceland",
    "Singapore",
    "French Polynesia",
    "Portugal",
    "Morocco",
    "Tanzania",
    "Vietnam",
    "Scotland",
    "Argentina",
    "New Zealand",
    "Croatia",
    "India",
    "Ecuador",
    "Austria",
    "Seychelles",
  ]);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    setLoading(true);
    getCountry(filter)
      .then((res) => {
        setCountry(res);
      })
      .catch(({ message }) => {
        setError(message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [filter]);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  function handleTheme({ target: { checked } }) {
    setTheme(checked ? "dark" : "light");
  }
  function handleChange({ target: { value } }) {
    setFilter(`country=${value}`);
  }
  if (loading) return <Skeleton />;
  if (error) return <h1>Hatolik bo'ldi</h1>;
  if (country.length == 0) return <h2>Malumot mavjud emas !!!</h2>;

  return (
    <div className=" container mx-auto px-3">
      <div className="mt-24 mb-24 flex items-center justify-between">
        <select
          value={
            filter === "France" ? "France" : filter.replace("country=", "")
          }
          defaultValue="Davtal bo'yicha qidirish"
          className="select"
          onChange={handleChange}
        >
          <option disabled={false}>Davlat bo'yicha qidirish</option>
          {countryList.map((el, index) => {
            return (
              <option key={index} value={el}>
                {el}
              </option>
            );
          })}
        </select>

        <label className="swap swap-rotate">
          <input
            type="checkbox"
            checked={theme === "dark"}
            onChange={handleTheme}
            className="theme-controller"
            value="synthwave"
          />

          <svg
            className="swap-off h-10 w-10 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
          </svg>

          {/* moon icon */}
          <svg
            className="swap-on h-10 w-10 fill-current "
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
          </svg>
        </label>
      </div>

      <div className="container mx-auto grid gap-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {country.map(
          (
            { image, country: newCountry, description, name, category ,price},
            index
          ) => {
            return (
              <div key={index} className="card bg-base-200  shadow-sm">
                <figure>
                  <img src={image} alt={name} />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">{newCountry}</h2>
                  <p>{description}</p>
                  <div className="card-actions justify-end">
                  <button className="btn btn-primary">$ {price}</button>
                    <button className="btn btn-primary">{name}</button>
                    <button className="btn btn-primary">{category}</button>
                    <Link className="btn btn-primary" to={`/${newCountry}`}>Batafsil</Link>
                    </div>
                </div>
              </div>
            );
          }
        )}
      </div>
    </div>
  );
}
