// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import PaypalButton from "./PaypalButton";
// import { useDispatch, useSelector } from "react-redux";
// import { createCheckout } from "../../redux/slices/checkoutSlice";
// import axios from "axios";

// // const cart = {
// //   products: [
// //     {
// //       name: "Stylish Jacket",
// //       size: "M",
// //       color: "Black",
// //       price: 120,
// //       image: "https://picsum.photos/150?random=1",
// //     },
// //     {
// //       name: "Stylish Jacket",
// //       size: "L",
// //       color: "green",
// //       price: 110,
// //       image: "https://picsum.photos/150?random=2",
// //     },
// //   ],
// //   totalPrice: 230,
// // };

// const Checkout = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const { cart, loading, error } = useSelector((state) => state.cart);
//   const { user } = useSelector((state) => state.auth);

//   const [checkoutId, setCheckoutId] = useState(null);

//   const [shippingAddress, setShippingAddress] = useState({
//     firstName: "",
//     lastName: "",
//     address: "",
//     city: "",
//     postalCode: "",
//     country: "",
//     phone: "",
//   });

//   // Ensure cart is loaded before proceeding
//   // useEffect(() => {
//   //   if (!cart || cart.products || cart.products.length === 0) {
//   //     navigate("/");
//   //   }
//   // }, [cart, navigate]);
//   useEffect(() => {
//     if (!cart || !cart?.products?.length) {
//       navigate("/");
//     }
//   }, [cart, navigate]);

//   const handleCreateCheckout = async (e) => {
//     e.preventDefault();
//     // setCheckoutId(123);
//     if (cart && cart.products.length > 0) {
//       const res = await dispatch(
//         createCheckout({
//           checkoutItems: cart.products,
//           shippingAddress,
//           paymentMethod: "Paypal",
//           totalPrice: cart.totalPrice,
//         })
//       );
//       if (res.payload && res.payload._id) {
//         setCheckoutId(res.payload._id); //  Set checkout ID if checkout was successfull
//       }
//     }
//   };

