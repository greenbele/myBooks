import _ from 'lodash';
import { useNavigate } from 'react-router-dom';
import { HiMinus } from 'react-icons/hi';

// import './EditMenuExpanded.scss';

/* eslint-disable react/prop-types */

const EditMenuExpanded = ({
  className,
  onMaskEvent,
  onChapterEditButtonClick,
  onChapterEditFormActive,
  chapterEditURI,
}) => {
  const navigate = useNavigate();

  /**
   * handles edit option form submission.
   */
  const handleEditOptionSubmit = (e) => {
    e.preventDefault();

    // update timestamps
    onChapterEditButtonClick();

    onMaskEvent(); // hide mask and expanded menu

    // collect data
    const checkedInput = _.find(e.target, ['checked', true]);
    const cmd = checkedInput.value;
    // edit page or metadata based on command
    if (cmd === 'page') {
      // navigate to edit page
      navigate(chapterEditURI.replace('http://localhost:5173', ''));
    } else if (cmd === 'title') {
      // activate edit form
      onChapterEditFormActive();
    }

    // console.log('EditMenuExpanded:handleEditOptionSubmit:', checkedInput.value); // SCAFF
  };

  // generate random ID
  const id1 = Math.random().toString();
  const id2 = Math.random().toString();

  return (
    <div
      className={`edit-menu-expanded ${className}`}
    >
      <div className='edit-menu-dragger'>
        <HiMinus className="dragger" />
      </div>

      <h4>Edit whole page or just title and search tags</h4>

      <form onSubmit={handleEditOptionSubmit}>
        <label htmlFor={id1}>Edit whole page</label>
        <input
          type="radio"
          id={id1}
          name="edit-option"
          value="page"
          checked
          readOnly
        />

        <label htmlFor={id2}>Edit title and search tags</label>
        <input
          type="radio"
          id={id2}
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
