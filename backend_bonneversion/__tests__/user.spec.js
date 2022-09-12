const request = require('supertest');
const app = require('../app');
const UserModel = require('../models/user.model');
const baseURL = "http://localhost:5000/api/user"

describe('API User', () => {
  const newUser = {
    first_name: 'Ass',
    last_name: 'Niang',
    address: 'Parcelles Assainies',
    email: 'nass@gmail.com',
    user_name: '@ass',
    password: 'ass123',
  };
  const updatedUser = {
    sexe: 'Homme',
  };


  it('Should create a new user and return a 201 status code', async (done) => {
    const response = await request(baseURL)
      .post('/register')
      .send(newUser);
    expect(response.status).toBe(201);
    done();
  });

  it('Should update given user and return a 200 status code', async (done) => {
    const user1 = new UserModel({
      first_name: 'Aly',
      last_name: 'sene',
      address: 'Parcelles Assainies',
      email: 'aly@gmail.com',
      user_name: '@aly',
      password: 'aly123',
    });
    await user1.save();
    const response = await request(baseURL)
      .put('/' + user1._id)
      .send(updatedUser);
    expect(response.status).toBe(200);
    done();
  });

  it('should return all users', async (done) => {
    const response = await request(baseURL).get('');
    expect(response.status).toBe(200);
    done();
  });

  it('should login an existing user in the database', async (done) => {
    const response = await request.post(baseURL+'/login').send({
      email: 'aly@gmail.com',
      password: 'aly123',
    });
    expect(response.status).toBe(200);
    done();
  });

  it('should return a specific user given his id with status code 200', async (done) => {
    const user1 = new UserModel({
      first_name: 'Amy',
      last_name: 'sene',
      address: 'Parcelles Assainies',
      email: 'alyh@gmail.com',
      user_name: '@ahly',
      password: 'alny123',
    });
    await user1.save();
    const response = await request(baseURL).get('/' + user1._id);
    expect(response.status).toBe(200);
    done();
  });

  it('should be able to delete user', async (done) => {
    const user1 = new UserModel({
      first_name: 'Amy',
      last_name: 'sene',
      address: 'Parcelles Assainies',
      email: 'alyh@gmail.com',
      user_name: '@ahly',
      password: 'alny123',
    });
    await user1.save();
    const response = await request(baseURL).delete('/' + user1._id);
    expect(response.status).toBe(200);
    done();
  });
});
