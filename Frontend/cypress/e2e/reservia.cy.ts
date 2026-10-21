describe('Reservia - Login', () => {
  const email = 'iacevedoa@reservia.com'
  const password = '12345678'

  for (let i = 1; i <= 10; i++) {
    it(`Intento ${i} - inicia sesión correctamente`, () => {
      cy.visit('http://localhost:5173/auth')

      cy.get('input[type="email"]').type(email)
      cy.get('input[type="password"]').type(password)

      // Botón verde de login
      cy.contains('button', 'Iniciar sesión').click()

      // Por ahora verificamos que desaparezcan los campos del login
      cy.get('input[type="email"]', { timeout: 10000 })
        .should('not.exist')
    })
  }
})
