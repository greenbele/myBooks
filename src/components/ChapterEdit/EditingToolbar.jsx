/* eslint-disable react/prop-types */

// import * as _ from "lodash";

// TODO:
// - parent (EditableElement):
//   - implement delete button event handler
//   - implement edit button event handler

/**
 * Renders an element in a page-editing view.
 */
const EditingToolbar = ({
  isToolbarDisabled,
  orders,
  selectedOrder,
  onToolbarEditButtonClick,
  onElementOrderChange,
  onToolbarDeleteButtonClick,
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

  // const useRe

  /**
   * perform local actions on element order change.
   */
  const handleElementOrderChangeLocal = (e) => {
    // retrieve the new order number
    const orderTwo = parseInt(e.target.value);

    onElementOrderChange(selectedOrder, orderTwo);
  };

  /**
   * perfor local actions on delete button click
   */
  const handleToolbarDeleteButtonClickLocal = () => {
    onToolbarDeleteButtonClick(selectedOrder);
  };

  return (
    <div>
      {/* edit button */}
      <button
        type="button"
        onClick={onToolbarEditButtonClick}
        disabled={isToolbarDisabled}
      >
        Edit
      </button>

      {/* element order change options */}
      <label htmlFor="order">Change order:</label>
      <select
        id="order"
        name="order"
        value={selectedOrder}
        onChange={handleElementOrderChangeLocal}
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
        onClick={handleToolbarDeleteButtonClickLocal}
        disabled={isToolbarDisabled}
      >
        Delete
      </button>
  </div>
  );
};

export default EditingToolbar;
