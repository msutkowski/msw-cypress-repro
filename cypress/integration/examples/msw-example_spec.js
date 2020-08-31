describe('A weird test', () => {
    it('Loads the app and gets an error once, then revisits', () => {
        cy.visit('http://localhost:3000')
        cy.window().then(window => {
            const { worker, rest } = window.msw;
            worker.use(
              rest.get('https://httpbin.org/anything', (req, res, ctx) => {
                return res.once(ctx.status(422), ctx.json({ message: "Bad data" }));
              })
            );
          });
          cy.findByText(/Bad Data/i).should('be.visible')

          cy.visit('http://localhost:3000')

          cy.findByText(/mozzarella/i).should('be.visible')
    })
  })