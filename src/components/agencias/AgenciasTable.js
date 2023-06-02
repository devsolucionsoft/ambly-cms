import React from "react";
import styles from "../styles/Table.module.scss";
import Swal from "sweetalert2";
import "/node_modules/video-react/dist/video-react.css";
import Link from "next/link";
import Image from "next/image";

// Api
import { AgenciaApi } from "../../api/AgenciasApi";

const AgenciasTable = ({ editingAgency, modalOpen, openModal, agenciasItems, getAgencias }) => {
  const AgenciasApiModel = new AgenciaApi();

  const session = JSON.parse(localStorage.getItem("token_session"));

  const removeTask = (id) => {
    Swal.fire({
      title: "¿Estas seguro?",
      text: "¡Una vez eliminado, no podrá recuperar esta agencia!",
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
    const response = await AgenciasApiModel.deleteAgencia(id);
    switch (response.status) {
      case 201:
        getAgencias();
        Swal.fire("¡Eliminado!", "Su agencia ha sido eliminado.", "success");
        break;
      default:
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Ha ocurrido un problema, intentalo mas tarde",
        });
        break;
    }
  };

  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Agencia</th>
            <th></th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {agenciasItems.map((item, index) => (
            <tr key={item.id}>
              <td>
                <div className={styles.TdTableImage}>
                  <h1>{index + 1}</h1>
                  <div className={styles.Image}>
                    {/* <Image
                      objectFit="cover"
                      alt="Picture of the author"
                      layout="fill"
                      src={
                        "https://w7.pngwing.com/pngs/784/809/png-transparent-building-small-business-company-office-corporation-office-icon-insharepics-miscellaneous-blue-text.png"
                      }
                    /> */}
                  </div>
                  <div>
                    <span>{item.name_agency}</span>
                    <p>{item.email}</p>
                  </div>
                </div>
              </td>

              <td className={styles.TdDescription}></td>

              <td>
                <div className={styles.TdActionIcons}>
                  {/* <Link href={`/detalle-de-agencia?id=${item.id}`}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </Link> */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                    onClick={() => (modalOpen ? closeModal() : openModal(), editingAgency(item.id))}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                    />
                  </svg>

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                    onClick={() => removeTask(item.id)}
                    style={{ cursor: "pointer" }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                    />
                  </svg>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AgenciasTable;
