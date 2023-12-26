import dotenv from 'dotenv';
dotenv.config();

export const config = {
    baseUrl: process.env.BASE_URL || 'https://demoqa.com/login',
    userName: process.env.USERNAME || 'Maryna',
    password: process.env.PASSWORD || 'Whksuk8980!',
};