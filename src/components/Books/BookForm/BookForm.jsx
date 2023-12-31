/* eslint-disable react/prop-types */

// let inputOneValueInit;
// let inputTwoValueInit;

import { useState } from "react";

import { InputChangeManager } from '../../../constants';

import Notification from '../../Notification/Notification';
import './BookForm.scss';

/**
 * Renders the form for creating and updating books and chapters.
 */
const BookForm = ({
  onBookFormSubmit,
  bookFormData,
  isEditing,
  classNm,
  onMaskEvent,
}) => {
  const [disabled, setDisabled] = useState(isEditing || false);
  const [err, setErr] = useState([]);

  // console.log(bookFormData); // SCAFF

  // get initial input values
  const inputOneValueInit = bookFormData.inputOneValue;
  const inputTwoValueInit = bookFormData.inputTwoValue;

  // initialize input change manager with the init values
  const inputChangeManager = new InputChangeManager();
  Object.seal(inputChangeManager);
  const inputValues = {
    inputOneValueInit,
    inputTwoValueInit,
  };
  Object.assign(inputChangeManager, inputValues);

  /**
   * conditionally activates and deactivates form submit button.
   */
  const handleInputOneEditChange = (e) => {
    if (isEditing) {
      const inputValueCurrent = e.target.value;

      // console.log('#####->', inputValueCurrent); // SCAFF

      inputChangeManager.setIsInputOneChanged(inputValueCurrent);
      if (inputChangeManager.isDisabled() !== disabled) {
        setDisabled(!disabled);
      }

      // console.log('initInputs:', inputValues, 'disabled:', disabled, 'inputManager:', inputChangeManager); // SCAFF
    }
  };

  /**
   * conditionally activates and deactivates form submit button.
   */
  const handleInputTwoEditChange = (e) => {
    if (isEditing) {
      const inputValueCurrent = e.target.value;

      // console.log('#####->', inputValueCurrent); // SCAFF

      inputChangeManager.setIsInputTwoChanged(inputValueCurrent);
      if (inputChangeManager.isDisabled() !== disabled) {
        setDisabled(!disabled);
      }
    }
  };

  /**
   * perform local actions on form submission.
   */
  const handleBookFormSubmitLocal = (e) => {
    const err = onBookFormSubmit(e, setDisabled);
    setErr(err);
  };

  return (
    <>
      {/* err notifications */}
      {
        err?.length
        ?
        <Notification messages={err} />
        :
        null
      }

      <form
        onSubmit={handleBookFormSubmitLocal}
        className={`form book-form ${classNm}`}
      >
        <div className="input-one">
          <label htmlFor={bookFormData.inputOneID}>{bookFormData.inputOneLabel}</label>
          <input
            type={bookFormData.inputOneType}
            id={bookFormData.inputOneID}
            name={bookFormData.inputOneName}
            defaultValue={bookFormData.inputOneValue}
            onChange={handleInputOneEditChange}
            required
          />
        </div>

        <div className="input-two">
          <label htmlFor={bookFormData.inputTwoID}>{bookFormData.inputTwoLabel}</label>
          <input
            type={bookFormData.inputTwoType}
            id={bookFormData.inputTwoID}
            name={bookFormData.inputTwoName}
            defaultValue={bookFormData.inputTwoValue}
            onChange={handleInputTwoEditChange}
          />
        </div>

        {/* action buttons */}
        <div className="form-actions-wrapper">
          {
            isEditing
            &&
            <input
              className="button-action-secondary"
              onClick={onMaskEvent}
              type="button"
              value="Cancel"
            />
          }

          <input
            className="button-action-primary"
            type="submit"
            value={bookFormData.buttonValue}
            disabled={disabled}
          />
        </div>
      </form>
    </>
  );
};

export default BookForm;
