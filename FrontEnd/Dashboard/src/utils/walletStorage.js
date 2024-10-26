// walletStorage.js
const DB_NAME = 'WalletDatabase';
const DB_VERSION = 1;
const STORE_NAME = 'wallets';

export const initDB = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true });
      }
    };

    request.onsuccess = (event) => {
      resolve(event.target.result);
    };

    request.onerror = (event) => {
      reject('Database initialization failed');
    };
  });
};

export const addWallet = async (walletData) => {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.add(walletData);

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject('Failed to add wallet');
  });
};

export const getWallets = async () => {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, 'readonly');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.getAll();

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject('Failed to retrieve wallets');
  });
};

export const updateWallet = async (id, updatedData) => {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    const getRequest = store.get(id);

    getRequest.onsuccess = () => {
      const wallet = getRequest.result;
      if (!wallet) {
        reject('Wallet not found');
        return;
      }
      const updateRequest = store.put({ ...wallet, ...updatedData });

      updateRequest.onsuccess = () => resolve(updateRequest.result);
      updateRequest.onerror = () => reject('Failed to update wallet');
    };
    getRequest.onerror = () => reject('Failed to retrieve wallet');
  });
};

export const deleteWallet = async (id) => {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.delete(id);

    request.onsuccess = () => resolve(`Wallet ${id} deleted`);
    request.onerror = () => reject('Failed to delete wallet');
  });
};
