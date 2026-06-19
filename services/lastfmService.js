const axios = require("axios");
const URL = "https://ws.audioscrobbler.com/2.0/";

async function getSimilarTracks(track, artist) {
    try {
        const response = await axios.get(URL, {
            params: {
                method: "track.getsimilar",
                artist,
                track,
                api_key: process.env.LASTFM_API_KEY,
                format: "json"
            }
        }
        );

        return response.data.similartracks.track
        .filter(track => Number(track.match) >= 0.20)
        .map(
            track => ({
                name: track.name,
                artist: track.artist.name,
                match: track.match
            })
        );

    } catch (error) {
        console.log("ERRO COMPLETO:");
        console.log(error.response?.data);
        return [];
    }
}

async function getSimilarArtists(artist) {
    try {
        const response = await axios.get(URL, {
            params: {
                method: "artist.getsimilar",
                artist,
                api_key: process.env.LASTFM_API_KEY,
                format: "json"
            }
        });

        return response.data.similarartists.artist
        .filter(artist => Number(artist.match) >= 0.20)
        .map(
            artist => ({
                name: artist.name,
                match: artist.match
            })
        );

    } catch (error) {
        console.log("ERRO COMPLETO:");
        console.log(error.response?.data);
        return [];
    }
}

module.exports = {
    getSimilarTracks,
    getSimilarArtists
};