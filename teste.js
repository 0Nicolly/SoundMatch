require("dotenv").config();

const lastfmService = require("./services/lastfmService");

async function test() {
  const tracks =
    await lastfmService.getSimilarTracks(
      "Blinding Lights",
      "The Weeknd"
    );

  console.log(tracks);
}

test();