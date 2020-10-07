exports.handler = async event => {
  const params = event.queryStringParameters;
  const state = params.state || 'https://stupefied-shirley-45b0a3.netlify.app/app.html';
  const code = params.code || '';

  console.log('event.queryStringParameters', JSON.stringify(event.queryStringParameters, null, 2));
  console.log('event', JSON.stringify(event, null, 2));
  console.log('event.body', JSON.stringify(event.body, null, 2));

  console.log('params.state', params.state);
  console.log('state', state);
  console.log('params.code', params.code);
  console.log('code', code);

  return {
    statusCode: 302,
    body: `${state}?access_code=${code}`,
    headers: {
      Location: `${state}?access_code=${code}`,
      'Cache-Control': 'no-cache',
    }
  };
};