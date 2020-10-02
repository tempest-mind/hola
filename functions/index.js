exports.handler = async event => {
  const state = event.queryStringParameters.state || 'https://stupefied-shirley-45b0a3.netlify.app/';
  console.info("EVENT\n" + JSON.stringify(event, null, 2));

  return {
    statusCode: 200,
    body: `${JSON.stringify(event, null, 2)}`,
  };
  /*return {
    statusCode: 302,
    body: `${state}`,
    headers: {
      Location: state
    }
  };*/
};