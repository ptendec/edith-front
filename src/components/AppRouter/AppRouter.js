import React from 'react';
import {Route, Routes} from "react-router-dom"
import RequireAuth from "../../hoc/RequireAuth/RequireAuth"
import Main from "../../pages/Main/Main"
import Records from "../../pages/Records/Records"
import Authorization from "../../pages/Authorization/Authorization"
import CreateRecord from "../../pages/CreateRecord/CreateRecord"

const AppRouter = () => {

  return (
    <Routes>
      <Route path={'/'} element={<Main/>} />
      <Route path={'/client/createRecord/:salonId'} element={<CreateRecord/>} />
      <Route path={'/admin/authorization'} element={<Authorization />}/>
      <Route path={'/admin/records'} element={
        <RequireAuth>
          <Records />
        </RequireAuth>}/>
    </Routes>
  );
};

export default AppRouter;
