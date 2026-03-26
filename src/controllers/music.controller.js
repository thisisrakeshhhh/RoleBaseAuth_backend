const musicModel = require("../models/music.model");
const albumModel = require("../models/album.model");
const { uploadFile } = require("../services/storage.service");
const jwt = require("jsonwebtoken");


// creating the music here
async function createMusic(req, res) {

    const { title } = req.body;
    const file = req.file;

    const result = await uploadFile(file.buffer.toString("base64"));

    const music = await musicModel.create({
        uri: result.url,
        title,
        artist: req.user.id, //come from the middleware req.user = decoded
    });

    res.status(201).json({
        message: "Music created successfully",
        music,
    });
}
// createing the album here
async function createAlbum(req, res) {
    const { title, musics } = req.body;

    const album = await albumModel.create({
        title,
        artist: req.user.id,
        musics: musics,
    })
    res.status(201).json({
        message: "Album created successfully",
        albm: {
            id: album._id,
            title: album.title,
            artist: album.artist,
            musics: album.musics,
        }
    })
}

async function getAllMusic(req, res) {
    const musics = await musicModel.find().populate("artist", "username email");
    res.status(200).json({
        message: "Music fetched successfully",
        musics: musics,
    });
}

async function getAllAlbum(req, res) {
    const albums = await albumModel.find().populate("artist", "username email");
    res.status(200).json({
        message: "Album fetched successfully",
        albums: albums,
    });
}

async function getAlbumById(req, res) {
    const album = await albumModel.findById(req.params.albumId).populate("artist", "username email").populate("musics");

    if (!album) {
        return res.status(404).json({ message: "Album not found" });
    }

    res.status(200).json({
        message: "Album fetched successfully",
        album: album,
    })
}

module.exports = { createMusic, createAlbum, getAllMusic, getAllAlbum, getAlbumById };