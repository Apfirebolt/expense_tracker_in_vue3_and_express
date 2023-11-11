
import request from "supertest";
import app from "../../index.js";

const baseUrl = 'https://jsonplaceholder.typicode.com/';

describe('Todos endpoint', () => {
	it('should return a 200 status code', async () => {
		const response = await request(baseUrl)
			.get('todos/1');

		expect(response.statusCode).toBe(200);
	});
})

describe('Main app point', () => {
    it('should return a 200 status code', async () => {
        const response = await request(app).get('/');

        expect(response.statusCode).toBe(200);
    });
})