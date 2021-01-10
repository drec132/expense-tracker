import instance from './instance'

async function login(email, password) {
  const loginRequest = {
    email: email,
    password: password,
  }

  try {
    const response = await instance.post(
      `login`,
      loginRequest
    )
    return response;
  } catch (error) {
    return error.response

  }
}

function logout() { }

export const authorizationService = {
  login,
  logout,
}
