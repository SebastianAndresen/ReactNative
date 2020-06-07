import React from 'react';
import {Platform, Text, FlatList} from 'react-native';
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import {useSelector} from "react-redux";

import HeaderButton from '../../components/UI/HeaderButton';
import UserGridTile from "../../components/WishList/UserGridTile";
import EmptyScreen from "../../components/UI/EmptyScreen";

const WishlistPeopleScreen = props => {
    const users = useSelector(state => state.users.myUsers).sort((a, b) => a.name > b.name ? 1 : -1);

    if (users.length === 0 || !users) {
        return <EmptyScreen>
            <Text>Add some contacts to see their wish lists.</Text>
        </EmptyScreen>;
    }

    const renderGridItem = (itemData) => {
        return (
            <UserGridTile
                name={itemData.item.name}
                color={itemData.item.color}
                onSelect={() => {
                    props.navigation.navigate('Wishlist', {userId: itemData.item.id, name: itemData.item.name, myList: itemData.item.id === 'u4'});
                }}
            />
        );
    };

    return (
        <FlatList data={users} renderItem={renderGridItem} numColumns={2}/>
    );
};

WishlistPeopleScreen.navigationOptions = navData => {
    return {
        headerTitle: 'Wish Lists',
        headerLeft: () => <HeaderButtons title='Menu' HeaderButtonComponent={HeaderButton}>
            <Item
                title='Menu'
                iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
                onPress={() => {
                    navData.navigation.toggleDrawer();
                }}/>
        </HeaderButtons>,
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

export default WishlistPeopleScreen;
