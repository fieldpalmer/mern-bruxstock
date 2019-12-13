import React from "react";
import { Button } from "reactstrap";

const CategorySort = props => {
  const { categories } = props;
  return categories.map((cat, i) => {
    return (
      <Button className="mx-2" id={cat + i} color="secondary">
        {cat}&nbsp;X
      </Button>
    );
  });
};

export default CategorySort;
