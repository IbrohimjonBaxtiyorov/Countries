import React, { useEffect, useState } from "react";
import { getCountry } from "../reuest";
export default function Home() {
  const [country, setCountry] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    getCountry()
      .then((res) => {
        setCountry(res);
        console.log(res);
      })
      .catch(({ message }) => {
        setError(message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) return <h2>LOADING !!!</h2>;
  if (error) return <h1>Hatolik bo'ldi</h1>;
  if (country.length == 0) return <h2>Malumot mavjud emas !!!</h2>;
  return (
    <div>
      {country.map((el) => {
        return <div className="card bg-base-100 w-96 shadow-sm">
          <figure>
            <img
              src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
              alt="Shoes"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">Card Title</h2>
            <p>
              A card component has a figure, a body part, and inside body there
              are title and actions parts
            </p>
            <div className="card-actions justify-end">
              <button className="btn btn-primary">Buy Now</button>
            </div>
          </div>
        </div>;
      })}
    </div>
  );
}
