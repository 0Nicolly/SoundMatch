const express = require("express");
const router = express.Router();

const lastfmService =
  require("../services/lastfmService");

router.get("/", async (req, res) => {

  const { track, artist } = req.query;

  const tracks =
    await lastfmService.getSimilarTracks(
      track,
      artist
    );

  console.log(tracks);
  res.render("results", {
    tracks
  });

});

module.exports = router;