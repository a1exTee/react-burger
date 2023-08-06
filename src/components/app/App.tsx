import style from "./app.module.css";
import AppHeader from "../app-header/app-header";
import "@ya.praktikum/react-developer-burger-ui-components/dist/ui/box.css"; // система отступов
import ErrorBoundary from "../error-boundary/error-boundary";
import {HomePage} from "../../pages/HomePage/homePage";
import {ForgotPassword} from "../../pages/ForgotPassword/ForgotPassword";
import {IngredientDetailsPage} from "../../pages/IngredientDetailsPage/IngredientDetailsPage";
import {Login} from "../../pages/Login/Login";
import {Page404} from "../../pages/Page404/Page404";
import {Profile} from "../../pages/Profile/Profile";
import {Register} from "../../pages/Register/Register";
import {ResetPassword} from "../../pages/ResetPassword/ResetPassword";
import Feed from "../../pages/Feed/feed";
import OrderFullScreen from "../../pages/Order/order";
import OrderInfo from "../order-info/order-info";
import ProfileOrders from "../../pages/ProfileOrders/ProfileOrders";
import { WS_AUTH_CONNECTION_CLOSED, WS_AUTH_CONNECTION_START } from "../../services/actions/ws/ws-auth-actions";
import { WS_CONNECTION_CLOSED, WS_CONNECTION_START } from "../../services/actions/ws/ws-actions";
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { FC, useEffect } from "react";
import { getCookie } from "../../utils/data";
import { getUser } from "../../services/actions/auth/auth";
import ProtectedRoute from "../ProtectedRoute";
import Modal from '../modal/modal';
import IngredientsDetails from '../burger-ingredients/ingredients-details/ingredients-details';
import { getIngredients } from "../../services/actions/burger-ingredients/burger-ingredients";
import { useAppDispatch, useAppSelector } from '../../utils/prop-types';


export const App: FC = () => {

  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const background = location.state && location.state.background;
  const wsOrdersData = useAppSelector((store) => store.wsReducer.orders);
  const wsAuthOrdersData = useAppSelector((store) => store.wsAuthReducer.orders);
  const handleModalClose = () => {
    // Возвращаемся к предыдущему пути при закрытии модалки
    navigate(-1);
  };
  
  useEffect(() => {
    if (getCookie('accessToken')) {
      dispatch(getUser());
    }
  }, [dispatch]);

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  const { ingredientsChecker, ingredientsRequest, ingredients } = useAppSelector(
    (state) => state.burgerIngredientsReducer
  );

  if (ingredientsRequest) {
    return <h2>Загрузка...</h2>;
  }

  if (!ingredientsRequest && ingredientsChecker) {
    return <h2>Ошибка</h2>;
  }

  return (
    <>
      {ingredientsRequest && <h2>Загрузка...</h2>}
      {!ingredientsRequest && ingredientsChecker && <h2>Ошибка</h2>}
      {!ingredientsRequest && !ingredientsChecker && ingredients?.length && (
        <main className={style.App}>
          <div className="container">
            <ErrorBoundary>
              <AppHeader />
              <Routes location={background || location}>
                <Route path='/orders' element={<Page404 />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route path="/profile" element={<ProtectedRoute children={<Profile />} />}>
                  <Route path="orders" element={<ProfileOrders reverse path={'/profile/orders'} />} />
                </Route>
                <Route path="/profile/orders/:id" element={<ProtectedRoute>
                  <OrderFullScreen start={WS_AUTH_CONNECTION_START} close={WS_AUTH_CONNECTION_CLOSED} data={wsAuthOrdersData!} /></ProtectedRoute>}
                />
                <Route path="/feed" element={<Feed path={'/feed'} />} />
                <Route path="/feed/:id" element={<OrderFullScreen start={WS_CONNECTION_START} close={WS_CONNECTION_CLOSED} data={wsOrdersData!} />} />
                <Route path="/ingredients/:id" element={<IngredientDetailsPage />} />
                <Route path="/*" element={<Page404 />} />
                <Route path="/" element={<HomePage />} />
              </Routes>
              {background && (
                <Routes>
                  <Route path="/ingredients/:id" element={<Modal closeModal={handleModalClose} title='Детали ингредиента'><IngredientsDetails /></Modal>} />
                </Routes>
              )}
              {background && wsOrdersData && <Routes> <Route path="/feed/:id" element={<Modal closeModal={handleModalClose}><OrderInfo modal data={wsOrdersData} /></Modal>} /> </Routes>}
              {background && wsAuthOrdersData && <Routes> <Route path="/profile/orders/:id" element={<Modal closeModal={handleModalClose}><OrderInfo modal data={wsAuthOrdersData} /></Modal>} /> </Routes>}
            </ErrorBoundary>
          </div>
        </main>
      )}
    </>
  );
}

export default App;