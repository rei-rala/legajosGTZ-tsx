import React, { useState } from "react";

const TableTHSort = ({
  source,
  sortParameter,
  management,
  refreshUseEffect,
  children,
}) => {
  const [currentSort, setCurrentSort] = useState([]);
  const manageCurrentSort = setCurrentSort;

  const sortingFunction = (sortBy) => {
    let sortedSource;
    sortBy = sortBy.toString()

    if (currentSort[1] === 'ascendente') {
      manageCurrentSort([sortBy, "descendente"]);

      sortedSource = source.sort((a, b) => typeof b[sortBy] !== typeof Number
        ? b[sortBy] > a[sortBy]
          ? +1
          : -1
        : b[sortBy].localeCompare(a[sortBy])
      )
    }
    else {
      manageCurrentSort([sortBy, "ascendente"]);
      sortedSource = source.sort((a, b) => typeof a[sortBy] !== typeof Number
        ? a[sortBy] > b[sortBy]
          ? +1
          : -1
        : a[sortBy].localeCompare(b[sortBy])
      )
    }

    management();
    management(sortedSource);
  }


  return (
    <th
      scope="col"
      className={currentSort[0] === sortParameter ? "sortMethod activeSortMethod" : "sortMethod"}
      onClick={() => {
        sortingFunction(sortParameter);
        refreshUseEffect();
      }}
      title={`Click para ordenar por ${sortParameter}`}
    >
      {<>{children}
        <span className='ordenIndicador'>{
          currentSort[1] === 'ascendente' && currentSort[0] === sortParameter
            ? '↑'
            : currentSort[1] === 'descendente' && currentSort[0] === sortParameter
              ? '↓'
              : '~'
        }</span></>}
    </th >
  );
};

export default TableTHSort;
