import axios from "axios";
import { ContactData } from "../../types/contact";

export const getContacts = async (name?: string): Promise<any> => {
  try {
    const url = name
      ? `${process.env.REACT_APP_SERVER}/contacts/?name=${name}`
      : `${process.env.REACT_APP_SERVER}/contacts/`;

    const response = await axios.get(url, {
      headers: {
        accept: "application/json",
      },
      maxBodyLength: Infinity,
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error:", error.message);
    } else {
      console.error("Unexpected error:", error);
    }
    throw error;
  }
};

export const addContactAPI = async (contactData: ContactData): Promise<any> => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_SERVER}/contacts/`,
      contactData,
      {
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
        },
        maxBodyLength: Infinity,
      }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error:", error.message);
    } else {
      console.error("Unexpected error:", error);
    }
    throw error;
  }
};

export const deleteContactAPI = async (contactId: number): Promise<any> => {
  try {
    const response = await axios.delete(
      `${process.env.REACT_APP_SERVER}/contacts/${contactId}`,
      {
        headers: {
          accept: "application/json",
        },
        maxBodyLength: Infinity,
      }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error:", error.message);
    } else {
      console.error("Unexpected error:", error);
    }
    throw error;
  }
};

export const editContactAPI = async (
  contactId: number,
  contactData: ContactData
): Promise<any> => {
  try {
    const response = await axios.put(
      `${process.env.REACT_APP_SERVER}/contacts/${contactId}`,
      contactData,
      {
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
        },
        maxBodyLength: Infinity,
      }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error:", error.message);
    } else {
      console.error("Unexpected error:", error);
    }
    throw error;
  }
};

export const getContactByIdAPI = async (contactId: number): Promise<any> => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_SERVER}/contacts/${contactId}`,
      {
        headers: {
          accept: "application/json",
        },
        maxBodyLength: Infinity,
      }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error:", error.message);
    } else {
      console.error("Unexpected error:", error);
    }
    throw error;
  }
};
