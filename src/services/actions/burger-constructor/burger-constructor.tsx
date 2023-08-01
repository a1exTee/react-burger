import { TIngredient } from "../../../utils/prop-types";

export const ADD_BUN_IN_CONSTRUCTOR: "ADD_BUN_IN_CONSTRUCTOR" = "ADD_BUN_IN_CONSTRUCTOR";
export const ADD_IN_CONSTRUCTOR: "ADD_IN_CONSTRUCTOR" = "ADD_IN_CONSTRUCTOR";
export const DEL_IN_CONSTRUCTOR: "DEL_IN_CONSTRUCTOR" = "DEL_IN_CONSTRUCTOR";
export const RESET_CONSTRUCTOR: "RESET_CONSTRUCTOR" = "RESET_CONSTRUCTOR";
export const REPLACE_INGREDIENT: "REPLACE_INGREDIENT" = 'REPLACE_INGREDIENT';

export interface IAddIngredient {
    readonly type: typeof ADD_IN_CONSTRUCTOR;
    ingredientsConstructor: TIngredient
  }
  
  export interface IDeleteIngredient {
    readonly type: typeof DEL_IN_CONSTRUCTOR;
    id: string
  }
  
  type IngredientOrder = {
    dragIndex: number,
  };
  
  export interface IIngredientMove {
    readonly type: typeof REPLACE_INGREDIENT;
    item: IngredientOrder
  }
  
  export interface IAddBuns {
    readonly type: typeof ADD_BUN_IN_CONSTRUCTOR;
    bun: Array<TIngredient>
  }
  
  export interface IDeleteAllIngredient {
    readonly type: typeof RESET_CONSTRUCTOR;
  }
  
  export type TIngrediensConstructorActions = 
    | IAddIngredient
    | IDeleteIngredient
    | IIngredientMove
    | IAddBuns
    | IDeleteAllIngredient
    ;
  

  /*export const addIngredientInConstructor = (payload: TIngredient): IAddIngredient => ({
    type: ADD_IN_CONSTRUCTOR,
    ingredientsConstructor
  });
  
  export const deleteIngredient = (payload: string): IDeleteIngredient => ({
    type: DEL_IN_CONSTRUCTOR,
    payload
  });
  
  export const moveIngredientInConstructor = (payload: IngredientOrder): IIngredientMove => ({
    type: REPLACE_INGREDIENT,
    payload
  });
  
  export const addBunsInConstructor = (payload: Array<TIngredient>): IAddBuns => ({
    type: ADD_BUN_IN_CONSTRUCTOR,
    payload
  });
  
  export const deleteAllIngredients = (): IDeleteAllIngredient => ({
    type: RESET_CONSTRUCTOR
  });*/