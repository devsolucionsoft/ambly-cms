import React from "react";
import styles from "../styles/Table.module.scss";
import Swal from "sweetalert2";
import "/node_modules/video-react/dist/video-react.css";
import Link from "next/link";
import Image from "next/image";

// Api
import { TrailersApi } from "../../api/TrailersApi";

const VentasTable = ({ editingTrailers, modalOpen, openModal, itemsTrailers, getTrailers }) => {
  const TrailersApiModel = new TrailersApi();

  const removeTask = (id) => {
    Swal.fire({
      title: "¿Estas seguro?",
      text: "¡Una vez eliminado, no podrá recuperar este trailer!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Eliminar",
      cancelButtonText: "cancel",
      reverseButtons: true,
    }).then((result) => {
      if (result.value) {
        handleDelete(id);
      }
    });
  };

  // DELETE ITEM
  const handleDelete = async (id) => {
    // const response = await TrailersApiModel.deleteTrailers(id);
    // switch (response.status) {
    //   case 201:
    //     getTrailers();
    //     Swal.fire("¡Eliminado!", "Su categoría ha sido eliminado.", "success");
    //     break;
    //   default:
    //     Swal.fire({
    //       icon: "error",
    //       title: "Oops...",
    //       text: "Ha ocurrido un problema, intentalo mas tarde",
    //     });
    //     break;
    // }
  };

  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Curso "Nombre del curso"</th>
            <th>Valor</th>
          </tr>
        </thead>
        <tbody>
          {[0, 1, 2, 3].map((item) => (
            <tr key={item.id}>
              <td>12/05/2023</td>
              <td>
                <div className={styles.TdTableImage}>
                  <span>{"Nombre del curso"}</span>
                </div>
              </td>

              <td>$30.000</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VentasTable;
