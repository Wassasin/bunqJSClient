import * as moxios from "moxios";

import BunqJSClient from "../../../src/BunqJSClient";

import Prepare from "../../TestHelpers/Prepare";
import SetupApp from "../../TestHelpers/SetupApp";
import { defaultResponse } from "../../TestHelpers/DefaultResponses";

let bunqApp: BunqJSClient;

describe("API", () => {
    beforeAll(async () => {
        moxios.install();

        // prepare certificates
        await Prepare();
        // create a bunqjsclient to be used in the tests
        bunqApp = await SetupApp("MonetaryAccountSavings");

        moxios.uninstall();
    });

    beforeEach(() => moxios.install());
    afterEach(() => moxios.uninstall());

    describe("MonetaryAccountSavings", () => {
        it("#GET", async () => {
            const request = bunqApp.api.monetaryAccountSavings.get(1, 3);
            await defaultResponse(moxios);
            const response = await request;

            expect(response).not.toBeNull();
        });

        it("#POST", async () => {
            const request = bunqApp.api.monetaryAccountSavings.post(
                1,
                "EUR",
                "Account description",
                {
                    value: "50.00",
                    currency: "EUR"
                },
                "#FF0000",
                100
            );
            await defaultResponse(moxios);
            const response = await request;

            expect(response).not.toBeNull();
        });

        it("#PUT", async () => {
            const request = bunqApp.api.monetaryAccountSavings.put(1, 2, {
                description: "New account description"
            });
            await defaultResponse(moxios);
            const response = await request;

            expect(response).not.toBeNull();
        });

        it("#PUT - Cancel account helper endpoint", async () => {
            const request = bunqApp.api.monetaryAccountSavings.putCancel(
                1,
                2,
                "CANCELLED",
                "REDEMPTION_VOLUNTARY",
                "No longer need the account"
            );
            await defaultResponse(moxios);
            const response = await request;

            expect(response).not.toBeNull();
        });

        it("#LIST", async () => {
            const request = bunqApp.api.monetaryAccountSavings.list(1);
            await defaultResponse(moxios);
            const response = await request;

            expect(response).not.toBeNull();
        });

        it("#LIST - with pagination options", async () => {
            const request = bunqApp.api.monetaryAccountSavings.list(1, {
                newer_id: 1,
                older_id: 2,
                count: 200
            });
            await defaultResponse(moxios);
            const response = await request;

            expect(response).not.toBeNull();
        });
    });
});
