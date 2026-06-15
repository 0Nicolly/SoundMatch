const axios = require("axios");

async function getSimilarTracks(track, artist) {
    try {
        const response = await axios.get(
            "https://ws.audioscrobbler.com/2.0/",
            {
                params: {
                    method: "track.getsimilar",
                    artist,
                    track,
                    api_key: process.env.LASTFM_API_KEY,
                    format: "json"
                }
            }
        );

        const tracks = response.data.similartracks.track;

        return tracks.map(track => ({
            name: track.name,
            artist: track.artist.name,
            match: track.match
        }));

    } catch (error) {
        console.log("ERRO COMPLETO:");
        console.log(error.response?.data);
        return [];
    }
}

module.exports = {
    getSimilarTracks
};