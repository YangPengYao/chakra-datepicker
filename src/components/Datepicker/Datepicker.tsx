import React, { useState, useContext, useMemo } from 'react';
import { Box, Center, Flex, Icon, Text } from '@chakra-ui/react';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';

import getYear from 'date-fns/getYear';
import getMonth from 'date-fns/getMonth';

import Week from './Week';
import Calendar from './Calendar';
import { DatepickerContext } from './';

enum Month {
  'January' = 1,
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
}

const Datepicker = () => {
  const [state] = useContext(DatepickerContext);

  const [year, setYear] = useState(getYear(new Date()));
  const [month, setMonth] = useState(getMonth(new Date()) + 1);

  const [isLeftArrowClickable, isRightArrowClickable] = useMemo(() => {
    if (month === getMonth(new Date()) + 1) {
      return [false, true];
    } else if (month === getMonth(new Date()) + 9) {
      return [true, false];
    } else {
      return [true, true];
    }
  }, [month]);

  const handlePreviousMonth = () => {
    if (!isLeftArrowClickable) return;

    if (month === 1) {
      setYear((prev) => prev - 1);
      setMonth(12);
      return;
    }

    setMonth((prev) => prev - 1);
  };

  const handleNextMonth = () => {
    if (!isRightArrowClickable) return;

    if (month === 12) {
      setYear((prev) => prev + 1);
      setMonth(1);
      return;
    }

    setMonth((prev) => prev + 1);
  };

  return (
    <>
      {/* display */}
      <Center mb={10}>
        <Box>
          <Text>開始日期: {state.startDate?.toString()}</Text>
          <Text>結束日期: {state.endDate}</Text>
        </Box>
      </Center>

      {/* datepicker */}
      <Flex color='black' bg='gray.100' borderRadius='24px'>
        {/* right */}
        <Box p={6}>
          {/* header */}
          <Flex alignItems='center' mb={6}>
            <Icon
              as={AiOutlineLeft}
              cursor={isLeftArrowClickable ? 'pointer' : 'not-allowed'}
              color={isLeftArrowClickable ? 'black' : 'gray'}
              onClick={handlePreviousMonth}
            />
            <Text flex='1' textAlign='center'>
              {Month[month]}
            </Text>
          </Flex>

          {/* week */}
          <Week />

          {/* carlendar */}
          <Calendar year={year} month={month} />
        </Box>

        {/* left */}
        <Box p={6}>
          {/* header */}
          <Flex alignItems='center' mb={6}>
            <Text flex='1' textAlign='center'>
              {month === 12 ? Month[1] : Month[month + 1]}
            </Text>
            <Icon
              as={AiOutlineRight}
              cursor={isRightArrowClickable ? 'pointer' : 'not-allowed'}
              color={isRightArrowClickable ? 'black' : 'gray'}
              onClick={handleNextMonth}
            />
          </Flex>

          {/* week */}
          <Week />

          {/* carlendar */}
          <Calendar
            year={month === 12 ? year + 1 : year}
            month={month === 12 ? 1 : month + 1}
          />
        </Box>
      </Flex>
    </>
  );
};

export default Datepicker;
