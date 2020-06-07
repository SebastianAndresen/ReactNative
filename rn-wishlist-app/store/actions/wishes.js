export const ADD_TO_GIFT_LIST = 'ADD_TO_GIFT_LIST';
export const REMOVE_FROM_GIFT_LIST = 'REMOVE_FROM_GIFT_LIST';

export const addToGiftList = wishId => {
    return {type: ADD_TO_GIFT_LIST, wishId};
};

export const removeFromGiftList = wishId => {
    return {type: REMOVE_FROM_GIFT_LIST, wishId}
};
