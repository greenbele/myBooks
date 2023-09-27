import AccordionItem from '../Accordion/AccordionItem';

const EditMenu = () => {
  const testContent = ({ className }) => (
    <div className={className}>
      <p>Title</p>
      <p>Page</p>
    </div>
  );

  // const testContent2 = <p>Coming soon...</p>;

  return (
    <AccordionItem
      title="Edit..."
      Content={testContent}
    />
  );
};

export default EditMenu;
