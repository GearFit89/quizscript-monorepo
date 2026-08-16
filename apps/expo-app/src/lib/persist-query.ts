import { QueryClient } from '@tanstack/react-query';
import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister';
import { persistQueryClient } from '@tanstack/react-query-persist-client';
import { storage } from './storage';


export const clientPersister = createAsyncStoragePersister({
  storage: {
    setItem: (key, value) => {
      storage.set(key, value);
      return Promise.resolve();
    },
    getItem: (key) => {
      const value = storage.getString(key);
      return Promise.resolve(value ?? null);
    },
   
    removeItem: (key) => {
      storage.remove(key);
      return Promise.resolve();
    },
  },
});


export const queryClient = new QueryClient({
  defaultOptions: {
    
    queries: {
      gcTime: 1000 * 60 * 60 * 24, // 24 hours
      networkMode: "offlineFirst" // Cause netowork request to avoid the error state
    },
  },
});

