import { BiSolidTrashAlt } from "react-icons/bi";
import { FaUserEdit } from "react-icons/fa";
import { HiOutlineUserCircle } from "react-icons/hi";

const ContactCard = ({contact}) =>{
    return (
        <div key={contact.id} className="flex items-center bg-yellow justify-around rounded-lg p2">
        <div className="flex gap-2">
          <HiOutlineUserCircle className=" text-4xl text-orange" />
          <div className>
            <h2 className="text-medium">{contact.name}</h2>
            <p className="text-sm">{contact.email}</p>
          </div>
        </div>
        <div className="flex text-3xl gap-3">
          <FaUserEdit />
          <BiSolidTrashAlt />
        </div>
      </div>
    )
}

export default ContactCard;