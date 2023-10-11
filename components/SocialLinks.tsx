import { Box, Button, Flex, Icon, Link, Text } from "@chakra-ui/react"
import { FaBars, FaDiscord, FaTwitter } from 'react-icons/fa'

import Image from 'next/image'
import config from "../config"

const SocialLinks = () => {
    return (<Flex p={4}>
        {!!config.discord && <Link href={`https://discord.gg/${config.discord}`} p={2}>
            <Flex align='center'>
                <Icon as={FaDiscord} boxSize={6} />
            </Flex>
        </Link>}
        {!!config.twitter && <Link href={`https://twitter.com/${config.twitter}`} p={2}>
            <Flex align='center'>
                <Icon as={FaTwitter} boxSize={6} />
            </Flex>
        </Link>}
    </Flex>)
}

export default SocialLinks
