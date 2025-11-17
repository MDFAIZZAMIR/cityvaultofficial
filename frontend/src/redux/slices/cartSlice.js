// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";
// import { use } from "react";
// // Helper function to laod cart from localStorage
// const localCartFromStorage = () => {
//   const storedCart = localStorage.getItem("cart");
//   return storedCart ? JSON.parse(storedCart) : { products: [] };
// };

// // Helper Function to save Cart to localStorage
// const saveCartToStorage = (cart) => {
//   localStorage.setItem("cart", JSON.stringify(cart));
// };

// // Fetch cart for a user or Guest
// export const fetchCart = createAsyncThunk(
//   "cart/fetchCart",
//   async ({ userId, guestId }, { rejectWithValue }) => {
//     try {
//       const response = await axios.get(
//         `${import.meta.env.VITE_BACKEND_URL}/api/cart`,
//         {
//           params: { userId, guestId },
//         }
//       );
//       return response.data;
//     } catch (error) {
//       console.error(error);
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

// // Fetch cart for a user or Guest
// export const addtoCart = createAsyncThunk(
//   "cart/addToCart",
//   async (
//     { productId, quantity, size, color, guestId, userId },
//     { rejectWithValue }
//   ) => {
//     try {
//       const response = await axios.post(
//         `${impport.meta.env.VITE_BACKEND_URL}/api/cart`,
//         {
//           productId,
//           quantity,
//           size,
//           color,
//           guestId,
//           userId,
//         }
//       );
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

// //Update the quantity of an item in the cart
// export const updateCartItemQuantity = createAsyncThunk(
//   "cart/updateCartItemQuantity",
//   async (
//     { productId, quantity, guestId, userId, size, color },
//     { rejectWithValue }
//   ) => {
//     try {
//       const response = await axios.put(
//         `${import.meta.env.VITE_BACKEND_URL}/api/cart`,
//         {
//           productId,
//           quantity,
//           guestId,
//           userId,
//           size,
//           color,
//         }
//       );
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

// // Remove an item from the cart
// export const removeFromCart = createAsyncThunk(
//   "cart/removeFromCart",
//   async ({ productId, guestId, userId, size, color }, { rejectWithValue }) => {
//     try {
//       const response = await axios({
//         method: "DELETE",
//         url: `${import.meta.env.VITE_BACKEND_URL}/api/cart`,
//         data: { productId, guestId, userId, size, color },
//       });
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

