exports.handler = async event => {

  console.log('event.queryStringParameters', JSON.stringify(event.queryStringParameters, null, 2));
  console.log('event', JSON.stringify(event, null, 2));

  return {
    statusCode: 200,
    body: JSON.stringify(event, null, 2)
  };
};