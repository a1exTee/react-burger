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
    hoverIndex: number
  };
  
  export interface IIngredientMove {
    readonly type: typeof REPLACE_INGREDIENT;
    item: IngredientOrder
  }
  
  export interface IAddBuns {
    readonly type: typeof ADD_BUN_IN_CONSTRUCTOR;
    bun: TIngredient 
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
  

  export const addIngredientInConstructor = (ingredientsConstructor: TIngredient): IAddIngredient => ({
    type: ADD_IN_CONSTRUCTOR,
    ingredientsConstructor
  });
  
  export const deleteIngredient = (id: string): IDeleteIngredient => ({
    type: DEL_IN_CONSTRUCTOR,
    id
  });
  
  export const moveIngredientInConstructor = (item: IngredientOrder): IIngredientMove => ({
    type: REPLACE_INGREDIENT,
    item
  });
  
  export const addBunsInConstructor = (bun: TIngredient): IAddBuns => ({
    type: ADD_BUN_IN_CONSTRUCTOR,
    bun
  });
  
  export const deleteAllIngredients = (): IDeleteAllIngredient => ({
    type: RESET_CONSTRUCTOR
  });