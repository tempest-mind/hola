exports.handler = async event => {
  // Get the 'state' and redirect.
  const redirect = event.queryStringParameters.state || 'https://stupefied-shirley-45b0a3.netlify.app/';
  return {
    statusCode: 302,
    body: `Hello ${redirect}`,
    headers: {
      Location: redirect
    }
  };
};