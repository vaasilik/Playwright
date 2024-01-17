import { test, expect } from 'playwright/test';
import axios, { AxiosInstance } from 'axios';
import { wrapper } from 'axios-cookiejar-support';
import { CookieJar } from 'tough-cookie';


test.describe.only(async () => {
    let client: AxiosInstance;
    let userId: string;
    let token: string;
    let isbn: string = "9781593277574";


    test.beforeAll(async () => {
        const jar = new CookieJar();
        console.log(process.env.APIURL);
        client = wrapper(axios.create({
            baseURL: process.env.APIURL,
            validateStatus: function (status) {
                return status >= 200 && status < 300;
            },
            jar
        }));
        // https://demoqa.com/Account/v1/Login


        const loginData = await client.post('https://demoqa.com/Account/v1/Login', {
            "userName": "Maryna",
            "password": "Whksuk8980"
        });


        userId = loginData.data.userId;
        token = loginData.data.token;


        // console.log(loginData.status);
        // console.log(loginData.data);
        // console.log(loginData.headers);
        client.defaults.headers.common['Authorization'] = `Bearer ${token}`;


        // let actualUserBooks = await client.get('Account/v1/User/*')
        // console.log(actualUserBooks.data);
    });


    test('Delete all books before', async () => {
        let actualUserBooks = await client.get(`/Account/v1/User/${userId}`)
        console.log(actualUserBooks.data);
        if (await actualUserBooks.data.books.length > 0) {
            for (let index = 0; index < await await actualUserBooks.data.books.length; index++) {
                const deleteBookResponse = await client.delete('/BookStore/v1/Book', {
                    data: {
                        "isbn": actualUserBooks.data.books[0].isbn,
                        "userId": userId
                    }
                });
                expect(deleteBookResponse.status).toBe(204);
            }
        }
    })


    test('Post New Book', async ({page}) => {
        await page.waitForTimeout(1000);
        const addBookResponse = await client.post('/BookStore/v1/Books', {
            "userId": userId,
            "collectionOfIsbns": [
                {
                    "isbn": isbn
                }
            ]
        });
        expect(addBookResponse.status).toBe(201);
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