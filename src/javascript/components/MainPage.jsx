import React, { useEffect, useState } from "react";
import axios from "axios";
import "../utils/style.css";

const MainPage = () => {
    const [inputValue, setInputValue] = useState("");
    const [books, setBooks] = useState([]);
    const [selectedBook, setSelectedBook] = useState(null);
    const [data, setData] = useState({
        title: "",
        author: "",
        description: "",
        publishedDate: "",
        averageRating: "",
        imageLink: "",
        previewLink: "",
    });

    const handleInput = (e) => {
        e.preventDefault();

        const val = e.target.value;
        setInputValue(val);
    };

    const addBook = async (book) => {
        console.log(book);
        const title = book.volumeInfo.title;
        const author = book.volumeInfo.authors[0];
        const description = book.volumeInfo.description;
        const publishedDate = book.volumeInfo.publishedDate;
        const averageRating = book.volumeInfo.averageRating;
        const imageLink = book.volumeInfo.imageLinks.thumbnail;
        const previewLink = book.volumeInfo.previewLink;

        console.log(title);

        try {
            const response = await axios.post("http://localhost:8080/books", {
                title,
                author,
                description,
                publishedDate,
                averageRating,
                imageLink,
                previewLink,
            });
            console.log(response);
        } catch (err) {
            console.log(err);
        }
    };

    const searchBooks = () => {
        axios
            .get(
                `https://www.googleapis.com/books/v1/volumes?q=${inputValue}&key=${process.env.REACT_APP_BOOKS_API}&maxResults=20`
            )
            .then((data) => {
                console.log(data.data.items);
                setBooks(data.data.items);
            });
    };

    return (
        <div id="MainPage" className="mt-10">
            <div className="text-3xl flex justify-center font-bold">
                Find a book
            </div>
            <div className="flex items-center justify-center mt-3">
                <div className="flex">
                    <input
                        onChange={handleInput}
                        id="title"
                        name="title"
                        type="text"
                        className="form-control relative flex-auto min-w-0 block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                        placeholder="Search..."
                    />
                    <button
                        className="btn inline-block px-6 py-2 border-2 border-blue-600 text-blue-600 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
                        onClick={searchBooks}
                    >
                        Search
                    </button>
                </div>
            </div>
            <div className="flex flex-wrap mt-2 justify-center">
                {books.map((book, index) =>
                    book.volumeInfo.imageLinks ? (
                        <div key={index} className="mx-3 my-3">
                            <figure className="item">
                                <button
                                    onClick={() => addBook(book)}
                                    className="mb-2 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                                >
                                    Add
                                </button>
                                <a
                                    href={book.volumeInfo.previewLink}
                                    className="hover:underline"
                                >
                                    <img
                                        src={
                                            book.volumeInfo.imageLinks.thumbnail
                                        }
                                        alt=""
                                    />
                                    <figcaption className="text-sm center">
                                        {book.volumeInfo.title}
                                    </figcaption>
                                </a>
                            </figure>
                        </div>
                    ) : null
                )}
            </div>
        </div>
    );
};

export default MainPage;
