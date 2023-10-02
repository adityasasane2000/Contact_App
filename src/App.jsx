import NavBar from "./components/NavBar";
import { FiSearch } from "react-icons/fi";
import { AiFillPlusCircle } from "react-icons/ai";
import { HiOutlineUserCircle } from "react-icons/hi";
import { FaUserEdit } from "react-icons/fa";
import { BiSolidTrashAlt } from "react-icons/bi";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./config/firebase";
import ContactCard from "./components/ContactCard";
import AddAndUpdateContact from "./components/AddAndUpdateContact";

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [isOpen,setIsOpen] = useState(true);

  const onOpen = () =>{
    setIsOpen(true);
  }

  const onClose = () =>{
     setIsOpen(false);
  }

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
    <>
    
    <div className="mx-auto max-w-[370px] px-4">
      <NavBar />
      <div className="flex gap-2">
        <div className="relative flex flex-grow items-center">
          <FiSearch className="ml-1 absolute text-3xl text-white" />
          <input type="text" className="h-10 flex-grow rounded-md border border-white bg-transparent text-white pl-10" />
        </div>
        <AiFillPlusCircle onClick={onOpen} className="text-5xl text-white cursor-pointer" />
      </div>

      <div className="mt-4 gap-4 flex flex-col">
        {
          contacts.map((contact) => (
            <ContactCard key={contact.id} contact={contact}/>
          ))
        }
      </div>
    </div>
    <AddAndUpdateContact onClose={onClose} isOpen={isOpen}/>
    </>
  );
};

export default App;