import { USER_LOCAL_STORAGE_KEY } from '../../../src/shared/consts/localStorage'

export const login = (username: string = 'testUser-username', password: string = 'testUser-password') => {
  cy.request({
    method: 'POST',
    url: 'http://localhost:8000/login',
    body: {
      username,
      password
    }
  }).then(({ body }) => {
    window.localStorage.setItem(USER_LOCAL_STORAGE_KEY, JSON.stringify(body))
  })
}
