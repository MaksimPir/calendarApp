import { Navigate } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import { privateRoutes, publicRoutes, routesEnum } from "../routes";
import { useAppSelector } from "../hooks/hooks";

const AppRouter = () => {
    const isAuth=useAppSelector(state=>state.auth.isAuth);
    return (
        isAuth?
        <Routes>
            {privateRoutes.map((my_route)=> <Route key={my_route.path} path={my_route.path} Component={my_route.component}/>
                
            )}
              <Route path="*" element={<Navigate to={routesEnum.EVENT} />} />
        </Routes>
        :
        <Routes>
            {publicRoutes.map((my_route)=> <Route key={my_route.path} path={my_route.path} Component={my_route.component}/>
                
            )}
            <Route path="*" element={<Navigate to={routesEnum.LOGIN} />} />
        </Routes>
    );
};

export default AppRouter;