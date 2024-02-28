/* eslint-disable @typescript-eslint/no-namespace */
export const updateProfile = (firstname: string, lastname: string) => {
  cy.getByTestId('EditableProfileCardHeader.EditButton').click()
  cy.getByTestId('ProfileCard.first').clear().type(firstname)
  cy.getByTestId('ProfileCard.lastname').clear().type(lastname)
  cy.getByTestId('EditableProfileCardHeader.SaveButton').click()
}

export const resetProfile = (profileId: string) => {
  return cy.request({
    method: 'PUT',
    url: `http://localhost:8000/profile/${profileId}`,
    headers: { Authorization: 'asasf' },
    body: {
      id: 'testUser',
      first: 'testUser-first',
      lastname: 'testUser-lastname',
      age: 777,
      currency: 'RUB',
      country: 'Russian',
      city: 'Moscow',
      username: 'testUser-username',
      avatar:
        'https://mobimg.b-cdn.net/v3/fetch/22/2207633df03a819cd72889249c8361a8.jpeg?w=1470&r=0.5625',
    },
  })
}

declare global {
  namespace Cypress {
    interface Chainable {
      updateProfile(firstname: string, lastname: string): Chainable<void>
      resetProfile(profileId: string): Chainable<void>
    }
  }
}
