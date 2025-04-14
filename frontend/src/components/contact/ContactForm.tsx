import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { ContactData } from "../../types/contact";
import { getOrganizationsAPI } from "../apis/organization";
import {
  addContactAPI,
  deleteContactAPI,
  editContactAPI,
} from "../apis/contact";
import ConfirmModal from "../ConfirmModal";

type Props = {
  data?: ContactData;
  form: "edit" | "add";
  id?: string;
};

const ContactForm = ({ data, form, id }: Props) => {
  const navigate = useNavigate();
  const [name, setName] = useState(data?.name ?? "");
  const [email, setEmail] = useState(data?.email ?? "");
  const [phone, setPhone] = useState(data?.phone ?? "");
  const [address, setAddress] = useState(data?.address ?? "");
  const [city, setCity] = useState(data?.city ?? "");
  const [province, setProvince] = useState(data?.province ?? "");
  const [country, setCountry] = useState(data?.country ?? "");
  const [postalCode, setPostalCode] = useState(data?.postal_code ?? "");
  const [organizationId, setOrganizationId] = useState(
    data?.organization_id ?? ""
  );

  const [organizations, setOrganizations] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<"delete" | "edit" | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const getAllOrganizations = async () => {
    try {
      const response = await getOrganizationsAPI();
      setOrganizations(response);
      console.log("All organizations:", response);
    } catch (error) {
      toast.error("Failed to fetch organizations.");
    }
  };

  useEffect(() => {
    getAllOrganizations();
  }, []);

  const handleAdd = async () => {
    const formData: ContactData = {
      name,
      email,
      phone,
      address,
      city,
      province,
      country,
      postal_code: postalCode,
      organization_id: +organizationId,
    };

    try {
      setIsLoading(true);
      await addContactAPI(formData);
      toast.success("Contact added successfully.");
      navigate("/contacts");
    } catch (err) {
      toast.error("Failed to add contact!");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = async () => {
    const formData: ContactData = {
      name,
      email,
      phone,
      address,
      city,
      province,
      country,
      postal_code: postalCode,
      organization_id: +organizationId,
    };
    try {
      setIsLoading(true);
      if (!id) throw new Error("ID missing");
      await editContactAPI(+id, formData);
      toast.success("Contact edited successfully.");
    } catch (err) {
      toast.error("Failed to edit contact!");
    } finally {
      setIsLoading(false);
      setShowModal(false);
    }
  };

  const handleDelete = async () => {
    try {
      setIsLoading(true);
      if (!id) throw new Error("ID missing");
      await deleteContactAPI(+id);
      toast.success("Contact deleted successfully.");
      navigate("/contacts");
    } catch (err) {
      toast.error("Failed to delete contact!");
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

        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Organization:
          </label>
          <select
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
            required
            value={organizationId}
            onChange={(e) => setOrganizationId(e.target.value)}
          >
            <option value="" disabled>
              Select an organization
            </option>
            {organizations.map((organization: any) => (
              <option key={organization.id} value={organization.id}>
                {organization.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {form === "add" ? (
        <div className="px-8 py-5 p-5 border-t flex justify-end bg-[#F9FAFB] rounded-b-md">
          <button
            type="submit"
            className="px-6 py-2  bg-[#ec4899] hover:bg-[#be185d] text-white rounded-md transition"
            onSubmit={handleAdd}
            disabled={isLoading}
          >
            {isLoading ? "Adding..." : "Add Contact"}
          </button>
        </div>
      ) : (
        <div className="px-8 py-5 border-t flex justify-between bg-[#F9FAFB] rounded-b-md">
          <button
            className="px-6 py-2 bg-[#ec4899] hover:bg-[#be185d] text-white rounded-md transition"
            onClick={() => openModal("delete")}
            disabled={isLoading}
          >
            Delete Contact
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-[#ec4899] hover:bg-[#be185d] text-white rounded-md transition"
            onClick={() => openModal("edit")}
            disabled={isLoading}
          >
            Edit Contact
          </button>
        </div>
      )}

      <ConfirmModal
        isOpen={showModal}
        title={modalType === "delete" ? "Delete Contact" : "Edit Contact"}
        message={
          modalType === "delete"
            ? "Are you sure you want to delete this contact?"
            : "Are you sure you want to edit this contact?"
        }
        onConfirm={modalType === "delete" ? handleDelete : handleEdit}
        onCancel={() => setShowModal(false)}
        isLoading={isLoading}
      />
    </form>
  );
};

export default ContactForm;
