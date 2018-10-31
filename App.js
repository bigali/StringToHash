/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Clipboard, View} from 'react-native';
import {Provider as PaperProvider, TextInput, Appbar, Button, Paragraph, Card, Title} from 'react-native-paper';
import RNPickerSelect from 'react-native-picker-select';
import StringToHash from './stringToHash'
import sealdLogo from './images/logo.png'
const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
    android:
        'Double tap R on your keyboard to reload,\n' +
        'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {
    constructor(props) {
        super(props);

        this.inputRefs = {};
        this.state = {
            text: '',
            hash: '',
            numberOfIteration: '',
            selectedMethod: '',
            //on peut ajouter n'import quel algorithm
            methods: [
                {
                    label: 'MD5',
                    value: 'MD5'
                },
                {
                    label: 'SHA-1',
                    value: 'SHA-1'
                }
            ]
        }
    }

    render() {
        return (
            <PaperProvider>
                <Appbar.Header>
                    <Appbar.Content
                        title="string to hash"
                    />
                </Appbar.Header>
                <View style={styles.container}>
                    <TextInput
                        style={{marginVertical: 10}}
                        label='Text to hash'
                        value={this.state.text}
                        onChangeText={text => this.setState({text})}
                    />

                    <RNPickerSelect
                        items={this.state.methods}
                        placeholder={{
                            label: 'Select a method...',
                            value: null,
                        }}

                        onValueChange={(value) => {
                            this.setState({
                                selectedMethod: value,
                            });
                        }}
                        onUpArrow={() => {
                        }}
                        onDownArrow={() => {
                        }}
                        ref={(el) => {
                            this.inputRefs.picker = el;
                        }}

                        style={{...pickerSelectStyles}}

                    />


                    <Button mode="contained"
                            style={{marginTop: 40}}
                            onPress={() => {
                                StringToHash.getHash(this.state.selectedMethod, this.state.text)
                                    .then((response) => {
                                        console.log("response", response)
                                        this.setState({
                                            hash: response.hash
                                        })
                                    })
                                    .catch((err) => {
                                        console.log("error", err)
                                    })
                            }}>
                        Confirm
                    </Button>
                    {
                        this.state.hash ?
                            <Card style={{marginTop: 10}}>
                                <Card.Content>
                                    <Title>hash result</Title>
                                    <Paragraph>
                                        {this.state.hash}
                                    </Paragraph>
                                </Card.Content>
                                <Card.Actions>
                                    <Button onPress={() =>   Clipboard.setString(this.state.hash)}>copy to Clipboard </Button>
                                </Card.Actions>
                            </Card> :
                            null}


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
