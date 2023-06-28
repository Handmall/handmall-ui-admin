import { LoginResponse } from "@/types/auth/LoginResponse";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface AuthState {
    user: LoginResponse | null;
}

const initialState: AuthState = {
    user: null,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<LoginResponse>) => {
            state.user = action.payload;
        },
        logout: () => initialState,
    },
});

export const { setUser, logout } = userSlice.actions;

export default userSlice.reducer;
