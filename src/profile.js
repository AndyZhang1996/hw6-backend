"use strict"
//profile.js contains all user profile 
//stub user profiles 
const Profile = require('./model.js').Profile

const profiles = [
    {
        username: 'DLeebron',
        headline: 'This is my headline!',
        email: 'foo@bar.com',   
        zipcode: 123,
        dob: '128999122000',
        avatar: 'https://upload.wikimedia.org/wikipedia/en/thumb/4/4e/DWLeebron.jpg/220px-DWLeebron.jpg',
    },
    {
        username: 'xz75',
        headline: 'this is andy1\'s headline',
        email: 'andy1@rice.edu',
        zipcode: 234,
        dob: '845701200000',
        avatar: 'https://icatcare.org/app/uploads/2018/07/Thinking-of-getting-a-cat.png',
    },
    {
        username: 'andyzhang',
        headline: 'this is etain\'s headline',
        email: 'andyzhang@rice.edu',
        zipcode: 345,
        dob: '871016400000',
        avatar: 'https://image.shutterstock.com/image-photo/portrait-surprised-cat-scottish-straight-260nw-499196506.jpg',
    }
]

const profile = {
    username: 'DLeebron',
    headline: 'This is my headline!',
    email: 'foo@bar.com',
    zipcode: 12345,
    dob: '128999122000',
    avatar: 'https://upload.wikimedia.org/wikipedia/en/thumb/4/4e/DWLeebron.jpg/220px-DWLeebron.jpg',
}

let loggedInUser = "andy1"           //this is stub loggedInUser

const getUserName = (req, res) => {
    let username = req.username          //get the logged-in user's name 

    Profile.find({username: username}).exec(function(err, profiles){
        if(err){
            return console.log(err)
        }
        if(!profiles || profiles.length == 0){
            res.status(400).send({Msg: "No matching user found for getUserName"})
            return
        }
        const profile = profiles[0]
        res.status(200).send({username: username})
        return
    })
}


//Get the headline for a user
const getHeadline = (req, res) => {
    let username = req.params.user
    if(!username){
        username = req.username
    }
    Profile.find({username: username}).exec(function(err, profiles){
        if(err){
            return console.log(err)
        }
        if(!profiles || profiles.length == 0){
            res.status(400).send({Msg: "No matching user found for getHeadline"})
            return
        }
        const profile = profiles[0]
        res.status(200).send({username: username, headline: profile.headline})
        return
    })
}


//Update the headline for the logged in user
const updateHeadline = (req, res) => {
    const username = req.username          //get the username of the loggedIn user
    // return console.log(username)
    const headline = req.body.headline    //get the headline 
    if(!username){
        res.status(400).send("No username given")
        return
    }
    if(!headline){
        res.status(400).send("Please provide a headline")
        return
    }

    Profile.updateOne({username: username}, {$set: {headline: headline}}, function(err, profile){
        if(err){
            res.status(400).send(err)
            return
        }
        res.status(200).send({username: username, headline: headline})
        return
    })
}





//get the avatar of the user
const getAvatar = (req, res) => {
    let userName
    if(!req.params.user){
        userName = req.username
    }else{
        userName = req.params.user
    }
    let userFound = false
    profiles.filter(profile => {
        if(profile.username == userName){
            userFound = true
            let toReturn = {username: userName, avatar: profile.avatar}
            res.status(200).send(toReturn)
            return
        }
    })
    if(userFound == false){
        res.status(400).send({Msg: "There is no profile related to provided username!"})
    }
}



//update the avatar of the user
const updateAvatar = (req, res) => {
    let _avatar = req.body.avatar
    if(!_avatar){
        res.status(400).send("You need to provide a avatar!")
        return 
    }
    profiles.filter(profile => {
        if(profile.username == loggedInUser){
            profile.avatar = _avatar
            let toReturn = {username: loggedInUser, avatar: _avatar}
            res.status(200).send(toReturn)
            return
            }
        })
}


//get the email address for the requested user
const getEmail = (req, res) => {
    let username
    if(!req.params.user){
        username = req.username
    }else{
        username = req.params.user
    }

    // let username = req.username          //get the logged-in user's name 

    Profile.find({username: username}).exec(function(err, profiles){
        if(err){
            return console.log(err)
        }
        if(!profiles || profiles.length == 0){
            res.status(400).send({Msg: "No matching user found"})
            return
        }
        const profile = profiles[0]
        res.status(200).send({username: username, email: profile.email})
        return
    })
}

//update the email addres for the logged in user
const updateEmail = (req, res) => {
    let _email = req.body.email
    if(!_email){
        res.status(400).send("You need to provide a email!")
        return 
    }
    profiles.filter(profile => {
        if(profile.username == loggedInUser){
            profile.email = _email
            let toReturn = {username: loggedInUser, email: _email}
            res.status(200).send(toReturn)
            return
            }
        })
}

//get the zipcode for the requested user
const getZipcode = (req, res) => {
    let username
    if(!req.params.user){
        username = req.username
    }else{
        username = req.params.user
    }

    // let username = req.username          //get the logged-in user's name 

    Profile.find({username: username}).exec(function(err, profiles){
        if(err){
            return console.log(err)
        }
        if(!profiles || profiles.length == 0){
            res.status(400).send({Msg: "No matching user found"})
            return
        }
        const profile = profiles[0]
        res.status(200).send({username: username, zipcode: profile.zipcode})
        return
    })
}

//update the zipcode for the logged in user
const updateZipcode = (req, res) => {
    let _zipcode = req.body.zipcode
    if(!_zipcode){
        res.status(400).send("You need to provide a zipcode!")
        return 
    }
    profiles.filter(profile => {
        if(profile.username == loggedInUser){
            profile.zipcode = _zipcode
            let toReturn = {username: loggedInUser, zipcode: _zipcode}
            res.status(200).send(toReturn)
            return
            }
        })
}


//get the date of birth in milliseconds for the requested user
const getDob = (req, res) => {
    let userName
    if(!req.params.user){
        userName = req.username
    }else{
        userName = req.params.user
    }

    let userFound = false
    profiles.filter(profile => {
        if(profile.username == userName){
            userFound = true
            let toReturn = {username: userName, dob: profile.dob}
            res.status(200).send(toReturn)
            return
        }
    })
    if(userFound == false){
        res.status(400).send({Msg: "There is no profile related to provided username!"})
    }
}



module.exports = (app) => {
    app.get("/username", getUserName)
    app.get("/headline/:user?", getHeadline)
    app.put("/headline", updateHeadline)
    

    app.get("/avatar/:user?", getAvatar)
    app.put("/avatar", updateAvatar)
    app.get("/email/:user?", getEmail)
    app.put("/email", updateEmail)
    app.get("/zipcode/:user?", getZipcode)
    app.put("/zipcode", updateZipcode)
    app.get("/dob/:user?", getDob)
}