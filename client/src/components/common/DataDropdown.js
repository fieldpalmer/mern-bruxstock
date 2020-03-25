import React, { useState } from "react";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";

const DataDropdown = props => {
  const { filter, filterSet } = props;
  const [dropdownOpen, setDropdownOpen] = useState(false);

  let dropDownArtists;
  dropDownArtists = filterSet.map((item, i) => {
    return <DropdownItem key={i}>{item.displayName}</DropdownItem>;
  });

  let dropDownTypes;
  dropDownTypes = filterSet.map((item, i) => {
    return <DropdownItem key={i}>{item}</DropdownItem>;
  });

  let dropDownDates;
  let dates = ["Newest", "Oldest"];
  dropDownDates = dates.map((item, i) => {
    return <DropdownItem key={i}>{item}</DropdownItem>;
  });

  let dropDownViews;
  let views = ["Public", "Private"];
  dropDownViews = views.map((item, i) => {
    return <DropdownItem key={i}>{item}</DropdownItem>;
  });

  const dropDownItems = () => {
    switch (filter) {
      case `Artist`:
        return dropDownArtists;
      case `Type`:
        return dropDownTypes;
      case `Date`:
        return dropDownDates;
      case `View`:
        return dropDownViews;
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
