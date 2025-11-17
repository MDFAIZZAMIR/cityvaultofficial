import React from "react";
import { RiTwitterXLine } from "react-icons/ri";
import { TbBrandMeta } from "react-icons/tb";
import { IoLogoInstagram } from "react-icons/io";
import { FiPhoneCall } from "react-icons/fi";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t py-12 ">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-8 lg:px-0">
        <div>
          <h3 className="text-lg text-gray-800 mb-4 ">Newsletter</h3>
          <p className="text-gray-500 mb-4">
            Be the first hear to about new roducts, exclusive events, and Online
            offers
          </p>
          <p className="font-medium text-sm text-gray-600 mb-6">
            Sign Up and get 10% off your first Order
          </p>
          {/**News Letter Form */}
          <form className="flex">
            <input
              type="email"
              placeholder="Enter Your Email"
              className="p-3 text-sm border-t border-l border-b border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all"
              required
            />
            <button
              type="submit"
              className="bg-black text-white px-6 py-3 text-sm rounded-r-md hover:bg-gray-800 transition-all"
            >
              Subscribe
            </button>
          </form>
        </div>
        {/**Shop Links */}
        <div>
          <h3 className="text-lg text-gray-800 mb-4">Shop</h3>
          <ul>
            <li>
              <Link to="#" className="hover:text-gray-500 transition-colors">Mens Top Wear</Link>
            </li>
            <li>
              <Link to="#" className="hover:text-gray-500 transition-colors">Womens Top Wear</Link>
            </li>
            <li>
              <Link to="#" className="hover:text-gray-500 transition-colors">Mens Bottom Wear</Link>
            </li>
            <li>
              <Link to="#" className="hover:text-gray-500 transition-colors">Womens Bottom Wear</Link>
            </li>
          </ul>
        </div>
        {/**Support link */}
        <div>
          <h3 className="text-lg text-gray-800 mb-4">Support</h3>
          <ul>
            <li>
              <Link to="#" className="hover:text-gray-500 transition-colors">Contact Us</Link>
            </li>
            <li>
              <Link to="#" className="hover:text-gray-500 transition-colors">About us</Link>
            </li>
            <li>
              <Link to="#" className="hover:text-gray-500 transition-colors">FAQs</Link>
            </li>
            <li>
              <Link to="#" className="hover:text-gray-500 transition-colors">Features</Link>
            </li>
          </ul>
        </div>
        {/**Follow Us */}
        <div>
          <h3 className="text-lg text-gray-800 mb-4">Follow Us</h3>
          <div className="flex items-center space-x-4 mb-6">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferre" className="hover:text-gray-500">
              < TbBrandMeta className="h-5 w-5"/>
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferre" className="hover:text-gray-500">
              <IoLogoInstagram className="h-5 w-5"/>
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferre" className="hover:text-gray-500">
              <RiTwitterXLine className="h-4 w-4"/>
            </a>
          </div>
          <p className="text-gray-500">Call US</p>
          <p>
            <FiPhoneCall className="inline-block mr-2"/>
            123-456-7890
          </p>
        </div>
      </div>
      {/**Footer Bottom */}
      <div className="container mx-auto mt-12 px-4 lg:px-0 border-t border-gray-200 pt-6">
        <p className="text-gray-500 text-sm tracking-tighter text-center">&copy; 2025, CityVault.All Rights Reserved</p>
      </div>
    </footer>
  );
};

export default Footer;
