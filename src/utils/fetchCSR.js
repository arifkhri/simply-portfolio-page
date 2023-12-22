const fetchCSR = () => {

  const baseUrl = process.env.NEXT_PUBLIC_API;

  const authConfig = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const post = (url, payload, config) => {

    const defaultConfig = {
      method: 'POST',
      body: JSON.stringify(payload),
      ...authConfig,
      ...config,
    };

    return new Promise((resolved, reject) => {
      try {
        fetch(`${baseUrl}${url}`, defaultConfig).then((res) => res.json()).then(res => {
          if (((res.status && res.status !== 200 && res.status !== 201) || (res.statusCode && res.statusCode !== 200 && res.statusCode !== 201)) || res.errors?.length > 0) {
            reject(res);
          } else {
            resolved(res);
          }
        });
      } catch (e) {
        reject(e);
      }
    });
  }

  const put = (url, payload) => {

    const config = {
      method: 'PUT',
      body: JSON.stringify(payload),
      ...authConfig,
    };

    return fetch(`${baseUrl}${url}`, config).then((res) => res.json());
  };

  const del = (url, params) => {
    const config = {
      method: 'DELETE',
      ...authConfig,
    };

    let queryParams = '';

    if(params) {
      queryParams = `?${new URLSearchParams(params).toString()}`;
    }

    return fetch(`${baseUrl}${url}${queryParams || ''}`, config).then((res) => res.json());
  };

  const get = (url, params, config) => {
    const defaultConfig = {
      method: 'GET',
      ...authConfig,
      ...config
    };

    return new Promise((resolved, reject) => {
      try {
        fetch(`${baseUrl}${url}`, defaultConfig).then((res) => res.json()).then(res => {
          // products endpoint has not statusCode or status property
          if ((res.errors || [])?.length < 1) {
            resolved(res);
          }

          if ((res.status !== 200 && res.statusCode !== 200)) {
            reject(res);
          } else {
            resolved(res);
          }
        });
      } catch (e) {
        reject(e);
      }
    });
  };

  return { post, put, del, get };
};

export default fetchCSR;

