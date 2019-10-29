import React from "react";
import { CardColumns } from "reactstrap";
import GalleryItem from "./GalleryItem";

const GroupByCategory = props => {
  const { categories, files } = props;

  return categories.map((cat, i) => {
    return (
      <div key={i}>
        <h1>{cat}</h1>
        <hr />
        <CardColumns>
          {files.map(file =>
            file.category === cat && file.view === "public" ? (
              <GalleryItem key={file._id} file={file} />
            ) : null
          )}
        </CardColumns>
      </div>
    );
  });
};

export default GroupByCategory;
