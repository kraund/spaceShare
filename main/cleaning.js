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
        await browser.pause(2000)
        var name
        //list of spaces
        do {
            name = await browser.$("b=task1")
            const level_up2 = await name.$('..')
            const level_up = await level_up2.$('..')
            const x = await level_up.$("[data-original-title='Delete']")
            await x.click()
            await browser.pause(2000)
            const confirm = await browser.$("[data-bb-handler='confirm']")
            await confirm.click()
            await browser.pause(2000)

        }
        while (name !== undefined)
    });
});