export function getLocalStorage(keyName) {
  let fetchedItem;
  try {
    fetchedItem = localStorage.getItem(`${keyName}`);
  } catch (err) {
    setLocalStorage(keyName, null);
    fetchedItem = false;
  }
  return JSON.parse(fetchedItem);
}

export function setLocalStorage(keyName, value) {
  localStorage.setItem(keyName, JSON.stringify(value));
  return getLocalStorage(keyName);
}
