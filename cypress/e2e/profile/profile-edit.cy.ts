let profileId = ''

describe('Пользователь заходит на страницу профиля', () => {
  beforeEach(() => {
    cy.visit('')
    cy.login().then((data) => {
      profileId = data.id
      cy.visit('profile/' + data.id)
    })
  })

  afterEach(() => {
    cy.resetProfile(profileId)
  })

  it('И профиль успешно загружается', () => {
    cy.getByTestId('ProfileCard.first').should('have.value', 'testUser-first')
  })

  it('И редактирует его', () => {
    const newName = 'new'
    const newLastname = 'lastname'
    cy.updateProfile(newName, newLastname)
    cy.getByTestId('ProfileCard.first').should('have.value', newName)
    cy.getByTestId('ProfileCard.lastname').should('have.value', newLastname)
  })
})
