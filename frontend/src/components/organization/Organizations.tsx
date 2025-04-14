import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { OrganizationData } from "../../types/organization";
import { getOrganizationsAPI } from "../apis/organization";
import Table from "../Table";

const Organizations = () => {
  const columns = ["name", "city", "phone", "id"];

  const [data, setData] = useState<OrganizationData[]>([]);

  const [search, setSearch] = useState("");

  const getAllOrganizations = async () => {
    try {
      const response = await getOrganizationsAPI();
      setData(response);
      console.log("All Organizations:", response);
    } catch (error) {
      toast.error("Failed to fetch Organizations.");
    }
  };

  const getAllOrganizationsByName = async (name: string) => {
    try {
      const response = await getOrganizationsAPI(name);
      setData(response);
      console.log("Filtered Organizations:", response);
    } catch (error) {
      toast.error("Failed to search Organizations.");
    }
  };
  useEffect(() => {
    getAllOrganizations();
  }, []);

  useEffect(() => {
    const debounce = setTimeout(() => {
      if (search.trim()) {
        getAllOrganizationsByName(search);
      } else {
        getAllOrganizations();
      }
    }, 500);

    return () => clearTimeout(debounce);
  }, [search]);
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Organizations</h1>

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
            to={"/organizations/add"}
          >
            Add Organization
          </Link>
        </div>
        <Table columns={columns} data={data} table_name={"organizations"} />
      </div>
    </div>
  );
};

export default Organizations;
