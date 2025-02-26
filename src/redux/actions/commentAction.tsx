import { appAxios } from "../apiConfig";

export const getComments = (reelId: string, offset: number) => async (dispatch: any) => {
  try {
    const res = await appAxios.get(`/comment?reelId=${reelId}&limit=5&offset=${offset}`);
    return res.data || [];
  } catch (error) {
    console.log("🚀 ~ getComments ~ error:", error);
    return [];
  }
};
