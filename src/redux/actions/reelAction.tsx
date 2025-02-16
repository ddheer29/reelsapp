import { appAxios } from "../apiConfig";
import { refetchUser } from "./userAction";

export const createReel = (data: any) => async (dispatch: any) => {
  try {
    const res = await appAxios.post('/reel', data);
    dispatch(refetchUser());
  } catch (error) {
    console.log("🚀 ~ createReel ~ error:", error);
  }
}

export const fetchFeedReel = (
  offset: number,
  limit: number,
) => async (dispatch: any) => {
  try {
    const res = await appAxios.get(`/feed/home?limit=${limit || 25}/offset=${offset}`);
    return res.data.reels || [];
  } catch (error) {
    console.log("🚀 ~ )=> ~ error:", error)
  }
}