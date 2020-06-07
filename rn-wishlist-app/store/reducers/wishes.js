import WISHES from '../../data/dummyWishes';
import {ADD_TO_GIFT_LIST, REMOVE_FROM_GIFT_LIST} from "../actions/wishes";

import Wish from '../../models/wish';
import {REMOVE_CONTACT} from "../actions/users";

const initialState = {
    allWishes: WISHES
};

export default (state = initialState, action) => {
    switch(action.type) {
        case ADD_TO_GIFT_LIST:
            const wishIndexAdd = state.allWishes.findIndex(wish => wish.id === action.wishId);
            const updatedWishesAdd = [...state.allWishes];
            updatedWishesAdd[wishIndexAdd].takenId = 'u4';
            return {
                ...state,
                allWishes: updatedWishesAdd
            };
        case REMOVE_FROM_GIFT_LIST:
            const wishIndexRemove = state.allWishes.findIndex(wish => wish.id === action.wishId);
            const updatedWishesRemove = [...state.allWishes];
            updatedWishesRemove[wishIndexRemove].takenId = '';
            return {
                ...state,
                allWishes: updatedWishesRemove
            };
        case REMOVE_CONTACT:
            const updatedWishesUserRemove = [...state.allWishes];
            for (let i = 0; i < updatedWishesUserRemove.length; i++) {
                if (updatedWishesUserRemove[i].ownerId !== action.userId) continue;
                if (updatedWishesUserRemove[i].takenId !== 'u4') continue;
                updatedWishesUserRemove[i].takenId = '';
                updatedWishesUserRemove[i].bought = false;
            }
            return {
                ...state,
                allWishes: updatedWishesUserRemove
            };
        default:
            return state;
    }
};
