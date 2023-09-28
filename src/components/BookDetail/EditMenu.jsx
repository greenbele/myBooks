import { HiChevronDown } from 'react-icons/hi';

import './EditMenu.scss';
import { useNavigate } from 'react-router-dom';

/* eslint-disable react/prop-types */

const EditMenu = ({
  chapterEditURI,
  onChapterEditButtonClick,
}) => {
  const navigate = useNavigate();

  /**
   * perform local actions on edit default button click.
   */
  const handleChapterEditButtonClickLocal = () => {
    onChapterEditButtonClick();
    // console.log('EditMenu:handleChapterEditButtonClickLocal:', chapterEditURI); // SCAFF
    navigate(chapterEditURI.replace('http://localhost:5173', ''));
  };

  return (
    <span className="edit-menu-wrapper">
      <button
        className="edit-default"
        onClick={handleChapterEditButtonClickLocal}
      >
        Edit
      </button>

      <button className="edit-options">
        <HiChevronDown />
      </button>
    </span>
  );
};

export default EditMenu;
