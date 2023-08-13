import { TIconProps } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons/utils";

export type TIconTypes = TIconProps["type"];

export const apiUrl = `https://norma.nomoreparties.space/api/`;

const config = {
  baseURL: 'https://norma.nomoreparties.space/api',
  headers: {
    'Content-Type': 'application/json'
  }
}

export const setIconType = (type: string, link: boolean): TIconTypes => {
  switch (type) {
    case "icon": {
      if (link) {
        return "primary";
      } else {
        return "secondary";
      }
    }
    default:
      return "primary";
  }
};

export const setMenuClass = (type: string, link: boolean): string => {
  switch (type) {
    case "text": {
      if (link) {
        return "text_color_primary";
      } else {
        return "text_color_inactive";
      }
    }
    default: {
      return "text_color_primary";
    }
  }
};



/*type TCheckResponse = (res: Response) => any;
export const checkResponse: TCheckResponse = (res: Response) => {
    return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
}*/

//проверка запросов
export function checkResponse(res: Response) {
  if (!res.ok) {
    return Promise.reject(`Ошибка: ${res.status}`);
  }
  return res.json();
} 


export const requestIngredients = async () => {
  const res = await fetch(`${apiUrl}ingredients`);
  return checkResponse(res);
}


export const accessTokenLifetime = 1200;
export const refreshTokenLifetime = 2400;


export type TOptions = {
  method: string;
  headers: {
      'Content-Type': string;
      authorization?: string;
      Accept?: string;
  };
  body?: string;
};

export interface IRefreshData {
  success: boolean;
  accessToken: string;
  refreshToken: string
}

export type TRefreshData = {
  success: boolean;
  accessToken: string;
  refreshToken: string;
}

//создание пользователя
export function postNewUser(email: string, password: string, name: string) {
  return fetch(`${config.baseURL}/auth/register`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify(
      {
        "email": `${email}`,
        "password": `${password}`,
        "name": `${name}`
      }
    )
  })
    .then(res => checkResponse(res))
}

//авторизация
export function login(userInfo: {email: string, password: string}) { 
  return fetch(`${config.baseURL}/auth/login`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify(
      {
        "email": `${userInfo.email}`,
        "password": `${userInfo.password}`
      }
    )
  })
    .then(res => checkResponse(res))
}

//выход
export function logout() {
  return fetch(`${config.baseURL}/auth/logout`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify(
      {
        "token": getCookie("refreshToken")
      }
    )
  })
    .then(res => checkResponse(res))
}

//получение данных пользователя
export function getUser() {
  return fetch(`${config.baseURL}/auth/user`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + getCookie('accessToken')
    },
  })
    .then(res => checkResponse(res))
}

//обновление данных пользователя через профиль
export function updateUser(data: {email: string, name: string}) {
  return fetch(`${config.baseURL}/auth/user`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + getCookie('accessToken')
    },
    body: JSON.stringify(data)
  })
    .then(res => checkResponse(res))
}

//обновление токена
export function resetToken() {
  return fetch(`${config.baseURL}/auth/token`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify(
      {
        "token": getCookie("refreshToken")
      }
    )
  })
    .then(res => checkResponse(res))
}

//для сброса пароля
export function postForgotPassword(email: string) {
  return fetch(`${config.baseURL}/password-reset`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      "email": `${email}`
    })
  })
    .then(res => checkResponse(res))
}

//обновление пароля
export function postResetPassword(password: string, token: string) {
  return fetch(`${config.baseURL}/password-reset/reset`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify(
      {
        "password": `${password}`,
        "token": `${token}`
      }
    )
  })
    .then(res => checkResponse(res))
}

export function postOrderInfo(array: Array<string>) {
  return fetch(`${config.baseURL}/orders`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      Authorization: 'Bearer ' + getCookie('accessToken')
    },
    body: JSON.stringify({
      ingredients: array
    })
  })
    .then(res => checkResponse(res))
}


export function getCookie(name: string): string | undefined {
  const matches = document.cookie.match( // eslint-disable-next-line
    new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)') 
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

export function setCookie(name: string, value: null | string, props: { [key: string]: any } & { expires?: number | Date | string } = {}): void {
  props = props || {};
  let exp = props.expires;
  if (typeof exp == 'number' && exp) {
    const d = new Date();
    d.setTime(d.getTime() + exp * 1000);
    exp = props.expires = d;
  }
  if (exp && (exp as Date).toUTCString) {
    props.expires = (exp as Date).toUTCString();
  }
  value = encodeURIComponent(value!);
  let updatedCookie = name + '=' + value;
  for (const propName in props) {
    updatedCookie += '; ' + propName;
    const propValue = props[propName];
    if (propValue !== true) {
      updatedCookie += '=' + propValue;
    }
  }
  document.cookie = updatedCookie;
}

export function deleteCookie(name: string) {
  setCookie(name, null, { expires: -1 });
}