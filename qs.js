
module.exports = qs;

function qs(object) {
  return Object.keys(object || {}).reduce((acc, key) => {
    if (typeof object[key] !== 'object') {
      acc.push(key + '=' + encodeURIComponent(object[key]));
    } else {
      const json = JSON.stringify(object[key]);
      acc.push(key + '=' + encodeURIComponent(json));
    }

    return acc;
  },[]).join('&');
}

