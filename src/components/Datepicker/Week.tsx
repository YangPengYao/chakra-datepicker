import React from 'react';
import { Center, SimpleGrid } from '@chakra-ui/react';

const week = ['日', '一', '二', '三', '四', '五', '六'];

const Week = () => {
  return (
    <SimpleGrid columns={7}>
      {week.map((weekDay, i) => (
        <Center key={i} w={10} h={10} color='gray'>
          {weekDay}
        </Center>
      ))}
    </SimpleGrid>
  );
};

export default Week;
