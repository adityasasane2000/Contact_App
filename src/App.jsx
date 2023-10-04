import NavBar from "./components/NavBar";
import { FiSearch } from "react-icons/fi";
import { AiFillPlusCircle } from "react-icons/ai";
import { useEffect, useState } from "react";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { db } from "./config/firebase";
import ContactCard from "./components/ContactCard";
import AddAndUpdateContact from "./components/AddAndUpdateContact";
import useDisclouse from "./hooks/useDisclouse";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NotFoundCont from "./components/Not FoundCont";

const App = () => {
  const [contacts, setContacts] = useState([]);
  const { isOpen, onClose, onOpen } = useDisclouse();

  useEffect(() => {
    const getContacts = async () => {
      try {
        const contactsRef = collection(db, "contacts");
        onSnapshot(contactsRef, (snapshot) => {
          const contactsLists = snapshot.docs.map((doc) => {
            return {
              id: doc.id,
              ...doc.data(),
            };
          });
          setContacts(contactsLists);
          return contactsLists;
        })
      } catch (error) {
        console.log(error);
      }
    };

    getContacts();
  }, []);

  const filterContact = (e) => {
    const value = e.target.value;

    const contactsRef = collection(db, "contacts");
    onSnapshot(contactsRef, (snapshot) => {
      const contactsLists = snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });

      const filteredContacts = contactsLists.filter((contact) =>
      contact.name.toLowerCase().includes(value.toLowerCase())
      );

      setContacts(filteredContacts);
      return filteredContacts;
    });

  }

  return (
    <>
      <div className="mx-auto max-w-[370px] px-4">
        <NavBar />
        <div className="flex gap-2">
          <div className="relative flex flex-grow items-center">
            <FiSearch className="ml-1 absolute text-3xl text-white" />
            <input onChange={filterContact} type="text" className="h-10 flex-grow rounded-md border border-white bg-transparent text-white pl-10" />
          </div>
          <AiFillPlusCircle onClick={onOpen} className="text-5xl text-white cursor-pointer" />
        </div>

        <div className="mt-4 gap-4 flex flex-col">
          {contacts.length <= 0 ? <NotFoundCont/> : 
            contacts.map((contact) => (
              <ContactCard key={contact.id} contact={contact} />
            ))
          }
        </div>
      </div>
      <AddAndUpdateContact onClose={onClose} isOpen={isOpen} />
      <ToastContainer position="bottom-center" />

    </>
  );
};

export default App;