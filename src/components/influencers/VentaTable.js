import React from "react";
import styles from "../styles/Table.module.scss";
import Swal from "sweetalert2";
import "/node_modules/video-react/dist/video-react.css";
import Link from "next/link";
import Image from "next/image";

// Api
import { TrailersApi } from "../../api/TrailersApi";

const VentasTable = ({ items }) => {
  const formatCurrency = (value) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    }).format(value);
  };

  // Ordena los elementos por fecha del más nuevo al más viejo
  const sortedItems = items?.sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>N°</th>
            <th>Fecha</th>
            <th>Valor</th>
            <th>Nombre del curso</th>
          </tr>
        </thead>
        <tbody>
          {sortedItems?.map((item, index) => (
            <tr key={item.id} className="tableBody">
              <td>{index + 1}</td>
              <td>{item.date}</td>
              <td>{formatCurrency(item.value)}</td>
              <td>{item.course}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {!items.length && (
        <h3 style={{ textAlign: 'center', padding: '40px' }}>No hubo ventas en las fechas establecidas</h3>
      )}
    </div>
  );
};


export default VentasTable;
