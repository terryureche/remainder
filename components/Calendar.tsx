
import { Calendar as NativeCalendar } from 'react-native-calendars';
import moment, { Moment } from 'moment';
import React, { useState } from 'react';
import tw from 'tailwind-react-native-classnames';
import { View } from './Themed';

export default function Calendar({setDate}: {setDate: React.ComponentProps<any>}) {
    const [markedDates, setMarkedDates] = useState({});

    const getSelectedDay = (date:string) => {
        let markedDates: any = {};

        markedDates[date] = {
            selected: true,
            color: "#00B0BF",
            textColor: "#FFFFFF"
        };

        const serviceDateMoment:Moment = moment(date);
        const serviceDate:string = serviceDateMoment.format('DD.MM.YYYY');

        setDate(serviceDate);
        setMarkedDates(markedDates);
    }

    return (
        <View>
            <NativeCalendar
                theme={{
                    selectedDayBackgroundColor: "#4299e1"
                }}
                style={tw`mb-8`}
                markedDates={markedDates}

                onDayPress={day => getSelectedDay(day.dateString)}
            />
        </View>
    );
}