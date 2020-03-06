import React, { useState } from "react";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";

const DataDropdown = props => {
  const { filter } = props;
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen(prevState => !prevState);

  return (
    <Dropdown isOpen={dropdownOpen} toggle={toggle}>
      <DropdownToggle caret>{filter}</DropdownToggle>
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
        <DropdownItem header>Header</DropdownItem>
        <DropdownItem divider />
        <DropdownItem>Some Action</DropdownItem>
        <DropdownItem disabled>Action (disabled)</DropdownItem>
        <DropdownItem>Bar Action</DropdownItem>
        <DropdownItem>Quo Action</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default DataDropdown;

// Dropdown.propTypes = {
//   a11y: PropTypes.bool, // defaults to true. Set to false to enable more bootstrap like tabbing behavior
//   disabled: PropTypes.bool,
//   direction: PropTypes.oneOf(['up', 'down', 'left', 'right']),
//   group: PropTypes.bool,
//   isOpen: PropTypes.bool,
//   // For Dropdown usage inside a Nav
//   nav: PropTypes.bool,
//   active: PropTypes.bool,
//   // For Dropdown usage inside a Navbar (disables popper)
//   inNavbar: PropTypes.bool,
//   tag: PropTypes.string, // default: 'div' unless nav=true, then 'li'
//   toggle: PropTypes.func,
//   setActiveFromChild: PropTypes.bool
// };

// DropdownToggle.propTypes = {
//   caret: PropTypes.bool,
//   color: PropTypes.string,
//   className: PropTypes.string,
//   disabled: PropTypes.bool,
//   onClick: PropTypes.func,
//   'data-toggle': PropTypes.string,
//   'aria-haspopup': PropTypes.bool,
//   // For DropdownToggle usage inside a Nav
//   nav: PropTypes.bool,
//   // Defaults to Button component
//   tag: PropTypes.any
// };

// DropdownMenu.propTypes = {
//   tag: PropTypes.string,
//   children: PropTypes.node.isRequired,
//   right: PropTypes.bool,
//   flip: PropTypes.bool, // default: true,
//   className: PropTypes.string,
//   cssModule: PropTypes.object,
//   // Custom modifiers that are passed to DropdownMenu.js, see https://popper.js.org/popper-documentation.html#modifiers
//   modifiers: PropTypes.object,
//   persist: PropTypes.bool, // presist the popper, even when closed. See #779 for reasoning
//   // passed to popper, see https://popper.js.org/popper-documentation.html#Popper.Defaults.positionFixed
//   positionFixed: PropTypes.bool
// };

// DropdownItem.propTypes = {
//   children: PropTypes.node,
//   active: PropTypes.bool,
//   disabled: PropTypes.bool,
//   divider: PropTypes.bool,
//   tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
//   header: PropTypes.bool,
//   onClick: PropTypes.func,
//   className: PropTypes.string,
//   cssModule: PropTypes.object,
//   toggle: PropTypes.bool // default: true
// };
