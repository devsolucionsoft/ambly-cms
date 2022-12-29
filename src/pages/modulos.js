import { useState, useEffect } from "react";
import { DashboardLayout } from "../components/dashboard-layout";
import React from "react";
import ModulesTable from "../components/modules/ModulesTable";
import GButton from "../components/buttons/GButton";
import Link from "next/link";
import { useRouter } from "next/router";
// Api
import { CoursesApi } from "../api/CoursesApi";

const Page = () => {
  const CoursesApiModel = new CoursesApi();
  const router = useRouter();
  const { id } = router.query;

  const [itemsCourses, setItemsCourses] = useState([]);
  const [courseInfo, setCourseInfo] = useState({});

  const getCourses = async () => {
    const response = await CoursesApiModel.GetCourses();
    if (response.status === 200) {
      setItemsCourses(response.data);
    }
  };

  useEffect(() => {
    getCourses();
  }, []);

  useEffect(() => {
    if (id) {
      setCourseInfo(itemsCourses.find((item) => item.id === parseInt(id)));
    }
  }, [id, itemsCourses]);

  return (
    <>
      <div className={"container"}>
        <div className="table-header-container">
          <div>
            <h1>Curso ({courseInfo?.name_course})</h1>
            <h2 className="">Modulos</h2>
          </div>

          <Link href={`/agregar-modulos?id=${id}`}>
            <GButton text={"Agregar Modulo"}> Abrir</GButton>
          </Link>
        </div>

        <ModulesTable modulesItems={courseInfo?.modules ? courseInfo.modules : []} />
      </div>
    </>
  );
};
Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
export default Page;
