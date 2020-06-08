import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity, TouchableNativeFeedback, Platform} from 'react-native';

import Card from '../UI/Card';
import ItemValues from "./ItemValues";
import Colors from "../../constants/Colors";

const WishItem = props => {
    const itemHasImage = props.image !== '';

    let TouchableCmp = TouchableOpacity;
    if (Platform.OS === 'android' && Platform.Version >= 21) {
        TouchableCmp = TouchableNativeFeedback;
    }

    return <Card style={styles.product}>
        <View style={styles.touchable}>
            <TouchableCmp onPress={props.onSelect} useForeground>
                <View>
                    {itemHasImage && <View style={styles.imageContainer}>
                        <Image style={styles.image} source={{uri: props.image}}/>
                    </View>}
                    <View style={styles.details}>
                        <Text style={styles.title}>{props.title}</Text>
                    </View>
                    <View style={styles.itemValues}>
                        <ItemValues
                            price={props.price}
                            joy={props.joy}
                            color={Colors.primary}
                            size={23}
                        />
                    </View>
                    <View style={styles.actions}>
                        {props.children}
                    </View>
                </View>
            </TouchableCmp>
        </View>
    </Card>
};

const styles = StyleSheet.create({
    product: {
        margin: 20
    },
    touchable: {
        borderRadius: 10,
        overflow: 'hidden'
    },
    imageContainer: {
        width: '100%',
        height: 180,
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
        paddingTop: 5
    },
    title: {
        fontFamily: 'open-sans-bold',
        fontSize: 18,
        marginVertical: 2
    },
    itemValues: {
        marginHorizontal: 20
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10
    }
});

export default WishItem;
