/// <reference types="cypress" />

describe("Login user", ()=>{
    
    it("inputing unregistered email and password should throw an authentication error", ()=>{
        cy.visit('')

       cy.get('#inputEmail').type('abctest@neki.com');
       cy.get('#inputPassword').type('teddybear');
       cy.get('[type="submit"]').click();
       cy.contains('Please sign in')

    })

    it("inputing registered email and password should navigate to home page", ()=>{
        
        cy.visit('')

         cy.get('#inputEmail').type('akugoomah@gmail.com');
         cy.get('#inputPassword').type('rt');
         cy.get('[type="submit"]').click();

         cy.contains('Forms', {
            timeout: 5000
          })

    })
})

describe('Logout User',()=>{

    it('Logging out works as expected',()=>{
        cy.visit('')

         cy.get('#inputEmail').type('akugoomah@gmail.com');
         cy.get('#inputPassword').type('rt');
         cy.get('[type="submit"]').click();
         cy.contains('Profile').click()
         cy.contains('Logout').click()
    })
})

describe('Registering as a new user',()=>{

    it('registering a new user- works as expected',()=>{
        cy.visit('')
        cy.contains('Register').click();
        cy.get('[placeholder="Enter first name"]').type('Irene')
        cy.get('[placeholder="Enter last name"]').type('Chidinma')
        cy.get('[placeholder="Enter email"]').type('nnekacaroline@gmail.com')
        cy.get('[placeholder="Enter phone number"]').type('08033257000')
        cy.get('[placeholder="Enter password"]').type('boyz2men')
        cy.get('[type="submit"]').click()
    })

    it('registering a new user- incomplete details leads to an error',()=>{
        cy.visit('')
        cy.contains('Register').click();
        cy.get('[placeholder="Enter first name"]').type('Irene')
        cy.get('[placeholder="Enter last name"]').type('Chidinma')
        cy.get('[placeholder="Enter email"]').type('nnekacaroline@gmail.com')
        cy.get('[placeholder="Enter password"]').type('boyz2men')
        cy.get('[type="submit"]').click()
        cy.contains('Whoops').should('be.visible')
    })


})

describe('Creating and previewing a form',()=>{

    it("Should be able to create and preview already created forms",()=>{
        cy.visit('')

         cy.get('#inputEmail').type('akugoomah@gmail.com');
         cy.get('#inputPassword').type('rt');
         cy.get('[type="submit"]').click();

         cy.contains('Forms', {
            timeout: 5000
          })

        cy.contains('Add New').click()
        cy.get('[ui-sref="app.forms.create"]').click()
        let formname = new Date().getTime().toString()

        cy.get('[placeholder="form name"]').type(formname)
        cy.contains('Static Text').click()
        cy.get('[ng-model="object.label"]').clear()
        cy.get('[ng-model="object.label"]').type('Fill the form')
        cy.contains('Multi-line Text').click()
        cy.get('[ng-model="object.label"]').clear()
        cy.get('[ng-model="object.label"]').type('About me')
        cy.contains('Save').click()
        cy.contains(formname).click()
        cy.contains('Preview').click()
        
        
    })
})

describe('User creation',()=>{

    it('creating a new user',()=>{
        cy.visit('')

         cy.get('#inputEmail').type('akugoomah@gmail.com');
         cy.get('#inputPassword').type('rt');
         cy.get('[type="submit"]').click();
         cy.get('[ui-sref="app.settings"]').click();
         cy.get('[href="/settings/users/new"]').then($elements => {cy.wrap($elements[1]).click();});
         cy.get('[placeholder="Enter first name"]').type('Ronke')
         cy.get('[placeholder="Enter last name"]').type('Akindele')
         let uniqueEmail = `${new Date().getTime()}@gmail.com`
         cy.get('[placeholder="Enter email"]').type(uniqueEmail)
         cy.get('[placeholder="Enter phone number"]').type('07033250250')
         cy.get('[placeholder="Enter address"]').type('66, lambe illumoyade street ago palace way')
         cy.get('[placeholder="Enter BVN"]').type('123458741258')
         cy.get('[placeholder="Enter Date of Birth"]').type('5/5/1995')
         cy.get('[name="gender"]').select('Female')
         cy.contains('Submit').click();
    })
})

describe('Admin user creation',()=>{

    it('creating a new Admin user',()=>{
        cy.visit('')

         cy.get('#inputEmail').type('akugoomah@gmail.com');
         cy.get('#inputPassword').type('rt');
         cy.get('[type="submit"]').click();
         cy.get('[ui-sref="app.settings"]').click();
         cy.get('[href="/settings/admins"]').then($elements => {cy.wrap($elements[0]).click();});
         cy.get('[href="/settings/admins/new"]').then($elements => {cy.wrap($elements[0]).click();});
         let uniqueEmail = `${new Date().getTime()}@gmail.com`
         cy.get('[placeholder="Enter email"]').type(uniqueEmail)
         cy.contains('Submit').click();
    })
})


describe('Change account role',()=>{

    it('Should be able to change an account role',()=>{
        cy.visit('')

         cy.get('#inputEmail').type('akugoomah@gmail.com');
         cy.get('#inputPassword').type('rt');
         cy.get('[type="submit"]').click();
         cy.get('[ui-sref="app.settings"]').click();
         cy.get('[href="/settings/admins"]').then($elements => {cy.wrap($elements[0]).click();});
         cy.get('[href="/settings/admins/62593c6d3528e84da2a5fe01/edit"]').click()
         cy.get('[name="role"]').select('Agent1')
         cy.contains('Submit').click()
         cy.contains('Cancel').click()
    })
})

describe.only('Creating and dispatching a form',()=>{

    it("Should be able to create and dispatch already created forms",()=>{
        cy.visit('')

         cy.get('#inputEmail').type('akugoomah@gmail.com');
         cy.get('#inputPassword').type('rt');
         cy.get('[type="submit"]').click();

         cy.contains('Forms', {
            timeout: 5000
          })

        cy.contains('Add New').click()
        cy.get('[ui-sref="app.forms.create"]').click()
        let formname = new Date().getTime().toString()

        cy.get('[placeholder="form name"]').type(formname)
        cy.contains('Static Text').click()
        cy.get('[ng-model="object.label"]').clear()
        cy.get('[ng-model="object.label"]').type('Fill the form')
        cy.contains('Multi-line Text').click()
        cy.get('[ng-model="object.label"]').clear()
        cy.get('[ng-model="object.label"]').type('About me')
        cy.contains('Save').click()
        cy.contains(formname).click()
        cy.get('[ui-sref=".manage"]').click()
        cy.contains('Dispatch Now').click()
        cy.contains('Start New Dispatch').click()
        cy.get('[placeholder="Select Agent, Start Typing ..."]').then($elements => {cy.wrap($elements[1]).type('test').type('{enter}');})
        cy.contains('Next').click()
        cy.get('[placeholder="Enter batch name"]').type(formname+' batch name')
        cy.get('[name="form"]').select('TestForm')
        cy.get('[placeholder="Enter due date"]').type('20/12/2022')
        cy.contains('Next').click()
        cy.get('[name="name"]').type(formname+' subject')
        cy.get("iframe").then(function($iframe) {
            const $body = $iframe.contents().find("body");
            cy.wrap($body[0].children[0]).type(formname+' message');
          }); 
        cy.contains('Next').click()
        cy.get('[type="submit"]').click()
    })
})