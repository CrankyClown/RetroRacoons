import { Alert, Box, Button, Flex, Heading, Text } from "@chakra-ui/react"
import { ethers } from "ethers"

import { useEffect, useState } from "react"
import useMintContract from "../hooks/useMintContract"

const MintForm = () => {
    const { config: contractConfig, init, mint, mintError, mintQuantity, presaleMint, setMintQuantity, signer } = useMintContract()

    const [loading, setLoading] = useState(false)

    const onMint = async () => {
        setLoading(true)
        await mint(mintQuantity)
        setLoading(false)
    }

    const onPresaleMint = async () => {
        setLoading(true)
        await presaleMint()
        setLoading(false)
    }

    useEffect(() => {
        if (mintQuantity < 1) setMintQuantity(1)
    }, [mintQuantity])

    useEffect(() => {
        !!signer && !contractConfig && init()
    }, [signer, contractConfig])

    return (<Flex direction='column' align='center' p={4}>
        {!contractConfig && <Box p={4}><Text>Please Connect Your Wallet</Text></Box>}

        {!!contractConfig && <>
            {!contractConfig.publicSaleActive && <Text p={4}>Minting is not active yet!</Text> }

            {contractConfig.publicSaleActive && <>
                <Heading as='h3' size='lg' mb={4}>Mint</Heading>

                {contractConfig.totalSupply.toNumber() < 1000 && <Button variant='outline' size='lg' onClick={onPresaleMint} isLoading={loading} mb={4}>
                    Mint 1 for Free!
                </Button>}

                <Flex align='center'>
                    <Button p={4} onClick={() => setMintQuantity(mintQuantity - 1)}>-</Button>
                    <Text p={4}>{mintQuantity}</Text>
                    <Button p={4} onClick={() => setMintQuantity(mintQuantity + 1)}>+</Button>
                </Flex>

                <Button variant='outline' size='lg' onClick={onMint} isLoading={loading} mb={4}>
                    Mint {mintQuantity} for {(mintQuantity * Number(ethers.utils.formatEther(contractConfig.publicPrice))).toFixed(3)} ETH
                </Button>

                {!!mintError && <Alert>{mintError}</Alert>}
            </>}

        </>}
    </Flex>)
}

export default MintForm
