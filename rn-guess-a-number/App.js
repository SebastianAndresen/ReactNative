import React, {useState} from 'react';
import {StyleSheet, View, SafeAreaView} from 'react-native';
import * as Font from 'expo-font'; //package that allows us to load fonts
import {AppLoading} from 'expo'; //will prolong loading screen until app is ready - used here to make sure fonts are loaded

import Header from './components/Header';
import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';
import GameOverScreen from './screens/GameOverScreen';

const fetchFonts = () => {
    return Font.loadAsync({
        'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'), // keys are up to us
        'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
    });
};

export default function App() {
    const [userNumber, setUserNumber] = useState();
    const [guessRounds, setGuessRounds] = useState(0);
    const [dataLoaded, setDataLoaded] = useState(false);

    if (!dataLoaded) {
        return <AppLoading
            startAsync={fetchFonts} // has to be a function that returns a promise - which require() does in loadAsync
            onFinish={() => setDataLoaded(true)}
            onError={(err) => console.log(err)}
        />;
    }

    const configureNewGameHandler = () => {
        setGuessRounds(0);
        setUserNumber(null);
    };

    const startGameHandler = (selectedNumber) => {
        setUserNumber(selectedNumber);
    };

    const gameOverHandler = nunOfRounds => {
        setGuessRounds(nunOfRounds);
    };

    let content = <StartGameScreen onStartGame={startGameHandler}/>;

    if (userNumber && guessRounds <= 0) {
        content = <GameScreen userChoice={userNumber} onGameOver={gameOverHandler}/>;
    } else if (guessRounds > 0) {
        content =
            <GameOverScreen roundsNumber={guessRounds} userNumber={userNumber} onRestart={configureNewGameHandler}/>;
    }

    return (
        <SafeAreaView style={styles.screen}>
            <Header title="Guess a Number"/>
            {content}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1
    }
});
