/* eslint-disable react/prop-types */

// import * as _ from "lodash";

// TODO:
// - here:
//   - implement delete button event handler
//   - implement edit button event handler

/**
 * Renders an element in a page-editing view.
 */
const EditingToolbar = ({
  isToolbarDisabled,
  orders,
  selectedOrder,
  onOrderSelectChange,
}) => {
  // localStorage.setItem('EditingToolbar', _.now()); // SCAFF
  // console.log('Rendering EditingToolbar...'); // SCAFF

  /**
   * perform local actions on select element interaction.
   */
  /*
  const handleSelectChangeLocal = (e) => {
    console.log(e); // SCAFF
    onSelectChange(e);
  };
  */

  return (
    <div>
      {/* edit button */}
      <button
        type="button"
        disabled={isToolbarDisabled}
      >
        Edit
      </button>

      {/* element order change options */}
      <label htmlFor="order">Change order:</label>
      <select
        id="order"
        name="order"
        defaultValue={selectedOrder}
        onChange={onOrderSelectChange}
        disabled={isToolbarDisabled}
      >
        {
          orders.map((order, idx) => {
            return (
              <option
                key={idx}
              >
                {order}
              </option>
            );
          })
        }
      </select>

      {/* delete button */}
      <button
        type="button"
        disabled={isToolbarDisabled}
      >
        Delete
      </button>
  </div>
  );
};

export default EditingToolbar;
