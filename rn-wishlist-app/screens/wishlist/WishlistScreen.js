import React from 'react';
import {Button, FlatList, Text, Platform} from 'react-native';
import {useSelector, useDispatch} from "react-redux";
import {HeaderButtons, Item} from "react-navigation-header-buttons";

import HeaderButton from "../../components/UI/HeaderButton";
import WishItem from "../../components/WishList/WishItem";
import EmptyScreen from "../../components/UI/EmptyScreen";
import * as wishActions from "../../store/actions/wishes";
import Colors from "../../constants/Colors";

const WishlistScreen = props => {
    const wishes = useSelector(state => state.wishes.allWishes).filter(wish => wish.ownerId === props.navigation.getParam('userId'));
    const myList = props.navigation.getParam('myList');
    const users = useSelector(state => state.users.users);

    const dispatch = useDispatch();

    const selectItemHandler = (id, title, takenId) => {
        props.navigation.navigate('WishDetails', {
            wishId: id,
            wishTitle: title,
            myList,
            takenId
        })
    };

    if (wishes.length === 0 || !wishes) {
        return <EmptyScreen>
            <Text>{props.navigation.getParam('name')} has no wishes yet.</Text>
        </EmptyScreen>;
    }

    return (<FlatList
        data={wishes}
        renderItem={itemData => <WishItem
            image={itemData.item.imageUrl}
            title={itemData.item.title}
            price={itemData.item.price}
            joy={itemData.item.joy}
            onSelect={() => {
                selectItemHandler(itemData.item.id, itemData.item.title, itemData.item.takenId);
            }}>
            <Button
                color={Colors.primary}
                title="Details"
                onPress={() => {
                    selectItemHandler(itemData.item.id, itemData.item.title, itemData.item.takenId);
                }}/>
            {!myList && itemData.item.takenId !== 'u4' && <Button
                color={Colors.secondary}
                title={itemData.item.takenId === '' ? "Add to Gift List" : `Given by ${users.find(user => user.id === itemData.item.takenId).name}`}
                disabled={myList || itemData.item.takenId !== ''}
                onPress={() => {
                    if (itemData.item.takenId === '') {
                        dispatch(wishActions.addToGiftList(itemData.item.id));
                    }
                }}/>}
            {itemData.item.takenId === 'u4' && <Button
                color={Colors.secondary}
                title="Remove from gift list"
                onPress={() => {
                    dispatch(wishActions.removeFromGiftList(itemData.item.id));
                }}/>}
        </WishItem>}
    />);
};

WishlistScreen.navigationOptions = navData => {
    return {
        headerTitle: `${navData.navigation.getParam('myList') ? "My" : navData.navigation.getParam('name') + "'s"} Wish List`,
        headerRight: () => <HeaderButtons title='GiftList' HeaderButtonComponent={HeaderButton}>
            <Item
                title='GiftList'
                iconName={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
                onPress={() => {
                    navData.navigation.navigate('GiftList');
                }}/>
        </HeaderButtons>
    }
};

export default WishlistScreen;
