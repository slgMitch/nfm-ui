import { useState } from 'react'
import { 
    Button,
    Backdrop,
    CircularProgress,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Grid,
    Typography,
  } from '@mui/material'
import axios from 'axios'
import ProfileWalletNFTModal from '../ProfileWalletNFTModal/ProfileWalletNFTModal'

export default function CreateProductSelectImages(props) {
    const {
        user,
        userImages,
        setSelectedUserImages,
        selectedUserImages,
        setCanGoToNextStep
    } = props
    const [nfts, setNfts] = useState(userImages)
    const [showNftModal, setShowNftModal] = useState(false)
    const [walletNfts, setWalletNfts] = useState()
    const [selectedWalletNfts, setSelectedWalletNfts] = useState([])
    const [removeImageBackgrounds, setRemoveImageBackgrounds] = useState(true)
    const [isLoading, setIsLoading] = useState(false)

    if(!selectedUserImages.length) {
        setCanGoToNextStep(false)
    }

    const selectImages = (image) => {
        setSelectedUserImages([...selectedUserImages, image])
        setCanGoToNextStep(true)
    }

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

        const requestData = {
            user,
            nfts: selectedWalletNfts,
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


    if(isLoading) {
        return (
            <Backdrop
                open={isLoading}
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        )
    }

    return (
        <Grid container direction="row">
            <Grid item xs={12}>
                <Typography variant="h3">Images</Typography>
            </Grid>
            <Grid item xs={12}>
                <Grid
                    container
                    spacing={3}
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="flex-start"
                >
                    {
                        nfts && 
                        nfts.length ? (
                            nfts &&
                            nfts.map((image) => (
                                <Grid item xs={3} key={image._id}>
                                    <Card
                                        key={image._id}
                                        sx={{
                                            ":hover": { 
                                                boxShadow: '-1px 10px 29px 0px rgba(0,0,0,0.8);', 
                                                cursor: 'pointer' 
                                            },
                                            boxShadow: selectedUserImages && selectedUserImages.find(userImage => userImage._id === image._id) ? '-1px 10px 29px 0px rgba(0,0,0,0.8);' : ''
                                        }}
                                        onClick={() => selectImages(image)}
                                    >
                                        <CardMedia 
                                            component='img'
                                            image={image.metadata.image}
                                            alt={image.metadata.name}
                                        />
                                        <CardContent>
                                            <Typography noWrap gutterBottom component="div">
                                                {image.metadata.name}
                                            </Typography>
                                        </CardContent>
    
                                    </Card>
                                </Grid>
                            ))

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
        </Grid>
    )
}