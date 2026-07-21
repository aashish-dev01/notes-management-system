import { useState, useEffect, react } from "react";
import { createNote, updateNote, } from "../services/noteService";
import Inputfield from "./Input";
import toast from "react-hot-toast";

const AddNote = ({ onClose, onNoteAdded, selectedNote, }) => {



    const [formData, setFormData] = useState({
        title: "",
        description: "",
    });


    useEffect(() => {  // this runs when a selectedNote renders or change 

        if (selectedNote) {

            setFormData({

                title: selectedNote.title,

                description: selectedNote.description

            })

        }

    }, [selectedNote])






    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };




    const handleSubmit = async (e) => {
        e.preventDefault();

        try {


            if (!formData.title || !formData.description) {
                toast.error("Please fill the details");
                return;
            }

            if (selectedNote) {

                await updateNote(selectedNote._id, formData); // update a note with id 

                toast.success("Note Updated Successfully");
                await onNoteAdded() // fetched newly updated / created notes
                onClose()    // for remove our update card 
            }

            else {
                await createNote(formData);  // create new note 
                await onNoteAdded()  // fetched newly updated / created notes

               toast.success("Note Added Successfully");

                onClose();  // for remove add card 

            }







        } catch (error) {
            console.log(error);
        }
    };






    return (
        <>

            <div className="fixed inset-0 bg-black/50 flex justify-center items-center">

                <div className="bg-white p-6 rounded-xl w-125">
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-2xl font-bold ">
                            {selectedNote ? "Edit Note" : "Add Note"}
                        </h2>

                        <button
                            onClick={onClose}
                            className="bg-red-500 text-white px-2 mt-1  rounded-full cursor-pointer"
                        >
                            X
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">

                        <Inputfield
                            lable="Title "
                            type="text"
                            name="title"
                            placeholder="Enter Title"
                            value={formData.title}
                            onChange={handleChange}
                        />

                        <div>
                            <label className="block mb-2 font-medium text-gray-700">
                                Description
                            </label>

                            <textarea
                                rows="6"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                placeholder="Write your note..."
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 resize-none focus:outline-none focus:ring-2 focus:ring-violet-500"
                            ></textarea>
                        </div>
                        <div className="text-center">
                            <button
                                className="px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition cursor-pointer "
                                type="submit"
                            >
                                {selectedNote ? "Update Note" : "Save Note"}                         
                                
                                   </button>
                        </div>

                    </form>

                </div>

            </div>

        </>
    )
}

export default AddNote