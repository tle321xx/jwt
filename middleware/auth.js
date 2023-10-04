// 8.
const jwt = require('jsonwebtoken')


const verifyToken = (req, res, next) => {
    const token = req.body.token || req.query.token || req.headers['x-acess-token'];

    if(!token) {
        return res.status(403).send('A token is required')
    }

    try {
        const decoded = jwt.verify(token, process.env.TOKEN_KEY)
        req.user = decoded
    } catch (err){
        return res.status(401).send("Invalid Token")
    }
    return next()
}

module.exports = verifyToken








