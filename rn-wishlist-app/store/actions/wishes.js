export const ADD_TO_GIFT_LIST = 'ADD_TO_GIFT_LIST';
export const REMOVE_FROM_GIFT_LIST = 'REMOVE_FROM_GIFT_LIST';
export const DELETE_WISH = 'DELETE_WISH';
export const CREATE_WISH = 'CREATE_WISH';
export const UPDATE_WISH = 'UPDATE_WISH';
export const TOGGLE_BOUGHT = 'TOGGLE_BOUGHT';

export const addToGiftList = wishId => {
    return {type: ADD_TO_GIFT_LIST, wishId};
};

export const removeFromGiftList = wishId => {
    return {type: REMOVE_FROM_GIFT_LIST, wishId}
};

export const deleteWish = wishId => {
    return {type: DELETE_WISH, wishId}
};

export const createWish = (title, description, imageUrl, price, joy) => {
    return {
        type: CREATE_WISH,
        wishData: {
            title,
            description,
            imageUrl,
            price,
            joy
        }
    };
};

export const updateWish = (id, description, imageUrl, price, joy) => {
    return {
        type: UPDATE_WISH,
        wishId: id,
        wishData: {
            description, imageUrl, price, joy
        }
    };
};

export const toggleBought = wishId => {
    return {type: TOGGLE_BOUGHT, wishId}
};
