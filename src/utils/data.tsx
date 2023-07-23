export const apiUrl = `https://norma.nomoreparties.space/api/`;

type TCheckResponse = (res: Response) => any;
export const checkResponse: TCheckResponse = (res: Response) => {
    return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
}

export const requestIngredients = async () => {
  const res = await fetch(`${apiUrl}ingredients`);
  return checkResponse(res);
}


export const ingredientsUrl = apiUrl + "ingredients";
export const ordersUrl = apiUrl + "orders";
export const registerUrl = apiUrl + "auth/register";
export const userUrl = apiUrl + "auth/user";
export const loginUrl = apiUrl + "auth/login";
export const logoutUrl = apiUrl + "auth/logout";
export const passwordRestoreUrl = apiUrl + "password-reset";
export const passwordResetUrl = apiUrl + "password-reset/reset";
export const tokenUrl = apiUrl + "auth/token";


export const accessTokenLifetime = 1200;
export const refreshTokenLifetime = 2400;

export type TIconTypes = {
  type: string | null;
}

export const setMenuClass: TIconTypes = (type: string, link: object | null) => {
  switch (type) {
    case 'icon': {
      if (link) {
        return 'primary'
      } else {
        return 'secondary'
      }
    }
    case 'text': {
      if (link) {
        return 'text_color_primary'
      } else {
        return 'text_color_inactive'
      }
    }
    default: {
      return null
    }
  }
}

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

export const requestData = async (url: string, options: RequestInit) => {
  //console.log(fetch, options);
  try {
    const res = await fetch(url, options); 
    return await checkResponse(res);
  } catch (err: any) {
    if (err.message === "jwt expired") {
      const refreshData: TRefreshData = await refreshToken(); 
      setCookie(
        'accessToken',
        refreshData.accessToken.split('Bearer ')[1],
      );
      setCookie(
        'refreshToken',
        refreshData.refreshToken,
      );
      (options.headers as { [key: string]: string }).authorization = refreshData.accessToken;
      const res = await fetch(url, options); 
      return await checkResponse(res);
    } else {
      return Promise.reject(err);
    }
  }
};

export async function refreshToken() {
  const res = await fetch(tokenUrl, {
    method: "POST",
    body: JSON.stringify({ token: getCookie('refreshToken') }),
    headers: {
      'Content-Type': 'application/json'
    },
  });
  return checkResponse(res);
}

export function getDataFromServer() {
  return requestData(ingredientsUrl, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
};

export function getUserFetch() {
  return requestData(userUrl, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      authorization: 'Bearer ' + getCookie('accessToken')
    }
  })
};

export function patchUserFetch(data: object) {
  return requestData(userUrl, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      authorization: 'Bearer ' + getCookie('accessToken')
    },
    body: JSON.stringify(data)
  })
};




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