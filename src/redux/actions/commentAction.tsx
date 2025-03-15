import { appAxios } from "../apiConfig";
import { addComment } from "../reducers/commentSlice";

export const getComments = (reelId: string, offset: number) => async (dispatch: any) => {
  try {
    const res = await appAxios.get(`/comment?reelId=${reelId}&limit=5&offset=${offset}`);
    return res.data || [];
  } catch (error) {
    console.log("🚀 ~ getComments ~ error:", error);
    return [];
  }
};

export const postComment = (data: any, commentsCount: number) => async (dispatch: any) => {
  try {
    const res = await appAxios.post(`/comment`, data);
    dispatch(addComment({ reelId: data?.reelId, commentsCount: commentsCount + 1 }));
    return res.data;
  } catch (error) {
    console.log("🚀 ~ postComment ~ error:", error)
  }
};

export const getReplies = (commentId: string, offset: number) => async (dispatch: any) => {
  try {
    const res = await appAxios.get(`/reply?commentId=${commentId}&limit=2&offset=${offset}`);
    return res.data || [];
  } catch (error) {
    console.log("🚀 ~ getReplies ~ error:", error)
    return [];
  }
};

export const postReply = (data: any, commentsCount: number) => async (dispatch: any) => {
  try {
    const res = await appAxios.post(`/reply`, data);
    dispatch(addComment({ reelId: data?.reelId, commentsCount: commentsCount + 1 }));
    return res.data;
  } catch (error) {
    console.log("🚀 ~ postReply ~ error:", error)
  }
};