// // Merge guest Cart into user Cart
// export const mergeCart = createAsyncThunk(
//   "cart/mergeCart",
//   async ({ guestId, user }, { rejectWithValue }) => {
//     try {
//       const response = await axios.post(
//         `${import.meta.env.VITE_BACKEND_URL}/api/cart/merge`,
//         { guestId, user },
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("userToken")}`,
//           },
//         }
//       );
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

// const cartSlice = createSlice({
//   name: "cart",
//   initialState: {
//     cart: localCartFromStorage(),
//     loading: false,
//     error: null,
//   },
//   reducers: {
//     clearCart: (state) => {
//       state.cart = { products: [] };
//       localStorage.removeItem("cart");
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchCart.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchCart.fulfilled, (state, action) => {
//         state.loading = true;
//         state.cart = action.payload;
//         saveCartToStorage(action.payload);
//       })
//       .addCase(fetchCart.rejected, (state, action) => {
//         state.loading = true;
//         state.error = action.error.message || "Failed to Fetch cart";
//       })

//       .addCase(addtoCart.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(addtoCart.fulfilled, (state, action) => {
//         state.loading = true;
//         state.cart = action.payload;
//         saveCartToStorage(action.payload);
//       })
//       .addCase(addtoCart.rejected, (state, action) => {
//         state.loading = true;
//         state.error = action.payload?.message || "Failed to add to cart";
//       })

//       .addCase(updateCartItemQuantity.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(updateCartItemQuantity.fulfilled, (state, action) => {
//         state.loading = true;
//         state.cart = action.payload;
//         saveCartToStorage(action.payload);
//       })
//       .addCase(updateCartItemQuantity.rejected, (state, action) => {
//         state.loading = true;
//         state.error =
//           action.payload?.message || "Failed to update item Quantity";
//       })

//       .addCase(removeFromCart.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(removeFromCart.fulfilled, (state, action) => {
//         state.loading = true;
//         state.cart = action.payload;
//         saveCartToStorage(action.payload);
//       })
//       .addCase(removeFromCart.rejected, (state, action) => {
//         state.loading = true;
//         state.error =
//           action.payload?.message || "Failed to remove item Quantity";
//       })

//       .addCase(mergeCart.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(mergeCart.fulfilled, (state, action) => {
//         state.loading = true;
//         state.cart = action.payload;
//         saveCartToStorage(action.payload);
//       })
//       .addCase(mergeCart.rejected, (state, action) => {
//         state.loading = true;
//         state.error = action.payload?.message || "Failed to merge Cart";
//       });
//   },
// });

// export const { clearCart } = cartSlice.actions;
// export default cartSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Helper function to load cart from localStorage
const localCartFromStorage = () => {
  try {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : { products: [] };
  } catch (err) {
    console.error("Failed to parse cart from localStorage:", err);
    return { products: [] };
  }
};

// Helper Function to save Cart to localStorage
const saveCartToStorage = (cart) => {
  try {
    localStorage.setItem("cart", JSON.stringify(cart));
  } catch (err) {
    console.error("Failed to save cart to localStorage:", err);
  }
};

// Safe error extractor
const extractErrorMessage = (error) => {
  // axios error shape: error.response?.data || error.message
  if (!error) return "Unknown error";
  if (error?.response?.data?.message) return error.response.data.message;
  if (error?.response?.data) return error.response.data;
  if (error?.message) return error.message;
  return String(error);
};

// Validate backend url early (optional console warning)
if (!import.meta.env.VITE_BACKEND_URL) {
  console.warn("VITE_BACKEND_URL is not defined in import.meta.env");
}

/* -------------------- Thunks -------------------- */

// Fetch cart for a user or Guest
export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async ({ userId, guestId }, { rejectWithValue }) => {
    try {
      const url = `${import.meta.env.VITE_BACKEND_URL}/api/cart`;
      const response = await axios.get(url, { params: { userId, guestId } });
      return response.data;
    } catch (error) {
      console.error("fetchCart error:", error);
      return rejectWithValue(extractErrorMessage(error));
    }
  }
);

// Add to cart
export const addtoCart = createAsyncThunk(
  "cart/addToCart",
  async ({ productId, quantity, size, color, guestId, userId }, { rejectWithValue }) => {
    try {
      const url = `${import.meta.env.VITE_BACKEND_URL}/api/cart`;
      const response = await axios.post(url, {
        productId,
        quantity,
        size,
        color,
        guestId,
        userId,
      });
      return response.data;
    } catch (error) {
      console.error("addtoCart error:", error);
      return rejectWithValue(extractErrorMessage(error));
    }
  }
);

// Update quantity
export const updateCartItemQuantity = createAsyncThunk(
  "cart/updateCartItemQuantity",
  async ({ productId, quantity, guestId, userId, size, color }, { rejectWithValue }) => {
    try {
      const url = `${import.meta.env.VITE_BACKEND_URL}/api/cart`;
      const response = await axios.put(url, {
        productId,
        quantity,
        guestId,
        userId,
        size,
        color,
      });
      return response.data;
    } catch (error) {
      console.error("updateCartItemQuantity error:", error);
      return rejectWithValue(extractErrorMessage(error));
    }
  }
);

// Remove item
export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async ({ productId, guestId, userId, size, color }, { rejectWithValue }) => {
    try {
      const url = `${import.meta.env.VITE_BACKEND_URL}/api/cart`;
      const response = await axios({
        method: "DELETE",
        url,
        data: { productId, guestId, userId, size, color },
      });
      return response.data;
    } catch (error) {
      console.error("removeFromCart error:", error);
      return rejectWithValue(extractErrorMessage(error));
    }
  }
);

// Merge guest Cart into user Cart
export const mergeCart = createAsyncThunk(
  "cart/mergeCart",
  async ({ guestId, user }, { rejectWithValue }) => {
    try {
      const url = `${import.meta.env.VITE_BACKEND_URL}/api/cart/merge`;
      const response = await axios.post(
        url,
        { guestId, user },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("mergeCart error:", error);
      return rejectWithValue(extractErrorMessage(error));
    }
  }
);

/* -------------------- Slice -------------------- */

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: localCartFromStorage(),
    loading: false,
    error: null,
  },
  reducers: {
    clearCart: (state) => {
      state.cart = { products: [] };
      saveCartToStorage(state.cart);
      localStorage.removeItem("cart");
    },
  },
  extraReducers: (builder) => {
    builder
      /* fetchCart */
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false; // <- false (fix)
        state.cart = action.payload;
        saveCartToStorage(action.payload);
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false; // <- false (fix)
        state.error = action.payload || action.error?.message || "Failed to fetch cart";
      })

      /* addToCart */
      .addCase(addtoCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addtoCart.fulfilled, (state, action) => {
        state.loading = false; // <- false (fix)
        state.cart = action.payload;
        saveCartToStorage(action.payload);
      })
      .addCase(addtoCart.rejected, (state, action) => {
        state.loading = false; // <- false (fix)
        state.error = action.payload || action.error?.message || "Failed to add to cart";
      })

      /* updateCartItemQuantity */
      .addCase(updateCartItemQuantity.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCartItemQuantity.fulfilled, (state, action) => {
        state.loading = false; // <- false (fix)
        state.cart = action.payload;
        saveCartToStorage(action.payload);
      })
      .addCase(updateCartItemQuantity.rejected, (state, action) => {
        state.loading = false; // <- false (fix)
        state.error = action.payload || action.error?.message || "Failed to update item quantity";
      })

      /* removeFromCart */
      .addCase(removeFromCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.loading = false; // <- false (fix)
        state.cart = action.payload;
        saveCartToStorage(action.payload);
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.loading = false; // <- false (fix)
        state.error = action.payload || action.error?.message || "Failed to remove item";
      })

      /* mergeCart */
      .addCase(mergeCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(mergeCart.fulfilled, (state, action) => {
        state.loading = false; // <- false (fix)
        state.cart = action.payload;
        saveCartToStorage(action.payload);
      })
      .addCase(mergeCart.rejected, (state, action) => {
        state.loading = false; // <- false (fix)
        state.error = action.payload || action.error?.message || "Failed to merge cart";
      });
  },
});

export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer;
