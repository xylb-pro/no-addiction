/**
 * Function to create more usefull HTTP request. Need's because standart
 * fetch function looks big.
 * @param url - request URL
 * @param method - request method
 * @param token - auth token
 * @param data - data to request (body)
 */

export async function requestHTTP(
  url: string,
  method: string = 'GET',
  token: string,
  data: any = null,
) {
  try {
    const headers: { [key: string]: string } = {};

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    let body = null;

    if (data) {
      headers['Content-Type'] = 'application/json';
      body = JSON.stringify(data);
    }

    const response = await fetch(url, {
      method,
      headers,
      body,
    });

    const res = await response.json();

    if (!response.ok) {
      throw new Error(res.message || 'Some server error!');
    }

    return res;
  } catch (error) {
    throw new Error(error.message);
  }
}

export const backEndLink = 'http://localhost:3000';
