const fetchData = async (url, options) => {
  const response = await fetch(url, options);
  let data = await response.json();
  return data;
};

export default fetchData;
