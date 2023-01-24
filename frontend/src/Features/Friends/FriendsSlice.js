import { createSlice } from "@reduxjs/toolkit";

const FriendsSlice = createSlice({
    name: "friends",
    initialState: {
        friends: {
            friends: [],
            requests: []
        },
        friendsInitialized: false,
    },
    reducers: {
        setFriends: (state, action) => {
            state.friends = action.payload.friends;
            state.friendsInitialized = true;
        }
    }
})

export const { setFriends } = FriendsSlice.actions;

export default FriendsSlice.reducer;
