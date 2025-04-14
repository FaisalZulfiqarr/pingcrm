import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { OrganizationData } from "../../types/organization";
import { getOrganizationByIdAPI } from "../apis/organization";
import OrganizationForm from "./OrganizationForm";
import Table from "../Table";

function EditOrganization() {
  const columns = ["name", "city", "phone", "id"];
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [data, setData] = useState<OrganizationData | null>(null);

  const getOrganization = async () => {
    if (id) {
      try {
        const response = await getOrganizationByIdAPI(id);
        console.log(response);
        setData(response);
      } catch (error) {
        console.error("Failed to fetch organization:", error);
        navigate("/notFound");
      }
    }
  };
  useEffect(() => {
    getOrganization();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>
      <h1 className="text-3xl font-semibold mb-6 text-gray-800">
        <Link to="/organizations" className="text-[#7886D7]">
          Organizations/{" "}
        </Link>
        {data?.name}
      </h1>
      {data && <OrganizationForm form="edit" data={data} id={id} />}
      {data?.contacts && data?.contacts.length > 0 && (
        <>
          <h2 className="text-2xl font-semibold mt-12 mb-8 text-gray-800">
            Contacts
          </h2>
          <Table
            columns={columns}
            data={data?.contacts ?? []}
            table_name={"contacts"}
          />
        </>
      )}
    </div>
  );
}

export default EditOrganization;
