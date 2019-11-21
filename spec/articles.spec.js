//This is the test for backend articles 
// const expect = require('chai').expect
const fetch = require('isomorphic-fetch')
require("es6-promise").polyfill()

const url = path => `http://localhost:3000${path}`
let loginCookie = null
let oldLength = null


describe('test for the backend article functionality', () => {
    it("log in", async (done) => {
        await fetch(url('/login'), {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({ username: "xz75",
                                   password: "123"})
        }).then(res => {
            expect(res.status).toEqual(200) 
            loginCookie = res.headers._headers['set-cookie'][0]
            done()
        })
    })

    it("should return articles without supplying the id", async (done) => {
        await fetch(url('/articles/'), {
            method: 'GET',
            headers: {'COOKIE':loginCookie},
        }).then(async res => {
            expect(res.status).toEqual(200)
            let returned = await res.json()
            let articles = returned.articles
            console.log(articles.length)
            oldLength = articles.length
            expect(articles.length).toEqual(oldLength)
            done()
        })
    })

    it("should return 0 article when supplyign invalid id", async (done) => {
        await fetch(url('/articles/invalid'), {
            method: 'GET',
            headers: {'COOKIE':loginCookie},
        }).then(async res => {
            expect(res.status).toEqual(200)
            let returned = await res.json()
            let articles = returned.articles
            expect(articles.length).toEqual(0)
            done()
        })
    })


    it("should return articles when supplying the valid id", async (done) => {
        await fetch(url('/articles/xz75'), {
            method: 'GET',
            headers: {'COOKIE':loginCookie},
        }).then(async res => {
            expect(res.status).toEqual(200)
            let returned = await res.json()
            let articles = returned.articles
            console.log(articles.length)
            done()
            // oldLength = articles.length
            // expect(articles.length).toEqual(oldLength)
        })
    })


    it("should return one article when posting a new article", async (done) => {
        await fetch(url('/article'), {
            method: 'POST',
            headers: {'Content-Type':'application/json',
                      'COOKIE':loginCookie},
            body: JSON.stringify({ text: "new article added by the backend test"})
        }).then(async res => {
            expect(res.status).toEqual(200) 
            let returned = await res.json()
            let articles = returned.articles
            expect(articles.length).toEqual(1)
            done()
        })
    })


    it("should return one more articles after posting and the content should match", async (done) => {
        await fetch(url('/articles/'), {
            method: 'GET',
            headers: {'COOKIE':loginCookie},
        }).then(async res => {
            expect(res.status).toEqual(200) 
            let returned = await res.json()
            let articles = returned.articles
            expect(articles.length).toEqual(oldLength + 1)
            expect(articles[0].body).toEqual("new article added by the backend test")
            done()
        })
    })

})