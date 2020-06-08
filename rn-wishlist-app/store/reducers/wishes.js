import WISHES from '../../data/dummyWishes';
import {
    ADD_TO_GIFT_LIST,
    CREATE_WISH,
    DELETE_WISH,
    REMOVE_FROM_GIFT_LIST,
    TOGGLE_BOUGHT,
    UPDATE_WISH
} from "../actions/wishes";

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
            updatedWishesRemove[wishIndexRemove].bought = false;
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
        case DELETE_WISH:
            return {
                ...state,
                allWishes: state.allWishes.filter(wish => wish.id !== action.wishId)
            };
        case CREATE_WISH:
            const newWish = new Wish(
                new Date().toString(),
                'u4',
                action.wishData.title,
                action.wishData.description,
                action.wishData.imageUrl,
                action.wishData.price,
                action.wishData.joy,
                '',
                false
            );
            return {
                ...state,
                allWishes: state.allWishes.concat(newWish)
            };
        case UPDATE_WISH:
            const wishIndex = state.allWishes.findIndex(wish => wish.id === action.wishId);
            const updatedWish = new Wish( //id, ownerId, title, description, imageUrl, price, joy, takenId, bought
                action.wishId,
                state.allWishes[wishIndex].ownerId,
                state.allWishes[wishIndex].title,
                action.wishData.description,
                action.wishData.imageUrl,
                action.wishData.price,
                action.wishData.joy,
                state.allWishes[wishIndex].takenId,
                state.allWishes[wishIndex].bought
            );
            const updatedWishesFromEdit = [...state.allWishes];
            updatedWishesFromEdit[wishIndex] = updatedWish;
            return {
                ...state,
                allWishes: updatedWishesFromEdit
            };
        case TOGGLE_BOUGHT:
            const wishIndexBought = state.allWishes.findIndex(wish => wish.id === action.wishId);
            const updatedWishesBought = [...state.allWishes];
            updatedWishesBought[wishIndexBought].bought = !updatedWishesBought[wishIndexBought].bought;
            return {
                ...state,
                allWishes: updatedWishesBought
            };
        default:
            return state;
    }
};
