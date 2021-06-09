const objectToQuery = (data) => Object.keys(data)
  .map((key) => {
    if (data[key]) {
      return `${key}=${data[key]}`;
    }
    return null;
  })
  .filter((fragment) => fragment !== null)
  .join('&');

export default objectToQuery;
