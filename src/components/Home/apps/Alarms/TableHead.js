import React from "react";
import { MDBTable, MDBTableBody, MDBTableHead } from "mdbreact";

const TableHead = () => {
  return (
    <MDBTableHead color="primary-color" textWhite>
      <tr>
        <th>TimeStamp</th>
        <th>Air Too Hot</th>
        <th>Air Too Cold</th>
        <th>Air Too Dry</th>
        <th>Air Too Moist</th>
        <th>Water Too Cold</th>
        <th>Water Too Hot</th>
        <th>Ph Too Low</th>
        <th>Ph too High</th>
        <th>Water Level Too Low</th>
        <th>Water Level Too High</th>
        <th>Lights On </th>
        <th>Lights Off</th>
        <th>Motion Start </th>
        <th>Motion Stop</th>
      </tr>
    </MDBTableHead>
  );
};

export default TableHead;
