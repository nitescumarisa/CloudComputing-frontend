import { getByTitle } from "@testing-library/react";
import axios from "axios";
import React, { useEffect, useState } from "react";

const MyAccount = () => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const res = await axios.get(
                `${process.env.REACT_APP_API_URL}/books`
            );
            setBooks(res.data.books.reverse());
        };

        fetchData();
    }, []);

    console.log(books);

    const deleteBook = async (book) => {
        try {
            const response = await axios.delete(
                `${process.env.REACT_APP_API_URL}/${book.id}`
            );
            console.log(response);
            window.location.reload();
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="bg-purple-200 bg-cover min-h-screen">
            <div className="flex justify-center text-3xl font-bold">
                Favorite books
            </div>
            <div className="mt-4 ml-10">
                {books.length != 0 &&
                    books.map((book, index) => (
                        <div className="mt-1 flex flex-row mt-7" key={book.id}>
                            {index + 1}.{" "}
                            <img
                                className="mr-3 ml-2"
                                style={{ width: "150px" }}
                                src={book.imageLink}
                                alt=""
                            />
                            <div>
                                <div className="font-bold inline-block">
                                    Title{" "}
                                </div>
                                :{" "}
                                <a
                                    className="hover:underline"
                                    href={book.previewLink}
                                    target="_blank"
                                >
                                    {book.title}
                                </a>
                                <br />
                                <div className="font-bold inline-block">
                                    Author{" "}
                                </div>
                                : {book.author}
                                <br />
                                <div className="font-bold inline-block">
                                    Published Date{" "}
                                </div>
                                : {book.publishedDate}
                                <br />
                                <div className="font-bold inline-block">
                                    Rating{" "}
                                </div>
                                : {book.averageRating}
                                <br />
                                <div className="font-bold inline-block">
                                    Description{" "}
                                </div>
                                : {book.description}
                                <br />
                                <button
                                    className="font-bold text-red-500 hover:underline"
                                    onClick={() => deleteBook(book)}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default MyAccount;
