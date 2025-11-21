// import React from "react";
// import mensCollectionimg from "../../assets/menscollectionmain.jpg";
// import womensCollectionimg from "../../assets/womensCollectionmain.jpg";
// import { Link } from "react-router-dom";

// const GenderCollectionSection = () => {
//   return (
//     <section className="py-16 px-4 lg:px-0">
//       <div className="container mx-auto flex flex-col md:flex-row gap-8">
//         {/**Womens Collection */}
//         <div className="relative flex-1">
//           <img
//             src={womensCollectionimg}
//             alt="Women's Collection "
//             className="w-full h-[700px] object-cover"
//           />
//           <div className="absolute bottom-8 left-8 bg-white bg-opacity-90 p-4">
//             <h2 className="text-2xl font-bold text-gray-900 mb-3">
//               Womens Collection
//             </h2>
//             <Link to="/collections/all?gender=Women" className="text-gray-900">
//               Shop Now
//             </Link>
//           </div>
//         </div>
//         {/**Mens Collection */}
//         <div className="relative flex-1">
//           <img
//             src={mensCollectionimg}
//             alt="Womens Collection "
//             className="w-full h-[700px] object-cover"
//           />
//           <div className="absolute bottom-8 left-8 bg-white bg-opacity-90 p-4">
//             <h2 className="text-2xl font-bold text-gray-900 mb-3">
//               Mens Collection
//             </h2>
//             <Link to="/collections/all?gender=Men" className="text-gray-900">
//               Shop Now
//             </Link>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default GenderCollectionSection;

import React from "react";
import mensCollectionimg from "../../assets/menscollectionmain.jpg";
import womensCollectionimg from "../../assets/womensCollectionmain.jpg";
import { Link } from "react-router-dom";

const GenderCollectionSection = () => {
  return (
    <section className="py-16 px-4 lg:px-0">
      <div className="container mx-auto flex flex-col md:flex-row gap-8">

        {/* Womens Collection */}
        <Link
          to="/collections/all?gender=Women"
          className="relative flex-1 group block"
        >
          <img
            src={womensCollectionimg}
            alt="Women's Collection"
            className="w-full h-[700px] object-cover rounded-xl transition-transform duration-500 group-hover:scale-105"
          />

          {/* Overlay Card */}
          <div className="absolute bottom-8 left-8 bg-white/90 backdrop-blur-sm p-5 rounded-xl shadow-lg transition duration-300 group-hover:shadow-2xl">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Womens Collection
            </h2>
            <p className="text-gray-800 font-medium">Shop Now →</p>
          </div>
        </Link>

        {/* Mens Collection */}
        <Link
          to="/collections/all?gender=Men"
          className="relative flex-1 group block"
        >
          <img
            src={mensCollectionimg}
            alt="Men's Collection"
            className="w-full h-[700px] object-cover rounded-xl transition-transform duration-500 group-hover:scale-105"
          />

          {/* Overlay Card */}
          <div className="absolute bottom-8 left-8 bg-white/90 backdrop-blur-sm p-5 rounded-xl shadow-lg transition duration-300 group-hover:shadow-2xl">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Mens Collection
            </h2>
            <p className="text-gray-800 font-medium">Shop Now →</p>
          </div>
        </Link>

      </div>
    </section>
  );
};

export default GenderCollectionSection;
