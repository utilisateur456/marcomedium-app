const { getStore } = require('@netlify/blobs');

exports.handler = async (event) => {
  const store = getStore('marcomedium');
  const action = event.queryStringParameters?.action;

  if (action === 'get') {
    try {
      const val = await store.get('status');
      const available = val === null ? true : val === 'true';
      return {
        statusCode: 200,
        headers: { 'Access-Control-Allow-Origin': '*' },
        body: JSON.stringify({ available })
      };
    } catch(e) {
      return { statusCode: 200, headers: { 'Access-Control-Allow-Origin': '*' }, body: JSON.stringify({ available: true }) };
    }
  }

  if (action === 'set') {
    const available = event.queryStringParameters?.available === 'true';
    await store.set('status', String(available));
    return {
      statusCode: 200,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ ok: true, available })
    };
  }

  return { statusCode: 400, body: 'Bad request' };
};
