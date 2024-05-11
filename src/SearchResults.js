import React, { useState, useEffect } from 'react';
import { db } from './firebase-config.js';
import { collection, getDocs } from 'firebase/firestore';
import './styles.css';

function SearchResults({ searchInput }) {
    const [allBooks, setAllBooks] = useState([]);
    const [filteredBooks, setFilteredBooks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchBooks() {
            try {
                const booksRef = collection(db, "books");
                const snapshot = await getDocs(booksRef);
                const books = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setAllBooks(books);
            } catch (error) {
                console.error("Error fetching books:", error);
                alert('Failed to fetch books.');
            }
            setLoading(false);
        }

        fetchBooks();
    }, []);

    useEffect(() => {
        const filterBooks = () => {
            if (!searchInput.trim()) {
                setFilteredBooks([]);
                return;
            }
            const searchTerm = searchInput.toLowerCase().trim();
            const results = allBooks.filter(book =>
                book.title.toLowerCase().includes(searchTerm) ||
                book.author.toLowerCase().includes(searchTerm) ||
                book.department.toLowerCase().includes(searchTerm) ||
                book.subject.toLowerCase().includes(searchTerm)
            );

            setFilteredBooks(results);
        };

        filterBooks();
    }, [searchInput, allBooks]);

    return (
        <div>
            <h2>Search Books</h2>
            {loading ? <p>Loading...</p> : (
                <div className="results-container">
                    {filteredBooks.length > 0 ? filteredBooks.map(book => (
                        <div key={book.id} style={{ margin: '10px', padding: '20px', border: '1px solid #ccc' }}>
                            <h3>{book.title}</h3>
                            <p><strong>Author:</strong> {book.author}</p>
                            <p><strong>Department:</strong> {book.department}</p>
                            <p><strong>Subject:</strong> {book.subject}</p>
                            <a href={book.pdfUrl} target="_blank" rel="noopener noreferrer">Download PDF</a>
                        </div>
                    )) : <p>No books found.</p>}
                </div>
            )}
        </div>
    );
}

export default SearchResults;
