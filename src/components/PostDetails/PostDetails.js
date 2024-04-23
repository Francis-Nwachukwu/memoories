import React, { useEffect } from "react";
import {
  Paper,
  Typography,
  CircularProgress,
  Divider,
  Card,
  CardContent,
  CardMedia,
  ButtonBase,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { useParams, useNavigate } from "react-router-dom";

import useStyles from "./styles";
import CommentSection from "./CommentSection";
import { getPost, getPostsBySearch } from "../../actions/posts";

const Postdetails = () => {
  const { post, posts, isLoading } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const classes = useStyles();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getPost(id));
  }, [id, dispatch]);

  useEffect(() => {
    if (post) {
      dispatch(
        getPostsBySearch({ search: "name", tags: post?.tags.join(",") })
      );
    }
  }, [post, dispatch]);

  if (!post) return null;

  if (isLoading) {
    return (
      <Paper elevation={6} className={classes.loadingPaper}>
        <CircularProgress size="7em" />
      </Paper>
    );
  }

  const openPost = (_id) => {
    navigate(`/posts/${_id}`);
  };

  const recommendedPosts = posts.filter(({ _id }) => _id !== post._id);

  return (
    <Paper style={{ padding: "20px", borderRadius: "15px" }} elevation={6}>
      <div className={classes.card}>
        <div className={classes.section}>
          <Typography variant="h3" className={classes.title} component="h2">
            {post.title}
          </Typography>
          <Typography
            gutterBottom
            variant="h6"
            color="textSecondary"
            component="h2"
          >
            {post?.tags?.map((tag) => `#${tag} `)}
          </Typography>
          <Typography gutterBottom variant="body1" component="p">
            {post.message}
          </Typography>
          <Typography variant="h6">Created by: {post.name}</Typography>
          <Typography variant="body1">
            {moment(post.createdAt).fromNow()}
          </Typography>
          <Divider style={{ margin: "20px 0" }} />
          <CommentSection post={post} />
        </div>
        <div className={classes.imageSection}>
          <img
            className={classes.media}
            src={
              post.image ||
              "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
            }
            alt={post.title}
          />
        </div>
      </div>
      {recommendedPosts?.length ? (
        <div className={classes.section}>
          <Divider style={{ margin: "20px 0" }} />
          <Typography gutterBottom variant="h5">
            You might also like:
          </Typography>
          <Divider />
          <div className={classes.recommendedPosts}>
            {recommendedPosts?.map(
              ({
                title,
                message,
                name,
                likes,
                image,
                _id,
                createdAt,
                tags,
              }) => (
                <Card
                  onClick={() => openPost(_id)}
                  key={_id}
                  className={classes.recommendedCard}
                  raised
                  elevation={6}
                >
                  <ButtonBase className={classes.cardAction} onClick={openPost}>
                    <CardMedia
                      className={classes.recommendedMedia}
                      image={
                        image ||
                        "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
                      }
                      title={title}
                    />
                    <div className={classes.overlay}>
                      <Typography variant="h6">{name}</Typography>
                      <Typography variant="body2">
                        {moment(createdAt).fromNow()}
                      </Typography>
                    </div>
                    <div className={classes.details}>
                      <Typography variant="body2" color="textSecondary">
                        {tags.map((tag) => `#${tag} `)}
                      </Typography>
                    </div>
                    <Typography
                      className={classes.recommendedTitle}
                      variant="h5"
                      gutterBottom
                    >
                      {title}
                    </Typography>
                    <CardContent className={classes.cardContent}>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                      >
                        {message?.length > 200
                          ? `${message?.substr(0, 200)}...Read more`
                          : message}
                      </Typography>
                    </CardContent>
                    <Typography
                      className={classes.likes}
                      // variant="h5"
                      gutterBottom
                    >
                      Likes : {likes?.length}
                    </Typography>
                  </ButtonBase>
                </Card>
              )
            )}
          </div>
        </div>
      ) : (
        <Typography gutterBottom variant="subtitle1">
          No recommended posts at this time.
        </Typography>
      )}
    </Paper>
  );
};

export default Postdetails;
