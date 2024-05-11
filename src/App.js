// App.js
import React, { useState } from 'react';
import './App.css';
import BookForm from './BookForm';
import RetrieveBooks from './RetrieveBooks';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';
import logo from './images/logo.jpg';

function App() {
    const [view, setView] = useState('home');
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = (query) => {
        setSearchQuery(query);
        if (query.trim()) {
            setView('search');
        } else {
            setView('home');
        }
    };

    return (
        <div className="App">
            <header className="header">
                <div className="logo">
                    <img src={logo} alt="Logo" style={{ width: '150px', height: '100px' }} />
                </div>
                <h1>Welcome to GCE Book Bank</h1>
                <SearchBar onSearch={handleSearch} />
            </header>
            <div className="sub-nav">
                <ul>
                    <li><button onClick={() => setView('home')}>Home</button></li>
                    <li><button onClick={() => setView('upload')}>Donate Books</button></li>
                    <li><button onClick={() => setView('retrieve')}>Get Books</button></li>
                </ul>
            </div>
            <main>
                {view === 'upload' && <BookForm />}
                {view === 'retrieve' && <RetrieveBooks />}
                {view === 'home' && (
                    <div className="welcome-message">
                        Welcome to the home page. Select an option above.
                    </div>
                )}
                {view === 'search' && <SearchResults searchInput={searchQuery} />}
            </main>
            {/* Footer Section */}
            <footer className="footer">
                <p>@Developed by Monika</p>
            </footer>
        </div>
    );
}

export default App;
