/// <reference types="cypress"/>


Given(/^que o site não possui registros$/, () => {
	cy.server();
    cy.route({
        method: 'GET',
        url: '**/api/1/databases/userdetails/collections/newtable?**',
        status: 200,
        response: 'fx:webtable-get-vazio'
    })     .as('getNewtable');
});

When(/^acessar a listagem$/, () => {
    cy.visit('webtable.html')

});

Then(/^devo visualizar a listagem vazia$/, () => {
    cy.get('div[role=row]').should('have.length', 1)
	
});


Given(/^que o site possui apenas um registro$/, () => {
    cy.server();
    cy.route({
        method: 'GET',
        url: '**/api/1/databases/userdetails/collections/newtable?**',
        status: 200,
        response: 'fx:webtable-get-unico'
    })     .as('getNewtable');
	
});

Then(/^devo visualizar apenas um registro$/, () => {
    cy.get('div[role=row] div[role-=gridecell]').eq(4).find('div').as('grideCellPhone');
    cy.get('@grideCellPhone').should('contain.text', '329876543');
         
	
});
