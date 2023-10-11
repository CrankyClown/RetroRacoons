import { Box, Flex } from "@chakra-ui/react"
import Image from "next/image"
import React from "react"
import AppHeader from "../components/AppHeader"
import config from "../config"

const AppLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
    return <Flex direction='column' minH='100vh'>
        <Image src={config.backgroundImagePath} layout='fill' />
        <AppHeader />
        <Box flex='1'>
            {children}
        </Box>
    </Flex>
}

export default AppLayout
