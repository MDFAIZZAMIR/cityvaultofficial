import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// import { response } from "express";
// import { build } from "vite";

// fetch all users (admin-only)
export const fetchUsers = createAsyncThunk("admin/fetchUsers", async () => {
  const response = await axios.get(
    `${import.meta.env.VITE_BACKEND_URL}/api/admin/users`,
    {
      headers: { Authorization: `Bearer ${localStorage.getItem("userToken")}` },
    }
  );
  return response.data;
});

// Add the create user Action
export const addUser = createAsyncThunk(
  "admin/addUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/users`,
        userData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Update user Info
export const updateUser = createAsyncThunk(
  "admin/updateUser",
  async ({ id, name, email, role }) => {
    const response = await axios.put(
      `${import.meta.env.VITE_BACKEND_URL}/api/admin/users/${id}`,
      { name, email, role },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      }
    );
    return response.data.user;
  }
);

// Delete a user
export const deleteUser = createAsyncThunk("admin/deleteUser", async (id) => {
  await axios.delete(
    `${import.meta.env.VITE_BACKEND_URL}/api/admin/users/${id}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
      },
    }
  );
  return id;
});

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    users: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => { 
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(updateUser.fulfilled, (state, action) => {
        const updatedUser = action.payload;

        const userIndex = state.users.findIndex(
          (user) => user._id === updatedUser._id
        );
        if (userIndex !== -1) {
          state.users[userIndex] = updatedUser;
        }
      })

      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter((user) => user._id !== action.payload);
      })
      .addCase(addUser.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users.push(action.payload.user);
      })
      .addCase(addUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      });
  },
});

export default adminSlice.reducer

// redux/slices/adminSlice.js
// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// const API_BASE = import.meta.env.VITE_BACKEND_URL || "";

// // fetch all users (admin-only)
// export const fetchUsers = createAsyncThunk(
//   "admin/fetchUsers",
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await axios.get(`${API_BASE}/api/admin/users`, {
//         headers: { Authorization: `Bearer ${localStorage.getItem("userToken")}` },
//       });
//       const payload = response.data?.users ?? response.data ?? [];
//       return Array.isArray(payload) ? payload : [];
//     } catch (err) {
//       return rejectWithValue(err.response?.data ?? { message: err.message });
//     }
//   }
// );

// // Add (create) user
// export const addUser = createAsyncThunk(
//   "admin/addUser",
//   async (userData, { rejectWithValue }) => {
//     try {
//       const response = await axios.post(`${API_BASE}/api/admin/users`, userData, {
//         headers: { Authorization: `Bearer ${localStorage.getItem("userToken")}` },
//       });
//       const newUser = response.data?.user ?? response.data;
//       return newUser;
//     } catch (err) {
//       return rejectWithValue(err.response?.data ?? { message: err.message });
//     }
//   }
// );

// // Update user Info
// export const updateUser = createAsyncThunk(
//   "admin/updateUser",
//   async ({ id, name, email, role }, { rejectWithValue }) => {
//     try {
//       const response = await axios.put(
//         `${API_BASE}/api/admin/users/${id}`,
//         { name, email, role },
//         { headers: { Authorization: `Bearer ${localStorage.getItem("userToken")}` } }
//       );
//       const updated = response.data?.user ?? response.data;
//       return updated;
//     } catch (err) {
//       return rejectWithValue(err.response?.data ?? { message: err.message });
//     }
//   }
// );

// // Delete a user
// export const deleteUser = createAsyncThunk(
//   "admin/deleteUser",
//   async (id, { rejectWithValue }) => {
//     try {
//       await axios.delete(`${API_BASE}/api/admin/users/${id}`, {
//         headers: { Authorization: `Bearer ${localStorage.getItem("userToken")}` },
//       });
//       return id;
//     } catch (err) {
//       return rejectWithValue(err.response?.data ?? { message: err.message });
//     }
//   }
// );

// const adminSlice = createSlice({
//   name: "admin",
//   initialState: {
//     users: [],
//     loading: false,
//     error: null,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       // fetchUsers
//       .addCase(fetchUsers.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchUsers.fulfilled, (state, action) => {
//         state.loading = false;
//         state.users = Array.isArray(action.payload) ? action.payload : [];
//       })
//       .addCase(fetchUsers.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload?.message ?? action.error?.message ?? "Failed to fetch users";
//         state.users = state.users || [];
//       })

//       // updateUser
//       .addCase(updateUser.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(updateUser.fulfilled, (state, action) => {
//         state.loading = false;
//         const updatedUser = action.payload;
//         if (!updatedUser) return;
//         const idToMatch = updatedUser._id ?? updatedUser.id;
//         const idx = state.users.findIndex((u) => u._id === idToMatch || u.id === idToMatch);
//         if (idx !== -1) state.users[idx] = { ...state.users[idx], ...updatedUser };
//       })
//       .addCase(updateUser.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload?.message ?? action.error?.message;
//       })

//       // deleteUser
//       .addCase(deleteUser.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(deleteUser.fulfilled, (state, action) => {
//         state.loading = false;
//         const id = action.payload;
//         state.users = state.users.filter((u) => u._id !== id && u.id !== id);
//       })
//       .addCase(deleteUser.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload?.message ?? action.error?.message;
//       })

//       // addUser
//       .addCase(addUser.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(addUser.fulfilled, (state, action) => {
//         state.loading = false;
//         const newUser = action.payload;
//         if (newUser) state.users.push(newUser);
//       })
//       .addCase(addUser.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload?.message ?? action.error?.message;
//       });
//   },
// });

// export default adminSlice.reducer;

