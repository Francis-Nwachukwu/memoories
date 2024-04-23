import React, { useState } from "react";
import { useDispatch } from "react-redux";

import {
  Container,
  Grow,
  Grid,
  Paper,
  AppBar,
  TextField,
  Button,
  InputAdornment,
} from "@material-ui/core";
import { useLocation, useNavigate } from "react-router-dom";
import ChipInput from "material-ui-chip-input";
import SearchIcon from "@mui/icons-material/Search";

import { getPostsBySearch } from "../../actions/posts";
import Posts from "../Posts/Posts";
import Form from "../Forms/Form";
import Paginate from "../../Pagination/Pagination";

import useStyles from "./styles";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Home = () => {
  const classes = useStyles();
  const query = useQuery();
  const navigate = useNavigate();
  const page = query.get("page") || 1;
  const searchQuery = query.get("searchQuery");

  const [currentId, setCurrentId] = useState(null);
  const [searchField, setSearchField] = useState("");
  const [tags, setTags] = useState([]);

  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(getPosts());
  // }, [currentId, dispatch]);

  const handleAdd = (tag) => {
    setTags([...tags, tag]);
  };
  const handleDelete = (tagToDelete) => {
    setTags(tags.filter((tag) => tag !== tagToDelete));
  };
  const searchPost = () => {
    if (searchField.trim() || tags) {
      dispatch(getPostsBySearch({ searchField, tags: tags.join(",") }));
      navigate(
        `/posts/search?searchQuery=${searchField || "none"}&tags=${tags.join(
          ","
        )}`
      );
    } else {
      navigate("/");
    }
  };
  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      searchPost();
    }
  };

  return (
    <Grow in>
      <Container maxWidth="xl">
        <Grid
          className={classes.gridContainer}
          container
          justifyContent="space-between"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12} sm={8} md={9}>
            <Posts currentId={currentId} setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={4} md={3}>
            <AppBar
              className={classes.appBarSearch}
              position="static"
              color="inherit"
            >
              <TextField
                name="search"
                variant="outlined"
                label="Search by title"
                fullWidth
                value={searchField}
                onKeyDown={handleKeyPress}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
                onChange={(e) => {
                  setSearchField(e.target.value);
                }}
              />
              <ChipInput
                style={{ margin: `10px 0` }}
                value={tags}
                onAdd={handleAdd}
                onDelete={handleDelete}
                label="Search by tags"
                placeholder="Press 'enter key' after each tag."
                variant="outlined"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
              <Button
                onClick={searchPost}
                className={classes.searchButton}
                variant="contained"
                color="primary"
              >
                Search
              </Button>
            </AppBar>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
          </Grid>
        </Grid>
        {!searchQuery && !tags.length && (
          <Paper elevation={6} className={classes.pagination}>
            <Paginate page={page} />
          </Paper>
        )}
      </Container>
    </Grow>
  );
};
export default Home;
