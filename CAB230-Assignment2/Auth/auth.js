const jwt = require('jsonwebtoken');

const authorize = (req, res, next) => { 
    const auth = req.headers.authorization;
    let token = null;


    if (auth && auth.split(' ').length >= 2) {
        token = auth.split(' ')[1];
        console.log('Token:', token);
    } else if (auth) { 
        console.log('Malformed auth header');
        res.status(401).json({ error: true, message: 'Authorization header is malformed' });
        return;

    } else {

        req.isAuthenticated = false;
        next();
        return;
    }

    try { 
        const secretKey = process.env.SECRET_KEY;
        const decoded = jwt.verify(token, secretKey);
        if (!decoded) { 
            console.log('Malformed auth header');
            res.status(401).json({ error: true, message: 'Authorization header is malformed' });
            return;
        }

        if (decoded.exp < Date.now()) { 
            console.log('Token has expired');
            res.status(401).json({ error: true, message: 'Authorization token has expired' });
            return;
        }


        req.isAuthenticated = true;
        req.token = token;
        next();
    } catch (err) { 
        console.log('Token is not valid:', err);
        res.status(401).json({ error: true, message: 'Invalid JWT token' });
    }
}


module.exports = authorize