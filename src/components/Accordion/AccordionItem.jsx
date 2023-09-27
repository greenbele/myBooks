import { useRef, useState } from "react";
import { HiChevronDown } from 'react-icons/hi';

import './AccordionItem.scss';

/* eslint-disable react/prop-types */

/**
 * Renders an accordion item.
 *
 * @param {String} title - the accordion item headline.
 * @param {JSX} content - a component to render as content.
 * @returns {JSX} - the output JSX to render.
 */
const AccordionItem = ({
  title,
  content,
  Comp,
}) => {
  const [isActive, setIsActive] = useState(false);

  const contentElement = useRef();

  /**
   * handles click event on the accordion chevron.
   */
  const handleAccordionChevronClick = () => {
    setIsActive(!isActive);
  };

  const active = isActive ? 'active' : '';
  const style = {
    height: isActive
      ? `${contentElement.current.scrollHeight}px`
      : '0px',
    // border: '3px solid',
  };
  console.log('AccordionItem:', style); // SCAFF

  return (
    <div className={`accordion-item`}>
      {/* title */}
      <div
        className="accordion-title"
        onClick={handleAccordionChevronClick}
      >
        {title}
        <HiChevronDown
          className={`${active} accordion-chevron`}
        />
      </div>

      {/* content */}
      <Comp
        className={`${active} accordion-content`}
        style={style}
        contentRef={contentElement}
        num={content}
      />
    </div>
  );
};

export default AccordionItem;
