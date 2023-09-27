import AccordionItem from './AccordionItem';

/* eslint-disable react/prop-types */

/**
 * Renders an accordion using AccordionItem components.
 *
 * @param {Array} data - array of accordion item data objects, each containing item title and content as a JSX component.
 * @param {String} accordionClassNames - class(es) for applying custom styles to the accordion.
 * @returns {JSX} - a JSX component.
 */
const Accordion = ({
  data,
  accordionClassNames,
}) => {
  const TestContent = ({ className, contentRef, style, num }) => (
    <div ref={contentRef} className={className} style={style}>
      <p>{`Content${num}`}</p>
    </div>
  );

  const testData = [
    {
      title: 'React-eco',
      content: 1,
    },
    {
      title: 'Redux-eco',
      content: 2,
    },
  ];

  return (
    <div className={`${accordionClassNames} accordion-list`}>
      {
        testData.map((itemData, idx) => {
          return (
            <AccordionItem
              key={idx}
              title={itemData.title}
              content={itemData.content}
              Comp={TestContent}
            />
          );
        })
      }
    </div>
  );
};

export default Accordion;
