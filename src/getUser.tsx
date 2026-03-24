import { account } from "./lib/appwrite";

export const getUser = async () => {
  try {
    const user = await account.get();
    console.log(user);
  } catch (error) {
    console.log("Not logged in", error);
  }
};