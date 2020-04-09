import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Platform, TouchableNativeFeedback} from 'react-native';

const CategoryGridTile = props => {
    let TouchableCmp = TouchableOpacity;

    if (Platform.OS === 'android' && Platform.Version >= 21) {
        TouchableCmp = TouchableNativeFeedback;
    }

    return (
        <View style={styles.gridItem}>
            <TouchableCmp style={{flex: 1}} onPress={props.onSelect}>
                <View style={{...styles.container, ...{backgroundColor: props.color}}}>
                    <Text style={styles.title} numberOfLines={2}>{props.title}</Text>
                </View>
            </TouchableCmp>
        </View>
    );
};

const styles = StyleSheet.create({
    gridItem: {
        flex: 1,
        margin: 15,
        height: 150,
        borderRadius: 10,
        overflow: Platform.OS === 'android' && Platform.Version >= 21 ? 'hidden' : 'visible',
        // for iOS only
        shadowColor: 10,
        shadowOpacity: 0.2,
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 10,
        // for android only
        elevation: 5
    },
    container: {
        flex: 1,
        padding: 15,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        borderRadius: 10
    },
    title: {
        fontFamily: 'open-sans-bold',
        fontSize: 19,
        textAlign: 'right'
    }
});

export default CategoryGridTile;
