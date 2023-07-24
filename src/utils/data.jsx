export const apiUrl = `https://norma.nomoreparties.space/api/`;


export const checkResponse = (res) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};
 
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

export function setMenuClass(type, link) {
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

export function isBun(ingredient) {
  if (ingredient.type === "bun") {
    return true;
  } else {
    return false;
  }
};


export function selectBun(arr) {
  return arr.find((el) => isBun(el));
};

export function hasBun(arr) {
  return arr.some((item) => isBun(item));
}

export function dragInsideCart(arr, actionId, targetIndex) {
  const draggableItem = arr.find((item) => (item._id === actionId));
  arr.splice(arr.indexOf(draggableItem), 1);
  arr.splice(targetIndex, 0, draggableItem);
  return arr;
};

export function deleteIngredient(arr, targetIndex) {
  arr.splice(targetIndex, 1);
  return arr;
};

export function increaseCounter(arr, actionId) {
  const item = arr.find(item => item._id === actionId);
  item.count ++;
  return arr;
};

export function decreaseCounter(arr, actionId) {
  const item = arr.find(item => item._id === actionId);
  item.count --;
  return arr;
};

export function getTotal(buns, mains) {
  if (buns.length !== 0) {
    const doubledPriceBun = buns.price*2;
    const mainsPrice = mains.reduce((prev, item) => {
      return prev + item.price;
    }, 0);
    return doubledPriceBun + mainsPrice
  } else {
    return 0;
  }
}

export function setBunType(position) {
  if (position === "first") {
    return "top";
  } else if (position === "last") {
    return "bottom";
  } else {
    return undefined;
  }
};

export function getCookie(name) {
  const matches = document.cookie.match( // eslint-disable-next-line
    new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)') 
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

export function setCookie(name, value, props) {
  props = props || {};
  let exp = props.expires;
  if (typeof exp == 'number' && exp) {
    const d = new Date();
    d.setTime(d.getTime() + exp * 1000);
    exp = props.expires = d;
  }
  if (exp && exp.toUTCString) {
    props.expires = exp.toUTCString();
  }
  value = encodeURIComponent(value);
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

export function deleteCookie(name) {
  setCookie(name, null, { expires: -1 });
}


export const requestData = async (url, options) => {
  //console.log(fetch, options);
  try {
    const res = await fetch(url, options); 
    return await checkResponse(res);
  } catch (err) {
    if (err.message === "jwt expired") {
      const refreshData = await refreshToken(); 
      setCookie(
        'accessToken',
        refreshData.accessToken.split('Bearer ')[1],
      );
      setCookie(
        'refreshToken',
        refreshData.refreshToken,
      );
      options.headers.authorization = refreshData.accessToken;
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
      "Content-Type": "application/json",
    },
  });
  return checkResponse(res);
}



export function getDataFromServer() {
  return requestData(ingredientsUrl, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-type': 'application/json'
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

export function patchUserFetch(data) {
  return requestData(userUrl, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      authorization: 'Bearer ' + getCookie('accessToken')
    },
    body: JSON.stringify(data)
  })
};
