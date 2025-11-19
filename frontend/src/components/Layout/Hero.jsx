import React from "react";
import heroImg from "../../assets/cityCart-Hero.jpg";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative ">
      <img
        src={heroImg}
        className="w-full h-[400px] md:h-[600] lg:h-[750px] object-cover"
        alt="heroImg"
      />
      <div className="absolute inset-0 bg-black bg-opacity-5 flex items-center justify-center ">
        <div className="text-center text-white p-6 ">
          <h1 className="text-4xl md:text-9xl  font-bold tracking-tighter uppercase mb-4 ">
            VACATION <br /> READY
          </h1>
          <p className="text-sm tracking-tighter md:text-lg mb-6">
            Curated Vacation Wear — Delivered to You, Anywhere.
          </p>
          <Link
            to="/collections/all"
            className="bg-white text-gray-950 px-6 py-2 rounded-sm text-lg"
          >
            Shop Now
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
