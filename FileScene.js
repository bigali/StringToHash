import React, {Component} from 'react'
import {Button, Card, Paragraph, Text, TextInput, Title, Colors, Snackbar} from "react-native-paper";
import RNPickerSelect from "react-native-picker-select";
import StringToHash from "./stringToHash";
import {Clipboard, Share, StyleSheet, View, ScrollView, Alert} from "react-native";
import RNFileSelector from "react-native-file-selector";
import Icon from "react-native-vector-icons/MaterialIcons";

export default class App extends Component<Props> {
    constructor(props) {
        super(props);
        this.inputRefs = {};
        this.state = {
            text: '',
            textToCompare: '',
            file: '',
            hash: '',
            visible: false,
            numberOfIteration: '',
            selectedMethod: '',
            comparisonResult: null,
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
    refresh = () => {
        this.setState({
            text: '',
            textToCompare: '',
            file: '',
            hash: '',
            visible: false,
            numberOfIteration: '',
            selectedMethod: '',
            comparisonResult: null,
        })
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

    render() {
        console.log("purble", Colors.deepPurple500)


        return (
            <ScrollView
                style={{
                    flex: 1,
                    backgroundColor: Colors.grey100,
                    padding: 16
                }}
            >
                {
                    !this.state.hash ?
                        <View>
                            <Button
                                mode="contained"
                                icon="attach-file"
                                onPress={() => RNFileSelector.Show(
                                    {
                                        title: 'Select File',
                                        onDone: (path) => {
                                            this.setState({
                                                file: path
                                            })
                                        },
                                        onCancel: () => {
                                            console.log('cancelled')
                                        }
                                    }
                                )}>choose file</Button>
                            <TextInput
                                style={{marginVertical: 10}}
                                label='File path'
                                value={this.state.file}
                                disabled={true}
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
                                style={{...pickerSelectStyles}}
                            />


                            <Button mode="contained"
                                    style={{marginTop: 40}}
                                    onPress={() => {
                                        StringToHash.getFileHash(this.state.file, this.state.selectedMethod)
                                            .then((response) => {
                                                console.log("response", response)
                                                this.setState({
                                                    hash: response.hash
                                                })
                                            })
                                            .catch((err) => {
                                                console.log("error", err)
                                            })
                                    }
                                    }>
                                Confirm
                            </Button>
                        </View>
                        : null
                }

                {
                    this.state.hash ?
                        <View style={{flex: 1}}>
                            <Card style={{marginTop: 10}}>
                                <Card.Content>
                                    <Title>hash result</Title>
                                    <Paragraph>
                                        {this.state.hash}
                                    </Paragraph>
                                </Card.Content>
                                <Card.Actions>
                                    <Button onPress={() => Clipboard.setString(this.state.hash)}>Copy</Button>
                                    <Button onPress={() => this.onShare(this.state.hash)}>Share</Button>
                                </Card.Actions>
                            </Card>
                            <Card style={{marginTop: 10}}>
                                <Card.Content>
                                    <View style={{
                                        justifyContent: 'space-between',
                                        flexDirection: 'row'
                                    }}>
                                        <Title>Compare to</Title>
                                        {
                                            this.state.comparisonResult ? <Icon
                                                name={this.state.comparisonResult === 'identical' ? 'check' : 'clear'}
                                                size={30}
                                                color={this.state.comparisonResult === 'identical' ? 'green' : 'red'}/> : null
                                        }
                                    </View>
                                    <TextInput
                                        style={{marginVertical: 10}}
                                        label='Compare to'
                                        value={this.state.textToCompare}
                                        onChangeText={text => this.setState({textToCompare: text})}
                                    />
                                </Card.Content>
                                <Card.Actions>
                                    <Button onPress={() => {
                                        this.setState({
                                            comparisonResult: this.state.hash === this.state.textToCompare ? 'identical' : 'different',
                                        })
                                    }}>confirm</Button>
                                </Card.Actions>
                            </Card>
                        </View>
                        :
                        null}

            </ScrollView>
        )
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