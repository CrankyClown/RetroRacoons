import { Box, Container, Flex, Heading, Text } from '@chakra-ui/react';

import type { NextPage } from 'next';
import Head from 'next/head';

import config from '../config'
import MintForm from '../components/MintForm';
import Image from 'next/image';

const Home: NextPage = () => {
  return (<>
    <Head>
      <title>{config.projectName}</title>
      <meta
        name="description"
        content={config.description}
      />

      <meta property="og:title" content={config.projectName} />
      <meta property="og:description" content={config.description} />
      <meta property="og:image" content={config.logoImagePath} />
      <meta property="og:url" content={config.url} />

      <meta property="twitter:title" content={config.projectName} />
      <meta property="twitter:description" content={config.description} />
      <meta property="twitter:image" content={config.logoImagePath} />
      <meta name="twitter:image:alt" content={`${config.projectName} Logo`} />
    </Head>

    <Box as='main'>
      <Container maxW={1280} pb={8}>
      
        <Image src='/images/feature.png' width={1400} height={400} alt={`${config.projectName} Feature Image`} />

        <Flex direction='column' align='center' my={4} zIndex={1}>
          <Box background={config.theme == 'dark' ? 'black' : 'white'} borderRadius={10} zIndex={1}>
            <Box m={8}>
              <Heading as='h1' textAlign='center'>MINT {config.projectName}</Heading>
              <Text textAlign='center' mb={4}>{config.description}</Text>

              <Flex justify='center'>
                <Image src={config.minterImagePath} height={400} width={400} alt={`${config.projectName} Logo`} />
              </Flex>
            </Box>

            <MintForm />
          </Box>
        </Flex>
      </Container>
    </Box>
  </>);
};

export default Home;
