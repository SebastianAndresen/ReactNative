import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';

import BodyText from '../components/BodyText';
import TitleText from '../components/TitleText';
import MainButton from '../components/MainButton';

import Colors from '../constants/colors';

const GameOverScreen = props => {
    return (
        <View style={styles.screen}>
            <TitleText>The Game is Over!</TitleText>
            <View style={styles.imageContainer}>
            <Image
                fadeDuration={1000} // once downloaded, the image is cached. Fading is only for first-times
                // source={require('../assets/success.png')} local image
                source={{uri: 'https://lh3.googleusercontent.com/proxy/uexrsbzrXHwZ7Bw-thp8Ey-TygCvtxrDBkmtjoaZ6cGjE5mVfOZiy_cRCrV92sVDQ54rbkUkM2ZQhbMTPESFl9_kG0kB3YjUz5PamjWDR0KTy5dCENbY9oSqOwL9HkgtXWU'}} //online image
                style={styles.image}
                resizeMode="cover" //cover (default): crop, contain: fits inside
            />
            </View>
            <View style={styles.resultContainer}>
            <BodyText style={styles.resultText}>Your phone needed <Text style={styles.highlight}>{props.roundsNumber}</Text> rounds to guess the number <Text style={styles.highlight}>{props.userNumber}</Text></BodyText>
            </View>
            <MainButton onPress={props.onRestart}>NEW GAME</MainButton>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageContainer: {
        width: 300, //width and height should be the same for round images
        height: 300,
        borderRadius: 200,
        borderWidth: 3,
        borderColor: 'black',
        overflow: 'hidden',
        marginVertical: 30
    },
    image: {
        width: '100%',
        height: '100%'
    },
    resultContainer: {
        marginHorizontal: 30,
        marginVertical: 15
    },
    resultText: {
        textAlign: 'center',
        fontSize: 20
    },
    highlight: { // nested text components will inherit styles from its parent text component
        color: Colors.primary,
        fontFamily: 'open-sans-bold'
    }
});

export default GameOverScreen;
