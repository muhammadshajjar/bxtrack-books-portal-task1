import React, { useState, useEffect } from "react";
import styles from "./BooksTable.module.css";

//firebase
import { db } from "../firebase-config";
import { collection, deleteDoc, onSnapshot, doc } from "firebase/firestore";

//third party library

import { Bars } from "react-loader-spinner";

const BooksTable = ({ onGetBookId }) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "books"), (snapShot) => {
      const fetchBooks = [];

      snapShot.docs.forEach((doc) => {
        fetchBooks.push({ ...doc.data(), id: doc.id });
      });
      snapShot.docChanges().forEach((change) => {
        const doc = change.doc;
        if (change.type === "removed") {
          setBooks((prevBooks) =>
            prevBooks.filter((book) => book.id !== doc.id)
          );
        } else if (change.type === "modified") {
          const udpatedBooks = fetchBooks.map((book) => {
            if (book.authorName === doc.data().authorName) {
              return doc.data();
            }
            return book;
          });

          setBooks(udpatedBooks);
        }
      });

      setLoading(false);
      setBooks(fetchBooks);
    });

    // Clean up the listener on component unmount
    return () => unsubscribe();
  }, []);

  const deleteBookHandler = async (id) => {
    try {
      await deleteDoc(doc(db, "books", id));
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <section className={styles.tableContainer}>
      <table>
        <thead>
          <tr className={styles.tableHeader}>
            <th>ID</th>
            <th>Title</th>
            <th>Author</th>
            <th>No.of Pages</th>
            <th>Published On</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {!loading &&
            books.map((book, index) => (
              <tr key={book.id}>
                <td>{index}</td>
                <td>{book.title}</td>
                <td>{book.authorName}</td>
                <td>{book.noOfPages}</td>
                <td>{book.publishedOn}</td>
                <td className={styles.actions}>
                  <button
                    className={`${styles.editAction} ${styles.action}`}
                    onClick={() => onGetBookId(book.id)}
                  >
                    Edit
                  </button>
                  <button
                    className={`${styles.deleteAction} ${styles.action}`}
                    onClick={deleteBookHandler.bind(this, book.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      {books.length === 0 && !loading && (
        <div className={styles.feedBackContainer}>
          <p>No Data Found!</p>
        </div>
      )}

      {loading && (
        <Bars
          height="50"
          width="50"
          color="#fe4c1c"
          ariaLabel="bars-loading"
          wrapperStyle={{}}
          wrapperClass={styles.feedBackContainer}
          visible={true}
        />
      )}
    </section>
  );
};

export default BooksTable;
