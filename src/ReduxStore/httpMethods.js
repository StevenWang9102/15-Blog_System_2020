export const postDataToServerAll = (token, url, postData, message, type) => {
    let headers = { "Content-Type": "application/json" };
    let request = {
      method: `${type}`,
      headers
    };
  
    if (postData !== "NothingToPost") request["body"] = JSON.stringify(postData);
    if (token !== null) headers["Authorization"] = `Token ${token}`;
  
    return fetch(`https://conduit.productionready.io/api${url}`, request).then(
      response => {
        if (response.ok) {
          return response.json().then(response => {
            console.log(` -- ${message} Success —- ` + response);
            return response;
          });
        } else console.error(` -- Error: ${message} failed -- `);
      }
    );
  };
  
export const fetchDataFromServer = (url, message) => {
    return fetch("https://conduit.productionready.io/api" + url).then(
      response => {
        if (response.ok) {
          console.log(` -- ${message} Success -- ` + response);
          return response.json();
        } else console.error(" -- Error: get data failed -- ");
      }
    );
  };