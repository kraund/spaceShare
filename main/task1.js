describe("Login", function () {
  this.timeout(86400000);
  it("RF1: ", async function () {
    await browser.url(env.url);

    //sign in
    const login = await nxutils.expectObjectToBeVisible(env.username);
    await login.setValue(env.login);
    const pass = await nxutils.expectObjectToBeVisible(env.password);
    await pass.setValue(env.haslo);
    const submit = await nxutils.expectObjectToBeVisible(env.submit);
    await submit.click();

    //main page
    const dropdows = await browser.$$(env.dropdowns);
    await dropdows[3].click();

    await nxutils.waitUntilObjectIsVisibleAndClick(env.dashboard);

    //list of spaces
    await nxutils.waitUntilObjectIsVisibleAndClick(env.SAD);

    //pop-up window
    const venue_Field = await nxutils.expectObjectToBeVisible(env.venueName);
    await venue_Field.setValue("task1");

    //1st page
    await nxutils.waitUntilObjectIsVisibleAndClick(env.start);
    await nxutils.waitUntilObjectIsVisibleAndClick(env.titleSelect);
    await nxutils.waitUntilObjectIsVisibleAndClick(env.hotel);
    await browser.pause(2000);

    const city = await nxutils.expectObjectToBeVisible(env.city);
    await city.setValue("Warsaw");
    await browser.pause(2000);

    const postCode = await nxutils.expectObjectToBeVisible(env.postCode);
    await postCode.setValue("02-691");
    const address = await nxutils.expectObjectToBeVisible(env.address);
    await address.setValue("Obrzezna 5a");
    const email = await nxutils.expectObjectToBeVisible(env.email);
    await email.setValue("vkraund@gmail.com");
    const phone = await nxutils.expectObjectToBeVisible(env.phone);
    await phone.setValue("731920964");

    await browser.pause(1000);

    await nxutils.waitUntilObjectIsVisibleAndClick(env.nextStep);

    //2nd page
    await browser.pause(2000);

    await nxutils.waitUntilObjectIsVisibleAndClick(env.mondayO);
    const from = await browser.$('li=10:00')
    await from.click()
    await browser.pause(1000);
    await nxutils.waitUntilObjectIsVisibleAndClick(env.mondayC);
    await browser.pause(1000);
    const to_time = await browser.$$('li=23:00')
    await to_time[1].click()
    await browser.pause(2000);
    await nxutils.waitUntilObjectIsVisibleAndClick(env.saturday);
    await nxutils.waitUntilObjectIsVisibleAndClick(env.sunday);
    await nxutils.waitUntilObjectIsVisibleAndClick(env.nextStep);

    //3rd page
    await browser.pause(1000)
    const desc_local = await nxutils.expectObjectToBeVisible(env.descLocal);
    await desc_local.setValue("Gratulacje");

    const desc_eng = await nxutils.expectObjectToBeVisible(env.descEng);
    await desc_eng.setValue("Congratulations");

    const floors = await nxutils.expectObjectToBeVisible(env.floors);
    await floors.setValue("2");

    const area = await nxutils.expectObjectToBeVisible(env.area);
    await area.setValue("80");

    await browser.pause(2000);

    await nxutils.waitUntilObjectIsVisibleAndClick(env.nextStep);

    await browser.pause(2000);

    const parking = await nxutils.expectObjectToBeVisible(env.parking);
    await parking.setValue("36");

    const park_area = await nxutils.expectObjectToBeVisible(env.parkArea);
    await park_area.setValue("Mordor");

    const park_area_eng = await nxutils.expectObjectToBeVisible(env.parkAreaEng);
    await park_area_eng.setValue("Mordor");

    const directions = await nxutils.expectObjectToBeVisible(env.directionsLocal);
    await directions.setValue("Mordor");

    const directions_eng = await nxutils.expectObjectToBeVisible(env.directionsEng);
    await directions_eng.setValue("Mordor");

    await browser.pause(2000);

    await nxutils.waitUntilObjectIsVisibleAndClick(env.nextStep);

    //4th page  
    await browser.pause(2000);

    const venuePhoto = await browser.uploadFile(
      "/Users/vladyslaw/Desktop/spaceShare/qa/c8b468ed42eb9036e1a0c5aa68e9.jpeg"); //nalezy poprawic ściezkę
    const dropBoxes = await browser.$$(env.imageDropbox);
    const dropZoneVenue = dropBoxes[1]
    const dropZoneInteriorVenue = dropBoxes[0]

    await dropZoneVenue.addValue(venuePhoto);
    await browser.pause(4000);
    await dropZoneInteriorVenue.addValue(venuePhoto);
    await browser.pause(5000);
    await dropBoxes[2].addValue(venuePhoto);
    await browser.pause(5000);
    await dropZoneVenue.addValue(venuePhoto);
    await browser.pause(5000);
    await dropZoneVenue.addValue(venuePhoto);
    await browser.pause(3000);
    await dropZoneVenue.addValue(venuePhoto);
    await browser.pause(3000);

    await nxutils.waitUntilObjectIsVisibleAndClick(env.nextStep)

    //5th page
    await browser.pause(2000)
    await nxutils.waitUntilObjectIsVisibleAndClick(env.nextStep)
    await browser.pause(2000)
  });
});