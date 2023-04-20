// write test for authRoute
const request = require('supertest');
const express = require('express');
const app = require('../app');






    // test('GET /logout - Success - 200',async () => {
    //     const res = await request(app).get('/logout');
    //     expect(res.statusCode).toEqual(200);
    // });

    // it('POST /signup - Failure - 400', async() =>{
    //     const res = await request(app).post()
    // } )

    // it('POST /login - Failure - 400',async () => {
    //     const res = await request(app).post('/login').send({
    //         // email: 'tmax1112@gmail.com',\
    //         email: "",
    //         password: 'michealangle',
    //     });
    //     expect(res.statusCode).toEqual(400);
    //     expect(res.body).toEqual({
    //         errors: [
    //             {
    //                 location: "body",
    //                 param: "email",
    //                 value: ""
    //             }
    //         ]
    //     })
    // });


    test('POST /login - Success - 200', async () => {

        const user = {
            "email": 'tmax1112@gmail.com',
            "password": 'michealangle',
        }
        const res = await request(app).post('/login').send(user);
        expect(res.statusCode).toEqual(200);
        // done()

    // it('POST /login - Success - 200', async () => {

    //     const res = await request(app).post('/login', {
    //         email: 'tmax1112@gmail.com',
    //         password: 'michealangle',
    //     });
    //     expect(res.statusCode).toEqual(200);
    //     expect(res.body).toEqual({
    //         message: "Logged in successfully"
    //     })
    // });
})

// describe('authRoute', () => {

    // it('POST /signup - Failure - 400', async() =>{
    //     const res = await request(app).post()
    // } )

    

    // test('POST /login - Failure - 400',async () => {

    //   const userDetailFailure = {
    //     email: "",
    //     password: 'michealangle',
    // }
    //   try{
    //     const res = await request(app).post('/login').send(userDetailFailure);
    //     expect(res.statusCode).toEqual(400);
    //     expect(res.body).toEqual({
    //         errors: [
    //             {
    //                 location: "body",
    //                 param: "email",
    //                 value: ""
    //             }
    //         ]
    //     })
    //   }catch(err){

    //     console.log(err)
    //   }
    // });


    // test('POST /login - Success - 200', async () => {

    //     const res = await request(app).post('/login').send({
    //         email: 'tmax1112@gmail.com',
    //         password: 'michealangle',
    //     });
    //     expect(res.statusCode).toEqual(200);
    //     expect(res.body).toEqual({
    //         message: "Logged in successfully"
    //     })
    // });

    // it('POST /login - Success - 200', async () => {

    //     const res = await request(app).post('/login', {
    //         email: 'tmax1112@gmail.com',
    //         password: 'michealangle',
    //     });
    //     expect(res.statusCode).toEqual(200);
    //     expect(res.body).toEqual({
    //         message: "Logged in successfully"
    //     })
    // });
// })
