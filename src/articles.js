"use strict"
// This is the stub for article
const articles = [{id:1, author: "andy1", text: "text for first article", comment:[], date: new Date()},
                 {id:2, author: "andy2", text: "text for second article", comment:[], date: new Date()},
                 {id:3, author: "andy3", text: "text for third article", comment:[], date: new Date()}]

let currentId = 4              //id for the new post


const hello = (req, res) => res.send({ hello: "world changed!" })


//get the article 
const getArticles = (req, res) => {
    let id = req.params.id
    if(!id){
        res.status(200).send([])
    }else{
        let returnedArticles = articles.filter(article => {return article.id == id})
        res.status(200).send(returnedArticles)        
    }
}

//update the article
const updateArticle = (req, res) => {
    let id = req.params.id
    if(!id){
        res.status(400).send("Please provide an valid id!")
    }else{
        articles.filter(article => {
            if(article.id == id){
                article.text = req.body.text
            }
        })
        res.status(200).send("The article has been updated!")
    }
}


//post an article
const postArticle = (req, res) => {
    if(!req.body.text){
        res.status(400).send("The text of the article is missing!")
    }else{
        let newArticle = {id: currentId, author: "new author", text: req.body.text, comment: [], date: new Date()}
        articles.push(newArticle)
        res.status(200).send("The new article has been added!")
        currentId += 1
    }
}



module.exports = (app) => {
    app.get("/", hello)                         //comment out this line later!!!!!!!!!
    app.get("/articles/:id?", getArticles)
    app.put("/articles/:id", updateArticle)
    app.post("/article", postArticle)
}
