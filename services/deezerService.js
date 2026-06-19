const axios = require("axios");

async function searchTrack(trackName, artistName) {
  try {
    const response = await axios.get(
      "https://api.deezer.com/search",
      {
        params: {
          q: `track:"${trackName}" artist:"${artistName}"`
        }
      }
    );

    const track = response.data.data[0];
    console.log(track);

    if (!track) {
        console.log(`Não encontrado: ${trackName} - ${artistName}`);
        return null;
    }

    return {
      cover: track.album.cover_medium,
      preview: track.preview,
      link: track.link,
    };

  } catch (error) {
    console.error(error.message);
    return null;
  }
}

async function searchArtist(artistName) {
  try {

    const response = await axios.get(
      "https://api.deezer.com/search/artist",
      {
        params: {
          q: artistName
        }
      }
    );

    const artist =
      response.data.data[0];

    if (!artist) {
      return null;
    }

    return {
      picture:
        artist.picture_medium,
      link:
        artist.link
    };

  } catch (error) {
    console.error(error.message);
    return null;
  }
}

module.exports = {
  searchTrack,
  searchArtist
};
