exports.handler = async event => {
  const params = event.queryStringParameters;
  const state = params.state || 'https://stupefied-shirley-45b0a3.netlify.app/';

  return {
    statusCode: 302,
    body: `${state}`,
    headers: {
      Location: `${state}?access_url&${params.access_url}`
    }
  };
};