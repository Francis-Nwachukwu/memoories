import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  media: {
    borderRadius: "20px",
    objectFit: "cover",
    width: "100%",
    height: "100%",
  },
  card: {
    display: "flex",
    flexDirection: "row",
    // flexWrap: "wrap",
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column",
    },
  },
  section: {
    borderRadius: "20px",
    margin: "10px",
    flex: 1,
    textDecoration: "uppercase",
  },
  title: {
    [theme.breakpoints.down("md")]: {
      fontSize: "30px",
    },
  },
  imageSection: {
    width: "50%",
    height: "500px",
    marginLeft: "20px",
    [theme.breakpoints.down("sm")]: {
      marginLeft: 0,
      height: "300px",
    },
  },
  recommendedPosts: {
    display: "flex",
    flexWrap: "wrap",
    padding: "20px 0",
  },
  recommendedPost: {
    width: "300px",
    border: "1px solid black",
  },
  loadingPaper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
    borderRadius: "15px",
    height: "39vh",
  },
  commentsOuterContainer: {
    display: "flex",
    justifyContent: "space-between",
    [theme.breakpoints.down("md")]: {
      flexWrap: "wrap",
      // justifyContent: "400px",
    },
  },
  commentsInnerContainer: {
    height: "200px",
    overflowY: "auto",
    marginRight: "10px",
  },
  recommendedCard: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    borderRadius: "15px",
    // margin: "0 20px",
    // height: "450px",
    position: "relative",
    width: "350px",
    [theme.breakpoints.down("md")]: {
      // height: "fit",
    },
  },
  recommendedMedia: {
    height: 0,
    paddingTop: "56.25%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    backgroundBlendMode: "darken",
  },
  cardAction: {
    display: "block",
    textAlign: "initial",
  },
  border: {
    border: "solid",
  },
  fullHeightCard: {
    height: "100%",
  },
  overlay: {
    position: "absolute",
    top: "20px",
    left: "20px",
    color: "white",
  },
  grid: {
    display: "flex",
  },
  details: {
    display: "flex",
    justifyContent: "space-between",
    margin: "20px",
  },
  recommendedTitle: {
    padding: "0 16px",
  },
  cardContent: {
    height: "100px",
  },
  likes: {
    padding: "0 16px",
  },
}));
