const Fetch = (FetchConfig) => {
  const { baseUrl: url = '' } = FetchConfig || {};
  const baseUrl = url || process.env.NEXT_PUBLIC_Fetch;

  const get = ( url, params = '') => {
    const config = { };

    return new Promise((resolved, reject) => {
      try {
        fetch(`${baseUrl}${url}${new URLSearchParams(params).toString()}`, config).then((res) => {
          if (res.status !== 200) {
            reject(res);
          } else {
            resolved(res.json());
          }
        });
      } catch (e) {
        reject(e);
      }
    });
  };

  return { get };
};

export default Fetch;

