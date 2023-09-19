import _ from 'lodash';

import { PageManager } from '../../constants';

/* eslint-disable react/prop-types */

const ChapterView = ({
  chapter,
}) => {
  localStorage.setItem('ChapterView', _.now()); // SCAFF
  const pageManager = new PageManager();
  Object.seal(pageManager);
  const initObj = {
    rawPageContents: chapter.page,
  };
  Object.assign(pageManager, initObj);

  const HTMLPageContents = pageManager.getHTMLPageContents();

  // console.log(HTMLPageContents); // SCAFF

  return (
    <>
      {
        HTMLPageContents.length
        ?
        HTMLPageContents
        :
        <p>No content for this chapter</p>
      }
    </>
  );
};

export default ChapterView;
