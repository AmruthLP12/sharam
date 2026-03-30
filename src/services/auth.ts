
import { ID } from "appwrite";
import { account } from "../lib/appwrite";

export const signup = async (email: string, password: string) => {
  try {
    const user = await account.create(
      ID.unique(),
      email,
      password
    );
    return user;
  } catch (error) {
    console.log("Signup error:", error);
    throw error;
  }
};

export const login = async (email: string, password: string) => {
  try {
    const session = await account.createEmailPasswordSession(
      email,
      password
    );
    return session;
  } catch (error) {
    console.log("Login error:", error);
    throw error;
  }
};

export const register = async (email: string, password: string, name: string) => {
  try {
    const user = await account.create(
      ID.unique(),
      email,
      password,
      name
    );
    return user;
  } catch (error) {
    console.log("Signup error:", error);
    throw error;
  }
};

export const logout = async () => {
  try {
    await account.deleteSessions();
  } catch (error) {
    console.log("Logout error:", error);
  }
};

export const getSession = async () => {
  try {
    const session = await account.getSession("current");
    return session;
  } catch (error) {
    console.log("Get session error:", error);
    throw error;
  }
};

export const getUser = async () => {
  try {
    const user = await account.get();
    return user;
  } catch (error) {
    console.log("Get user error:", error);
    throw error;
  }
};