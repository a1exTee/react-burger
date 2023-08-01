import style from './Page404.module.css';

export function Page404() {
  return (
    <h1 className={`text text_type_main-large mt-10 ${style.error_text}`}>
      404 Не найдено
    </h1>
  )
}
