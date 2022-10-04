import { useWeb3Contract, useMoralis } from "react-moralis"
import { abi, contractAddresses } from "../constants"
import { useEffect, useState } from "react"

// have a funtion to enter the lottery

export default function RaffleEntrance() {
    const { chainId: chainIdHex, isWeb3Enabled } = useMoralis()
    const chainId = parseInt(chainIdHex)
    const raffleAddress = chainId in contractAddresses ? contractAddresses[chainId][0] : null

    const [entranceFee, setEntranceFee] = useState("0")
    /* const{runContractFuction: enterRaffle} = useWeb3Contract({
        abi: abi,
        contractAddress: raffleAddress, // specify networkId
        functionName: "enterRaffle",
        params: {},
        msgValue: 
    }) */

    const { runContractFuction: getEntranceFee } = useWeb3Contract({
        abi: abi,
        contractAddress: raffleAddress, // specify networkId
        functionName: "getEntranceFee",
        params: {},
    })

    useEffect(() => {
        if (isWeb3Enabled) {
            //try to read the raffle entrance fee
            async function updateUI() {
                const entranceFeeFromCall = (await getEntranceFee()).toString()
                setEntranceFee(entranceFeeFromCall)
                console.log(entranceFee)
            }
            updateUI()
        }
    }, [isWeb3Enabled])
    return (
        <div>
            Hello from Lottery Entrance! <div>Entrance Fee: {entranceFee} ETH</div>
        </div>
    )
}
