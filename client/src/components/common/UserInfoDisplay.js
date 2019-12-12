import React from "react";

const UserInfoDisplay = props => {
  const { name, displayName, location, specialties, email } = props.user;
  return (
    <div>
      Hello, &nbsp;
      {displayName}!
    </div>
  );
};

export default UserInfoDisplay;
