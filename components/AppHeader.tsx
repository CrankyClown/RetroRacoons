import { Avatar, Box, Flex, Heading, Link, Text } from "@chakra-ui/react"
import { ConnectButton } from "@rainbow-me/rainbowkit"
import { FC } from "react"
import config from "../config"
import SocialLinks from "./SocialLinks"

const AppHeader: FC = () => {
    return (<Flex p={4} align='center' justify='center' wrap='wrap' zIndex={1}>
        <Link href={config.url}>
            <Flex align='center'>
                {!!config.logoImagePath && <Avatar mr={4} src={config.logoImagePath} />}
                {!!config.projectName && config.showProjectNameInHeader && <Heading as='p' mr={8} fontSize='xl'>{config.projectName}</Heading>}
            </Flex>
        </Link>

        <SocialLinks />

        <ConnectButton />
    </Flex>)
}

export default AppHeader
