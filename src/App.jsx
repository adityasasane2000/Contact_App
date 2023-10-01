import NavBar from "./components/NavBar";
import { FiSearch } from "react-icons/fi";
import { AiFillPlusCircle } from "react-icons/ai";
import { HiOutlineUserCircle } from "react-icons/hi";
import { FaUserEdit } from "react-icons/fa";
import { BiSolidTrashAlt } from "react-icons/bi";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./config/firebase";

const App = () => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const getContacts = async () => {
      try {
        const contactsRef = collection(db, "contacts");
        const contactsSnapshot = await getDocs(contactsRef);
        const contactsLists = contactsSnapshot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        });
        setContacts(contactsLists);
      } catch (error) {
        console.log(error);
      }
    };

    getContacts();
  }, []);

  return (
    <div className="mx-auto max-w-[370px] px-4">
      <NavBar />
      <div className="flex gap-2">
        <div className="relative flex flex-grow items-center">
          <FiSearch className="ml-1 absolute text-3xl text-white" />
          <input type="text" className="h-10 flex-grow rounded-md border border-white bg-transparent text-white pl-10" />
        </div>
        <AiFillPlusCircle className="text-5xl text-white cursor-pointer" />
      </div>

      <div className="mt-4">
        {
          contacts.map((contact) => (
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
          ))
        }
      </div>
    </div>
  );
};

export default App;