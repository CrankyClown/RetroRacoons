import { BigNumber, ethers } from 'ethers';

import { useContract, useSigner } from 'wagmi';

import contractJson from '../contracts/ERC721AMinter.json'
import { LAIZYLIONS as ERC721AMinter } from '../contracts/ERC721AMinter'
import { useEffect, useState } from 'react';

interface Config {
    publicSaleActive: boolean
    revealed: boolean
    maxSupply: BigNumber
    presaleSupply: BigNumber
    publicPrice: BigNumber
    totalSupply: BigNumber
}

const useMintContract = () => {
    const { data: signer } = useSigner()

    const [isAdmin, setIsAdmin] = useState(false)

    const [error, setError] = useState('')

    const [config, setConfig] = useState<Config>()

    const [mintError, setMintError] = useState('')
    const [mintQuantity, setMintQuantity] = useState(2)

    const contractArgs = {
        addressOrName: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || '',
        contractInterface: contractJson.abi,
        signerOrProvider: signer || ethers.getDefaultProvider()
    }

    const contract = useContract<ERC721AMinter>(contractArgs)

    const init = async () => {
        console.log('getting contract config')
        try {
            const { publicSaleActive, revealed, MAX_SUPPLY: maxSupply, publicPrice, presaleSupply, totalSupply } = await contract.getConfig()
            setConfig({ publicSaleActive, revealed, maxSupply, publicPrice, presaleSupply, totalSupply })

            if (signer) {
                const result = await contract.isAdmin(await signer.getAddress())
                setIsAdmin(result)
            }
        } catch (err: any) {
            console.log(err.message)
            setError(err.message)
        }
    }

    const mint = async (quantity: number) => {
        setMintError('')

        if (config) {
            try {
                const tx = await contract.mint(quantity, { value: config.publicPrice.mul(quantity) })
                await tx.wait()
            } catch (err: any) {
                console.error(err)
                setMintError(err.reason?.split("'")[1] || err.data?.reason || err.message?.split('execution reverted: ')[1]?.split('"')[0] || err.message)
            }
        }
    }

    const presaleMint = async () => {
        setMintError('')

        if (config) {
            try {
                const tx = await contract.presaleMint({ value: 0 })
                await tx.wait()
            } catch (err: any) {
                console.error(err)
                setMintError(err.reason?.split("'")[1] || err.data?.reason || err.message?.split('execution reverted: ')[1]?.split('"')[0] || err.message)
            }
        }
    }

    const togglePublicSale = async () => {
        const tx = await contract.togglePublicSale()
        await tx.wait()
    }

    useEffect(() => {
        console.log(contractArgs)
    })

    return { config, init, isAdmin, mint, mintError, mintQuantity, presaleMint, setMintQuantity, signer, togglePublicSale }
}

export default useMintContract
