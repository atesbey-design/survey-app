import { getCookie } from 'cookies-next';

// Check if the application is in development mode
export const INDEV = process.env.NODE_ENV === 'development';

// Define the base URL for API requests based on the environment
const apiurl = INDEV
  ? process.env.NEXT_PUBLIC_API_URL || 'http://localhost:32500/'
  : 'http://[::1]:32500';

// API client functions for making HTTP requests
export const api: any = {
  // Function to make a GET request to the API
  get: async (endpoint: string, data: any) => {
    const request = await fetch(apiurl + endpoint, {
      method: 'GET',
      body: data,
      headers: {
        credentials: getCookie('survey::credentials', { path: '/' }),
      } as any,
    });

    if (request.status === 200) {
      return request.json();
    }

    throw request;
  },
  // Function to make a POST request to the API with JSON data
  post: async (endpoint: string, data: any) => {
    const request = await fetch(apiurl + endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        credentials: getCookie('survey::credentials', { path: '/' }),
      } as any,
    });

    if ([200, 201].indexOf(request.status) !== -1) {
      return request.json();
    }

    throw request;
  },
  // Function to make a POST request to the API with file data
  postFile: async (endpoint: string, data: any) => {
    const request = await fetch(apiurl + endpoint, {
      method: 'POST',
      body: data,
      headers: {
        credentials: getCookie('survey::credentials', { path: '/' }),
      } as any,
    });
    
    if ([200, 201].indexOf(request.status) !== -1) {
      try {
        return await request.json();
      } catch (e) {
        return request;
      }
    }
  },
  // Function to make a GET request to the API and retrieve data as a buffer
  buffer: async (endpoint: string) => {
    const request = await fetch(apiurl + endpoint, {
      method: 'GET',
      headers: {
        credentials: getCookie('survey::credentials', { path: '/' }),
      } as any,
    });

    if (request.status === 200) {
      return request.arrayBuffer();
    }

    throw new Error('Failed to fetch buffer');
  },
};

// Define a client object that includes the API client
export const clients = {
  api,
};

export default clients;
