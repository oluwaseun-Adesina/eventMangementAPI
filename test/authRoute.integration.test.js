// write test for authRoute
const request = require('supertest');
const express = require('express');
const app = express();
const User = require('../models/User');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const { response } = require('express');
require('dotenv').config();
const authRoutes = require('../routes/authRoutes');

const secret = process.env.authcontrollerSecret;

app.use(authRoutes);

describe('authRoute', () => {
    it('GET /logout - Success - 200',async () => {
        const res = await request(app).get('/logout');
        expect(res.statusCode).toEqual(200);
    });

    it('POST /login - Failure - 400',async () => {
        const res = await request(app).post('/login').send({
            email: 'tmax1112@gmail.com',
            password: 'michealangle',
        });
        expect(res.statusCode).toEqual(400);
        // expect(res.body).toEqual({
        //     message: "Incorrect email or password"
        // })
    });


    it('POST /login - Success - 200',async () => {

        const res = await request(app).post('/login').send({
            email: 'tmax1112@gmail.com',
            password: 'michealangle',
        });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual({
            message: "Logged in successfully"
        })
    });
})