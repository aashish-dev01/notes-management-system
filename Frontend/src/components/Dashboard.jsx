import React from 'react'
import Navbar from './Navbar'
import { useAuth } from '../context/Authcontext'
import { useEffect, useState } from "react";
import { getNotes, deleteNote, updateNote } from "../services/noteService";
import NoteCard from "../components/NoteCard";
import AddNote from './AddNote';
import Swal from "sweetalert2";
import toast from 'react-hot-toast';

const Dashboard = () => {

    const { user } = useAuth();

    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false); // our addnote page which apperas and disaprreas
    const [selectedNote, setSelectedNote] = useState(null);   // used to select a perticular note

    const fetchNotes = async () => {
        try {
            const data = await getNotes();

            setNotes(data.notes);

        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {  // jab dashborad pehli baar render hua 
        fetchNotes();
    }, []);


    if (loading) {
        return (
            
            <h2 className="text-center font-bold text-xl mt-10">
                Loading...
            </h2>
           
        );
    }



    const handleEdit = (note) => {

        setSelectedNote(note);

        setShowModal(true);

    }




    const handleDelete = async (id) => {


        const result = await Swal.fire({
            title: "Delete Note?",
            text: "This action cannot be undone.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#dc2626",
            cancelButtonColor: "#6b7280",
            confirmButtonText: "Delete",
            cancelButtonText: "Cancel",
        });




        if (!result.isConfirmed) return;

        try {

            await deleteNote(id);
            
            toast.success("Note Deleted Successfully");

            await fetchNotes();

        } catch (error) {

            console.log(error);

        }

    }

    const handlePin = async (note) => {
        try {

            await updateNote(note._id, {

                title: note.title,

                description: note.description,

                isPinned: !note.isPinned

            });

            await fetchNotes();

        } catch (error) {

            console.log(error);

        }

    }


    return (
        <div>
            <Navbar />
            <main className="max-w-7xl mx-auto px-6 py-8">
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-center capitalize">
                        <span className='text-violet-500'> Welcome</span> {user.name}
                    </h1>
                    <p className="text-gray-500 mt-2 text-center">
                        Nice to see you.
                    </p>
                    <div className='flex justify-between items-center mt-5 mb-5'>
                        <h3 className="text-2xl font-bold ">
                            Your Notes :
                        </h3>

                        <button
                            onClick={() => setShowModal(true)}
                            className="bg-violet-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                        >
                            + Add Note
                        </button>
                    </div>


                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>

                        {notes.map((note) => (
                            <NoteCard
                                key={note._id}
                                note={note}
                                onEdit={handleEdit}
                                onDelete={handleDelete}
                                onPin={handlePin}

                            />
                        ))}



                    </div>

                    {
                        !loading && notes.length === 0 &&
                        (
                            <div className="text-center mt-10">
                                <h2 className="text-2xl font-bold">
                                    No Notes Found 📭
                                </h2>

                                <p className="text-gray-500 mt-2">
                                    Create your first note.
                                </p>
                            </div>
                        )

                    }

                    {
                        showModal && (
                            <AddNote
                                onClose={() => { setShowModal(false); setSelectedNote(null) }}
                                onNoteAdded={fetchNotes}
                                selectedNote={selectedNote}


                            />
                        )
                    }


                </div>



            </main>

        </div>
    )
}

export default Dashboard