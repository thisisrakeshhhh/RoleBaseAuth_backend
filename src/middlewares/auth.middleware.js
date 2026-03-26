const jwt = require("jsonwebtoken");

async function authArtist(req, res, next) {

    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (decoded.role !== "artist") {
            return res.status(403).json({ message: "You don't have access" })
        }

        req.user = decoded;
        next()//forward the requires to same music.routers.js
    }

    catch (err) {
        console.log(err);
        return res.status(401).json({ message: "Unauthorized" })
    }

}

async function authUser(req, res, next) {

    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (decoded.role !== "user") {
            return res.status(403).json({ message: "You don't have access" })
        }

        req.user = decoded;
        next()//forward the requires to same music.routers.js
    }

    catch (err) {
        console.log(err);
        return res.status(401).json({ message: "Unauthorized" })
    }

}

module.exports = { authArtist, authUser }
///read the data from the request
//modify the request data
//also send response