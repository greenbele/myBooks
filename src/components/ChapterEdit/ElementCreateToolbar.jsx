import { useState } from "react";

/* eslint-disable react/prop-types */

/**
 * Renders toolbar for adding elements to a page.
 */
const ElementCreateToolbar = ({
  onElementCreateToolbarButtonClick,
  isToolbarDisabled,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  /**
   * handles element creation toolbar button click, locally.
   */
  const handleElementCreateToolbarButtonClickLocal = (e) => {
    setIsOpen(false);
    // onElementCreateToolbarButtonClick(e);
  };

  /**
   * controls the details element via click events.
   */
  const handleDetailClick = (e) => {
    e.preventDefault();

    setIsOpen(!isOpen);
  };

  console.log('Rendering ElementCreateToolbar...', 'isOpen:', isOpen); // SCAFF

  return (
    <div>
      <details open={isOpen} onClick={handleDetailClick}>
        <summary>Add element</summary>

        {/* heading elements */}
        <div>
          <p>Headings</p>

          <button
            type="button"
            value="h1"
            disabled={isToolbarDisabled} 
            onClick={handleElementCreateToolbarButtonClickLocal}
          >
            big-high
          </button>

          <button
            type="button"
            value="h2"
            disabled={isToolbarDisabled} 
            onClick={handleElementCreateToolbarButtonClickLocal}
          >
            big-low
          </button>

          <button
            type="button"
            value="h3"
            disabled={isToolbarDisabled} 
            onClick={handleElementCreateToolbarButtonClickLocal}
          >
            medium-high
          </button>

          <button
            type="button"
            value="h4"
            disabled={isToolbarDisabled} 
            onClick={handleElementCreateToolbarButtonClickLocal}
          >
            medium-low
          </button>

          <button
            type="button"
            value="h5"
            disabled={isToolbarDisabled} 
            onClick={handleElementCreateToolbarButtonClickLocal}
          >
            small-high
          </button>

          <button
            type="button"
            value="h6"
            disabled={isToolbarDisabled} 
            onClick={handleElementCreateToolbarButtonClickLocal}
          >
            small-low
          </button>
        </div>

        {/* content elements */}
        <div>
          <p>Content</p>

          <button
            type="button"
            value="p"
            disabled={isToolbarDisabled} 
            onClick={handleElementCreateToolbarButtonClickLocal}
          >
            paragraph
          </button>
        </div>
      </details>
    </div>
  );
};

export default ElementCreateToolbar;
