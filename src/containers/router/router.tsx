import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { Header } from "@components/header";
import { Loader } from "@components/loader";
import { NotFound } from "@components/not-found";
import { loadingSelector } from "@containers/redux/selectors";
import { AuthorizationPage } from "@pages/authorization-page";
import { FormNdsPage } from "@pages/form-nds-page";
import { NdsTablePage } from "@pages/nds-page";

import { RoutersPath } from "./constants";

export const Router = () => {
  const isSyncing = useSelector(loadingSelector);
  const token = localStorage.getItem("access_token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/auth");
    } else {
      return;
    }
  }, []);

  return (
    <>
      <Loader isLoading={isSyncing} />
      <Header/>
      <Routes>
        <Route path={RoutersPath.Root} element={<Navigate to={RoutersPath.NdsPage} replace />} />
        <Route path={RoutersPath.NdsPage} element={<NdsTablePage />} />
        <Route path={RoutersPath.AuthPage} element={<AuthorizationPage />} />
        <Route path={`${RoutersPath.EditNds}/:id`} element={<FormNdsPage />} />
        <Route path={RoutersPath.CreateNds} element={<FormNdsPage />} />
        <Route path={RoutersPath.OthersPath} element={<NotFound />} />
      </Routes>
    </>
  );
};
