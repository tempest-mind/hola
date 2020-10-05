exports.handler = async event => {
  const params = event.queryStringParameters;
  const state = params.state || 'https://stupefied-shirley-45b0a3.netlify.app/app.html';

  console.log('event.queryStringParameters', JSON.stringify(event.queryStringParameters, null, 2));

  console.log('params.state', params.state);
  console.log('state', state);

  return {
    statusCode: 302,
    body: `${state}`,
    headers: {
      Location: `${state}`,
      'Cache-Control': 'no-cache',
    }
  };
};