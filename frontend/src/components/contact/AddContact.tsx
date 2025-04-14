import { Link } from "react-router-dom";
import ContactForm from "./ContactForm";

function AddContact() {
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6 text-gray-800">
        <Link to="/contacts" className="text-[#7886D7]">
          Contacts/{" "}
        </Link>
        Add
      </h1>
      {<ContactForm form="add" />}
    </div>
  );
}

export default AddContact;
