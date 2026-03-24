import { account } from "../lib/appwrite";

export const getUser = async () => {
  try {
    const user = await account.get();
    console.log("User:", user);
    return user;
  } catch (error) {
    console.log("Not logged in", error);
    return null;
  }
};