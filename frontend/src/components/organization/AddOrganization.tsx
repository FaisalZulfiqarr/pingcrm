import { Link } from "react-router-dom";
import OrganizationForm from "./OrganizationForm";

function AddOrganization() {
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6 text-gray-800">
        <Link to="/organizations" className="text-[#7886D7]">
          Organizations/{" "}
        </Link>
        Add
      </h1>
      {<OrganizationForm form="add" />}
    </div>
  );
}

export default AddOrganization;
