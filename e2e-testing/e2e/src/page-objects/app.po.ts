import { by, element, browser } from 'protractor';
import { BasePage } from './base.po';
import { Product } from 'src/app/models/product';

export class AppPage extends BasePage {
    constructor() {
        super({});

        this.elements = {

            // login page
            loginPage: element(by.css('.login-page')),
            loginUsernameInput: element(by.css('.login-page input[name=username]')),
            loginPasswordInput: element(by.css('.login-page input[name=password]')),
            loginButton: element(by.css('.login-page button.login-button')),

            // main page
            mainPage: element(by.css('.main-page')),
            mainHeaderTitle: element(by.css('.main-page .main-header')),

            // app nav page
            appNavPage: element(by.css('.app-nav-page')),
            homeNavTab: element(by.css('.app-nav-page .nav-home')),
            productsNavTab: element(by.css('.app-nav-page .nav-products')),
            logoutNavTab: element(by.css('.app-nav-page .nav-logout')),

            // home page
            homePage: element(by.css('.home-page')),
            welcomeHeader: element(by.css('.home-page .welcome-header')),
            welcomeSubHeader: element(by.css('.home-page .welcome-sub-header')),

            // products page
            productsPage: element(by.css('.products-page')),
            addNewProductLink: element(by.css('.products-page a .glyphicon-plus')),

            // to check the newly added product, since it is added at the end of the product array
            newProductEntry: element.all(by.css('.products-page .table .product-name')).last(),
            newProductEntryInfoButton: element.all(by.css('.products-page .table .glyphicon-info-sign')).last(),
            newProductEntryEditButton: element.all(by.css('.products-page .table .glyphicon-edit')).last(),
            newProductEntryDeleteButton: element.all(by.css('.products-page .table .glyphicon-trash')).last(),


            // products form page
            productFormPage: element(by.css('.product-form')),
            productFormPageNameInput: element(by.css('.product-form input[name=name]')),
            productFormPageDescriptionInput: element(by.css('.product-form textarea[name=description]')),
            productFormPagePriceInput: element(by.css('.product-form input[name=price]')),
            productFormPageIsAvailableInput: element(by.css('.product-form input[name=isAvailable]')),
            productFormSubmitButton: element(by.css('.product-form button#save')),

            // product details page
            productDetailsPage: element(by.css('.product-details')),
            productDetailsPageProductName: element(by.css('.product-details h3#name')),
            productDetailsPageProductDescription: element(by.css('.product-details p#description')),
            productDetailsPageProductIsAvailable: element(by.css('.product-details span#availability')),
            productDetailsPageProductPrice: element(by.css('.product-details li#price')),
            productDetailsPageEditProductButton: element(by.css('.product-details .panel-footer button#edit')),
            productDetailsPageDeleteProductButton: element(by.css('.product-details .panel-footer button#delete')),
        };
    }

    /**
     * fill login form
     * @param email the email
     * @param password the password
     */
    async fillLoginForm(email, password) {
        await this.waitUntil(this.elements.loginPage);
        await this.elements.loginUsernameInput.clear();
        await this.elements.loginPasswordInput.clear();
        await this.elements.loginUsernameInput.sendKeys(email);
        await this.elements.loginPasswordInput.sendKeys(password);
    }

    /**
     * fill new product form
     * @param name the name of the product
     * @param description the description of the product
     * @param price the price of the product
     * @param available the availability of the product
     */
    async fillNewProductForm(name, description, price, available) {
        await this.waitUntil(this.elements.productFormPage);
        await this.elements.productFormPageNameInput.clear();
        await this.elements.productFormPageDescriptionInput.clear();
        await this.elements.productFormPagePriceInput.clear();
        await this.elements.productFormPageNameInput.sendKeys(name);
        await this.elements.productFormPageDescriptionInput.sendKeys(description);
        await this.elements.productFormPagePriceInput.sendKeys(price);
        if (available) {
            await this.click(this.elements.productFormPageIsAvailableInput);
        }
    }

    /**
     * open menu item
     * @param elem the tab element
     * @param pageWrapper the page locator
     */
    async openNavigationTab(elem, pageWrapper) {
        await this.click(elem);
        await this.waitUntil(pageWrapper);
    }

    /**
     * check for product details in the product details page
     * @param product the product to be checked
     */
    async checkForCorrectness(product: Product) {
        expect(this.elements.productDetailsPageProductName.getText()).toEqual(product.name.toUpperCase());
        expect(this.elements.productDetailsPageProductDescription.getText()).toEqual(product.description);
        expect(this.elements.productDetailsPageProductPrice.getText()).toContain(product.price);
        if (product.isAvailable) {
            expect(this.elements.productDetailsPageProductIsAvailable.getText()).toEqual('Available');
        } else {
            expect(this.elements.productDetailsPageProductIsAvailable.getText()).toEqual('Not Available');
        }
    }

    /**
     * login with correct credentials
     * @param product the user
     */
    loginWithCorrectCredentials = async (user) => {
        // Login with the new account created above
        await this.fillLoginForm(user.username, user.password);
        browser.sleep(1000);
        await this.click(this.elements.loginButton);
    }

    /**
     * logout
     */
    logout = async () => {
        // logout
        this.openNavigationTab(this.elements.logoutNavTab, this.elements.loginPage);
        browser.sleep(3000);
    }

    /**
     * create a new product
     * @param product the product
     */
    async createNewProduct(product: Product) {
        // add new product
        await this.click(this.elements.addNewProductLink);

        // fill in the new product form
        await this.fillNewProductForm(product.name, product.description, product.price, product.isAvailable);
        await this.click(this.elements.productFormSubmitButton);
        browser.sleep(1000);

        // after adding new product, redirected to products page
        await this.waitUntil(this.elements.productsPage);
    }
}
