import React from "react";
import Hero from "../components/Layout/Hero";
import GenderCollcetionSection from "../components/Products/GenderCollcetionSection";
import NewArrivals from "../components/Products/NewArrivals";
import ProductDetails from "../components/Products/ProductDetails";
import ProductGrid from "../components/Products/ProductGrid";
import FeaturedCollcetion from "../components/Products/FeaturedCollcetion";
import FeaturesSection from "../components/Products/FeaturesSection";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import { fetchProductsByFilters } from "../redux/slices/productSlice";
import axios from "axios";

// const placeolderProducts = [
// {
//   _id: 1,
//   name: "Product 1",
//   price: 100,
//   images: [
//     {
//       url: "https://picsum.photos/500/500?random=3",
//       // altText: "Stylish Jacket 3",
//     },
//   ],
// },
// {
//   _id: 2,
//   name: "Product 2",
//   price: 100,
//   images: [
//     {
//       url: "https://picsum.photos/500/500?random=2",
//       // altText: "Stylish Jacket 3",
//     },
//   ],
// },
// {
//   _id: 3,
//   name: "Product 3",
//   price: 100,
//   images: [
//     {
//       url: "https://picsum.photos/500/500?random=3",
//       // altText: "Stylish Jacket 3",
//     },
//   ],
// },
// {
//   _id: 4,
//   name: "Product 4",
//   price: 100,
//   images: [
//     {
//       url: "https://picsum.photos/500/500?random=4",
//       // altText: "Stylish Jacket 3",
//     },
//   ],
// },
//  {
//   _id: 5,
//   name: "Product 6",
//   price: 100,
//   images: [
//     {
//       url: "https://picsum.photos/500/500?random=5",
//       // altText: "Stylish Jacket 3",
//     },
//   ],
// },
// {
//   _id: 6,
//   name: "Product 6",
//   price: 100,
//   images: [
//     {
//       url: "https://picsum.photos/500/500?random=6",
//       // altText: "Stylish Jacket 3",
//     },
//   ],
// },
// {
//   _id: 7,
//   name: "Product 7",
//   price: 100,
//   images: [
//     {
//       url: "https://picsum.photos/500/500?random=7",
//       // altText: "Stylish Jacket 3",
//     },
//   ],
// },
// {
//   _id: 8,
//   name: "Product 8",
//   price: 100,
//   images: [
//     {
//       url: "https://picsum.photos/500/500?random=8",
//       // altText: "Stylish Jacket 3",
//     },
//   ],
// },
// ];

const Home = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);
  const [bestSellerProduct, setBestSellerProduct] = useState(null);

  useEffect(() => {
    //Fetch products for a specific collection
    dispatch(
      fetchProductsByFilters({
        gender: "Women",
        category: "Bottom Wear",
        limit: 8,
      })
    );
    // Fwtch best seller product
    const fetchBestSeller = async () => {
      try {
        const response =await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/products/best-seller`
        );
        setBestSellerProduct(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchBestSeller();
  }, [dispatch]);

  return (
    <div>
      <Hero />
      <GenderCollcetionSection />
      <NewArrivals />

      {/**Best Seller */}
      <h2 className="text-3xl text-center font-bold mb-4">Best Seller</h2>
      {bestSellerProduct ? (
        <ProductDetails productId={bestSellerProduct._id} />
      ) : (
        <p className="text-center">Loading best seller product</p>
      )}

      <div className="container mx-auto">
        <h2 className="text-3xl text-center font-bold mb-4">
          Top Wears for Women
        </h2>
        <ProductGrid products={products} loading={loading} error={error} />
      </div>

      <FeaturedCollcetion />
      <FeaturesSection />
    </div>
  );
};

export default Home;
