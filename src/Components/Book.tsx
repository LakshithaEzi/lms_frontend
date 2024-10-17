// src/Components/Book.tsx

import React from 'react';
import { Book as BookType } from '../types/Books';
import { FaRegEdit } from "react-icons/fa";
import { GoTrash } from "react-icons/go";

interface BookProps {
  book: BookType;
  onEdit: (book: BookType) => void;
  onDelete: (id: string) => void;
}

const Book: React.FC<BookProps> = ({ book, onEdit, onDelete }) => {
  return (
    <tr className="font-semibold border-b border-gray-200 hover:bg-gray-100">
      <td className="px-6 py-3 text-left whitespace-nowrap">{book.name}</td>
      <td className="px-6 py-3 text-left">{book.author}</td>
      <td className="px-6 py-3 text-left">{book.description}</td>
      <td className="px-6 py-3 text-center">
        <div className="flex justify-center space-x-2 item-center">
          <button
            onClick={() => onEdit(book)}
            className="w-4 mr-2 transform hover:text-blue-500 hover:scale-110"
          >
            <FaRegEdit size={20} />
          </button>
          <div>|</div>
          <button
            onClick={() => onDelete(book.id)}
            className="w-4 mr-2 transform hover:text-red-500 hover:scale-110"
          >
            <GoTrash size={20} />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default Book;
