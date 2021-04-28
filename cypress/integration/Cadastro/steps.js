//implementação dos passos descritos nas features
/// <reference types="cypress"/>

let Chance = require('chance');
let chance = new Chance();




When(/^informar meus dados$/, () => {
	//baseUrl + Register.html
    cy.visit('Register.html');

    //type
    cy.get('input[placeholder="First Name"]').type(chance.first())
    cy.get('input[ng-model^=Last]').type(chance.last())
    cy.get('input[ng-model^=Email]').type(chance.email())
    cy.get('input[ng-model^=Phone]').type(chance.phone({formatted: false}));

    //check -> radio buttons e checkboxes

    cy.get('input[value=FeMale]').check()
    cy.get('input[type=checkbox]').check('Cricket');
    cy.get('input[type=checkbox]').check('Hockey');

    //select -> select e select2 (combos)

    cy.get('select#Skills').select('Javascript')
    cy.get('select#countries').select('Argentina')
    cy.get('select#country').select('Australia', {force: true});
    cy.get('select#yearbox').select('1996')
    cy.get('select[ng-model ^=month').select('February')
    cy.get('select#daybox').select('24');

    //type
    cy.get('input#firstpassword').type('Agilizei@2020');
    cy.get('input#secondpassword').type('Agilizei@2020');

    //attach file
    cy.get('input#imagesrc').attachFile('foto.png');
});

When(/^salvar$/, () => {
	 //click

    cy.get('button#submitbtn').click();
});

Then(/^devo ser cadastrado com sucesso$/, () => {
	cy.wait('@postUsertable').then((resUsertable) => {
        expect(resUsertable.status).to.equal(200)

    })

    cy.wait('@gettNewtable').then((resNewtable) => {
            expect(resNewtable.status).to.equal(200)
    })

    cy.url().should('contain', 'WebTable');


});

