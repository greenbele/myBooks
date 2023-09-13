/* eslint-disable react/prop-types */

/**
 * Takes a list of notification messages and renders them.
 */
const Notification = ({
  messages,
}) => {
  return (
    <div>
      <p>OOPS!</p>
      <ul>
        {
          messages.map((message, idx) => {
            return <li key={idx}>{message}</li>
          })
        }
      </ul>
    </div>
  );
};

export default Notification;
