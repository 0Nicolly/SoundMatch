var express = require('express');
var router = express.Router();

const lastfmService = require("../services/lastfmService");

const deezerService = require("../services/deezerService");

router.get("/", async (req, res) => {

  const { type, track, artist } = req.query;

  let results = [];

  if (type === "track" && track && artist) {
    results =
      await lastfmService.getSimilarTracks(
        track,
        artist
      );

    results = await Promise.all(
      results.map(async result => {

        const deezerData =
          await deezerService.searchTrack(
            result.name,
            result.artist
          );

        return {
          ...result,
          cover: deezerData?.cover,
          preview: deezerData?.preview,
          link: deezerData?.link
        };

      })
    );
  }

  if (type === "artist" && artist) {
    results =
      await lastfmService.getSimilarArtists(
        artist
      );

    results = await Promise.all(
      results.map(async result => {
        const deezerData =
          await deezerService.searchArtist(
            result.name
          );

        return {
          ...result,
          picture: deezerData?.picture,
          link: deezerData?.link
        };
      })
    );
  }

  res.render("index", {
    title: "Sound Match",
    results,
    type,
    track,
    artist
  });

});

module.exports = router;