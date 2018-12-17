/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Clipboard, View, Share, StatusBar} from 'react-native';
import {
    Provider as PaperProvider,
    TextInput,
    Appbar,
    Button,
    Paragraph,
    Card,
    Title,
    BottomNavigation,
    Text, DefaultTheme,
    Colors
} from 'react-native-paper';
import RNPickerSelect from 'react-native-picker-select';
import StringToHash from './stringToHash'
import sealdLogo from './images/logo.png'
import RNFileSelector from "react-native-file-selector";
import TextScene from "./TextScene";
import FileScene from "./FileScene";

const theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: Colors.red500,
        accent: Colors.yellow200,
    },
};
type Props = {};
export default class App extends Component<Props> {
    constructor(props) {
        super(props);
        console.log(Colors.red500)

        this.child = React.createRef();
        this.state = {
            text: '',
            file: '',
            hash: '',
            numberOfIteration: '',
            selectedMethod: '',
            index: 0,
            routes: [
                {key: 'text', title: 'Text', icon: 'text-fields'},
                {key: 'file', title: 'File', icon: 'attach-file'},
            ],
            methods: [
                {
                    label: 'MD5',
                    value: 'MD5'
                },
                {
                    label: 'SHA-1',
                    value: 'SHA-1'
                },
                {
                    label: 'SHA-224',
                    value: 'SHA-224'
                },
                {
                    label: 'SHA-384',
                    value: 'SHA-384'
                },
                {
                    label: 'SHA-512',
                    value: 'SHA-512'
                }
            ]
        }
    }

    onShare = (text) => {
        Share.share({
            message: text,
            title: 'share hash'
        }, {
            // Android only:
            dialogTitle: 'share hash',
        })
    }

    TextRoute = () => <TextScene ref={this.child}/>;

    FileRoute = () => <FileScene ref={this.child}/>;


    _handleIndexChange = index => this.setState({index});

    _renderScene = BottomNavigation.SceneMap({
        text: this.TextRoute,
        file: this.FileRoute
    });
    _onRefresh = () => {
        this.child.current.refresh();
    }

    render() {
        return (
            <PaperProvider theme={theme}>
                <StatusBar
                    backgroundColor='#f44336'
                    barStyle="light-content"
                />
                <View style={{flex: 1}}>
                    <Appbar.Header>
                        <Appbar.Content
                            title="# hash tools"
                        />
                        <Appbar.Action icon="refresh" onPress={this._onRefresh}/>

                    </Appbar.Header>
                    <BottomNavigation
                        navigationState={this.state}
                        onIndexChange={this._handleIndexChange}
                        renderScene={this._renderScene}
                    />
                </View>
            </PaperProvider>
        );
    }
}

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        paddingTop: 13,
        paddingHorizontal: 10,
        paddingBottom: 12,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 4,
        backgroundColor: 'white',
        color: 'black',
    },
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        padding: 16
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});
