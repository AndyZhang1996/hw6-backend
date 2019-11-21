// const expect = require('chai').expect
const fetch = require('isomorphic-fetch')
require("es6-promise").polyfill()

const url = path => `http://localhost:3000${path}`
let loginCookie = null


describe('test for the backend user and profile functionality', () => {
    it("this should register a new user in the database and return status 200", async (done) => {
        await fetch(url('/register'), {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: "new new new test user",
                                   email: "testuser@rice.edu",
                                   dob: new Date(1997, 08, 08).getTime().toString(),
                                   zipcode: "88888",
                                   password: "123"}),
        }).then(res => {
            expect(res.status).toEqual(200)
            done()
        })
    })
    
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


    it("should get the headline of xz75", async (done) => {
        await fetch(url('/headline/'), {
            method: 'GET',
            headers: {'COOKIE': loginCookie},
        }).then(async res => {
            expect(res.status).toEqual(200)
            let returned = await res.json()
            console.log(returned)
            expect(returned.headline).toEqual("ok")
            done()
        })
    })


    it("should update the headline of loggedin user", async (done) => {
        await fetch(url('/headline'),  {
            method: 'PUT',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' ,
                       'COOKIE': loginCookie},
            body: JSON.stringify({headline: "ok"})
        }).then(async res => {
            let returned = await res.json()
            expect(returned.headline).toEqual("ok")
            done()
        })
    })


    it("shoud log out the current loggedin user", async (done) => {
        await fetch(url('/logout'),  {
            method: 'PUT',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json',
                       'COOKIE': loginCookie},
        }).then(res => {
            expect(res.status).toEqual(200)
            done()
        })
    })



})