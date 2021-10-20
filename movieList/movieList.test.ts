import { Builder, Capabilities, By } from "selenium-webdriver"
import { textChangeRangeIsUnchanged } from "typescript"

const chromedriver = require('chromedriver')

const driver = new Builder().withCapabilities(Capabilities.chrome()).build()

beforeAll(async () => {
    await driver.get('http://localhost:5500/index.html')
})

afterAll(async () => {
    await driver.quit()
})
describe('Automated Testing', () => {
    test('Add movie to the page', async () => {
        let newInput = await driver.findElement(By.css("input"))
        await newInput.sendKeys('Lord of the Rings')
        await driver.findElement(By.css('button')).click()
        await driver.sleep(2000)
    })

    test('Add 2nd movie to the list', async () => {
        let newInput = await driver.findElement(By.css("input"))
        await newInput.clear()
        await newInput.sendKeys('The Hobbit')
        await driver.findElement(By.css('button')).click()
        await driver.sleep(2000)

    })

    test('Cross a movie off from the list', async () => {
        await driver.findElement(By.xpath('(//span)[2]')).click()
        let messageText = await driver.findElement(By.css("#message")).getText()
        expect(messageText).toEqual('The Hobbit watched!')
        await driver.sleep(8000)
    })

    test('Delete a movie from the list', async () => {
        await driver.findElement(By.xpath('(//button)[2]')).click()
        let messageText = await driver.findElement(By.css("#message")).getText()
        expect(messageText).toEqual('Lord of the Rings deleted!')
        await driver.sleep(8000)
    })
})