import { DashboardLayout } from '../components/dashboard-layout';
import React from 'react';
import ModulesTable from '../components/modules/ModulesTable';
import GButton from '../components/buttons/GButton';
import Link from 'next/link';

const Page = () => {
  return (
    <>
      <div className={"container"}>
        <div className="table-header-container">
          <div>
            <h1>Curso (nombre del curso)</h1>
            <h2 className="">Modulos</h2>
          </div>

          <Link href="/agregar-modulos">
            <GButton
              text={"Agregar Modulo"}

            >
              {" "}
              Abrir
            </GButton>
          </Link>

        </div>

        <ModulesTable/>
      </div>

    </>
  )
}
Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
export default Page
