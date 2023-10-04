import { collection, deleteDoc, doc } from "firebase/firestore";
import { BiSolidTrashAlt } from "react-icons/bi";
import { FaUserEdit } from "react-icons/fa";
import { HiOutlineUserCircle } from "react-icons/hi";
import { db } from "../config/firebase";
import AddAndUpdateContact from "./AddAndUpdateContact";
import useDisclouse from "../hooks/useDisclouse";
import { toast } from "react-toastify";

const ContactCard = ({ contact }) => {
  const {isOpen,onClose,onOpen} = useDisclouse();

  const deleteContact = async (id) => {
    try {
      await deleteDoc(doc(db, "contacts", id));
      toast.success("Contact Deleted Successfully");
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <div key={contact.id} className="flex items-center bg-yellow justify-around rounded-lg p2">
        <div className="flex gap-2">
          <HiOutlineUserCircle className=" text-4xl text-orange" />
          <div className>
            <h2 className="text-medium">{contact.name}</h2>
            <p className="text-sm">{contact.email}</p>
          </div>
        </div>
        <div className="flex text-3xl gap-3">
          <FaUserEdit className="cursor-pointer" onClick={onOpen}/>
          <BiSolidTrashAlt className="cursor-pointer" onClick={() => deleteContact(contact.id)} />
        </div>
      </div>

      <AddAndUpdateContact contact={contact} isUpdate={true} onClose={onClose} isOpen={isOpen}/>
    </>
  )
}

export default ContactCard;