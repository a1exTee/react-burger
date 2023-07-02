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
import { useSelector, useDispatch } from "react-redux";
import { getCookie } from "../../utils/data";
import { getUser } from "../../services/actions/auth/auth";
import ProtectedRoute from "../ProtectedRoute";
import Modal from '../modal/modal';
import IngredientsDetails from '../burger-ingredients/ingredients-details/ingredients-details';
import { getIngredients } from "../../services/actions/burger-ingredients/burger-ingredients";
import {modalDeleteIngredient} from '../../services/actions/burger-ingredients/burger-ingredients';
import {toggleModalIngredient} from '../../services/actions/modal/modal';


function App() {

  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const background = location.state && location.state.background;
  //const ingredientInModal = useSelector(store => store.modalReducer.isModalIngr);
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


  return (
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
            {background && (
              <Route path="/ingredients/:id" element={<Modal closeModal={handleModalClose} title='Детали ингредиента'><IngredientsDetails /></Modal>} />
            )}
          </Routes>
        </ErrorBoundary>
      </div>
    </main>
  );
}

export default App;