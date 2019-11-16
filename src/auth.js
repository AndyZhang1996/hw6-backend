var cookieKey = 'sid'

function isLoggedIn(req, res, next){
    var sid = req.cookies[cookieKey]

    if(!sid){
        return res.sendStatus(401)
    }

    var usename = sessionUser[sid]
    if(username){
        req.username = username
        next()
    }else{
        res.sendStatus(401)
    }

}