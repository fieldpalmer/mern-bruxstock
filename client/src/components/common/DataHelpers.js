import React from "react";
import axios from "axios";

const GetPublicFiles = props => {
  const { files } = props;
  return <div></div>;
};

const GetAllFiles = props => {
  const { files } = props;
  return <div></div>;
};

const GetAllCategories = props => {
  const { files } = props;
  let allCategories = [];
  files.forEach(file => {
    allCategories.push(file.category);
  });
  return Array.from(new Set(allCategories));
};

const GetAllArtists = () => {
  axios
    .get("http://localhost:5000/api/users")
    .then(res => {
      let artists = [];
      return res.data.forEach(user => {
        if (user.stock.length > 0) {
          artists.push(user);
        }
      });
    })
    .catch(error => {
      console.log(error);
    });
};

const DataHelpers = props => {
  switch (props) {
    case props.dataNeeded === "GetPublicFiles":
      return <GetPublicFiles files={props.files} />;

    case props.dataNeeded === "GetAllFiles":
      return <GetAllFiles files={props.files} />;

    case props.dataNeeded === "GetAllCategories":
      return <GetAllCategories files={props.files} />;

    case props.dataNeeded === "GetAllArtists":
      return <GetAllArtists files={props.files} />;

    default:
      return <GetPublicFiles files={props.files} />;
  }
};

export default DataHelpers;
