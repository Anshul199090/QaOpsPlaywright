const { Given, When, Then } = require('@cucumber/cucumber')
const { POManager } = require('../')

Given('a login to ecommerce application with {username} and {password}', async function (username, password) {
    const poManager = new POManager(page);
    const loginPage = poManager.getLoginPage();
    await loginPage.goToUrl();
    await loginPage.validLogin(data.userName, data.password);
});

When('Add {string} to the cart', function (string) {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
});

Then('Verify {string} is displayed in the cart', function (string) {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
});

When('Enter valid details and Place the order', function () {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
});

Then('Verify order in present in the OrderHistory.', function () {
    // Write code here that turns the phrase above into concrete actions
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
});