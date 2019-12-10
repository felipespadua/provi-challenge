const request = require('supertest');
const app = require('./app'); // our Node application
const User = require("./models/User")

User.collection.drop()

describe('Register User', () => {
  it('Succeeds with email and password', async () => {
    const demoUser = {
      email: "felipespadua@hotmail.com",
      password: "12345"
    }
    const response = await post(`/api/V1/user/signup`, demoUser)
      .expect(200);
    expect(response.body.auth).toBeTruthy();
    expect(response.body.token).not.toBeNull();
    global.token = response.body.token
  });
  it('Fails trying to register again with same email ', async () => {
    const demoUser = {
      email: "felipespadua@hotmail.com",
      password: "23456"
    }
    const response = await post(`/api/V1/user/signup`, demoUser)
      .expect(400);
    expect(response.body.message).toBe("The email already exists");
  });
});

describe('Register Users CPF', () => {
  it('Succeeds with correct data and token', async () => {
    const demoData = {
      data: "43306027847",
      token: global.token
    }
    const response = await post(`/api/V1/user/cpf`, demoData)
      .expect(200);
    expect(response.body.success).toBeTruthy();
    expect(response.body.next_end_point).toBe("full-name");
  });
  it('Fails without token', async () => {
    const demoData = {
      data: "43306027847"
    }
    const response = await post(`/api/V1/user/cpf`, demoData)
      .expect(401);
    expect(response.body.auth).toBeFalsy();
    expect(response.body.message).toBe('No token provided.');
  });
  it('Fails with incorrect token', async () => {
    const demoData = {
      data: "43306027847",
      token: "Dnafdamkfedfw3e223rewfsf"
    }
    const response = await post(`/api/V1/user/cpf`, demoData)
      .expect(500);
    expect(response.body.auth).toBeFalsy();
    expect(response.body.message).toBe('Failed to authenticate token.');
  });
  it('Fails with incorrect data', async () => {
    const demoData = {
      cpf: "43306027847",
      token: global.token
    }
    const response = await post(`/api/V1/user/cpf`, demoData)
      .expect(422);
    expect(response.body).toHaveProperty("errors")
  });
  it('Fails without data', async () => {
    const demoData = {
      token: global.token
    }
    const response = await post(`/api/V1/user/cpf`, demoData)
      .expect(422);
    expect(response.body).toHaveProperty("errors")
  });
});

describe('Register Users Full Name', () => {
  it('Succeeds with correct data and token', async () => {
    const demoData = {
      data: "Felipe Sekkar",
      token: global.token
    }
    const response = await post(`/api/V1/user/full-name`, demoData)
      .expect(200);
    expect(response.body.success).toBeTruthy();
    expect(response.body.next_end_point).toBe("birthday");
  });
  it('Fails without token', async () => {
    const demoData = {
      data: "Felipe Sekkar"
    }
    const response = await post(`/api/V1/user/full-name`, demoData)
      .expect(401);
    expect(response.body.auth).toBeFalsy();
    expect(response.body.message).toBe('No token provided.');
  });
  it('Fails with incorrect token', async () => {
    const demoData = {
      data: "Felipe Sekkar",
      token: "Dnafdamkfedfw3e223rewfsf"
    }
    const response = await post(`/api/V1/user/full-name`, demoData)
      .expect(500);
    expect(response.body.auth).toBeFalsy();
    expect(response.body.message).toBe('Failed to authenticate token.');
  });
  it('Fails with incorrect data', async () => {
    const demoData = {
      name: "Felipe Sekkar",
      token: global.token
    }
    const response = await post(`/api/V1/user/full-name`, demoData)
      .expect(422);
    expect(response.body).toHaveProperty("errors")
  });
  it('Fails without data', async () => {
    const demoData = {
      token: global.token
    }
    const response = await post(`/api/V1/user/full-name`, demoData)
      .expect(422);
    expect(response.body).toHaveProperty("errors")
  });
});

describe('Register Users Birthday', () => {
  it('Succeeds with correct data and token', async () => {
    const demoData = {
      data: "1995-04-21",
      token: global.token
    }
    const response = await post(`/api/V1/user/birthday`, demoData)
      .expect(200);
    expect(response.body.success).toBeTruthy();
    expect(response.body.next_end_point).toBe("phone-number");
  });
  it('Fails without token', async () => {
    const demoData = {
      data: "1995-04-21"
    }
    const response = await post(`/api/V1/user/birthday`, demoData)
      .expect(401);
    expect(response.body.auth).toBeFalsy();
    expect(response.body.message).toBe('No token provided.');
  });
  it('Fails with incorrect token', async () => {
    const demoData = {
      data: "1995-04-21",
      token: "Dnafdamkfedfw3e223rewfsf"
    }
    const response = await post(`/api/V1/user/birthday`, demoData)
      .expect(500);
    expect(response.body.auth).toBeFalsy();
    expect(response.body.message).toBe('Failed to authenticate token.');
  });
  it('Fails with incorrect data', async () => {
    const demoData = {
      date: "1995-04-21",
      token: global.token
    }
    const response = await post(`/api/V1/user/birthday`, demoData)
      .expect(422);
    expect(response.body).toHaveProperty("errors")
  });
  it('Fails without data', async () => {
    const demoData = {
      token: global.token
    }
    const response = await post(`/api/V1/user/birthday`, demoData)
      .expect(422);
    expect(response.body).toHaveProperty("errors")
  });
});

