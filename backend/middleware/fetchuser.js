var jwt = require('jsonwebtoken');
const JWT_SEC = "iamagoodboy"

const fetchuser = (req, res, next) => {
    //get user from jwt token and add id to required object
    const token = req.header('auth-token');
    if (!token) {
        res.status(401).send({ error: "Please authenticate using a valid token" });
    }
    try {
        const data = jwt.verify(token, JWT_SEC)
        req.user = data.user
        next()
    } catch (error) {
        res.send(401);
    }

}

module.exports = fetchuser;