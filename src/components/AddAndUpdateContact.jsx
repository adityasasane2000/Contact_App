import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import Model from "./Model";
import {ErrorMessage, Field, Form, Formik} from "formik";
import { db } from "../config/firebase";
import { toast } from "react-toastify";
import * as Yup from "yup";

const contactSchemaValidation = Yup.object().shape({
  name:Yup.string().required("Name is Required"),
  email:Yup.string().email("E-mail is not valid").required("E-mail is Required"),
});

const AddAndUpdateContact = ({contact, onClose, isOpen, isUpdate}) =>{

  const addContact = async (values) =>{
    try {
      const contactsRef = collection(db,"contacts");
      await addDoc(contactsRef,values);
      onClose();
      toast.success("Contact Added Successfully");
    } catch (error) {
      console.log(error);
    }
  }

  const updateContact = async (values) =>{
    try {
      await updateDoc(doc(db,"contacts",contact.id),values);
      onClose();
      toast.success("Contact Updated Successfully");
    } catch (error) {
      console.log(error);
    }
  }

    return (
        <div>
            <Model onClose={onClose} isOpen={isOpen}>
                <Formik 
                  validationSchema={contactSchemaValidation}
                  initialValues={isUpdate ? {
                    name:contact.name,
                    email:contact.email,
                  } :
                  {
                    name:"",
                    email:"",
                  }}
                  onSubmit={(values) =>{
                    console.log(values);
                    {isUpdate ? updateContact(values) : addContact(values)};
                  }}
                >
                   <Form className="flex flex-col gap-5">
                      <div className="flex flex-col gap-1">
                        <label htmlFor="name">Name</label>
                        <Field name="name" className="h-10 border"/>
                        <div className="text-red-500 text-xs">
                          <ErrorMessage name="name" />
                        </div>
                      </div>
                      <div className="flex flex-col gap-1">
                        <label htmlFor="email">E-mail</label>
                        <Field name="email" className="h-10 border "/>
                        <div className="text-red-500 text-xs">
                          <ErrorMessage name="email" />
                        </div>
                      </div>

                      <button className="bg-orange px-3 py-1.5 border self-end" type="submit">
                        {isUpdate ? "Update " : "Add "}Contact
                      </button>
                   </Form>
                </Formik>
            </Model>
        </div>
    )
}

export default AddAndUpdateContact;