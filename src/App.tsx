import React, { useEffect, useState } from "react";
import axios from "axios";
import BookForm from "./Components/BookForm";
import BookList from "./Components/BookList";
import Modal from "./Components/Modal";
import { Book, BookFormData } from "./types/Books";
import { Library } from "lucide-react";

const App: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [editingBook, setEditingBook] = useState<Book | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch all books from the API when the component mounts
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get("https://localhost:5000/api/books"); // Updated to HTTPS
        setBooks(response.data);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchBooks();
  }, []);

  const handleAddBook = async (data: BookFormData) => {
    try {
      const response = await axios.post(
        "https://localhost:5000/api/Books",
        data
      ); // Updated to HTTPS
      const newBook: Book = { ...response.data }; // Assume response contains the created book
      setBooks([...books, newBook]);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error adding book:", error);
    }
  };

  const handleEditBook = async (data: BookFormData) => {
    if (editingBook) {
      try {
        const updatedBook = { ...editingBook, ...data }; // Include the ID in the updated book
        await axios.put(
          `https://localhost:5000/api/Books/${editingBook.id}`,
          updatedBook
        ); // Updated to HTTPS
        const updatedBooks = books.map((book) =>
          book.id === editingBook.id ? updatedBook : book
        );
        setBooks(updatedBooks);
        setEditingBook(null);
      } catch (error) {
        console.error("Error updating book:", error);
      }
    }
  };

  const handleDeleteBook = async (id: string) => {
    try {
      await axios.delete(`https://localhost:5000/api/Books/${id}`); // Updated to HTTPS
      setBooks(books.filter((book) => book.id !== id));
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container px-4 py-8 mx-auto">
        <header className="mb-8">
          <div className="flex items-center justify-center">
            <Library size={48} className="mr-4 text-blue-800" />
            <h1 className="text-4xl font-bold text-gray-800 font-Poppins">
              Library Management System
            </h1>
          </div>
        </header>
        <div className="p-6 bg-white rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold font-Poppins">Book List</h2>
            <button
              onClick={openModal}
              className="px-4 py-2 font-bold text-white bg-blue-800 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 font-Poppins"
            >
              Add Book
            </button>
          </div>
          <BookList
            books={books}
            onEdit={setEditingBook}
            onDelete={handleDeleteBook}
          />
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal} title="Add New Book">
        <BookForm onSubmit={handleAddBook} />
      </Modal>
      {editingBook && (
        <Modal
          isOpen={true}
          onClose={() => setEditingBook(null)}
          title="Edit Book"
        >
          <BookForm initialData={editingBook} onSubmit={handleEditBook} />
        </Modal>
      )}
    </div>
  );
};

export default App;
