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
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCookie } from "../../utils/data";
import { getUser } from "../../services/actions/auth/auth";
import ProtectedRoute from "../ProtectedRoute";
import Modal from '../modal/modal';
import IngredientsDetails from '../burger-ingredients/ingredients-details/ingredients-details';
import { getIngredients } from "../../services/actions/burger-ingredients/burger-ingredients";


function App() {

  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const background = location.state && location.state.background;
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

  const { ingredientsChecker, ingredientsRequest, ingredients } = useSelector(
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
      {!ingredientsRequest && !ingredientsChecker && ingredients.length && (
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
                <Route path="/profile" element={<ProtectedRoute children={<Profile />} />} />
                <Route path="/ingredients/:id" element={<IngredientDetailsPage />} />
                <Route path="/*" element={<Page404 />} />
                <Route path="/" element={<HomePage />} />
              </Routes>
              {background && (
                <Routes>
                  <Route path="/ingredients/:id" element={<Modal closeModal={handleModalClose} title='Детали ингредиента'><IngredientsDetails /></Modal>} />
                </Routes>
              )}
            </ErrorBoundary>
          </div>
        </main>
      )}
    </>
  );
}

export default App;