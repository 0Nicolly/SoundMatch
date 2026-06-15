var express = require('express');
var router = express.Router();

const lastfmService =
  require("../services/lastfmService");

router.get("/", async (req, res) => {

  const { type, track, artist } = req.query;

  let results = [];

  if (type === "track" && track && artist) {
    results =
      await lastfmService.getSimilarTracks(
        track,
        artist
      );
  } 
  
  if (type === "artist" && artist) {
    results =
      await lastfmService.getSimilarArtists(
        artist
      );
  }

  res.render("index", {
    title: "Sound Match",
    results,
    type
  });

});

module.exports = router;