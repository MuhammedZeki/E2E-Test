describe('Login page', () => {
    beforeEach(() => {
        cy.visit("http://localhost:5174/login");
    })
    it('Form elemanları görünürr mü', () => {
        cy.get('h2').should('contain', 'Sign In')
        cy.get('#email').should('be.visible')
        cy.get('#password').should('be.visible')
        cy.get('#terms').should('be.visible')
    })
    it('Pass ve email yanlış girirsek hata vercek mi ', () => {
        cy.get('#email').type('invalid-email')
        cy.get('#password').type('123')

        cy.get('.invalid-feedback.show').should('have.length', 3)

        cy.get('.invalid-feedback.show')
            .should('contain', 'Please enter a valid email address')

        cy.get('.invalid-feedback.show')
            .should('contain', 'Password must be at least 4 characters long')
        cy.get('#submitBtn').should('be.disabled')
    })
    it('pass ve email girilip term işaretlenmesse hata verecek ml', () => {
        cy.get('#email').type('test@example.com')
        cy.get('#password').type('password123')
        cy.get('.invalid-feedback.show').should('have.length', 1)
        cy.get('#termsError')
            .should('contain', 'You must agree to terms of service')

        cy.get('#submitBtn').should('be.disabled')
    })
    it('Form başarılı olursa success page yönlendiriliyor mu', () => {


        cy.get('#email').type('erdem.guntay@wit.com.tr')
        cy.get('#password').type('9fxIH0GXesEwH_I')
        cy.get('#terms').check()

        cy.get('#submitBtn').should('not.be.disabled')

        cy.get('#submitBtn').click()


        cy.url().should('include', '/success')
    })
    it('Form başarısız olursa olursa Login yönlendiriliyor mu', () => {


        cy.get('#email').type('erdem@wit.com.tr')
        cy.get('#password').type('9fxIH0GXesEwH_I')
        cy.get('#terms').check()

        cy.get('#submitBtn').should('not.be.disabled')

        cy.get('#submitBtn').click()


        cy.url().should('include', '/login')
    })
})