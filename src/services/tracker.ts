const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const TRACKER_TABLE_ID = import.meta.env.VITE_APPWRITE_TABLE_TRACKER_ID;
const BUCKET_ID = import.meta.env.VITE_APPWRITE_BUCKET_ID;
import { account, db,storage } from "../lib/appwrite";
import type { TrackerRow } from "../types/tracker";
import {ID, Permission,Role } from "appwrite";

type CreateTrackerInput = {
    movieName: string;
    movieDesc: string;
    imageId?: string;
}

const getTrackerData = async (): Promise<TrackerRow[]> => {
  try {
    const res = await db.listRows<TrackerRow>({
      databaseId: DATABASE_ID,
        tableId: TRACKER_TABLE_ID,
    });
    return res.rows;
  } catch (error) {
    console.log("Error fetching docs:", error);
    return [];
  }
};

const addTrackerData = async (data: CreateTrackerInput) => {
  try {
    const user = await account.get();

    if (!user) {
        throw new Error("User not authenticated");
    }

    const res = await db.createRow<TrackerRow>({
        databaseId: DATABASE_ID,
        tableId: TRACKER_TABLE_ID,
        rowId: ID.unique(),
        data: {
            ...data,
            user_id: user.$id,
        },
        permissions: [
            Permission.read(Role.user(user.$id)),
            Permission.update(Role.user(user.$id)),
            Permission.delete(Role.user(user.$id)),
        ],
    })

    return res;
  } catch (error) {
    console.log("Error fetching docs:", error);
    return null;
  }
};

const UploadImage = async (file: File) => {
    try {
        const res = await storage.createFile({
        bucketId: BUCKET_ID,
        fileId: ID.unique(),
        file,
    });

    return res.$id;
    } catch (error) {
        console.log("Error uploading file:", error);
        return undefined;
    }
}

const getImageUrl = (imageId?: string) => {
  if (!imageId) return null;

  return storage.getFileView({
    bucketId: BUCKET_ID,
    fileId: imageId,
  });
};
        

export { getTrackerData, addTrackerData ,UploadImage,getImageUrl};