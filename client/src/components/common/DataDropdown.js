import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getFilesByCategory,
  getFilesByUser
} from "../../redux/actions/fileActions";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";

const DataDropdown = props => {
  const { filter, filterSet } = props;
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dispatch = useDispatch();

  // ARTIST SORT DROPDOWN
  let dropDownArtists;
  dropDownArtists = filterSet.map((item, i) => {
    return (
      <DropdownItem onClick={() => dispatch(getFilesByUser(item._id))} key={i}>
        {item.displayName}
      </DropdownItem>
    );
  });

  // CATEGORY SORT DROPDOWN
  let dropDownTypes;
  dropDownTypes = filterSet.map((item, i) => {
    return (
      <DropdownItem onClick={() => dispatch(getFilesByCategory(item))} key={i}>
        {item}
      </DropdownItem>
    );
  });

  const dropDownItems = () => {
    switch (filter) {
      case `Filter by Artist`:
        return dropDownArtists;
      case `Filter by Category`:
        return dropDownTypes;
      default:
        return "Uh Oh";
    }
  };

  const toggle = () => setDropdownOpen(prevState => !prevState);

  return (
    <Dropdown isOpen={dropdownOpen} toggle={toggle}>
      <DropdownToggle className="bg-success btn-sm" block caret>
        {filter}
      </DropdownToggle>
      <DropdownMenu
        modifiers={{
          setMaxHeight: {
            enabled: true,
            order: 890,
            fn: data => {
              return {
                ...data,
                styles: {
                  ...data.styles,
                  overflow: "auto",
                  maxHeight: "200px"
                }
              };
            }
          }
        }}
      >
        {dropDownItems()}
      </DropdownMenu>
    </Dropdown>
  );
};

export default DataDropdown;
