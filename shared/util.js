export const HTTP_METHODS = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE',
};


export async function fetchData(url, method, data) {
    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
  
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }
  
      const responseData = await response.json();
      return responseData;
      
    } catch (error) {
      throw error; // 에러를 다시 던져서 호출자에게 전달
    }
  }