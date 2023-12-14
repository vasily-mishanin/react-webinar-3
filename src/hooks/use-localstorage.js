export default function useLocalStorage() {
  const getItem = (key) => localStorage.getItem(key);
  const setItem = (key, value) => localStorage.setItem(key, value);
  const removeItem = (key) => localStorage.removeItem(key);

  return { getItem, setItem, removeItem };
}
