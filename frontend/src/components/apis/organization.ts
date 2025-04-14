import axios from "axios";
import { OrganizationData } from "../../types/organization";

export const getOrganizationsAPI = async (name?: string): Promise<any> => {
  try {
    const url = name
      ? `${process.env.REACT_APP_SERVER}/organizations/?name=${name}`
      : `${process.env.REACT_APP_SERVER}/organizations/`;

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

export const getOrganizationByIdAPI = async (id: string): Promise<any> => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_SERVER}/organizations/${id}`,
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

export const deleteOrganizationAPI = async (organizationId: number) => {
  try {
    const response = await axios.delete(
      `${process.env.REACT_APP_SERVER}/organizations/${organizationId}`,
      {
        headers: {
          accept: "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Failed to delete the organization:", error);
    throw error;
  }
};

export const editOrganizationAPI = async (
  organizationId: number,
  organizationData: OrganizationData
) => {
  try {
    const response = await axios.put(
      `${process.env.REACT_APP_SERVER}/organizations/${organizationId}`,
      organizationData,
      {
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Failed to edit the organization:", error);
    throw error;
  }
};

export const addOrganizationAPI = async (
  organizationData: OrganizationData
) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_SERVER}/organizations/`,
      organizationData,
      {
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Failed to add the organization:", error);
    throw error;
  }
};
