import {
  FETCH_ALL,
  CREATE,
  DELETE,
  LIKEPOST,
  UPDATE,
  FETCH_BY_SEARCH,
  START_LOADING,
  END_LOADING,
  FETCH_POST,
  COMMENT,
} from "../constants/actionTypes";
import * as api from "../api";

export const getPost = (id) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.fetchPost(id);
    dispatch({ type: FETCH_POST, payload: data }); // dispatch action of type fetch_all and payload of data
    dispatch({ type: END_LOADING });
  } catch (err) {
    console.log(err);
  }
};

// Action creators are func that returns an action
export const getPosts = (page) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.fetchPosts(page);
    dispatch({ type: FETCH_ALL, payload: data }); // dispatch action of type fetch_all and payload of data
    dispatch({ type: END_LOADING });
  } catch (err) {
    console.log(err);
  }
};

export const getPostsBySearch = (searchQuery) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const {
      data: { data },
    } = await api.fetchPostsBySearch(searchQuery);
    dispatch({ type: FETCH_BY_SEARCH, payload: data });
    dispatch({ type: END_LOADING });
  } catch (err) {
    console.log(err);
  }
};

export const createPost =
  (post, setShowAlert, setErrorMsg, setAlertSeverity) => async (dispatch) => {
    try {
      dispatch({ type: START_LOADING });
      const { data } = await api.createPost(post);

      dispatch({ type: CREATE, payload: data });
      dispatch({ type: END_LOADING });
      setShowAlert(true);
      setErrorMsg("Created post successfully.");
      setAlertSeverity("success");
    } catch (err) {
      console.error(err);
      setShowAlert(true);
      setErrorMsg(err.response.data.message);
      setAlertSeverity("error");
    }
  };

export const updatePost =
  (id, post, setShowAlert, setErrorMsg, setAlertSeverity) =>
  async (dispatch) => {
    try {
      const { data } = await api.updatePost(id, post);

      dispatch({ type: UPDATE, payload: data });
      setShowAlert(true);
      setErrorMsg("Updated post successfully.");
      setAlertSeverity("success");
    } catch (err) {
      console.error(err);
      setShowAlert(true);
      setErrorMsg(err.response.data.message);
      setAlertSeverity("error");
    }
  };

export const deletePost = (id) => async (dispatch) => {
  try {
    await api.deletePost(id);

    dispatch({ type: DELETE, payload: id });
  } catch (err) {
    console.error(err);
  }
};

export const likePost = (id) => async (dispatch) => {
  try {
    const { data } = await api.likePost(id);

    dispatch({ type: LIKEPOST, payload: data });
  } catch (err) {
    console.error(err);
  }
};

export const commentPost = (value, id) => async (dispatch) => {
  try {
    const { data } = await api.commentPost(value, id);

    dispatch({ type: COMMENT, payload: data });
    return data.comments;
  } catch (err) {
    console.log(err);
  }
};
