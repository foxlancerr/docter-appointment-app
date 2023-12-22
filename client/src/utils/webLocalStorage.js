export function setItemInLocalStorage(keyName, valueName) {
  localStorage.setItem(keyName, JSON.stringify(valueName));
}
export function getItemFromLocalStorage(keyName) {
  return JSON.parse(localStorage.getItem(keyName));
}
export function removeItemFromLocalStorage(keyName) {
  localStorage.removeItem(keyName);
}
export function removeAllItemFromLocalStorage() {
  localStorage.clear();
}
