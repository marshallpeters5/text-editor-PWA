import { openDB } from 'idb';

// Initialize the IndexedDB database //
const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// Add content to the IndexedDB database //
export const putDb = async (content) => {
  try {
    const db = await initdb();
    const tx = db.transaction('jate', 'readwrite');
    const store = tx.objectStore('jate');
    await store.add({ content });
    await tx.complete;
    console.log('Content added to the database successfully.');
  } catch (error) {
    console.error('Error adding content to the database:', error);
  }
};

// Get all content from the IndexedDB database //
export const getDb = async () => {
  try {
    const db = await initdb();
    const tx = db.transaction('jate', 'readonly');
    const store = tx.objectStore('jate');
    const content = await store.getAll();
    console.log('Content retrieved from the database:', content);
    return content;
  } catch (error) {
    console.error('Error retrieving content from the database:', error);
    return null;
  }
};

// Call the initdb function to ensure the IndexedDB database is initialized on page load. //
initdb();
