import React from "react";
import styles from "../styles/Table.module.scss";
import Swal from "sweetalert2";
import "/node_modules/video-react/dist/video-react.css";
import Link from "next/link";
import Image from "next/image";

// Api
import { TrailersApi } from "../../api/TrailersApi";

const VentasTable = ({ items }) => {
  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>N°</th>
            <th>Fecha</th>
            <th>Curso "Nombre del curso"</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={item.id}>
              <td>{index + 1}</td>
              <td>12/05/2023</td>
              <td>
                <div className={styles.TdTableImage}>
                  <span>{"Nombre del curso"}</span>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VentasTable;
