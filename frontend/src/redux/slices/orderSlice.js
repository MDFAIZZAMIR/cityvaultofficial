// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// // Async Thunk to fetch user orders
// export const fetchUserOrders = createAsyncThunk(
//   "orders/fetchUserOrders",
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await axios.get(
//         `${import.meta.env.VITE_BACKEND_URL}/api/orders/my-orders`,
//         {
//           headers: {
//             headers: {
//               Authorization: `Bearer ${localStorage.getItem("userToken")}`,
//             },
//           },
//         }
//       );
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

// // Async thunk to fetch orders details by ID
// export const fetchOrderDetails = createAsyncThunk(
//   "orders/fetchOrderDetails",
//   async (orderId, { rejectWithValue }) => {
//     try {
//       const response = await axios.get(
//         `${import.meta.env.VITE_BACKEND_URL}/api/orders/${orderId}`,
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

// const orderSlice = createSlice({
//   name: "orders",
//   initialState: {
//     orders: [],
//     totalOrders: 0,
//     orderDetails:null,
//     loading: false,
//     error: null,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       // Fetch user Orders
//       .addCase(fetchUserOrders.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchUserOrders.fulfilled, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })
//       .addCase(fetchUserOrders.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload.message;
//       })
//       .addCase(fetchOrderDetails.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchOrderDetails.fulfilled, (state, action) => {
//         state.loading = false;
//         state.orderDetails = action.payload;
//       })
//       .addCase(fetchOrderDetails.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload.message;
//       });
//   },
// });

// export default orderSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async Thunk to fetch user orders
export const fetchUserOrders = createAsyncThunk(
  "orders/fetchUserOrders",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/orders/my-orders`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      // safe guard in case error.response is undefined
      return rejectWithValue(error.response?.data ?? { message: error.message });
    }
  }
);

// Async thunk to fetch orders details by ID
export const fetchOrderDetails = createAsyncThunk(
  "orders/fetchOrderDetails",
  async (orderId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/orders/${orderId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data ?? { message: error.message });
    }
  }
);

const orderSlice = createSlice({
  name: "orders",
  initialState: {
    orders: [],
    totalOrders: 0,
    orderDetails: null,
    loading: false,
    error: null,
  },
  reducers: {
    // optionally add reducers to set orderDetails or clear errors etc.
    clearOrderDetails(state) {
      state.orderDetails = null;
    },
    clearOrdersError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch user Orders
      .addCase(fetchUserOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserOrders.fulfilled, (state, action) => {
        state.loading = false;
        // assume backend returns { orders: [...], total: N } or maybe an array directly;
        // adapt depending on API: handle both shapes:
        if (Array.isArray(action.payload)) {
          state.orders = action.payload;
          state.totalOrders = action.payload.length;
        } else if (action.payload?.orders) {
          state.orders = action.payload.orders;
          state.totalOrders = action.payload.total ?? action.payload.orders.length;
        } else {
          state.orders = action.payload;
        }
        state.error = null;
      })
      .addCase(fetchUserOrders.rejected, (state, action) => {
        state.loading = false;
        // fallback to action.error if action.payload missing
        state.error = action.payload?.message ?? action.error?.message ?? "Failed to fetch orders";
      })
      // Order details
      .addCase(fetchOrderDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrderDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.orderDetails = action.payload;
        state.error = null;
      })
      .addCase(fetchOrderDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message ?? action.error?.message ?? "Failed to fetch order details";
      });
  },
});

export const { clearOrderDetails, clearOrdersError } = orderSlice.actions;
export default orderSlice.reducer;

