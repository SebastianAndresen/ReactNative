import React from 'react';
import {Button, FlatList, Platform, Alert, Text} from 'react-native';
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import {useSelector, useDispatch} from "react-redux";

import HeaderButton from "../../components/UI/HeaderButton";
import WishItem from "../../components/WishList/WishItem";
import Colors from "../../constants/Colors";
import * as wishActions from "../../store/actions/wishes";
import EmptyScreen from "../../components/UI/EmptyScreen";

const UserWishlistScreen = props => {
    const wishes = useSelector(state => state.wishes.allWishes).filter(wish => wish.ownerId === 'u4');

    if (wishes.length === 0 || !wishes) {
        return <EmptyScreen>
            <Text>Press the pencil to create a wish.</Text>
        </EmptyScreen>;
    }

    const dispatch = useDispatch();

    const editProductHandler = (id, title) => {
        props.navigation.navigate('EditWish', {wishId: id, wishTitle: title});
    };

    const deleteHandler = (id) => {
        Alert.alert('Are you sure?', 'Do you really want to delete this wish?', [
            {text: 'No', style: 'default'},
            {
                text: 'Yes', style: 'destructive', onPress: () => {
                    dispatch(wishActions.deleteWish(id));
                }
            }
        ]);
    };

    return (<FlatList
        data={wishes}
        renderItem={itemData => <WishItem
            image={itemData.item.imageUrl}
            title={itemData.item.title}
            price={itemData.item.price}
            joy={itemData.item.joy}
            onSelect={() => {
                editProductHandler(itemData.item.id, itemData.item.title);
            }}>
            <Button
                color={Colors.primary}
                title="Edit"
                onPress={() => {
                    editProductHandler(itemData.item.id, itemData.item.title);
                }}/>
            <Button
                color={Colors.primary}
                title="Delete"
                onPress={() => {deleteHandler(itemData.item.id)}}/>
        </WishItem>}
    />);
};

UserWishlistScreen.navigationOptions = navData => {
    return {
        headerTitle: 'My Wish List',
        headerLeft: () => <HeaderButtons title='Menu' HeaderButtonComponent={HeaderButton}>
            <Item
                title='Menu'
                iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
                onPress={() => {
                    navData.navigation.toggleDrawer();
                }}/>
        </HeaderButtons>,
        headerRight: () => <HeaderButtons title='Add' HeaderButtonComponent={HeaderButton}>
            <Item
                title='Add'
                iconName={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
                onPress={() => {
                    navData.navigation.navigate('EditWish');
                }}/>
        </HeaderButtons>
    }
};

export default UserWishlistScreen;
