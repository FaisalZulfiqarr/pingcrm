import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { OrganizationData } from "../../types/organization";
import {
  addOrganizationAPI,
  deleteOrganizationAPI,
  editOrganizationAPI,
} from "../apis/organization";
import ConfirmModal from "../ConfirmModal";

type Props = {
  data?: OrganizationData;
  form: "edit" | "add";
  id?: string;
};

const OrganizationForm = ({ data, form, id }: Props) => {
  const navigate = useNavigate();
  const [name, setName] = useState(data?.name ?? "");
  const [email, setEmail] = useState(data?.email ?? "");
  const [phone, setPhone] = useState(data?.phone ?? "");
  const [address, setAddress] = useState(data?.address ?? "");
  const [city, setCity] = useState(data?.city ?? "");
  const [province, setProvince] = useState(data?.province ?? "");
  const [country, setCountry] = useState(data?.country ?? "");
  const [postalCode, setPostalCode] = useState(data?.postal_code ?? "");

  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<"delete" | "edit" | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleAdd = async () => {
    const formData: OrganizationData = {
      name,
      email,
      phone,
      address,
      city,
      province,
      country,
      postal_code: postalCode,
    };

    try {
      setIsLoading(true);
      await addOrganizationAPI(formData);
      toast.success("Organization added successfully.");
      navigate("/organizations");
    } catch (err) {
      toast.error("Failed to add the Organization!");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = async () => {
    const formData: OrganizationData = {
      name,
      email,
      phone,
      address,
      city,
      province,
      country,
      postal_code: postalCode,
    };
    try {
      setIsLoading(true);
      if (!id) throw new Error("ID missing");
      await editOrganizationAPI(+id, formData);
      toast.success("Organization edited successfully.");
    } catch (err) {
      toast.error("Failed to edit organization!");
    } finally {
      setIsLoading(false);
      setShowModal(false);
    }
  };

  const handleDelete = async () => {
    try {
      setIsLoading(true);
      if (!id) throw new Error("ID missing");
      await deleteOrganizationAPI(+id);
      toast.success("Organization deleted successfully");
      navigate("/organizations");
    } catch (err) {
      toast.error("Failed to delete organization!");
    } finally {
      setIsLoading(false);
      setShowModal(false);
    }
  };

  const openModal = (type: "delete" | "edit") => {
    setModalType(type);
    setShowModal(true);
  };

  return (
    <form
      className="max-w-4xl bg-white rounded-md shadow-md"
      onSubmit={(e) => {
        e.preventDefault();
        if (form === "add") handleAdd();
      }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-7">
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Name:
          </label>
          <input
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Email:
          </label>
          <input
            type="email"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Phone:
          </label>
          <input
            type="tel"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Address:
          </label>
          <input
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
            required
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            City:
          </label>
          <input
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
            required
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Province/State:
          </label>
          <input
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
            required
            value={province}
            onChange={(e) => setProvince(e.target.value)}
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Country:
          </label>
          <input
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
            required
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Postal code:
          </label>
          <input
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
            required
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
          />
        </div>
      </div>

      {form === "add" ? (
        <div className="px-8 py-5 p-5 border-t flex justify-end bg-[#F9FAFB] rounded-b-md">
          <button
            type="submit"
            className="px-6 py-2 bg-[#ec4899] text-white rounded-md hover:bg-[#be185d] transition"
            onSubmit={handleAdd}
            disabled={isLoading}
          >
            {isLoading ? "Adding..." : "Add Organization"}
          </button>
        </div>
      ) : (
        <div className="px-8 py-5 border-t flex justify-between bg-[#F9FAFB] rounded-b-md">
          <button
            className="px-4 py-2 bg-[#ec4899] text-white rounded-md hover:bg-[#be185d] transition"
            onClick={() => openModal("delete")}
            disabled={isLoading}
          >
            Delete Organization
          </button>

          <button
            type="submit"
            className="px-6 py-2 bg-[#ec4899] text-white rounded-md hover:bg-[#be185d] transition"
            onClick={() => openModal("edit")}
            disabled={isLoading}
          >
            Edit Organization
          </button>
        </div>
      )}

      <ConfirmModal
        isOpen={showModal}
        title={
          modalType === "delete" ? "Delete Organization" : "Edit Organization"
        }
        message={
          modalType === "delete"
            ? "Are you sure you want to delete this organization?"
            : "Are you sure you want to edit this organization?"
        }
        onConfirm={modalType === "delete" ? handleDelete : handleEdit}
        onCancel={() => setShowModal(false)}
        isLoading={isLoading}
      />
    </form>
  );
};

export default OrganizationForm;
