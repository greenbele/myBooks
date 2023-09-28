import { Link } from 'react-router-dom';

/* eslint-disable react/prop-types */

/**
 * Renders the content for menu book accordion.
 */
const MenuChapters = ({
  chapters,
  className,
  contentRef,
  style,
}) => {
  return (
    <div
      className={className}
      ref={contentRef}
      style={style}
    >
      <p className="aside-section-title">CHAPTERS</p>

      <ul className="aside-chapters">
        {
          chapters.map((chapter, idx) => {
            return (
              <li key={idx}>
                <Link
                  to={chapter.chapterURI}
                >
                  {chapter.chapterTitle}
                </Link>
              </li>
            )
          })
        }
      </ul>
    </div>
  );
};

export default MenuChapters;
