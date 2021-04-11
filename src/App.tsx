import * as React from 'react';
import { ChakraProvider, theme, Box, Center } from '@chakra-ui/react';

import Datepicker from './components/Datepicker';

export const App = () => (
  <ChakraProvider theme={theme}>
    <Center w='100vw' h='100vh'>
      <Box>
        <Datepicker />
      </Box>
    </Center>
  </ChakraProvider>
);
