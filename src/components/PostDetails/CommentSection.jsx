import React, { useRef, useState } from "react";
import { Typography, TextField, Button } from "@material-ui/core";
import { useDispatch } from "react-redux";

import useStyles from "./styles";
import { commentPost } from "../../actions/posts";
import { Link } from "react-router-dom";

const CommentSection = ({ post }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [comments, setComments] = useState(post?.comments);
  const [comment, setComment] = useState("");
  const commentsRef = useRef();
  const user = JSON.parse(localStorage.getItem("profile"));

  const handleClick = () => {
    const finalComment = `${user?.result?.name}: ${comment}`;

    dispatch(commentPost({ finalComment }, post._id)).then(({ data }) =>
      setComments(data?.comments)
    );
    setComment("");

    commentsRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div>
      <div className={classes.commentsOuterContainer}>
        <div className={classes.commentsInnerContainer}>
          <Typography gutterBottom variant="h5">
            Comments
          </Typography>
          <div>
            {comments?.length ? (
              comments?.map((comment, i) => (
                <Typography key={i} gutterbottom variant="subtitle1">
                  <strong>{comment?.split(": ")[0]}:</strong>
                  {comment?.split(":")[1]}
                </Typography>
              ))
            ) : (
              <Typography gutterBottom color="textSecondary">
                No comments for this post.
              </Typography>
            )}
          </div>

          <div ref={commentsRef} />
        </div>
        {user?.result?.name ? (
          <div style={{ width: "70%" }}>
            <Typography gutterBottom variant="h6">
              Write a Comment
            </Typography>
            <TextField
              fullWidth
              minRows={4}
              variant="outlined"
              label="Comment"
              multiline
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <Button
              style={{ marginTop: "10px" }}
              fullWidth
              disabled={!comment}
              variant="contained"
              onClick={handleClick}
              color="primary"
            >
              Comment
            </Button>
          </div>
        ) : (
          <div>
            <Typography gutterBottom color="textSecondary">
              Sign in to comment on post.
            </Typography>
            <Button
              component={Link}
              to="/auth"
              variant="contained"
              color="primary"
            >
              Sign In
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentSection;
