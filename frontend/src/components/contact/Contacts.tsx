import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { ContactData } from "../../types/contact";
import { getContacts } from "../apis/contact";
import Table from "../Table";

const Contacts = () => {
  const columns = ["name", "organization", "city", "phone", "id"];

  const [data, setData] = useState<ContactData[]>([]);

  const [search, setSearch] = useState("");

  const getAllContacts = async () => {
    try {
      const response = await getContacts();
      setData(response);
      console.log("All contacts:", response);
    } catch (error) {
      toast.error("Failed to fetch contacts.");
    }
  };
  const getAllContactsByName = async (name: string) => {
    try {
      const response = await getContacts(name);
      setData(response);
      console.log("Filtered contacts:", response);
    } catch (error) {
      toast.error("Failed to search contacts!");
    }
  };

  useEffect(() => {
    getAllContacts();
  }, []);

  useEffect(() => {
    const debounce = setTimeout(() => {
      if (search.trim()) {
        getAllContactsByName(search);
      } else {
        getAllContacts();
      }
    }, 500);

    return () => clearTimeout(debounce);
  }, [search]);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Contacts</h1>

      <div className="flex flex-col gap-5">
        <div className="flex justify-between items-center px-4">
          <input
            type="search"
            placeholder="Search by name..."
            className="border border-gray-300 rounded px-4 py-2 w-full max-w-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <Link
            className="ml-4 bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition"
            to={"/contacts/add"}
          >
            Add Contact
          </Link>
        </div>
        <Table columns={columns} data={data} table_name={"contacts"} />
      </div>
    </div>
  );
};

export default Contacts;
