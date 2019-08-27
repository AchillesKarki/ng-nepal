import { browser, protractor } from 'protractor';

export class BasePage {

    // timeout options
    timeout = {
        xl: 120000,
    };

    // selectors
    elements: any;

    constructor(options: any) {
        this.elements = options.elements;
    }

    /**
     * check whether the locator is present in dom or not
     * @param locator the element locator
     */
    inDom(locator) {
        return protractor.ExpectedConditions.presenceOf(locator);
    }

    /**
     * check whether the locator is absent in dom or not
     * @param locator the element locator
     */
    notInDom(locator) {
        return protractor.ExpectedConditions.stalenessOf(locator);
    }

    /**
     * waits until locator is available on dom
     * @param locator the element locator
     */
    async waitUntil(locator) {
        await browser.wait(() => {
            return this.inDom(locator);
        }, this.timeout.xl, 'timeout: waiting for element to load.');
    }

    /**
     * waits until locator is hidden from dom
     * @param locator the element locator
     */
    async waitUntilHide(locator) {
        await browser.wait(() => {
            return this.notInDom(locator);
        }, this.timeout.xl, 'timeout: waiting for element to hide.');
    }

    /**
     * Click an element
     */
    async click(locator) {
        await browser.wait(
            protractor.ExpectedConditions.elementToBeClickable(locator), this.timeout.xl);
        await locator.click();
    }

    /**
     * opens the page
     */
    openPage() {
        return browser.get(browser.baseUrl);
    }
}
