import { databases } from "../lib/appwrite";
import { ID } from "appwrite";
const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID;
import { Query } from "appwrite";

// ✅ Get all documents
export const getDocuments = async () => {
  try {
    const res = await databases.listDocuments({
      databaseId: DATABASE_ID,
      collectionId: COLLECTION_ID,
      queries: [
        Query.orderDesc("$createdAt"),
        Query.limit(1),
      ],
    });

    return res.documents;
  } catch (error) {
    console.log("Error fetching docs:", error);
    return [];
  }
};

export const getLatestDocuments = async () => {
  try {
    const res = await databases.listDocuments(
      DATABASE_ID,
      COLLECTION_ID,
      [
        Query.orderDesc("$createdAt"), // 🔥 newest first
        Query.limit(1),
      ]
    );
    return res.documents;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const createDocument = async (data: any) => {
  try {
    return await databases.createDocument(
      DATABASE_ID,
      COLLECTION_ID,
      ID.unique(),
      data
    );
  } catch (error) {
    console.log("Error creating doc:", error);
  }
};

