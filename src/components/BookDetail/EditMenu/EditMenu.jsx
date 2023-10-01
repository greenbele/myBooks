import { HiChevronDown } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';

// import './EditMenu.scss';

/* eslint-disable react/prop-types */

const EditMenu = ({
  chapterEditURI,
  onChapterEditButtonClick,
  onChevronClick,
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
    <div className="edit-menu-wrapper">
      <button
        className="edit-default"
        onClick={handleChapterEditButtonClickLocal}
      >
        Edit
      </button>

      <button
        className="edit-options"
        onClick={onChevronClick}
      >
        <HiChevronDown />
      </button>
    </div>
  );
};

export default EditMenu;
