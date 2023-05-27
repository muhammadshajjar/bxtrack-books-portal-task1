import moment from "moment"; //thrid party package for date validation https://momentjs.com/
export const fieldIsNotEmpty = (value) => value?.trim() !== "";

export const dateIsValid = (value) => {
  if (
    moment(value, "MM/DD/YYYY", true).isValid() ||
    moment(value, "M/DD/YYYY", true).isValid() ||
    moment(value, "MM/D/YYYY", true).isValid()
  ) {
    return true;
  } else {
    return false;
  }
};
