import { Grid, makeStyles } from "@material-ui/core";
import EpisodeTile from "./tile";

const useStyles = makeStyles((theme) => ({
  list: {
    listStyle: "none",
    padding: theme.spacing(0, 4),
    [theme.breakpoints.down("md")]: {
      padding: theme.spacing(0, 0),
    },


  },
}));

const EpisodeDisplay = (props) => {
  const classes = useStyles();
  const articles = props.articles;
  return (
    <Grid container component="ul" className={classes.list} spacing={6}>
      {articles.map((article, index) => (
        <Grid
          key={article.id}
          item
          xs={12}
          md={index === 0 ? 12 : 6}
          component="li"
        >
          <EpisodeTile article={article} />
        </Grid>
      ))}
    </Grid>
  );
};

export default EpisodeDisplay;
