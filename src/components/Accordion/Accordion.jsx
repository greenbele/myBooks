import AccordionItem from './AccordionItem';

/* eslint-disable react/prop-types */

/**
 * Renders an accordion using AccordionItem components.
 *
 * @param {Array} data - array of accordion item data objects, each containing item title and content data.
 * @param {JSX} Comp - component to render the content with. If not provided here, should be on data.
 * @param {String} accordionClassNames - class(es) for applying custom styles to the accordion.
 * @returns {JSX} - a JSX component.
 */
const Accordion = ({
  data,
  accordionClassNames,
  Comp = null,
}) => {
  /*
  const TestContent = ({ className, contentRef, style, num }) => (
    <div ref={contentRef} className={className} style={style}>
      <p>{`Content${num}`}</p>
    </div>
  );

  const testData = [
    {
      title: 'React-eco',
      contentProps: { num: 1 },
    },
    {
      title: 'Redux-eco',
      contentProps: { num: 2 },
    },
  ];
  */

  return (
    <div className={`${accordionClassNames} accordion-list`}>
      {
        data.map((itemData, idx) => {
          return (
            <AccordionItem
              key={idx}
              title={itemData.title}
              contentProps={itemData.contentProps}
              Comp={Comp || itemData.Comp}
            />
          );
        })
      }
    </div>
  );
};

export default Accordion;
