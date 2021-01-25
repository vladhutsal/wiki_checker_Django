import Cookies from 'js-cookie'; 

export async function handleRequest(method, url, data) {
    const csrftoken = Cookies.get('csrftoken');
    const request = {
      method: method,
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrftoken
      }
    };
    const resp = await fetch(url, request);
    const respContent = await resp.json();
    return respContent.data;
  }
