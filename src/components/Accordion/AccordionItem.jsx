import { useState } from "react";
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
  Content,
  classNames,
}) => {
  const [isActive, setIsActive] = useState(false);

  /**
   * handles click event on the accordion chevron.
   */
  const handleAccordionChevronClick = () => {
    setIsActive(!isActive);
  };

  const active = isActive ? 'active' : '';

  return (
    <div className={`accordion-item ${classNames}`}>
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
      <Content className={`${active} accordion-content`} />
    </div>
  );
};

export default AccordionItem;
