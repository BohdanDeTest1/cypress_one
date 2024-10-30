
Cypress.Commands.add('createExpense', (carId, mileage, liters, cost) => {
    const token = Cypress.env('authToken');

    if (!token) {
        throw new Error('Token not found');
    }

    cy.request({
        method: 'POST',
        url: '/api/expenses',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: {
            car_id: carId,
            mileage: mileage,
            liters: liters,
            total_cost: cost
        },
        failOnStatusCode: false
    }).then((response) => {
        expect(response.status).to.equal(201);
        return response.body.id;
    });
});

Cypress.Commands.add('loginAndSaveToken', () => {
    cy.request({
        method: 'POST',
        url: '/api/auth/signin',
        body: {
            email: Cypress.env('email'),
            password: Cypress.env('password')
        }
    }).then((response) => {
        expect(response.status).to.equal(200);
        const token = response.body.token;
        Cypress.env('authToken', token);
        cy.log(`Token saved: ${token}`);
    });
});