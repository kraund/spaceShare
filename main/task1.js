describe("Login", function () {
  this.timeout(86400000);
  it("RF1: ", async function () {
    await browser.url(env.url);

    //sign in
    const login = await nxutils.expectObjectToBeVisible("[name='username']");
    await login.setValue(env.login);
    const pass = await nxutils.expectObjectToBeVisible("[name='password']");
    await pass.setValue(env.haslo);
    const submit = await nxutils.expectObjectToBeVisible("[type='submit']");
    await submit.click();

    //main page
    const dropdows = await browser.$$("[class='dropdown-toggle']");
    await dropdows[3].click();

    await nxutils.waitUntilObjectIsVisibleAndClick(
      "[href='/en/users/dashboard']"
    );

    //list of spaces
    await nxutils.waitUntilObjectIsVisibleAndClick(
      "[class*='space-adding-description']"
    );

    //pop-up window
    const venue_Field = await nxutils.expectObjectToBeVisible(
      "[id='venue-name']"
    );
    await venue_Field.setValue("task1");

    //1st page
    await nxutils.waitUntilObjectIsVisibleAndClick("[id='lets-start']");
    await nxutils.waitUntilObjectIsVisibleAndClick("[title*='Select']");
    await nxutils.waitUntilObjectIsVisibleAndClick("=Hotel");
    await browser.pause(2000);

    const city = await nxutils.expectObjectToBeVisible("[id='cSelector']");
    await city.setValue("Warsaw");
    await browser.pause(2000);

    const postCode = await nxutils.expectObjectToBeVisible("[id='postcode']");
    await postCode.setValue("02-691");
    const address = await nxutils.expectObjectToBeVisible("[id='address']");
    await address.setValue("Obrzezna 5a");
    const email = await nxutils.expectObjectToBeVisible("[id='emailaddress']");
    await email.setValue("vkraund@gmail.com");
    const phone = await nxutils.expectObjectToBeVisible("[id='telefon']");
    await phone.setValue("731920964");

    await browser.pause(1000);

    await nxutils.waitUntilObjectIsVisibleAndClick("[id='nextStep']");

    //2nd page
    await browser.pause(2000);

    await nxutils.waitUntilObjectIsVisibleAndClick("[id='monday_open']");
    const from = await browser.$('li=10:00')
    await from.click()
    await browser.pause(1000);
    await nxutils.waitUntilObjectIsVisibleAndClick("[id='monday_closed']");
    await browser.pause(1000);
    const to_time = await browser.$$('li=23:00')
    await to_time[1].click()
    await browser.pause(2000);
    await nxutils.waitUntilObjectIsVisibleAndClick("[id='saturday']");
    await nxutils.waitUntilObjectIsVisibleAndClick("[id='sunday']");
    await nxutils.waitUntilObjectIsVisibleAndClick("[id='nextStep']");

    //3rd page
    await browser.pause(1000)
    const desc_local = await nxutils.expectObjectToBeVisible(
      "[id='description-local']"
    );
    await desc_local.setValue("Gratulacje");

    const desc_eng = await nxutils.expectObjectToBeVisible(
      "[id='description-english']"
    );
    await desc_eng.setValue("Congratulations");

    const floors = await nxutils.expectObjectToBeVisible("[id='floors']");
    await floors.setValue("2");

    const area = await nxutils.expectObjectToBeVisible("[id='total-area']");
    await area.setValue("80");

    await browser.pause(2000);

    await nxutils.waitUntilObjectIsVisibleAndClick("[id='nextStep']");

    await browser.pause(2000);

    const parking = await nxutils.expectObjectToBeVisible(
      "[id='paid-parking']"
    );
    await parking.setValue("36");

    const park_area = await nxutils.expectObjectToBeVisible(
      "[id='where-to-park-local']"
    );
    await park_area.setValue("Mordor");

    const park_area_eng = await nxutils.expectObjectToBeVisible(
      "[id='where-to-park-english']"
    );
    await park_area_eng.setValue("Mordor");

    const directions = await nxutils.expectObjectToBeVisible(
      "[id='directions-local']"
    );
    await directions.setValue("Mordor");

    const directions_eng = await nxutils.expectObjectToBeVisible(
      "[id='directions-english']"
    );
    await directions_eng.setValue("Mordor");

    await browser.pause(2000);

    await nxutils.waitUntilObjectIsVisibleAndClick("[id='nextStep']");

    //4th page  (Uncommented solution for an element with input tag (input tag is required for an image to be added using the .sendKeys()))
    await browser.pause(2000);

    const remoteFilePath = await browser.uploadFile(
      "/Users/vladyslaw/Desktop/product/football2/main/sub-main/resources/operator_logo.png"
    );
    const paste = await browser.$('[id="upload"]');
    await paste.scrollIntoView();
    //await paste.doubleClick();
    await paste.addValue(remoteFilePath);
    //await paste.setValue(remoteFilePath);
    //await paste.setValue(remoteFilePath);
    await browser.pause(10000);

    // var path = require("path");
    // var toUpload = await path.join(__dirname, "..", "resources",
    //     "operator_logo.png");
    // await browser.uploadFile('[id="photoDropzone"]', toUpload);

    //const path = require('path');
    //const filePath = await path.join("/Users/vladyslaw/Desktop/product/football2/main/sub-main/resources/operator_logo.png");
    // const fileUpload = await browser.$('[id="upload"]');
    // await browser.execute(
    //   // assign style to elem in the browser
    //   el => (el.style.display = "block"),
    //   // pass in element so we don't need to query it again in the browser
    //   fileUpload
    // );
    // await fileUpload.waitForDisplayed();



    // const input = await browser.$('[id="insidePhotosUpload"]')
    // const submitBtn = await browser.$('[id="nextStep"]')

    // // store test file path
    // const filePath = path.join(__dirname, '/resources/operator_logo.png');

    // // use browser.uploadFile to upload the test file
    // const remoteFilePath = await browser.uploadFile(filePath);

    // // access the test page
    // //browser.url('/upload');

    // // set file path value in the input field
    // await input.setValue(remoteFilePath);
    // await submitBtn.click()
  });
});