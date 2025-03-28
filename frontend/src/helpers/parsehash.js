// A simple utility to parse the hash fragment
const parseHash = (hash) => {
  const params = {};
  const queryString = hash.substring(1); // Remove the leading `#`
  const regex = /([^&=]+)=([^&]*)/g;
  let m;

  while (m = regex.exec(queryString)) {
    params[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
  }

  return params;
};

export default parseHash;