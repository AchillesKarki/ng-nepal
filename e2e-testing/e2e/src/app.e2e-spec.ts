import { AppPage } from './page-objects/app.po';
import { browser, logging } from 'protractor';
import { Product } from 'src/app/models/product';

describe('e2e-testing', () => {
  let page: AppPage;

  const user = {
    username: 'admin',
    password: 'admin',
  };

  const newProduct: Product = {
    name: 'a very new product',
    description: 'a very new product description',
    price: 100,
    isAvailable: true
  };

  const newProduct2: Product = {
    name: 'a very new product 2',
    description: 'a very new product description 2',
    price: 200,
    isAvailable: false
  };


  beforeEach(async () => {
    page = new AppPage();

    // navigate to root base url
    await page.openPage();
  });


  it('should login with correct credentials', async () => {

    // Login with the new account created above
    await page.fillLoginForm(user.username, user.password);
    await page.click(page.elements.loginButton);

    // enter the home page
    await page.waitUntil(page.elements.mainPage);
    await page.waitUntil(page.elements.homePage);

    // logout
    await page.logout();
  });

  it('should open the home page with correct heading', async () => {

    // login
    await page.loginWithCorrectCredentials(user);

    // enter the home page
    await page.waitUntil(page.elements.mainPage);
    await page.waitUntil(page.elements.homePage);

    // expect the home page header
    expect(page.elements.welcomeHeader.getText()).toEqual('Welcome to My Product Store');

    // logout
    await page.logout();
  });

  it('should create a new product', async () => {

    // login and goto main page
    await page.loginWithCorrectCredentials(user);
    await page.waitUntil(page.elements.mainPage);

    // navigate to products tab
    await page.openNavigationTab(page.elements.productsNavTab, page.elements.productsPage);
    await page.waitUntil(page.elements.productsPage);

    // create new product
    await page.createNewProduct(newProduct);

    // check whether the newly added product exists
    expect(page.elements.newProductEntry.getText()).toEqual(newProduct.name);

    // logout
    await page.logout();
  });

  it('should create a new product and delete it', async () => {

    // login and goto main page
    await page.loginWithCorrectCredentials(user);
    await page.waitUntil(page.elements.mainPage);

    // navigate to products tab
    await page.openNavigationTab(page.elements.productsNavTab, page.elements.productsPage);
    await page.waitUntil(page.elements.productsPage);

    // create new product
    await page.createNewProduct(newProduct2);

    // check whether the newly added product exists
    expect(page.elements.newProductEntry.getText()).toEqual(newProduct2.name);

    // delete the newly created product
    await page.click(page.elements.newProductEntryDeleteButton);
    browser
      .switchTo()
      .alert()
      .accept();

    // check whether the newly edited product is deleted
    expect(page.elements.newProductEntry.getText()).not.toEqual(newProduct2.name);

    // logout
    await page.logout();
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
