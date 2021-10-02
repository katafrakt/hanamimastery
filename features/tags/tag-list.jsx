/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
/* eslint-disable jsx-a11y/anchor-is-valid */
import TagButton from "../tags/tag-button"
import { Box, makeStyles } from "@material-ui/core";
import { nanoid } from "@reduxjs/toolkit";

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    // justifyContent: 'center',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(0.5),
    },
  },
}));

export default function TagList({ tags }) {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      {tags.length
        ? tags.map((tag) => <TagButton key={nanoid()} tag={tag}/>)
        : null}
    </Box>
  )
}