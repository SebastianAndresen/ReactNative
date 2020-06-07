import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity, TouchableNativeFeedback, Platform} from 'react-native';

import Card from '../UI/Card';
import {FlatList} from "react-native-web";

const GiftListItem = props => {
    const itemHasImage = props.image !== '';

    let TouchableCmp = TouchableOpacity;
    if (Platform.OS === 'android' && Platform.Version >= 21) {
        TouchableCmp = TouchableNativeFeedback;
    }

    return <Card style={styles.product}>
        <View style={styles.touchable}>
            <TouchableCmp useForeground>
                <View>
                    <View style={styles.details}>
                        <Text style={styles.title}>{props.username}</Text>
                    </View>
                    <FlatList
                        data={props.presents}
                        keyExtractor={item => item.id}
                        renderItem={wishData => (<View><Text>{wishData.item.title}</Text></View>)}
                    />
                </View>
            </TouchableCmp>
        </View>
    </Card>
};

const styles = StyleSheet.create({
    product: {
        height: 300,
        margin: 20
    },
    touchable: {
        borderRadius: 10,
        overflow: 'hidden'
    },
    imageContainer: {
        width: '100%',
        height: '60%',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        overflow: 'hidden'
    },
    image: {
        width: '100%',
        height: '100%'
    },
    details: {
        alignItems: 'center',
        height: '17%',
        padding: 10
    },
    title: {
        fontFamily: 'open-sans-bold',
        fontSize: 18,
        marginVertical: 2
    },
    price: {
        fontFamily: 'open-sans',
        fontSize: 14,
        color: '#888'
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '23%',
        paddingHorizontal: 20
    }
});

export default GiftListItem;
