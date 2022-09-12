const supertest = require('supertest');
const app = require('../app');
const request = supertest(app);
const UserModel = require('../models/user.model');
const baseURL = 'http://localhost:5000/api/user/admin';
const baseURL1 = 'http://localhost:5000/api/user';

describe('API User Admin', () => {
  const user = new UserModel({
    first_name: 'Abdoulaye',
    last_name: 'ba',
    address: 'Kolda',
    email: 'abdoulaye@gmail.com',
    user_name: '@baabdoulaye',
    password: 'abdoulayeba123',
  });
  user.save();

  const newSpecialist = {
    userId: user._id,
    professionnal_address: 'PA-ASS',
    workplace: 'unite 23',
    job: 'medecin',
  };

  it('Should create a new specialist', async () => {
    const response = await request.post(baseURL+'/create-specialist').send(newSpecialist);
    expect(response.status).toBe(201);
  });

  it('should return all reported posts', async () => {
    const response = await request.get(baseURL+'/reported-posts');
    expect(response.status).toBe(200);
  });

  it('should return all retired accounts', async () => {
    const response = await request.get(baseURL+'/retired-accounts');
    expect(response.status).toBe(200);
  });
  it('should return all no retired accounts', async () => {
    const response = await request.get(baseURL+'/no-retired-accounts');
    expect(response.status).toBe(200);
  });
  it('should return all  accounts', async () => {
    const response = await request.get(baseURL+'/all-accounts');
    expect(response.status).toBe(200);
  });
  it('should return all  patients', async () => {
    const response = await request.get(baseURL+'/all-patients');
    expect(response.status).toBe(200);
  });
  it('should return all  followed patients', async () => {
    const response = await request.get(baseURL+'/followed-patients');
    expect(response.status).toBe(200);
  });
  it('should return all  unfollowed patients', async () => {
    const response = await request.get(baseURL+'/unfollowed-patients');
    expect(response.status).toBe(200);
  });
});
