import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

interface LikedReel {
  id: string;
  isLiked: boolean;
  likesCount: number;
}

interface LikeState {
  LikedReel: LikedReel[];
}

const initialState: LikeState = {
  LikedReel: [],
}

export const likesSlice = createSlice({
  name: 'like',
  initialState,
  reducers: {
    addLikedReel: (state, action: PayloadAction<LikedReel>) => {
      console.log('add liked reel called');
      const index = state.LikedReel.findIndex(
        (user) => user.id === action.payload.id
      );
      if (index !== -1) {
        state.LikedReel[index] = action.payload;
      } else {
        state.LikedReel.push(action.payload);
      }
      console.log('here is like state:', initialState)
    }
  }
})

export const { addLikedReel } = likesSlice.actions;
export const selectLikedReel = (state: RootState) => state.like.LikedReel;
export default likesSlice.reducer;
