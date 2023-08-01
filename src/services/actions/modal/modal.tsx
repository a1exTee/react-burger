export const TOGGLE_MODAL_INGREDIENT: "TOGGLE_MODAL_INGREDIENT" = "TOGGLE_MODAL_INGREDIENT";
export const TOGGLE_MODAL_ORDER: "TOGGLE_MODAL_ORDER" = "TOGGLE_MODAL_ORDER";



export const toggleModalIngredient =  (toggle: boolean) => ({ 
    type: TOGGLE_MODAL_INGREDIENT,
    ingr: toggle,
  })
  
  export const toggleModalOrder =  (toggle: boolean) => ({ 
    type: TOGGLE_MODAL_ORDER,
    ingr: toggle,
  })