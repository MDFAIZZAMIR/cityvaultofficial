// console.log(JSON.stringify("‌")); // Zero-width character

import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const FilterSidebar = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const [filter, setFilter] = useState({
    category: "",
    gender: "",
    color: "",
    size: [],
    material: [],
    brand: [],
    minPrice: 0,
    maxPrice: 500,
  });
  const [priceRange, setPriceRange] = useState([0, 500]);

  const category = ["Top Wear", "Bottom Wear"];

  const colors = [
    // "red",
    // "blue",
    // "green",
    // "yellow",
    "purple",
    "orange",
    "pink",
    "brown",
    "black",
    "white",
    // "gray",
    // "turquoise",
  ];

  const size = ["XS", "S", "M", "L", "XL", "XXL"];

  const materials = [
    "Cotton",
    "Wool",
    "Silk",
    // "Linen",
    // "Polyester",
    // "Rayon",
    "Denim",
    "Leather",
    "Velvet",
    "Nylon",
  ];

  const brands = [
    "Nike",
    "Adidas",
    "Puma",
    "Levi's",
    "Gucci",
    "Zara",
    "H&M",
    // "Tommy Hilfiger",
    // "Calvin Klein",
    // "Versace",
    // "Louis Vuitton",
  ];
  const genders = ["Men", "Women"];

  useEffect(() => {
    const params = Object.fromEntries([...searchParams]);
    //{category: 'Top Wear', 'maxPrice: 500'} => params.category

    setFilter({
      category: params.category || "",
      gender: params.gender || "",
      color: params.color || "",
      size: params.size ? params.size.split(",") : [],
      material: params.material ? params.material.split(",") : [],
      brand: params.brand ? params.brand.split(",") : [],
      minPrice: params.minPrice || 0,
      maxPrice: params.maxPrice || 500,
    });
    setPriceRange([0, params.maxPrice || 500]);
  }, [searchParams]);

  const handleFilterChange = (e) => {
    const { name, value, checked, type } = e.target;
    let newFilters = { ...filter };
    if (type === "checkbox") {
      if (checked) {
        newFilters[name] = [...(newFilters[name] || []), value];
      } else {
        newFilters[name] = newFilters[name].filter((item) => item !== value);
      }
    } else {
      newFilters[name] = value;
    }
    setFilter(newFilters);
    updateURLParams(newFilters);
    // console.log(newFilters);

    // console.log({ name, value, checked, type });
  };

  const updateURLParams = (newFilters) => {
    const params = new URLSearchParams();
    //{category:"Top Wear", size:["XS", "S"]}
    Object.keys(newFilters).forEach((key) => {
      if (Array.isArray(newFilters[key]) && newFilters[key].length > 0) {
        params.append(key, newFilters[key].join(",")); //"XS", "S"
      } else if (newFilters[key]) {
        params.append(key, newFilters[key]);
      }
    });
    setSearchParams(params);
    navigate(`?${params.toString()}`); // ?category= Bottom + Wear&size = XS%2CS
  };

  const handlePriceChange = (e) => {
    const newPrice = e.target.value;
    setPriceRange([0, newPrice]);
    const newFilters = { ...filter, minPrice: 0, maxPrice: newPrice };
    setFilter(filter);

    updateURLParams(newFilters);
  };

  return (
    <div className="p-4">
      <h3 className="text-xl font-medium text-gray-800 mb-4 ">Filter</h3>

      {/**Category Filter */}
      <div className="mb-6">
        <label className="block text-gray-600 font-medium mb-2">Category</label>
        {category.map((category) => (
          <div key={category} className="flex items-center mb-1">
            <input
              type="radio"
              name="category"
              value={category}
              onChange={handleFilterChange}
              checked={filter.category === category}
              className="mr-2 h-4 text-blue-500 focus:ring-blue-400 border-gray-300"
            />
            <span className="text-gray-700">{category}</span>
          </div>
        ))}
      </div>
      {/**gender Filter */}
      <div className="mb-6">
        <label className="block text-gray-600 font-medium mb-2">Gender</label>
        {genders.map((gender) => (
          <div key={gender} type="gender" className="flex items-center mb-1">
            <input
              type="radio"
              name="gender"
              value={gender}
              checked={filter.gender === gender}
              onChange={handleFilterChange}
              className="mr-2 h-4 text-blue-500 focus:ring-blue-400 border-gray-300"
            />
            <span className="text-gray-700">{gender}</span>
          </div>
        ))}
      </div>
      {/**Color Filter */}
      <div className="mb-6">
        <label className="block text-gray-600 font-medium mb-2 ">Color</label>
        <div className="flex flex-wrap gap-2">
          {colors.map((color) => (
            <button
              key={color}
              name="color"
              value={color}
              onClick={handleFilterChange}
              className={`w-8 h-8 rounded-full border border-gray-300 cursor-pointer transition hover:scale-105 ${
                filter.color === color ? "ring-2 ring-blue-500" : ""
              }`}
              style={{ backgroundColor: color.toLowerCase() }}
            ></button>
          ))}
        </div>
      </div>
      {/**Size Filter */}
      <div className="mb-6">
        <label className="block text-gray-600 font-medium mb-2">Size</label>
        {size.map((size) => (
          <div key={size} className="flex items-center mb-1">
            <input
              type="checkbox"
              name="size"
              value={size}
              onChange={handleFilterChange}
              checked={filter.size.includes(size)}
              className="mr-2 h-4 text-blue-500 focus:ring-blue-400 border-gray-300"
            />
            <span className="text-gray-700">{size}</span>
          </div>
        ))}
      </div>
      {/**Materials Filter */}
      <div className="mb-6">
        <label className="block text-gray-600 font-medium mb-2">
          Materials
        </label>
        {materials.map((materials) => (
          <div key={materials} className="flex items-center mb-1">
            <input
              type="checkbox"
              name="material"
              value={materials}
              onChange={handleFilterChange}
              checked={filter.material.includes(materials)}
              className="mr-2 h-4 text-blue-500 focus:ring-blue-400 border-gray-300"
            />
            <span className="text-gray-700">{materials}</span>
          </div>
        ))}
      </div>
      {/**Brand Filter */}
      <div className="mb-6">
        <label className="block text-gray-600 font-medium mb-2">Brand</label>
        {brands.map((brands) => (
          <div key={brands} className="flex items-center mb-1">
            <input
              type="checkbox"
              name="brand"
              value={brands}
              onChange={handleFilterChange}
              checked={filter.brand.includes(brands)}
              className="mr-2 h-4 text-blue-500 focus:ring-blue-400 border-gray-300"
            />
            <span className="text-gray-700">{brands}</span>
          </div>
        ))}
      </div>
      {/**PriceRange Filter */}
      <div className="mb-8">
        <label className="block text-gray-600 font-medium mb-2">
          Price Range
        </label>
        <input
          type="range"
          name="priceRAnge"
          min={0}
          max={500}
          value={priceRange[1]}
          onChange={handlePriceChange}
          className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer"
        />
        <div className="flex justify-between text-gray-600 mt-2">
          <span>$0</span>
          <span>${priceRange[1]}</span>
        </div>
      </div>
    </div>
  );
};
export default FilterSidebar;
