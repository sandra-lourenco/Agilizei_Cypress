/// <reference types="cypress"/>

 context('Listagem', () => {
     it('Listagem sem registros', () => {
         cy.server();
         cy.route({
             method: 'GET',
             url: '**/api/1/databases/userdetails/collections/newtable?**',
             status: 200,
             response: 'fx:webtable-get-vazio'
         })     .as('getNewtable');

         cy.visit('webtable.html');
         
         cy.get('div[role=row]').should('have.length', 1);
         
     });


     it('Listagem com apenas um registro', () => {
        cy.server();
         cy.route({
             method: 'GET',
             url: '**/api/1/databases/userdetails/collections/newtable?**',
             status: 200,
             response: 'fx:webtable-get-unico'
         })     .as('getNewtable');

         cy.visit('webtable.html');

         cy.get('div[role=row] div[role-=gridecell]').eq(4).find('div').as('grideCellPhone');
         cy.get('@grideCellPhone').should('contain.text', '329876543');

         //em tabelas
         //linha 1 -> .first()
         //2
         //3
         //4 -> .eq(3)
         //5 -> .last()
     });
     
    });