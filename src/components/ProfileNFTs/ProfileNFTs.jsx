import { useState, useEffect } from 'react'
import { 
    Grid,
    Typography,
    Backdrop,
    CircularProgress,
    Card,
    CardMedia,
    CardContent,
    CardActions,
    Button
  } from '@mui/material'
import useSWR from 'swr'
import axios from 'axios'
import ProfileWalletNFTModal from '../ProfileWalletNFTModal/ProfileWalletNFTModal'


  export default function ProfileNFTs(props) {
    const { user } = props
    const fetcher = (url) => fetch(url).then((res) => res.json())
    const url = `/api/profile/nfts/${user}`
    const { data, error } = useSWR(url, fetcher)
    const [nfts, setNfts] = useState()
    const [walletNfts, setWalletNfts] = useState()
    const [selectedWalletNfts, setSelectedWalletNfts] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [showNftModal, setShowNftModal] = useState(false)
    const [removeImageBackgrounds, setRemoveImageBackgrounds] = useState(true)

    useEffect(() => {
        setIsLoading(true)
        console.log('data', data)
        setNfts(data)
        setSelectedWalletNfts(data)
        setIsLoading(false)
    }, [data])

    const displayWalletNfts = async () => {
        setIsLoading(true)
        const requestData = { address: user }
        const { data } = await axios.post('/api/nft/wallet-nfts', requestData, {
            headers: {
                'content-type': 'application/json',
            },
        })
        setWalletNfts(data)
        setIsLoading(false)
        setShowNftModal(true)
    }

    const saveWalletNfts = async () => {
        setShowNftModal(false)
        setIsLoading(true)
        // let nftsToSave
        // if(nfts && nfts.length) {
        //     for(const nft of nfts) {
        //         console.log('nft', nft)
        //         const filteredNfts = selectedWalletNfts.filter(selectedWalletNft => selectedWalletNft.token_hash != nft.token_hash)
        //         console.log('filteredNfts', filteredNfts)
        //     }
        // } else {
        //     nftsToSave = selectedWalletNfts
        // }

        const requestData = {
            user,
            savedNfts: nfts,
            newNfts: selectedWalletNfts,
            removeImageBackgrounds
        }
        const { data } = await axios.post('/api/profile/nfts/save', requestData, {
            headers: {
                'content-type': 'application/json',
            },
        })
        setNfts(data)
        setSelectedWalletNfts(data)
        setIsLoading(false)
    }

    if(!data || !nfts || isLoading) {
        return (
            <Backdrop
                open={!nfts || isLoading}
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        )
    }


    return (
        <Grid container direction="row">
            <Grid item xs={12}>
                <Typography variant="h3" textAlign='center'>My NFTs</Typography>
            </Grid>
            <Grid item xs={12} container justifyContent="flex-end">
                <Button onClick={() => displayWalletNfts()}>Add NFTs</Button>
            </Grid>
            <Grid item xs={12}>
                {
                    nfts && nfts.length ? (
                        <Grid
                            container
                            spacing={3}
                            direction="row"
                            justifyContent="flex-start"
                            alignItems="flex-start"
                        >
                            {
                                nfts.map((nft) => (
                                    <Grid item xs={3} key={nft.token_id}>
                                        <Card 
                                            key={nft.token_id}
                                        >
                                            <CardMedia 
                                                component='img'
                                                image={nft.metadata.image}
                                                alt={nft.metadata.name}
                                            />
                                            <CardContent>
                                                <Typography noWrap gutterBottom component="div">
                                                    Collection: {nft.name}
                                                </Typography>
                                                <Typography noWrap gutterBottom component="div">
                                                    Name: {nft.metadata.name}
                                                </Typography>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                ))
                            }

                        </Grid>
                    ) : (
                        <Grid
                            container
                            direction='row'
                            justifyContent="center" 
                            alignContent="center"
                            style={{ minHeight: "100vh" }}
                        >
                            <Grid item xs={6}>
                                <Card sx={{ borderRadius: '16px', top: '50%' }}>
                                    <CardContent>
                                        <Typography variant="h5" gutterBottom textAlign="center">
                                            You havent added any NFTs yet... Click below to add!
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button onClick={() => displayWalletNfts()}>Add NFTs</Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        </Grid>
                    )
                }
                <ProfileWalletNFTModal 
                    nfts={nfts}
                    showNftModal={showNftModal}
                    walletNfts={walletNfts}
                    selectedWalletNfts={selectedWalletNfts}
                    setSelectedWalletNfts={setSelectedWalletNfts}
                    setShowNftModal={setShowNftModal}
                    saveWalletNfts={saveWalletNfts}
                    removeImageBackgrounds={removeImageBackgrounds}
                    setRemoveImageBackgrounds={setRemoveImageBackgrounds}
                />

            </Grid>
        </Grid>
    )
  }