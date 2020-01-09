import Storage from 'web-storage-cache';

const localStorage = new Storage();

export const setLocalStorage = (key, value) => {
  return localStorage.set(key,value)
};

export const getLocalStorage = (key) => {
  return localStorage.get(key)
};

export const removeLocalStorage = (key) => {
  return localStorage.delete(key)
};

export const clearLocalStorage = () => {
  return localStorage.clear()
};

export const saveBookObject = (filename ,key, value) => {
  let book = getLocalStorage(`${filename}-info`);
  if (!book) {
    book = {}
  }
  book[key] = value
  setLocalStorage(`${filename}-info`, book)
};

export const getBookObject = (filename, key) => {
  let book = getLocalStorage(`${filename}-info`);
  if (book) {
    return book[key]
  } else {
    return null
  }
};

export const getFontFamily = (filename) => {
  return getBookObject(filename,'fontFamily')
};

export const saveFontFamily = (filename, font) => {
  return saveBookObject(filename, 'fontFamily', font)
};

export const getFontSize = (filename) => {
  return getBookObject(filename,'fontSize')
};

export const saveFontSize = (filename, fontSize) => {
  return saveBookObject(filename, 'fontSize', fontSize)
};

export const saveLocale = (locale) => {
  return setLocalStorage('locale', locale)
};

export const getLocale = () => {
  return getLocalStorage('locale')
}