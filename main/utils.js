module.exports = {
    visitUrl: async function (url) {
        browser.url(url)
        const title = await browser.getTitle()
        expect(title).to.equal(env.title)
    },

    getObjectMatchingSelector: async function (selector, parent_object = undefined) {
        let obj = undefined
        if (parent_object != undefined) {
            obj = await parent_object.$(selector)
        } else {
            obj = await browser.$(selector)
        }

        await obj.waitForExist(30000, false, "The following browser object was not found after 30 seconds: " + selector)
        return obj
    },

    getAllObjectsMatchingSelector: async function (selector, parent_object = undefined) {
        let obj = undefined
        if (parent_object != undefined) {
            obj = await this.getObjectMatchingSelector(selector, parent_object)
            await obj.waitForExist(30000)
            obj = await parent_object.$$(selector)
        } else {
            obj = await this.getObjectMatchingSelector(selector)
            await obj.waitForExist(30000)
            obj = await browser.$$(selector)
        }

        // waiting for existence of the first object from list
        await obj[0].waitForExist(30000, false, "The following browser object was not found after 30 seconds: " + selector)
        return obj
    },

    expectObjectAttributeToEqual: async function (selector, attr_name, value) {
        let current_value = undefined

        await browser.waitUntil(
            async () => {
                    const obj = await this.getObjectMatchingSelector(selector)
                    current_value = await obj.getAttribute(attr_name)
                    return current_value === value
                },
                30000,
                "The following attribute was not equal to the expected value after 30 seconds: " + attr_name + ".\nCurrent value is: " + current_value + "\nExpected value was: " + Object.toString(value),
                1000
        )
    },

    expectObjectToBeVisible: async function (selector) {
        const obj = await this.getObjectMatchingSelector(selector)
        try {
            let displayed = await obj.isDisplayed()
            expect(displayed).to.equal(true)
            return obj
        } catch (error) {
            let existing = await obj.isExisting()
            expect(existing).to.equal(true)
            console.log(error)
            console.warn("The following browser object cannot be determined to be visible but it is existing: " + selector)
            return obj
        }
    },

    expectChildObjectToBeVisible: async function (selector, parent_object) {
        const obj = await parent_object.$(selector)
        await obj.waitForExist(30000, false, "The following child object was not found after 30 seconds: " + selector)
        try {
            let displayed = await obj.isDisplayed()
            expect(displayed).to.equal(true)
            return obj
        } catch (error) {
            let existing = await obj.isExisting()
            expect(existing).to.equal(true)
            console.log(error)
            console.warn("The following child object cannot be determined to be visible but it is existing: " + selector)
            return obj
        }
    },

    waitUntilObjectIsVisibleAndClick: async function (selector) {
        const obj = await this.expectObjectToBeVisible(selector)
        await obj.click()
        return obj
    },

    toNumber(str) {
        const num = Number(str)
        return Number.isNaN(num) ? 0 : num
    },

    asyncForEach: async function (array, callback) {
        for (let index = 0; index < array.length; index++) {
            await callback(array[index], index, array);
        }
    },

    updated: function (
        id,
        country,
        league,
        status,
        homeTeam,
        guestTeam,
        score,
        half
    ) {
        matches[id] = {
            country: country,
            leauge: league,
            status: status,
            homeTeam: homeTeam,
            guestTeam: guestTeam,
            score: score,
            half: half
        };
    },
    getT: async function (selector, obj) {
        if (selector == env.country) {
            const countryObj = await obj.$(env.country);
            country = await countryObj.getText();
            return country
        } else if (selector == env.event) {
            const leagueObj = await obj.$(env.event);
            league = await leagueObj.getText();
            return league
        } else if (selector == env.home) {
            const homeTeamObj = await obj.$(env.home);
            homeTeam = await homeTeamObj.getText()
            hometeam = await homeTeam.replace(/(\r\n|\n|\r)/gm, "").replace(/GOAL/g, '').replace(/CORRECTION/g, '')
            return hometeam
        } else if (selector == env.guest) {
            const guestTeamObj = await obj.$(env.guest);
            guestTeam = await guestTeamObj.getText();
            guestteam = await guestTeam.replace(/(\r\n|\n|\r)/gm, "").replace(/GOAL/g, '').replace(/CORRECTION/g, '')
            return guestteam
        } else if (selector == env.status) {
            const matchStatusObj = await obj.$(env.status);
            status = await matchStatusObj.getText();
            return status
        } else if (selector == env.score) {
            const scoreObj = await obj.$(env.score);
            const scoreRaw = await scoreObj.getText();
            score = await scoreRaw.replace(/\s/g, "");
            return score
        } else if (selector == env.half) {
            const halfObj = await obj.$(env.half);
            const halfRaw = await halfObj.getText();
            half = await halfRaw.replace(/\s/g, "");
            return half
        } else if (selector == env.activity) {
            const actObj = await obj.$(env.activity)
            const activity = await actObj.getText()
            return activity
        }
    },
    arrows: async function () {
        const arrows = await browser.$$(env.arrows);
        await nxutils.asyncForEach(arrows, async obj => {
            const state = await obj.getAttribute("class");
            if (state == "event__expander icon--expander expand") {
                await obj.click();
            }
        })
    }

}