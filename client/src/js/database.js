import { openDB } from "idb";

const initdb = async () =>
  openDB("jate", 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains("jate")) {
        console.log("jate database already exists");
        return;
      }
      db.createObjectStore("jate", { keyPath: "id", autoIncrement: true });
      console.log("jate database created");
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.log("PUT to database");

  // Open indexedDB database
  const db = await openDB("jate", 1);

  // Start a transaction in readwrite mode
  const tx = db.transaction("jate", "readwrite");

  // Access the object store "jate"
  const store = tx.objectStore("jate");

 // Add the content to the object store 
  const request = store.add({ id: 1, content });

  try {
    // Wait for the transaction to complete
    const results = await request;
    // Log the results
    console.log("Data saved to the database", results);
  } catch (error) {
    // Catch any errors
    console.error("Error saving data to the database", error);
  }
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log("GET from database");

   // Open indexedDB database
  const db = await openDB("jate", 1);

   // Start a transaction in readonly mode
  const tx = db.transaction("jate", "readonly");

  // Access the object store "jate"
  const store = tx.objectStore("jate");

  // Get by id or get all content
const request = store.getAll();

  try {
    // Wait for the transaction to complete
    const results = await request;
    // Log the results
    console.log("Data retrieved from the database", results);
  } catch (error) {
    // Catch any errors
    console.error("Error retrieving data from the database", error);
  }
};



initdb();
