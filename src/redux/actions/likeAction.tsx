import { appAxios } from "../apiConfig"
import { addLikedComment, addLikedReel, addLikedReply } from "../reducers/likeSlice";

export const toggleLikeReel = (id: string, likesCount: number) => async (dispatch: any) => {
  try {
    console.log(`/like/reel/${id}`);
    const res = await appAxios.post(`/like/reel/${id}`);
    console.log("🚀 ~ toggleLikeReel ~ res:", JSON.stringify(res.data, null, 2))
    const data = {
      id: id,
      isLiked: res.data.msg === 'Unliked' ? false : true,
      likesCount: res.data.msg === 'Unliked' ? likesCount - 1 : likesCount + 1
    }
    dispatch(addLikedReel(data));

  } catch (error) {
    console.log("🚀 ~ toggleLikeReel ~ error:", error)
  }
}

export const getListLikes = (data: any, searchQuery: string) => async (dispatch: any) => {
  try {
    const res = await appAxios.get(
      `/like?entityId=${data?.entityId}&type=${data?.type}&searchQuery=${searchQuery}`
    );
    return res.data;
  } catch (error) {
    console.log("🚀 ~ getListLikes ~ error:", error);
    return [];
  }
}

export const toggleLikeComment = (id: string, likesCount: number) => async (dispatch: any) => {
  try {
    console.log(`/like/reel/${id}`);
    const res = await appAxios.post(`/like/comment/${id}`);
    const data = {
      id: id,
      isLiked: res.data.msg === 'Unliked' ? false : true,
      likesCount: res.data.msg === 'Unliked' ? likesCount - 1 : likesCount + 1
    }
    dispatch(addLikedComment(data));
  } catch (error) {
    console.log("🚀 ~ toggleLikeComment ~ error:", error)
  }
}

export const toggleLikeReply = (id: string, likesCount: number) => async (dispatch: any) => {
  try {
    const res = await appAxios.post(`/like/reply/${id}`);
    const data = {
      id: id,
      isLiked: res.data.msg === 'Unliked' ? false : true,
      likesCount: res.data.msg === 'Unliked' ? likesCount - 1 : likesCount + 1
    }
    dispatch(addLikedReply(data));
  } catch (error) {
    console.log("🚀 ~ toggleLikeReply ~ error:", error)
  }
}