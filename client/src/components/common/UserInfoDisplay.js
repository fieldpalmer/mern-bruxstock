import React from "react";

const UserInfoDisplay = props => {
  const { name, displayName, location, specialties, email } = props.user;
  return (
    <div>
      GREETINGS&nbsp;|&nbsp;
      <small>name:</small>&nbsp;{name} | <small>display name:</small>&nbsp;
      {displayName} | <small>location:</small>&nbsp;{location} |&nbsp;
      <small>specialties:</small>&nbsp;{specialties} | <small>email:</small>
      &nbsp;{email}
    </div>
  );
};

export default UserInfoDisplay;