describe('Register Users Phone Number', () => {
  it('Succeeds with correct data and token', async () => {
    const demoData = {
      data: "(11)98252-6247",
      token: global.token
    }
    const response = await post(`/api/V1/user/phone-number`, demoData)
      .expect(200);
    expect(response.body.success).toBeTruthy();
    expect(response.body.next_end_point).toBe("address");
  });
  it('Fails without token', async () => {
    const demoData = {
      data: "(11)98252-6247"
    }
    const response = await post(`/api/V1/user/phone-number`, demoData)
      .expect(401);
    expect(response.body.auth).toBeFalsy();
    expect(response.body.message).toBe('No token provided.');
  });
  it('Fails with incorrect token', async () => {
    const demoData = {
      data: "(11)98252-6247",
      token: "Dnafdamkfedfw3e223rewfsf"
    }
    const response = await post(`/api/V1/user/phone-number`, demoData)
      .expect(500);
    expect(response.body.auth).toBeFalsy();
    expect(response.body.message).toBe('Failed to authenticate token.');
  });
  it('Fails with incorrect data', async () => {
    const demoData = {
      tel: "(11)98252-6247",
      token: global.token
    }
    const response = await post(`/api/V1/user/phone-number`, demoData)
      .expect(422);
    expect(response.body).toHaveProperty("errors")
  });
  it('Fails without data', async () => {
    const demoData = {
      token: global.token
    }
    const response = await post(`/api/V1/user/phone-number`, demoData)
      .expect(422);
    expect(response.body).toHaveProperty("errors")
  });
});

describe('Register Users Address', () => {
  it('Succeeds with correct data and token', async () => {
    const demoData = {
      data: {
        "cep": "01333000",
        "street": "Rua São Carlos do Pinhal",
        "number": 311,
        "complement": "Apartamento 32",
        "city": "São Paulo",
        "state": "SP"
      },
      token: global.token
    }
    const response = await post(`/api/V1/user/address`, demoData)
      .expect(200);
    expect(response.body.success).toBeTruthy();
    expect(response.body.next_end_point).toBe("amount-requested");
  });
  it('Fails without token', async () => {
    const demoData = {
      data: {
        "cep": "01333000",
        "street": "Rua São Carlos do Pinhal",
        "number": 311,
        "complement": "Apartamento 32",
        "city": "São Paulo",
        "state": "SP"
      },
    }
    const response = await post(`/api/V1/user/address`, demoData)
      .expect(401);
    expect(response.body.auth).toBeFalsy();
    expect(response.body.message).toBe('No token provided.');
  });
  it('Fails with incorrect token', async () => {
    const demoData = {
      data: {
        "cep": "01333000",
        "street": "Rua São Carlos do Pinhal",
        "number": 311,
        "complement": "Apartamento 32",
        "city": "São Paulo",
        "state": "SP"
      },
      token: "Dnafdamkfedfw3e223rewfsf"
    }
    const response = await post(`/api/V1/user/address`, demoData)
      .expect(500);
    expect(response.body.auth).toBeFalsy();
    expect(response.body.message).toBe('Failed to authenticate token.');
  });
  it('Fails with incorrect data', async () => {
    const demoData = {
      endereco:{
        "cep": "01333000",
        "street": "Rua São Carlos do Pinhal",
        "number": 311,
        "complement": "Apartamento 32",
        "city": "São Paulo",
        "state": "SP"
      }, 
      token: global.token
    }
    const response = await post(`/api/V1/user/address`, demoData)
      .expect(422);
    expect(response.body).toHaveProperty("errors")
  });
  it('Fails without data', async () => {
    const demoData = {
      token: global.token
    }
    const response = await post(`/api/V1/user/address`, demoData)
      .expect(422);
    expect(response.body).toHaveProperty("errors")
  });
});

function post(url, body) {
  const httpRequest = request(app).post(url);
  httpRequest.send(body);
  httpRequest.set('Accept', 'application/json')
  httpRequest.set('Origin', 'http://localhost:3000')
  return httpRequest;
}