import { createMMKV } from 'react-native-mmkv';

const storage = createMMKV();






/**
 * Gets a string from MMKV storage a parses it to JSON. 
 * @param key What points to the JSON object.
 * @returns Undefined if the JSON parse fails, otherwise the JSON object.
 */
function getJSON<T>(key: string): T | undefined {
    const value = storage.getString(key);
    if (!value) return undefined;

    try {
      return JSON.parse(value) as T;
    } catch (error) {
      console.error(`Error parsing key "${key}":`, error);
      return undefined;
    }
  }


   /** 
   * @param key A string that sets the place where the JSON object is stored.
   * @param value The value ( JSON ) that the key is holding.
   */
  function setJSON(key: string, value: Record<string, any>): void {
    storage.set(key, JSON.stringify(value));
  }



  export { storage, getJSON, setJSON}