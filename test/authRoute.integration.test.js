// write test for authRoute
const request = require('supertest');
const app = require('../app');



test('POST /login - Success - 200', async () => {

    const user = {
        "email": 'tmax1112@gmail.com',
        "password": 'michealangle',
    }
    const res = await request(app).post('/login').send(user);
    expect(res.statusCode).toEqual(200);

})
