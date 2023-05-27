import Header from "./components/Header";
import { useState } from "react";
import "./App.css";

//components

import BooksForm from "./components/BooksForm";
import BooksTable from "./components/BooksTable";
import Footer from "./components/Footer";

function App() {
  const [bookId, setBookId] = useState("");
  const getBookIdHandler = (id) => {
    setBookId(id);
  };
  return (
    <>
      <Header />
      <div className="container">
        <section className="hero">
          <span>BXTrack CRUD Books Portal</span>
          <h1>Embrace the Power of Words with BXTrack Solutions</h1>
        </section>
        <BooksForm isEdited={bookId} setIsEdited={setBookId} />
        <BooksTable onGetBookId={getBookIdHandler} />
      </div>
      <Footer />
    </>
  );
}

export default App;
