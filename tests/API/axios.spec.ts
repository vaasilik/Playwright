import { test, expect } from 'playwright/test';
import axios, { AxiosInstance } from 'axios';
import { wrapper } from 'axios-cookiejar-support';
import { CookieJar } from 'tough-cookie';

test.describe.only(async () => {
    let client: AxiosInstance;
    let userId: string;
    let token: string;
    let isbn: string;

    test.beforeAll(async () => {
        const jar = new CookieJar();

        client = wrapper(axios.create({
            baseURL: process.env.APIURL,
            validateStatus: function (status) {
                return status >= 200 && status < 300;
            },
            jar
        }));

        const loginData = await client.post('/Account/v1/Login', {
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

    test('Post New Book', async () => {
        const addBookResponse = await client.post('/BookStore/v1/Books', {
            "userId": userId,
            "collectionOfIsbns": [
                {
                    isbn: "9781593277574",
                }
            ]
        });
        expect(addBookResponse.status).toBe(200);
        console.log(addBookResponse);
    });

    test('Delete Book', async () => {
        const deleteBookResponse = await client.delete(`/BookStore/v1/Books?userId=${userId}&isbn=${isbn}`);
        expect(deleteBookResponse.status).toBe(200);
        console.log(`Book deleted with ISBN: ${isbn}`);
    });

    test('Check User Books Count', async () => {
        const userBooksResponse = await client.get(`/Account/v1/User/${userId}`);
        expect(userBooksResponse.status).toBe(200);
        console.log(`User ${userId} has ${userBooksResponse.data.books.length} books`);
    });
});