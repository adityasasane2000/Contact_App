import Model from "./Model";
import {Field, Form, Formik} from "formik";

const AddAndUpdateContact = ({onClose,isOpen}) =>{
    return (
        <div>
            <Model onClose={onClose} isOpen={isOpen}>
                <Formik>
                   <Form className="flex flex-col gap-5">
                      <div className="flex flex-col gap-1">
                        <label htmlFor="name">Name</label>
                        <Field name="name" className="h-10 border "/>
                      </div>
                      <div className="flex flex-col gap-1">
                        <label htmlFor="email">E-mail</label>
                        <Field name="email" className="h-10 border "/>
                      </div>

                      <button className="bg-orange px-3 py-1.5 border self-end">
                        Add Contact
                      </button>
                   </Form>
                </Formik>
            </Model>
        </div>
    )
}

export default AddAndUpdateContact;