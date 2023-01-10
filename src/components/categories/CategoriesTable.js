import React from "react";
import styles from "./CategoriesTable.module.scss";
import Image from "next/image";
// Api
import { CategoriesApi } from "../../api/CategoriesApi";
import Swal from "sweetalert2";

const CategoriesTable = (props) => {
  const { itemsCategories, getCategories, editingCategory, openModal, modalOpen, closeModal } = props;

  const CategoriesApiModel = new CategoriesApi();

  const removeTask = (id) => {
    Swal.fire({
      title: "¿Estas seguro?",
      text: "¡Una vez eliminado, no podrá recuperar esta categoria!",
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
    const response = await CategoriesApiModel.deleteCategory(id);
    switch (response.status) {
      case 201:
        getCategories();
        Swal.fire("¡Eliminado!", "Su categoría ha sido eliminado.", "success");
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
    <div>
      <div className={styles.tHeader}>

        {/* <GButton text={"Agregar Instructor"} /> */}
      </div>

      <div className={`${styles.tableContainer} tableOverflow `}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Nombre de la categoria</th>
              <th className="descriptionModifier" >Descripcion</th>

              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {itemsCategories.map((item) => (
              <tr className={styles.categoryInfo} key={item.id}>
                <td>
                  <div className={styles.categoryName}>
                    <div className={styles.imgContainer}>
                      <Image
                        objectFit="cover"
                        layout="fill"
                        alt="Picture of the author"
                        src={item.image}
                      />
                    </div>

                    <span style={{ padding: "0px 20px" }}>{item.name}</span>
                  </div>
                </td>

                <td className="descriptionModifier">
                  <div className={styles.description}>{item.description}</div>
                </td>

                <td>
                  <div className={styles.actionIcons}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                      onClick={() => (modalOpen ? closeModal() : openModal(), editingCategory(item.id))}
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
    </div>
  );
};

export default CategoriesTable;
