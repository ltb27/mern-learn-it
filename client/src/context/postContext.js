import { createContext, useReducer, useState } from "react";
import { postReducer } from "../reducers/postReducer";
import axios from "axios";

import {
  apiUrl,
  POST_LOADED_SUCCESS,
  POST_LOADED_FAIL,
  ADD_POST,
  DELETE_POST,
} from "./constant";

export const PostContext = createContext();

const PostContextProvider = ({ children }) => {
  // global state
  const [postState, dispatch] = useReducer(postReducer, {
    posts: [],
    postLoading: true,
  });

  const [showAddPostModal, setShowAddPostModal] = useState(false);
  const [showToast, setShowToast] = useState({
    show: false,
    message: null,
    type: null,
  });

  const getPosts = async () => {
    try {
      const response = await axios.get(`${apiUrl}/posts`);
      if (response.data.success) {
        dispatch({
          type: POST_LOADED_SUCCESS,
          payload: response.data.posts,
        });
      }
    } catch (error) {
      dispatch({ type: POST_LOADED_FAIL });
    }
  };

  // add Post
  const addPost = async (newPost) => {
    try {
      const response = await axios.post(`${apiUrl}/posts`, newPost);
      if (response.data.success) {
        dispatch({ type: ADD_POST, payload: response.data.post });
        return response.data;
      }
    } catch (error) {
      return error.response.data
        ? error.response.data
        : { success: false, message: "server error" };
    }
  };
  // delete post

  const deletePost = async (postId) => {
    try {
      const response = await axios.delete(`${apiUrl}/posts/${postId}`);
      if (response.data.success) {
        dispatch({ type: DELETE_POST, payload: postId });
      }
    } catch (error) {
      console.log(error);
    }
  };

  // update Post
  const updatePost = async (updatedPost) => {
    try {
      const reponse = await axios.put(`${apiUrl}`);
    } catch (error) {}
  };

  const postContextData = {
    getPosts,
    postState,
    showAddPostModal,
    setShowAddPostModal,
    addPost,
    showToast,
    setShowToast,
    deletePost,
  };
  return (
    <PostContext.Provider value={postContextData}>
      {children}
    </PostContext.Provider>
  );
};

export default PostContextProvider;