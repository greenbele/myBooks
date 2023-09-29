import _ from 'lodash';

import './EditMenuExpanded.scss';

/* eslint-disable react/prop-types */

const EditMenuExpanded = ({
  className,
  onMaskEvent,
}) => {
  /**
   * handles edit option form submission.
   */
  const handleEditOptionSubmit = (e) => {
    e.preventDefault();

    const checkedInput = _.find(e.target, ['checked', true]);
    onMaskEvent(); // hide mask and expanded menu

    console.log('EditMenuExpanded:handleEditOptionSubmit:', checkedInput.value); // SCAFF
  };

  return (
    <div
      className={`edit-menu-expanded ${className}`}
    >
      <h4>Edit whole page or just title and search tags</h4>

      <form onSubmit={handleEditOptionSubmit}>
        <label htmlFor="edit-page">Edit whole page</label>
        <input
          type="radio"
          id="edit-page"
          name="edit-option"
          value="page"
        />

        <label htmlFor="edit-title">Edit title and search tags</label>
        <input
          type="radio"
          id="edit-title"
          name="edit-option"
          value="title"
        />

        <input
          type="submit"
          value="Edit"
        />
      </form>
    </div>
  );
};

export default EditMenuExpanded;
