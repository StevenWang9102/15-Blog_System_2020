export const displayLimit = 3;
export const offset = 0;

export const postDataToServerAll = (token, url, postData, message, type) => {
  let headers = { "Content-Type": "application/json" };
  let request = {
    method: `${type}`,
    headers
  };

  if (postData !== "NothingToPost") request["body"] = JSON.stringify(postData);
  if (token !== null) headers["Authorization"] = `Token ${token}`;

  const baseUrl = process.env.REACT_APP_API_BASE_URL;

  return fetch(`${baseUrl}${url}`, request).then(response => {
    if (response.ok) {
      return response.json().then(response => {
        console.log(` ==${message} Success==`, response);
        return response;
      });
    } else console.error(` ==Error: ${message} failed== `);
  });
};

export const fetchDataFromServer = (url, message) => {
  
  const baseUrl = process.env.REACT_APP_API_BASE_URL;

  return fetch(baseUrl + url).then(response => {
    if (response.ok) {
      return response.json().then(response => {
        console.log(` ==${message} Success==`, response);
        return response;
      });
    } else console.error(" ==Error: get data failed== ");
  });
};
