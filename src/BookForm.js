import React, { useState } from 'react';
import { storage, db } from './firebase-config';
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';

function BookForm() {
    const [department, setDepartment] = useState('');
    const [semester, setSemester] = useState('');
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [subject, setSubject] = useState('');
    const [file, setFile] = useState(null);
    const [uploadProgress, setUploadProgress] = useState(0);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!department || !semester || !title || !author || !subject || !file) {
            alert('Please fill in all fields and select a file.');
            return;
        }

        const fileRef = ref(storage, `books/${file.name}-${uuidv4()}`);
        const uploadTask = uploadBytesResumable(fileRef, file);

        uploadTask.on('state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setUploadProgress(progress);
                console.log('Upload is ' + progress + '% done');
            },
            (error) => {
                alert(`Failed to upload file: ${error.message}`);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                    addDoc(collection(db, "books"), {
                        department,
                        semester,
                        title,
                        author,
                        subject,
                        pdfUrl: url
                    }).then(() => {
                        alert('Book data and file uploaded successfully!');
                        setDepartment('');
                        setSemester('');
                        setTitle('');
                        setAuthor('');
                        setSubject('');
                        setFile(null);
                        setUploadProgress(0);  
                    }).catch((error) => {
                        alert(`Failed to save book data: ${error.message}`);
                    });
                });
            }
        );
    };

    return (
        <div id="form-ui">
            <form onSubmit={handleSubmit} id="form">
                <div id="form-body">
                    <div id="welcome-lines">
                        <div id="welcome-line-1">Upload Book</div>
                        <div id="welcome-line-2">Fill in the details</div>
                    </div>
                    <div id="input-area">
                        <div className="form-inp">
                            <select id="department" required value={department} onChange={(e) => setDepartment(e.target.value)}>
                                <option value="">Select Department</option>
                                <option value="computer_science">Computer Science</option>
                                <option value="electrical_engineering">Electrical Engineering</option>
                                <option value="electronics_and_communication_engineering">Electronics and Communication Engineering</option>
                                <option value="civil_engineering">Civil Engineering</option>
                                <option value="mechanical_engineering">Mechanical Engineering</option>
                                <option value="metallurgy_engineering">Metallurgical Engineering</option>
                            </select>
                        </div>
                        <div className="form-inp">
                            <select id="semester" required value={semester} onChange={(e) => setSemester(e.target.value)}>
                                <option value="">Select Semester</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                                <option value="8">8</option>
                            </select>
                        </div>
                        <div className="form-inp">
                            <input placeholder="Title" type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                        </div>
                        <div className="form-inp">
                            <input placeholder="Author" type="text" value={author} onChange={(e) => setAuthor(e.target.value)} />
                        </div>
                        <div className="form-inp">
                            <input placeholder="Subject" type="text" value={subject} onChange={(e) => setSubject(e.target.value)} />
                        </div>
                        <div className="form-inp">
                            <input type="file" accept=".pdf" onChange={handleFileChange} />
                        </div>
                    </div>
                    <div id="submit-button-cvr">
                        <button id="submit-button" type="submit">Upload</button>
                    </div>
                    {uploadProgress > 0 && (
    <p style={{ color: 'white' }}>Upload Progress: {uploadProgress.toFixed(2)}%</p>
)}
                </div>
            </form>
        </div>
    );
}

export default BookForm;
