import React, { useContext } from 'react';
import { Center, SimpleGrid, Text } from '@chakra-ui/react';

import { getDateList } from './getDateList';
import { DatepickerContext, ActionOptions } from './';

type CalendarProps = {
  year: number;
  month: number;
};

type PickDate = ({
  day,
  month,
  year,
}: {
  day: number;
  month: number;
  year: number;
}) => void;

const Calendar: React.FC<CalendarProps> = ({ year, month }) => {
  const [state, dispatch] = useContext(DatepickerContext);

  const pickDate: PickDate = ({ day, month, year }) => {
    const date = `${year}-${month}-${day}`;

    if (!state.startDate) {
      dispatch({ type: ActionOptions.SET_START_DATE, payload: { date } });
    } else if (!state.endDate) {
      dispatch({ type: ActionOptions.SET_END_DATE, payload: { date } });
    } else {
      dispatch({ type: ActionOptions.RESTART_DATE, payload: { date } });
    }
  };

  const dates = getDateList(year, month);

  return (
    <SimpleGrid columns={7}>
      {dates.map(({ day, month, year, isThisMonth }, i) => {
        if (isThisMonth) {
          const date = `${year}-${month}-${day}`;
          const d = new Date(year, month, day);

          // before startDate
          if (state.startDate) {
            const [
              startDateYear,
              startDateMonth,
              startDateDay,
            ] = state.startDate.split('-');
            const startD = new Date(
              startDateYear,
              startDateMonth,
              startDateDay
            );

            const isBeforeStartDate = d.getTime() < startD.getTime();

            if (isBeforeStartDate) {
              return (
                <Center key={i} w={10} h={10} color='gray'>
                  {isThisMonth ? day : ''}
                </Center>
              );
            }
          }

          // startDate && endDate
          if (state.startDate && state.endDate) {
            if (date === state.startDate) {
              return (
                <Center
                  key={i}
                  w={10}
                  h={10}
                  cursor='pointer'
                  position='relative'
                  _before={{
                    content: '""',
                    bg: 'blue.700',
                    borderRadius: '50%',
                    position: 'absolute',
                    top: 0,
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: '40px',
                  }}
                  bgGradient='linear(
                    90deg
                    ,transparent 50%, blue.400 0);'
                  color='white'
                  onClick={() => pickDate({ day, month, year })}
                >
                  <Text position='relative'>{isThisMonth ? day : ''}</Text>
                </Center>
              );
            }
            if (date === state.endDate) {
              return (
                <Center
                  key={i}
                  w={10}
                  h={10}
                  cursor='pointer'
                  position='relative'
                  _before={{
                    content: '""',
                    bg: 'blue.700',
                    borderRadius: '50%',
                    position: 'absolute',
                    top: 0,
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: 'inherit',
                  }}
                  bgGradient='linear(
                    270deg
                    ,transparent 50%, blue.400 0);'
                  color='white'
                  onClick={() => pickDate({ day, month, year })}
                >
                  <Text position='relative'>{isThisMonth ? day : ''}</Text>
                </Center>
              );
            }
          }

          // startDate || endDate
          if (date === state.startDate || date === state.endDate) {
            return (
              <Center
                key={i}
                w={10}
                h={10}
                cursor='pointer'
                borderRadius='50%'
                bg='blue.700'
                color='white'
                onClick={() => pickDate({ day, month, year })}
              >
                {isThisMonth ? day : ''}
              </Center>
            );
          }

          // between startDate and endDate
          if (state.endDate) {
            const [endDateYear, endDateMonth, endDateDay] = state.endDate.split(
              '-'
            );
            const endD = new Date(endDateYear, endDateMonth, endDateDay);

            const isBeforeEndDate = d.getTime() < endD.getTime();

            if (isBeforeEndDate) {
              return (
                <Center key={i} w={10} h={10} bg='blue.400' color='white'>
                  {isThisMonth ? day : ''}
                </Center>
              );
            }
          }

          // rest
          return (
            <Center
              key={i}
              w={10}
              h={10}
              cursor='pointer'
              _hover={{ border: '1px solid', borderRadius: '50%' }}
              onClick={() => pickDate({ day, month, year })}
            >
              {isThisMonth ? day : ''}
            </Center>
          );
        }

        return <Center key={i} w={10} h={10}></Center>;
      })}
    </SimpleGrid>
  );
};

export default Calendar;
