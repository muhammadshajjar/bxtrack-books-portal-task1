import React, { useEffect, useState } from "react";
import styles from "./BooksForm.module.css";

//components

import useInput from "../hooks/use-input";
import InputField from "./InputField";

//helper functions

import { fieldIsNotEmpty, dateIsValid } from "../helper/validation";

//firebase

import { db } from "../firebase-config";
import { collection, addDoc, getDoc, updateDoc, doc } from "firebase/firestore";

//third party library

import { Bars } from "react-loader-spinner";

const collectionRef = collection(db, "books");

const BooksForm = ({ isEdited, setIsEdited }) => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    value: enteredName,
    isValid: enteredNameIsValid,
    hasError: nameInputHasError,
    valueChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    setEnteredValue: setEnteredName,
    reset: resetNameInput,
  } = useInput(fieldIsNotEmpty);

  const {
    value: enteredAuthorName,
    isValid: enteredAuthorNameIsValid,
    hasError: authorNameInputHasError,
    valueChangeHandler: authorNameChangeHandler,
    inputBlurHandler: authorNameBlurHandler,
    setEnteredValue: setEnteredAuthorName,

    reset: resetAuthorNameInput,
  } = useInput(fieldIsNotEmpty);

  const {
    value: enteredPages,
    isValid: enteredPagesIsValid,
    hasError: pagesInputHasError,
    valueChangeHandler: pagesChangeHandler,
    inputBlurHandler: pagesBlurHandler,
    setEnteredValue: setEnteredPages,
    reset: resetPagesInput,
  } = useInput(fieldIsNotEmpty);

  const {
    value: enteredDate,
    isValid: enteredDateIsValid,
    hasError: dateInputHasError,
    valueChangeHandler: dateChangeHandler,
    inputBlurHandler: dateBlurHandler,
    setEnteredValue: setEnteredDate,
    reset: resetDateInput,
  } = useInput(dateIsValid);

  const editBookHandler = async () => {
    const bookDoc = doc(db, "books", isEdited);
    setIsLoading(true);

    const docSnap = await getDoc(bookDoc);

    setEnteredName(docSnap.data().title);
    setEnteredAuthorName(docSnap.data().authorName);
    setEnteredPages(docSnap.data().noOfPages);
    setEnteredDate(docSnap.data().publishedOn);

    setIsLoading(false);
  };
  useEffect(() => {
    isEdited && editBookHandler();
  }, [isEdited]);
  let formIsValid = false;

  if (
    enteredNameIsValid &&
    enteredPagesIsValid &&
    enteredAuthorName &&
    enteredDate
  ) {
    formIsValid = true;
  }
  const formSubmitHandler = async (e) => {
    e.preventDefault();

    if (
      !enteredNameIsValid &&
      !enteredPagesIsValid &&
      !enteredAuthorNameIsValid &&
      !enteredDateIsValid
    ) {
      return;
    }

    setIsLoading(true);
    try {
      if (isEdited) {
        const bookDoc = doc(db, "books", isEdited);
        await updateDoc(bookDoc, {
          title: enteredName,
          authorName: enteredAuthorName,
          noOfPages: enteredPages,
          publishedOn: enteredDate,
        });
        setIsLoading(false);
        setIsEdited("");
      } else {
        await addDoc(collectionRef, {
          title: enteredName,
          authorName: enteredAuthorName,
          noOfPages: enteredPages,
          publishedOn: enteredDate,
        });
        setIsLoading(false);
      }
    } catch (err) {
      console.log(err.messsage);
    }

    setIsLoading(false);
    resetNameInput();
    resetPagesInput();
    resetAuthorNameInput();
    resetDateInput();
  };

  return (
    <form className={styles.form} onSubmit={formSubmitHandler}>
      <div className="flex">
        <InputField
          label="Book Name"
          type="text"
          value={enteredName}
          hasError={nameInputHasError}
          valueChangeHandler={nameChangeHandler}
          inputBlurHandler={nameBlurHandler}
          errorMessage="Book Name must not be empty"
        />

        <InputField
          label="Author Name"
          type="text"
          value={enteredAuthorName}
          hasError={authorNameInputHasError}
          valueChangeHandler={authorNameChangeHandler}
          inputBlurHandler={authorNameBlurHandler}
          errorMessage="Author name must not be empty"
        />
      </div>
      <div className="flex">
        <InputField
          label="No.of Pages"
          type="number"
          value={enteredPages}
          hasError={pagesInputHasError}
          valueChangeHandler={pagesChangeHandler}
          inputBlurHandler={pagesBlurHandler}
          errorMessage="Pages must not be empty"
        />

        <InputField
          label="Published On"
          type="text"
          placeHolder="MM/DD/YYYY"
          value={enteredDate}
          hasError={dateInputHasError}
          valueChangeHandler={dateChangeHandler}
          inputBlurHandler={dateBlurHandler}
          errorMessage="Please correct the format (MM/DD/YYYY)"
        />
      </div>

      <button
        disabled={!formIsValid}
        className={styles.doneBtn}
        onSubmit={formSubmitHandler}
      >
        Done
      </button>

      {isLoading && (
        <Bars
          height="50"
          width="50"
          color="#fe4c1c"
          ariaLabel="bars-loading"
          wrapperStyle={{}}
          wrapperClass={styles.loader}
          visible={true}
        />
      )}
    </form>
  );
};

export default BooksForm;
