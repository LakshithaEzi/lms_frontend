// src/Components/BookList.tsx

import React from "react";
import { Book as BookType } from "../types/Books";
import Book from "./Book";

interface BookListProps {
  books: BookType[];
  onEdit: (book: BookType) => void;
  onDelete: (id: string) => void;
}

const BookList: React.FC<BookListProps> = ({ books, onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead>
          <tr className="text-sm leading-normal text-gray-600 uppercase bg-gray- font-Poppins">
            <th className="px-6 py-3 text-left">Title</th>
            <th className="px-6 py-3 text-left">Author</th>
            <th className="px-6 py-3 text-left">Description</th>
            <th className="px-6 py-3 text-center">Actions</th>
          </tr>
        </thead>
        <tbody className="text-sm font-light text-gray-600">
          {books.length === 0 ? (
            <tr>
              <td colSpan={4} className="py-4 text-center">
                No books available.
              </td>
            </tr>
          ) : (
            books.map((book) => (
              <Book
                key={book.id}
                book={book}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default BookList;
