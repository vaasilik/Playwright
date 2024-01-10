import { test } from 'playwright/test';
import axios, { AxiosInstance } from 'axios';
import { wrapper } from 'axios-cookiejar-support';
import { CookieJar } from 'tough-cookie';

test.describe.only(async () => {
    let client: AxiosInstance;
    let userId: string;
    let token: string;

    test.beforeAll(async () => {
        const jar = new CookieJar();

        client = wrapper(axios.create({
            baseURL: process.env.APIURL,
            validateStatus: function (status) {
                return status >= 200 && status < 300;
            },
            jar
        }));

        const loginData = await client.post('Account/v1/Login', {
            "userName": "Maryna",
            "password": "Whksuk8980!"
        });

        userId = loginData.data.userId;
        token = loginData.data.token;

        // console.log(loginData.status);
        // console.log(loginData.data);
        // console.log(loginData.headers);
        client.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    });

    test('post new book', async ({ page }) => {

        const response = client.post('/BookStore/v1/Books', {
            "userId": userId,
            "collectionOfIsbns": [
            {
                isbn: "9781593277574",
            }
        ]
    })
        console.log(response);
    });
});