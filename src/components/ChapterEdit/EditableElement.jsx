/* eslint-disable react/prop-types */

// import * as _ from "lodash";

import EditingToolbar from './EditingToolbar';

import { InputChangeManager, PageManager } from '../../constants';

import { useState } from 'react';

// TODO:
// - onOrderSelectChange: handler from App
// - onElementEditFormSubmit: handler from App

/**
 * Renders an element in a page-editing view.
 */
const EditableElement = ({
  orders,
  selectedOrder,
  isToolbarDisabled,
  contentObj,
  idx,
  onElementEditFormSubmit,
  onOrderSelectChange,
  setIsToolbarDisabled,
}) => {
  // localStorage.setItem('EditableElement', _.now()); // SCAFF
  // console.log('Rendering EditableElement...'); // SCAFF
  /**
   * perform local actions on select element interaction.
   */
  /*
  const handleSelectChangeLocal = (e) => {
    console.log(e); // SCAFF
  };
  */

  /**
   * handle click event on toolbar Edit button.
   */
  const handleToolbarEditButtonClick = () => {
    setIsEditing(true);
    setIsToolbarDisabled(true);
  };

  /**
   * handle click event on toolbar Cancel button.
   */
  const handleElementEditFormCancel = () => {
    setIsEditing(false);
    setIsToolbarDisabled(false);
  };

  const inputChangeManager = new InputChangeManager();
  Object.seal(inputChangeManager);
  const initData = {
    inputOneValueInit: contentObj.content,
    onlyInputOne: true,
  };
  Object.assign(inputChangeManager, initData);
  /**
   * handle change event on element edit inputs.
   */
  const handleElementEditFormChange = (e) => {
    // console.log('#####->', e.target.value); // SCAFF
    inputChangeManager.setIsInputOneChanged(e.target.value);
    // console.log('inpC', inputChangeManager.isDisabled(), 'setIs', isSubmitButtonDisabled); // SCAFF
    if (inputChangeManager.isDisabled() !== isSubmitButtonDisabled) {
      setIsSubmitButtonDisabled(!isSubmitButtonDisabled);
    }
  };

  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitButtonDisabled, setIsSubmitButtonDisabled] = useState(true);

  const pageManager = new PageManager();

  // get content area to display based on edit mode flag
  const editOptions = {
    content: contentObj.content,
    isSubmitButtonDisabled,
    onElementEditFormSubmit,
    onElementEditFormCancel: handleElementEditFormCancel,
    onElementEditFormChange: handleElementEditFormChange,
  };
  // console.log(editOptions); // SCAFF
  const contentArea = (
    isEditing
    ?
    pageManager.getEditableElement(contentObj.tag, editOptions)
    :
    pageManager.getElement(contentObj.tag, contentObj.content, idx)
  );

  return (
    <div>
      {/* editing toolbar */}
      <EditingToolbar
        isToolbarDisabled={isToolbarDisabled}
        orders={orders}
        selectedOrder={selectedOrder}
        onOrderSelectChange={onOrderSelectChange}
        onToolbarEditButtonClick={handleToolbarEditButtonClick}
      />

      {/* editable content area */}
      {contentArea}
    </div>
  );
};

export default EditableElement;
