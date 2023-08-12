import { RootState } from "../reducers";
import { Middleware } from "redux";
import { getCookie } from "../../utils/data";

type TWsActions = {
  wsStart: string,
  onOpen: string,
  onClose: string,
  onError: string,
  getOrders: string
}

export const socketMiddleware = (wsUrl: string, wsActions: TWsActions, auth: boolean): Middleware<{}, RootState> => {
  return (store) => {
    let socket: WebSocket | null = null;

    return next => action => {
      const { dispatch } = store;
      const { type, payload } = action;
      const { wsStart, onOpen, onClose, onError, getOrders } = wsActions;

      const accessToken = getCookie('accessToken');

      if (type === wsStart && auth === false) {
        socket = new WebSocket(wsUrl);
      } else if (type === wsStart && auth === true && accessToken) {
        const accessToken = getCookie("accessToken");
        socket = new WebSocket(`${wsUrl}?token=${accessToken}`);
      }

      if (socket) {
        socket.onopen = (event: Event) => {
          dispatch({ type: onOpen, payload: event });
        };

        socket.onerror = (event: Event) => {
          dispatch({ type: onError, payload: event });
        };

        socket.onmessage = (event: MessageEvent<any>) => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          const { success, ...restParsedData } = parsedData;
          dispatch({ type: getOrders, payload: restParsedData });
        };

        socket.onclose = (event: CloseEvent) => {
          dispatch({ type: onClose, payload: event });
          //socket!.close();
          //socket = null;
        };
      }

      next(action);
    };
  };
};