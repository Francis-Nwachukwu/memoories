import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

import { TextField, Button, Typography, Paper } from "@material-ui/core";
import Alert from "@mui/material/Alert";

import useStyles from "./styles";
import { createPost, updatePost } from "../../actions/posts";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(10%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const Form = ({ currentId, setCurrentId }) => {
  const [postData, setPostData] = useState({
    title: "",
    message: "",
    tags: "",
    image: "",
  });
  const [showAlert, setShowAlert] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("success");

  const classes = useStyles();
  const post = useSelector((state) =>
    currentId ? state.posts.posts.find((p) => p._id === currentId) : null
  ); // fetching data from redux
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));

  useEffect(() => {
    if (post) setPostData(post);
  }, [post]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formdata = new FormData();

    formdata.append("title", postData?.title);
    formdata.append("message", postData?.message);
    formdata.append("tags", postData?.tags);
    formdata.append("image", postData?.image);

    if (currentId === null) {
      dispatch(
        createPost(formdata, setShowAlert, setErrorMsg, setAlertSeverity)
      );
    } else {
      dispatch(
        updatePost(
          currentId,
          formdata,
          setShowAlert,
          setErrorMsg,
          setAlertSeverity
        )
      );
    }
    setShowAlert(false);
    setErrorMsg("");
    clear();
  };
  const clear = () => {
    setCurrentId(null);
    setPostData({
      title: "",
      message: "",
      tags: "",
      image: "",
    });
  };

  if (!user?.result?.name) {
    return (
      <Paper className={classes.paper}>
        <Typography variant="h6" align="center">
          Please Sign in to create your own memories and like other's memories.
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper className={classes.paper} elevation={6}>
      {showAlert ? (
        <Alert
          severity={alertSeverity}
          onClose={() => {
            setShowAlert(false);
          }}
        >
          {errorMsg}
        </Alert>
      ) : null}
      <form
        autoComplete="off"
        noValidate
        className={`${classes.root} ${classes.form}`}
        onSubmit={handleSubmit}
      >
        <Typography variant="h6">
          {currentId ? "Editing" : "Create"} a Vacation center
        </Typography>
        <TextField
          name="title"
          variant="outlined"
          label="title"
          fullWidth
          value={postData.title}
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
        />
        <TextField
          name="message"
          variant="outlined"
          label="message"
          minRows={4}
          multiline
          fullWidth
          value={postData.message}
          onChange={(e) =>
            setPostData({ ...postData, message: e.target.value })
          }
        />
        <TextField
          name="tags"
          variant="outlined"
          label="tags"
          placeholder="E.g, football,nice,happy new year,christmas"
          fullWidth
          value={postData.tags}
          onChange={(e) =>
            setPostData({ ...postData, tags: e.target.value.split(",") })
          }
        />
        <div className={classes.fileInput}>
          <Button
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            startIcon={<CloudUploadIcon />}
          >
            Upload file
            <input
              hidden
              type="file"
              onChange={(e) =>
                setPostData({
                  ...postData,
                  image: e.target.files[0],
                })
              }
            />
            <VisuallyHiddenInput type="file" />
          </Button>
          <p>{postData?.image?.name}</p>
        </div>
        {/* <div className={classes.fileInput}>
          <input
            hidden
            type="file"
            onChange={(e) =>
              setPostData({
                ...postData,
                image: e.target.files[0],
              })
            }
          />
        </div> */}
        <Button
          className={classes.buttonSubmit}
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          fullWidth
        >
          Submit
        </Button>
        <Button
          variant="contained"
          color="secondary"
          size="small"
          onClick={clear}
          fullWidth
        >
          clear
        </Button>
      </form>
    </Paper>
  );
};
export default Form;
