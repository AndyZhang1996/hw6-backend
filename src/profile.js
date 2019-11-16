"use strict"
//profile.js contains all user profile 
//stub user profiles 
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
        username: 'andy1',
        headline: 'this is andy1\'s headline',
        email: 'andy1@rice.edu',
        zipcode: 234,
        dob: '845701200000',
        avatar: 'https://icatcare.org/app/uploads/2018/07/Thinking-of-getting-a-cat.png',
    },
    {
        username: 'etain',
        headline: 'this is etain\'s headline',
        email: 'etain@rice.edu',
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

//get the avatar of the user
const getAvatar = (req, res) => {
    let userName = req.params.user
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
        res.status(404).send("There is no profile related to provided username!")
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
    let userName = req.params.user
    let userFound = false
    profiles.filter(profile => {
        if(profile.username == userName){
            userFound = true
            let toReturn = {username: userName, email: profile.email}
            res.status(200).send(toReturn)
            return
        }
    })
    if(userFound == false){
        res.status(404).send("There is no profile related to provided username!")
    }
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
    let userName = req.params.user
    let userFound = false
    profiles.filter(profile => {
        if(profile.username == userName){
            userFound = true
            let toReturn = {username: userName, zipcode: profile.zipcode}
            res.status(200).send(toReturn)
            return
        }
    })
    if(userFound == false){
        res.status(404).send("There is no profile related to provided username!")
    }
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
    let userName = req.params.user
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
        res.status(404).send("There is no profile related to provided username!")
    }
}



module.exports = (app) => {
    app.get("/avatar/:user?", getAvatar)
    app.put("/avatar", updateAvatar)
    app.get("/email/:user?", getEmail)
    app.put("/email", updateEmail)
    app.get("/zipcode/:user?", getZipcode)
    app.put("/zipcode", updateZipcode)
    app.get("/dob/:user?", getDob)
}