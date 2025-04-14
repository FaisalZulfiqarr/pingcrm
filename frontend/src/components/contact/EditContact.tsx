import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import ContactForm from "./ContactForm";
import { ContactData } from "../../types/contact";
import { getContactByIdAPI } from "../apis/contact";

function EditContact() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [data, setData] = useState<ContactData | null>(null);

  const getContact = async () => {
    if (id) {
      try {
        const response = await getContactByIdAPI(+id);
        console.log(response);
        setData(response);
      } catch (error) {
        console.error("Failed to fetch contact:", error);
        navigate("/notFound");
      }
    }
  };
  useEffect(() => {
    getContact();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>
      <h1 className="text-3xl font-semibold mb-6 text-gray-800">
        <Link to="/contacts" className="text-[#ec4899]  hover:text-[#be185d]">
          Contacts/{" "}
        </Link>
        {data?.name}
      </h1>
      {data && <ContactForm form="edit" data={data} id={id} />}
    </div>
  );
}

export default EditContact;
