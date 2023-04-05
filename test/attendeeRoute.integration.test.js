// write test for authRoute
const request = require('supertest');
const express = require('express');
const app = express();
const User = require('../models/User');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const { response } = require('express');
require('dotenv').config();
const attendeeRoute = require('../routes/attendeeRoutes')

const secret = process.env.authcontrollerSecret;

app.use(attendeeRoute);

describe('Integration test for attendee route', () => {
    it('GET /attendee - Success - 200',async () => {
        const res = await request(app).get('/attendee');
        expect(res.statusCode).toEqual(200);
    });

    it('GET /attendee - Failure - 400',async () => {
        const res = await request(app).get('/attendee');
        expect(res.statusCode).toEqual(400);
    });

    it('POST /attendee - Success - 200',async () => {
        const res = await request(app).post('/attendee').send({
            name: 'Google Developer Event',
            email: 'google@gmail.com',
            phone: '1234567890',
            event: '5f9e1b0b0b1b9c2c1c8c1c1c',

        });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual({
            message: "Attendee added successfully"
        })
    });

    it('POST /attendee - Failure - 400',async () => {
        const res = await request(app).post('/attendee').send({
            name: 'Google Developer Event',
            email: 'google@gmail.com',
            phone: '1234567890',
            event: '5f9e1b0b0b1b9c2c1c8c1c1c',

        });
        expect(res.statusCode).toEqual(400);
        expect(res.body).toEqual({
            message: "Attendee already exists"
        })
    });

    it('GET /attendee/:id - Success - 200',async () => {
        const res = await request(app).get('/attendee/5f9e1b0b0b1b9c2c1c8c1c1c');
        expect(res.statusCode).toEqual(200);
    });

    it('GET /attendee/:id - Failure - 400',async () => {
        const res = await request(app).get('/attendee/5f9e1b0b0b1b9c2c1c8c1c1c');
        expect(res.statusCode).toEqual(400);
    });

});
