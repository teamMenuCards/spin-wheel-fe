/**
 * localStorage wrapper with window check for SSR compatibility
 */

// Check if we're in a browser environment
const isClient = typeof window !== 'undefined' && window.localStorage;

/**
 * Safe localStorage wrapper that checks for window availability
 */
export const localStorage = {
  /**
   * Get item from localStorage
   * @param key - The key to retrieve
   * @returns The stored value or null if not found/not available
   */
  getItem: (key: string): string | null => {
    if (!isClient) {
      console.warn('localStorage.getItem called in server environment');
      return null;
    }
    
    try {
      return window.localStorage.getItem(key);
    } catch (error) {
      console.error('Error accessing localStorage:', error);
      return null;
    }
  },

  /**
   * Set item in localStorage
   * @param key - The key to store
   * @param value - The value to store
   * @returns true if successful, false otherwise
   */
  setItem: (key: string, value: string): boolean => {
    if (!isClient) {
      console.warn('localStorage.setItem called in server environment');
      return false;
    }
    
    try {
      window.localStorage.setItem(key, value);
      return true;
    } catch (error) {
      console.error('Error setting localStorage item:', error);
      return false;
    }
  },

  /**
   * Remove item from localStorage
   * @param key - The key to remove
   * @returns true if successful, false otherwise
   */
  removeItem: (key: string): boolean => {
    if (!isClient) {
      console.warn('localStorage.removeItem called in server environment');
      return false;
    }
    
    try {
      window.localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error('Error removing localStorage item:', error);
      return false;
    }
  },

  /**
   * Clear all items from localStorage
   * @returns true if successful, false otherwise
   */
  clear: (): boolean => {
    if (!isClient) {
      console.warn('localStorage.clear called in server environment');
      return false;
    }
    
    try {
      window.localStorage.clear();
      return true;
    } catch (error) {
      console.error('Error clearing localStorage:', error);
      return false;
    }
  },

  /**
   * Get the number of items in localStorage
   * @returns The number of items or 0 if not available
   */
  get length(): number {
    if (!isClient) {
      return 0;
    }
    
    try {
      return window.localStorage.length;
    } catch (error) {
      console.error('Error getting localStorage length:', error);
      return 0;
    }
  },

  /**
   * Get key by index
   * @param index - The index of the key to retrieve
   * @returns The key at the specified index or null if not found
   */
  key: (index: number): string | null => {
    if (!isClient) {
      return null;
    }
    
    try {
      return window.localStorage.key(index);
    } catch (error) {
      console.error('Error getting localStorage key:', error);
      return null;
    }
  }
};

/**
 * Helper function to safely get JSON from localStorage
 * @param key - The key to retrieve
 * @param defaultValue - Default value if item doesn't exist or is invalid JSON
 * @returns Parsed JSON object or defaultValue
 */
export const getJSON = <T>(key: string, defaultValue: T): T => {
  const item = localStorage.getItem(key);
  if (!item) return defaultValue;
  
  try {
    return JSON.parse(item) as T;
  } catch (error) {
    console.error('Error parsing JSON from localStorage:', error);
    return defaultValue;
  }
};

/**
 * Helper function to safely set JSON in localStorage
 * @param key - The key to store
 * @param value - The value to store (will be JSON.stringify'd)
 * @returns true if successful, false otherwise
 */
export const setJSON = <T>(key: string, value: T): boolean => {
  try {
    const jsonString = JSON.stringify(value);
    return localStorage.setItem(key, jsonString);
  } catch (error) {
    console.error('Error stringifying JSON for localStorage:', error);
    return false;
  }
};