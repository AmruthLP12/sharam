import { db } from "../lib/appwrite";
import type { Filters, TestRow } from "../types/test";
const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID;
import { Query } from "appwrite";

const getTestData = async (): Promise<TestRow[]> => {
  try {
    const res = await db.listRows<TestRow>({
      databaseId: DATABASE_ID,
      tableId: COLLECTION_ID,
    });

    return res.rows;
  } catch (error) {
    console.log("Error fetching docs:", error);
    return [];
  }
};

export default getTestData;


const getFiveLatestTestData = async (): Promise<TestRow[]> => {
  try {
    const res = await db.listRows<TestRow>({
      databaseId: DATABASE_ID,
      tableId: COLLECTION_ID,
      queries: [
        Query.orderDesc("$createdAt"),
        Query.limit(5),
      ],
    });

    return res.rows;
  } catch (error) {
    console.log("Error fetching docs:", error);
    return [];
  }
};

const getFilteredTests = async (filters: Filters): Promise<TestRow[]> => {
  try {
    const queries = [
      Query.orderDesc("$createdAt"),
      Query.limit(5),
    ];

    if (filters.difficulty) {
      queries.push(Query.equal("difficultyLevel", filters.difficulty));
    }

    if (filters.active !== undefined) {
      queries.push(Query.equal("isActive", filters.active));
    }

    const res = await db.listRows<TestRow>({
      databaseId: DATABASE_ID,
      tableId: COLLECTION_ID,
      queries,
    });

    return res.rows;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export { getFiveLatestTestData, getTestData, getFilteredTests };


