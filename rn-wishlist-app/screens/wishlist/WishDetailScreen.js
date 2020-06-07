import React, {useState} from 'react';
import {Button, Image, Platform, ScrollView, StyleSheet, Text, View} from 'react-native';
import {useSelector, useDispatch} from "react-redux";
import {HeaderButtons, Item} from "react-navigation-header-buttons";

import HeaderButton from "../../components/UI/HeaderButton";
import * as wishActions from "../../store/actions/wishes";
import Colors from "../../constants/Colors";

const WishDetailScreen = props => {
    const [toggleToForceRerender, setToggleToForceRerender] = useState(true);

    const myList = props.navigation.getParam('myList');
    const wishId = props.navigation.getParam('wishId');
    const selectedItem = useSelector(state => state.wishes.allWishes.find(wish => wish.id === wishId));
    const itemHasImage = selectedItem.imageUrl !== '';
    const users = useSelector(state => state.users.users);

    const dispatch = useDispatch();

    return (<ScrollView>
        {itemHasImage && <Image style={styles.image} source={{uri: selectedItem.imageUrl}}/>}
        <View style={styles.actions}>
            {!myList && selectedItem.takenId !== 'u4' && <Button
                color={Colors.secondary}
                title={selectedItem.takenId === '' ? "Add to Gift List" : `Given by ${users.find(user => user.id === selectedItem.takenId).name}`}
                disabled={myList || selectedItem.takenId !== ''}
                onPress={() => {
                    if (selectedItem.takenId === '') {
                        dispatch(wishActions.addToGiftList(selectedItem.id));
                        setToggleToForceRerender(!toggleToForceRerender);
                    }
                }}/>}
            {selectedItem.takenId === 'u4' && <Button
                color={Colors.secondary}
                title="Remove from gift list"
                onPress={() => {
                    dispatch(wishActions.removeFromGiftList(selectedItem.id));
                    setToggleToForceRerender(!toggleToForceRerender);
                }}/>}
        </View>
        <Text style={styles.price}>${selectedItem.price.toFixed(2)}</Text>
        <Text style={styles.description}>{selectedItem.description}</Text>
    </ScrollView>);
};

WishDetailScreen.navigationOptions = navData => {
    return {
        headerTitle: navData.navigation.getParam('wishTitle'),
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

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: 300
    },
    actions: {
        marginVertical: 10,
        alignItems: 'center'
    },
    price: {
        fontSize: 20,
        color: '#888',
        textAlign: 'center',
        marginVertical: 20,
        fontFamily: 'open-sans-bold'
    },
    description: {
        fontFamily: 'open-sans',
        fontSize: 14,
        textAlign: 'center',
        marginHorizontal: 20
    }
});

export default WishDetailScreen;
