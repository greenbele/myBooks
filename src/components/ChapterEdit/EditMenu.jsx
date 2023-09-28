import Accordion from '../Accordion/Accordion';

/* eslint-disable react/prop-types */

const EditMenu = () => {
  // const testContent2 = <p>Coming soon...</p>;
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

  return (
    <Accordion
      data={testData}
      Comp={TestContent}
    />
  );
};

export default EditMenu;
