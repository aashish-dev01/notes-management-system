import { FaEdit, FaTrash, FaThumbtack } from "react-icons/fa";

const NoteCard = ({ note, onEdit, onDelete , onPin }) => {

  return (

    <div className="bg-slate-100 rounded-xl shadow-md p-5 hover:shadow-xl transition-all duration-300">

      <div className="flex justify-between items-center mb-4">

        <h2 className="text-lg font-bold capitalize">
          {note.title}
        </h2>

        <div className="flex gap-5">

          <button
            onClick={() => {onPin(note)}}
          >
            <FaThumbtack
              className={note.isPinned ? "text-yellow-500" : "text-gray-400" }
            />
          </button>

          <button
            className="text-blue-600 hover:text-blue-800"
            onClick={() => { onEdit(note) }}
          >

            <FaEdit />
          </button>

          <button className="text-red-600 hover:text-red-800"
            onClick={() => onDelete(note._id)}

          >

            <FaTrash />
          </button>
        </div>

      </div>

      <p className="text-gray-600 mb-4 capitalize">
        {note.description}
      </p>

      

    </div>
  );
};

export default NoteCard;