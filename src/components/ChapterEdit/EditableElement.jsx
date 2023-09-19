/* eslint-disable react/prop-types */

// import * as _ from "lodash";

import EditingToolbar from './EditingToolbar';

import { PageManager } from '../../constants';

import { useState } from 'react';

// TODO:
// - onOrderSelectChange: handler from App
// - onElementEditFormSubmit: handler from App
// - onCancelClick: handler implemented here
// - orders: from parent (ChapterEditContent)
// - selectedOrder: from parent (ChapterEditContent)

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
  const onElementEditFormCancel = () => {
    setIsEditing(false);
    setIsToolbarDisabled(false);
  };

  const [isEditing, setIsEditing] = useState(false);

  const pageManager = new PageManager();

  // get content to display
  const editOptions = {
    content: contentObj.content,
    onCancelClick: null,
    onElementEditFormSubmit,
    onElementEditFormCancel,
  };

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
