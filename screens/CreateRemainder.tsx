import * as React from 'react';
import { Text, View } from 'react-native';
import { RootTabScreenProps } from '../types';
import tw from 'tailwind-react-native-classnames';
import NewRemainder from '../components/NewRemainder';

export default function CreateRemainder({ navigation }: RootTabScreenProps<'CreateRemainder'>) {
    return (
        <View style={tw`flex items-center`}>
        <View style={tw`py-4`}>
            <NewRemainder/>
        </View>
        <Text style={tw`py-12`}>2</Text>
        <Text style={tw`py-8`}>3</Text>
        </View>
    );
}