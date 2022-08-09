import { AUTH } from "../constants/actionTypes";
import * as api from "../api/index";

export const signin =
  (formdata, history, setError, setErrorMsg) => async (dispatch) => {
    try {
      // sign in user
      const { data } = await api.signin(formdata);
      dispatch({ type: AUTH, data });
      history("/");
    } catch (err) {
      console.log(err);
      setError(true);
      setErrorMsg(err.response.data.message);
    }
  };
export const signup =
  (formdata, history, setError, setErrorMsg) => async (dispatch) => {
    try {
      // sign up user
      const { data } = await api.signup(formdata);

      dispatch({ type: AUTH, data });
      history("/");
    } catch (err) {
      console.log(err);
      setError(true);
      setErrorMsg(err.response.data.message);
    }
  };
