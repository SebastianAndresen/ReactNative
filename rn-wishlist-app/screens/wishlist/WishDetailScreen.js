import React, {useState} from 'react';
import {Alert, Button, Image, Platform, ScrollView, StyleSheet, Text, View} from 'react-native';
import {useSelector, useDispatch} from "react-redux";
import {HeaderButtons, Item} from "react-navigation-header-buttons";

import HeaderButton from "../../components/UI/HeaderButton";
import * as wishActions from "../../store/actions/wishes";
import Colors from "../../constants/Colors";
import ItemValues from "../../components/WishList/ItemValues";

const WishDetailScreen = props => {
    const [toggleToForceRerender, setToggleToForceRerender] = useState(true);

    const myList = props.navigation.getParam('myList');
    const wishId = props.navigation.getParam('wishId');
    const selectedItem = useSelector(state => state.wishes.allWishes.find(wish => wish.id === wishId));
    const itemHasImage = selectedItem.imageUrl !== '';
    const users = useSelector(state => state.users.users);

    const dispatch = useDispatch();

    const addToGiftListHandler = (id) => {
        Alert.alert('Add item to shopping list', "Are you sure you want to add this item to your shopping list? You promise to others that you will give this item, as no one else can claim this gift now.", [
            {text: 'Back', style: 'default'},
            {
                text: 'Add item', style: 'destructive', onPress: () => {
                    dispatch(wishActions.addToGiftList(id));
                    setToggleToForceRerender(!toggleToForceRerender);
                }
            }
        ]);
    };

    const removeFromGiftListHandler = (id) => {
        Alert.alert('Remove item from shopping list', "Are you sure you want to remove this item from your shopping list?", [
            {text: 'Back', style: 'default'},
            {
                text: 'Remove item', style: 'destructive', onPress: () => {
                    dispatch(wishActions.removeFromGiftList(id));
                    setToggleToForceRerender(!toggleToForceRerender);
                }
            }
        ]);
    };

    return (<ScrollView>
        {itemHasImage && <Image style={styles.image} source={{uri: selectedItem.imageUrl}}/>}
        <View style={styles.actions}>
            {!myList && selectedItem.takenId !== 'u4' && <Button
                color={Colors.secondary}
                title={selectedItem.takenId === '' ? "Add to Gift List" : `Given by ${users.find(user => user.id === selectedItem.takenId).name}`}
                disabled={myList || selectedItem.takenId !== ''}
                onPress={() => {
                    if (selectedItem.takenId === '') {addToGiftListHandler(selectedItem.id)}
                }}/>}
            {selectedItem.takenId === 'u4' && <Button
                color={Colors.secondary}
                title="Remove from gift list"
                onPress={() => {removeFromGiftListHandler(selectedItem.id)}}/>}
        </View>
        <View style={styles.itemValues}>
            <ItemValues
                price={selectedItem.price}
                joy={selectedItem.joy}
                color={Colors.primary}
                size={38}
            />
        </View>
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
    itemValues: {
        marginVertical: 15,
        marginHorizontal: '20%'
    },
    description: {
        fontFamily: 'open-sans',
        fontSize: 16,
        textAlign: 'center',
        marginHorizontal: 35,
        marginBottom: 20
    }
});

export default WishDetailScreen;
