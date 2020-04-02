import React from 'react';
import {Text, StyleSheet} from 'react-native';

const TitleText = props => <Text style={{...styles.title, ...props.style}}>{props.children}</Text>;

const styles = StyleSheet.create({
    title: {
        fontFamily: 'open-sans-bold', // expo does not support fontWeight of custom fonts. Load them as separate fonts
        fontSize: 18
    }
});

export default TitleText;
