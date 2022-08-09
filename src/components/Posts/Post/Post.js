import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  CardMedia,
  ButtonBase,
} from "@material-ui/core";
import moment from "moment";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbUpAltOutlined from "@mui/icons-material/ThumbUpAltOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Alert from "@mui/material/Alert";
import { useNavigate } from "react-router-dom";

import useStyles from "./styles";
import { deletePost, likePost } from "../../../actions/posts";

const Post = ({ post, setCurrentId }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem("profile"));
  const navigate = useNavigate();
  const [likes, setLikes] = useState(post?.likes);
  const [showAlert, setShowAlert] = useState(false);

  const hasLikedPost = likes.find((like) => like === user?.result?._id);
  const handleLike = async () => {
    dispatch(likePost(post._id));

    if (hasLikedPost) {
      setLikes(post.likes.filter((id) => id !== user?.result?._id));
    } else {
      setLikes([...post.likes, user?.result?._id]);
    }
  };

  const Likes = () => {
    if (likes.length > 0) {
      return hasLikedPost ? (
        <>
          <ThumbUpAltIcon fontSize="small" /> &nbsp;
          {likes.length > 2
            ? `You and ${likes.length - 1} others`
            : `${likes.length} like${likes.length > 1 ? "s" : ""}`}
        </>
      ) : (
        <>
          <ThumbUpAltOutlined fontSize="small" /> &nbsp;{likes.length}{" "}
          {likes.length === 1 ? "Like" : "Likes"}
        </>
      );
    }
    return (
      <>
        <ThumbUpAltOutlined fontSize="small" />
        &nbsp;Like
      </>
    );
  };

  const openPost = () => {
    navigate(`/posts/${post._id}`);
  };

  return (
    <div>
      {showAlert && (
        <Alert
          className={classes.deleteAlert}
          severity="error"
          onClose={() => {
            setShowAlert(false);
          }}
        >
          Deleted post successfully.
        </Alert>
      )}
      <Card className={classes.card} raised elevation={6}>
        <ButtonBase className={classes.cardAction} onClick={openPost}>
          <CardMedia
            className={classes.media}
            image={
              post.selectedFile ||
              "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
            }
            title={post.title}
          />
          <div className={classes.overlay}>
            <Typography variant="h6">{post.name}</Typography>
            <Typography variant="body2">
              {moment(post.createdAt).fromNow()}
            </Typography>
          </div>
          {user?.result?._id === post?.creator && (
            <div className={classes.overlay2} name="edit">
              <Button
                style={{ color: "white" }}
                size="small"
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentId(post._id);
                }}
              >
                <MoreHorizIcon fontSize="default" />
              </Button>
            </div>
          )}

          <div className={classes.details}>
            <Typography variant="body2" color="textSecondary">
              {post.tags.map((tag) => `#${tag} `)}
            </Typography>
          </div>
          <Typography className={classes.title} variant="h5" gutterBottom>
            {post.title}
          </Typography>
          <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">
              {post.message}
            </Typography>
          </CardContent>
        </ButtonBase>
        <CardActions className={classes.cardActions}>
          <Button
            size="small"
            color="primary"
            disabled={!user?.result}
            onClick={handleLike}
          >
            <Likes />
          </Button>
          {user?.result?._id === post?.creator && (
            <Button
              size="small"
              color="secondary"
              onClick={() => {
                dispatch(deletePost(post._id));
                setShowAlert(true);
              }}
            >
              <DeleteIcon fontSize="small" />
              Delete
            </Button>
          )}
        </CardActions>
      </Card>
    </div>
  );
};
export default Post;