//   const handlePaymentSuccess = async (details) => {
//     try {
//       const response = await axios.put(
//         `${import.meta.env.VITE_BACKEND_URL}/api/checkout/${checkoutId}/pay`,
//         { paymentStatus: "paid", paymentDetails: details },
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("userToken")}`,
//           },
//         }
//       );
//       await handleFinalizeCheckout(checkoutId); //Finalize checkout if payment is successfull
//       // if (res.status === 200) {

//       // } else {
//       //   console.error(error);
//       // }
//     } catch (error) {
//       console.error(error);
//     }
//     // console.log("Payment Success", details);
//     // navigate("/order-confirmation");
//   };

//   const handleFinalizeCheckout = async (checkoutId) => {
//     try {
//       const response = await axios.post(
//         `${
//           import.meta.env.VITE_BACKEND_URL
//         }/api/checkout/${checkoutId}/finalize`,
//         {},
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("userToken")}`,
//           },
//         }
//       );
//       if(response.status === 200) {
//         navigate("/order-confirmation");
//       }else {
//         console.error(error);

//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };
//   if (loading) return <p>loading cart...</p>;

//   if (error) return <p>Error: {error}</p>;

//   if (!cart || !cart.products || cart.products.length === 0) {
//     return <p>Your cart is Empty!!</p>;
//   }

//   return (
//     <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto py-10 px-6 tracking-tighter">
//       {/** Left Section */}
//       <div className="bg-white rounded-lg p-6">
//         <h2 className="text-2xl uppercase mb-6">Checkout</h2>
//         <form onSubmit={handleCreateCheckout}>
//           <h3 className="text-lg mb-4">Contact Details</h3>
//           <div className="mb-4">
//             <label className="block text-gray-700">Email</label>
//             <input
//               type="email"
//               value={user ? user.email : ""}
//               className="w-full p-2 border rounded "
//               disabled
//             />
//             <h3 className="text-lg mb-4 "> Delivery</h3>
//             <div className="mb-4 grid grid-cols-2 gap-4 ">
//               <div>
//                 <label className="block text-gray-700">First Name</label>
//                 <input
//                   value={shippingAddress.firstName}
//                   onChange={(e) =>
//                     setShippingAddress({
//                       ...shippingAddress,
//                       firstName: e.target.value,
//                     })
//                   }
//                   type="text"
//                   className="w-full p-2 border rounded "
//                   required
//                 />
//               </div>
//               <div>
//                 <label className="block text-gray-700">Last Name</label>
//                 <input
//                   value={shippingAddress.lastName}
//                   onChange={(e) =>
//                     setShippingAddress({
//                       ...shippingAddress,
//                       lastName: e.target.value,
//                     })
//                   }
//                   type="text"
//                   className="w-full p-2 border rounded "
//                   required
//                 />
//               </div>
//             </div>
//             <div className="mb-4 ">
//               <label className="block text-gray-700">Address</label>
//               <input
//                 type="text"
//                 value={shippingAddress.address}
//                 onChange={(e) =>
//                   setShippingAddress({
//                     ...shippingAddress,
//                     address: e.target.value,
//                   })
//                 }
//                 className="w-full p-2 border rounded"
//                 required
//               />
//             </div>
//             <div className="mb-4 grid grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-gray-700">City</label>
//                 <input
//                   value={shippingAddress.city}
//                   onChange={(e) =>
//                     setShippingAddress({
//                       ...shippingAddress,
//                       city: e.target.value,
//                     })
//                   }
//                   type="text"
//                   className="w-full p-2 border rounded "
//                   required
//                 />
//               </div>
//               <div>
//                 <label className="block text-gray-700">Postal Code</label>
//                 <input
//                   value={shippingAddress.postalCode}
//                   onChange={(e) =>
//                     setShippingAddress({
//                       ...shippingAddress,
//                       postalCode: e.target.value,
//                     })
//                   }
//                   type="text"
//                   className="w-full p-2 border rounded "
//                   required
//                 />
//               </div>
//             </div>
//             <div className="mb-4 ">
//               <label className="block text-gray-700">Country</label>
//               <input
//                 type="text"
//                 value={shippingAddress.country}
//                 onChange={(e) =>
//                   setShippingAddress({
//                     ...shippingAddress,
//                     country: e.target.value,
//                   })
//                 }
//                 className="w-full p-2 border rounded"
//                 required
//               />
//             </div>
//             <div className="mb-4 ">
//               <label className="block text-gray-700">Phone Number</label>
//               <input
//                 type="tel"
//                 value={shippingAddress.phone}
//                 onChange={(e) =>
//                   setShippingAddress({
//                     ...shippingAddress,
//                     phone: e.target.value,
//                   })
//                 }
//                 className="w-full p-2 border rounded"
//                 required
//               />
//             </div>
//             <div className="mt-6">
//               {!checkoutId ? (
//                 <button
//                   type="submit"
//                   className="w-full bg-black text-white py-3 rounded"
//                 >
//                   Continue To Payment
//                 </button>
//               ) : (
//                 <div>
//                   <h3 className="text-lg mb-4 ">Pay with Paypal</h3>
//                   {/**Paypal Component */}
//                   <PaypalButton
//                     amount={cart.totalPrice}
//                     onSuccess={handlePaymentSuccess}
//                     onError={(err) => alert("Payment Failed. Try Again")}
//                   />
//                 </div>
//               )}
//             </div>
//           </div>
//         </form>
//       </div>
//       {/**Right Section */}
//       <div className="bg-gray-50 p-6 rounded-lg">
//         <h3 className="text-lg mb-4">Order Summary</h3>
//         <div className="border-t py-4 mb-4">
//           {cart.products.map((product, index) => (
//             <div
//               key={index}
//               className="flex items-start justify-between py-2 border-b"
//             >
//               <div className="flex items-start">
//                 <img
//                   src={product.image}
//                   alt={product.name}
//                   className="w-20 h-24 object-cover mr-4"
//                 />
//                 <div>
//                   <h3 className="text-md ">{product.name}</h3>
//                   <p className="text-gray-500">Size:{product.size}</p>
//                   <p className="text-gray-500">Color:{product.color}</p>
//                 </div>
//               </div>
//               <p className="text-xl">${product.price?.toLocaleString()}</p>
//             </div>
//           ))}
//         </div>
//         <div className="flex justify-between items-center text-lg mb-4">
//           <p>Subtotal</p>
//           <p>${cart.totalPrice?.toLocaleString()}</p>
//         </div>
//         <div className="flex justify-between items-center text-lg">
//           <p>Shipping</p>
//           <p>Free</p>
//         </div>
//         <div className="flex justify-between items-center text-lg mt-4 border-t pt-4">
//           <p>Total</p>
//           <p>${cart.totalPrice?.toLocaleString()}</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Checkout;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PaypalButton from "./PaypalButton";
import { useDispatch, useSelector } from "react-redux";
import { createCheckout } from "../../redux/slices/checkoutSlice";
import axios from "axios";

const Checkout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cart, loading, error } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);

  const [checkoutId, setCheckoutId] = useState(null);

  const [shippingAddress, setShippingAddress] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
    phone: "",
  });

  useEffect(() => {
    if (!cart || !cart?.products?.length) {
      navigate("/");
    }
  }, [cart, navigate]);

  const handleCreateCheckout = async (e) => {
    e.preventDefault();
    if (!cart || !cart.products?.length) return;

    // Normalize items to the exact shape your backend expects.
    // Pull image from multiple possible places: p.image, p.images[0].url, p.product.images[0].url
    const checkoutItems = cart.products.map((p) => {
      const image =
        p.image ||
        (p.images && p.images[0] && p.images[0].url) ||
        (p.product && p.product.images && p.product.images[0]?.url) ||
        ""; // keep empty to detect missing later

      return {
        productId: p.productId || p._id || p.id,
        name: p.name || p.title || "Unknown Product",
        quantity: p.quantity ?? 1,
        price: p.price ?? 0,
        image,
        size: p.size,
        color: p.color,
      };
    });

    // Debug: show exactly what we will send to server
    // console.log("DEBUG createCheckout payload:", {
    //   checkoutItems,
    //   shippingAddress,
    //   paymentMethod: "Paypal",
    //   totalPrice: cart.totalPrice,
    // });

    // Warn / handle items missing image:
    const missingImage = checkoutItems.filter((i) => !i.image);
    if (missingImage.length) {
      console.warn(
        "Some checkout items missing image — using placeholder for them:",
        missingImage
      );
      // Option: stop the flow and ask user to fix cart (strict):
      // return alert("Some items in your cart are missing images. Please update the cart before continuing.");

      // We choose to continue but set a placeholder so backend validation succeeds:
      checkoutItems.forEach((it) => {
        if (!it.image)
          it.image = "https://via.placeholder.com/300x400?text=No+Image";
      });
    }

    const res = await dispatch(
      createCheckout({
        checkoutItems,
        shippingAddress,
        paymentMethod: "Paypal", // correct spelling
        totalPrice: cart.totalPrice,
      })
    );

    if (res.payload && res.payload._id) {
      setCheckoutId(res.payload._id);
    } else {
      console.error("createCheckout failed:", res);
    }
  };

  const handlePaymentSuccess = async (details) => {
    try {
      // mark checkout as paid
      const payRes = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/checkout/${checkoutId}/pay`,
        { paymentStatus: "paid", paymentDetails: details },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );
      await handleFinalizeCheckout(checkoutId); // Finalize checkout if payment is successfull

      // check pay response
      // if (!(payRes.status >= 200 && payRes.status < 300)) {
      //   console.error("Payment update failed:", payRes);
      //   return alert(
      //     "Payment succeeded but server failed to update. Contact support."
      //   );
      // }

      // finalize the checkout -> this creates the Order on server
      // const finalizeRes = await handleFinalizeCheckout(checkoutId);

      // handleFinalizeCheckout returns the created order (or null on failure)
      // if (finalizeRes) {
      //   // optionally: clear client cart here / update store
      //   // dispatch(clearCart()); // if you have this action
      //   // navigate to confirmation page with order id
      //   navigate(`/order-confirmation/${finalizeRes._id}`);
      // } else {
      //   alert(
      //     "Payment recorded but finalizing order failed. Check server logs."
      //   );
      // }
    } catch (error) {
      console.error("handlePaymentSuccess error:", error);
      alert("An error occurred finalizing payment. See console for details.");
    }
  };

  const handleFinalizeCheckout = async (checkoutId) => {
    try {
      const response = await axios.post(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/api/checkout/${checkoutId}/finalize`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );
      navigate("/order-confirmation")

      // treat any 2xx as success (201 is valid for created)
      // if (response.status >= 200 && response.status < 300) {
      //   // response.data should be the created order (your backend returns finalOrder)
      //   console.log("Finalize success:", response.data);
      //   return response.data;
      // } else {
      //   console.error("Finalize returned non-2xx:", response);
      //   return null;
      // }
    } catch (error) {
      console.error("handleFinalizeCheckout error:", error);
      return null;
    }
  };

  // const handlePaymentSuccess = async (details) => {
  //   try {
  //     await axios.put(
  //       `${import.meta.env.VITE_BACKEND_URL}/api/checkout/${checkoutId}/pay`,
  //       { paymentStatus: "paid", paymentDetails: details },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${localStorage.getItem("userToken")}`,
  //         },
  //       }
  //     );
  //     await handleFinalizeCheckout(checkoutId);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // const handleFinalizeCheckout = async (checkoutId) => {
  //   try {
  //     const response = await axios.post(
  //       `${import.meta.env.VITE_BACKEND_URL}/api/checkout/${checkoutId}/finalize`,
  //       {},
  //       {
  //         headers: {
  //           Authorization: `Bearer ${localStorage.getItem("userToken")}`,
  //         },
  //       }
  //     );
  //     if (response.status === 200) {
  //       navigate("/order-confirmation");
  //     } else {
  //       console.error(response);
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  if (loading) return <p>loading cart...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!cart || !cart.products || cart.products.length === 0) {
    return <p>Your cart is Empty!!</p>;
  }

  // UI safe image getter for rendering (use existing image or first images[0].url or placeholder)
  const getProductImageForUI = (product) =>
    product.image ||
    (product.images && product.images[0] && product.images[0].url) ||
    (product.product &&
      product.product.images &&
      product.product.images[0]?.url) ||
    "https://via.placeholder.com/300x400?text=No+Image";

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto py-10 px-6 tracking-tighter">
      {/* Left Section */}
      <div className="bg-white rounded-lg p-6">
        <h2 className="text-2xl uppercase mb-6">Checkout</h2>
        <form onSubmit={handleCreateCheckout}>
          <h3 className="text-lg mb-4">Contact Details</h3>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              value={user ? user.email : ""}
              className="w-full p-2 border rounded "
              disabled
            />
            <h3 className="text-lg mb-4 "> Delivery</h3>
            <div className="mb-4 grid grid-cols-2 gap-4 ">
              <div>
                <label className="block text-gray-700">First Name</label>
                <input
                  value={shippingAddress.firstName}
                  onChange={(e) =>
                    setShippingAddress({
                      ...shippingAddress,
                      firstName: e.target.value,
                    })
                  }
                  type="text"
                  className="w-full p-2 border rounded "
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700">Last Name</label>
                <input
                  value={shippingAddress.lastName}
                  onChange={(e) =>
                    setShippingAddress({
                      ...shippingAddress,
                      lastName: e.target.value,
                    })
                  }
                  type="text"
                  className="w-full p-2 border rounded "
                  required
                />
              </div>
            </div>
            <div className="mb-4 ">
              <label className="block text-gray-700">Address</label>
              <input
                type="text"
                value={shippingAddress.address}
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    address: e.target.value,
                  })
                }
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div className="mb-4 grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700">City</label>
                <input
                  value={shippingAddress.city}
                  onChange={(e) =>
                    setShippingAddress({
                      ...shippingAddress,
                      city: e.target.value,
                    })
                  }
                  type="text"
                  className="w-full p-2 border rounded "
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700">Postal Code</label>
                <input
                  value={shippingAddress.postalCode}
                  onChange={(e) =>
                    setShippingAddress({
                      ...shippingAddress,
                      postalCode: e.target.value,
                    })
                  }
                  type="text"
                  className="w-full p-2 border rounded "
                  required
                />
              </div>
            </div>
            <div className="mb-4 ">
              <label className="block text-gray-700">Country</label>
              <input
                type="text"
                value={shippingAddress.country}
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    country: e.target.value,
                  })
                }
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div className="mb-4 ">
              <label className="block text-gray-700">Phone Number</label>
              <input
                type="tel"
                value={shippingAddress.phone}
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    phone: e.target.value,
                  })
                }
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div className="mt-6">
              {!checkoutId ? (
                <button
                  type="submit"
                  className="w-full bg-black text-white py-3 rounded"
                >
                  Continue To Payment
                </button>
              ) : (
                <div>
                  <h3 className="text-lg mb-4 ">Pay with Paypal</h3>
                  <PaypalButton
                    amount={cart.totalPrice}
                    onSuccess={handlePaymentSuccess}
                    onError={(err) => alert("Payment Failed. Try Again")}
                  />
                </div>
              )}
            </div>
          </div>
        </form>
      </div>

      {/* Right Section */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-lg mb-4">Order Summary</h3>
        <div className="border-t py-4 mb-4">
          {cart.products.map((product, index) => (
            <div
              key={index}
              className="flex items-start justify-between py-2 border-b"
            >
              <div className="flex items-start">
                <img
                  src={getProductImageForUI(product)}
                  alt={product.name}
                  className="w-20 h-24 object-cover mr-4"
                />
                <div>
                  <h3 className="text-md ">{product.name}</h3>
                  <p className="text-gray-500">Size:{product.size}</p>
                  <p className="text-gray-500">Color:{product.color}</p>
                </div>
              </div>
              <p className="text-xl">${product.price?.toLocaleString()}</p>
            </div>
          ))}
        </div>

        <div className="flex justify-between items-center text-lg mb-4">
          <p>Subtotal</p>
          <p>${cart.totalPrice?.toLocaleString()}</p>
        </div>
        <div className="flex justify-between items-center text-lg">
          <p>Shipping</p>
          <p>Free</p>
        </div>
        <div className="flex justify-between items-center text-lg mt-4 border-t pt-4">
          <p>Total</p>
          <p>${cart.totalPrice?.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
