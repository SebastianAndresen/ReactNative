import React from 'react';
import {Button, FlatList, Text, View, StyleSheet} from 'react-native';
import {useSelector} from "react-redux";

import Card from "../../components/UI/Card";
import Colors from "../../constants/Colors";
import ItemValues from "../../components/WishList/ItemValues";
import EmptyScreen from "../../components/UI/EmptyScreen";

const ShoppingListScreen = props => {
    const wishes = useSelector(state => state.wishes.allWishes).filter(wish => wish.takenId === 'u4');
    const users = useSelector(state => state.users.users).filter(user => wishes.find(wish => wish.ownerId === user.id));

    if (users.length === 0 || !users) {
        return <EmptyScreen>
            <Text>You haven't placed anything here yet.</Text>
        </EmptyScreen>;
    }

    return (
        <FlatList
            data={users}
            renderItem={itemData => (
                <Card style={styles.personContainer}>
                    <View style={styles.nameContainer}>
                        <Text style={styles.name}>{itemData.item.name}</Text>
                    </View>
                    <View style={styles.giftContainer}>
                        <FlatList
                            data={wishes.filter(wish => wish.ownerId === itemData.item.id)}
                            keyExtractor={item => item.id}
                            renderItem={wishData => (
                                <View style={styles.itemContainer}>
                                    <View style={styles.itemInformation}>
                                        <Text style={styles.itemTitle}>{wishData.item.title}</Text>
                                        <View style={styles.itemValues}>
                                            <ItemValues
                                                price={wishData.item.price}
                                                joy={wishData.item.joy}
                                                color={Colors.primary}
                                                size={23}
                                            />
                                        </View>
                                    </View>
                                    <Button
                                        color={Colors.secondary}
                                        title="Details"
                                        onPress={() => {
                                            props.navigation.navigate('WishDetails', {
                                                wishId: wishData.item.id,
                                                wishTitle: wishData.item.title,
                                                myList: false,
                                                takenId: wishData.item.takenId
                                            });
                                        }}/>
                                </View>
                            )}
                        />
                    </View>
                </Card>
            )}
        />
    );
};

ShoppingListScreen.navigationOptions = navData => {
    return {
        headerTitle: 'My Shopping List'
    }
};

const styles = StyleSheet.create({
    personContainer: {
        marginVertical: 10,
        marginHorizontal: 20,
        padding: 10
    },
    nameContainer: {
        marginBottom: 4
    },
    name: {
        fontFamily: 'open-sans-bold',
        fontSize: 22,
        borderColor: Colors.primary,
        borderBottomWidth: 1,
    },
    giftContainer: {},
    itemContainer: {
        marginVertical: 5
    },
    itemInformation: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 2
    },
    itemTitle: {
        fontFamily: 'open-sans',
        fontSize: 18,
        width: '65%'
    },
    itemValues: {
        width: '35%'
    }
});

export default ShoppingListScreen;
