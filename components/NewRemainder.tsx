import React, { useState } from 'react';
import { Alert, Modal, Pressable, Image } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import tw from 'tailwind-react-native-classnames';
import { Text, View } from './Themed';
import useStoredState from '../hooks/useAsyncStorage';
import { Remainder, RemainderList } from '../types';
import { v4 as uuid } from 'uuid';
import { Checkbox, Radio, FormControl } from 'native-base';
import Calendar from './Calendar';

const createRemainderImage = require('./../assets/images/new_remainder.jpg');

export default function NewRemainder() {
    const [eventName, setEventName] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [savedRemainders, updateRemainderList, hydrated] = useStoredState('eventsList', {});
    const [selectedDate, setSelectedDate] = useState('');
    const [eventColor, setEventColor] = useState('');
    const [notify, setNotify] = useState(false);

    const createNewRemainder = async () => {
        const allValues = savedRemainders;
        const id = uuid();

        const data:Remainder = {
            id,
            content: {
                title: eventName,
                date: selectedDate,
                color: eventColor,
                notify
            }
        };

        const newRemainder: RemainderList = {};

        newRemainder[id] = data;

        const newValues = Object.assign({}, allValues, data);

        updateRemainderList(newValues);

        setModalVisible(false);
        setEventName('');
    }

    return (
        <View>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
              setModalVisible(!modalVisible);
            }}
          >
            <View style={tw`flex justify-center items-center mt-24`}>
              <View style={tw`m-3 p-14 rounded-lg items-center shadow-2xl`}>
                <Text style={tw`mb-3 text-center`}>Create new remainder</Text>
                <TextInput
                    style={tw`h-8 w-40 m-6 text-lg rounded border-b border-blue-500`}
                    onChangeText={setEventName}
                    autoCorrect={false}
                    autoCompleteType="off"
                    autoCapitalize="none"
                    value={eventName}
                    placeholder="Event Name"
                />
                <View style={tw`flex`}>
                    <Checkbox 
                        colorScheme="blue" 
                        value='alert'
                        onChange={(value) => setNotify(value)}
                    >
                        Notify before event
                    </Checkbox>
                    <FormControl.Label style={tw`pt-5 justify-center`}>Event Color</FormControl.Label>
                    <Radio.Group
                        style={tw`flex flex-row justify-center pb-4 pl-4 pr-4`}
                        defaultValue='red'
                        name='eventType'
                        onChange={(value)=> setEventColor(value)}
                    >
                        <Radio style={tw`flex-auto p-1`} colorScheme="red" value='red'> </Radio>
                        <Radio style={tw`flex-auto p-1`} colorScheme="blue" value='blue'> </Radio>
                        <Radio style={tw`flex-auto p-1`} colorScheme="purple" value='purple'> </Radio>
                        <Radio style={tw`flex-auto p-1`} colorScheme="green" value='green'> </Radio>
                        <Radio style={tw`flex-auto p-1`} colorScheme="pink" value='black'> </Radio>
                    </Radio.Group>
                </View>
                <Calendar setDate={setSelectedDate}/>
                <View style={tw`flex flex-row w-full`}>
                    <Pressable
                        style={tw`flex-auto m-1 rounded p-2 bg-blue-500 justify-end`}
                        onPress={() => setModalVisible(!modalVisible)}
                    >
                        <Text style={tw`text-center text-white font-bold`}>Close</Text>
                    </Pressable>
                    <Pressable
                        style={tw`flex-auto m-1 rounded p-2 bg-blue-500 justify-start`}
                        onPress={createNewRemainder}
                    >
                        <Text style={tw`text-center text-white font-bold`}>Create</Text>
                    </Pressable>
                </View>
              </View>
            </View>
          </Modal>
          <Pressable
            onPress={() => setModalVisible(true)}
          >
          <View style={tw`max-w-sm mx-auto bg-white rounded-xl shadow-md flex flex-row items-center`}>
              <View style={tw`flex-shrink-0 p-px`}>
                <Image
                    source={createRemainderImage}
                    style={tw`w-20 h-24`}
                />
              </View>
              <View>
                  <Text style={tw`text-xl p-6`}> Create New Remainder</Text>
              </View>
          </View>
          </Pressable>
        </View>
      );
}