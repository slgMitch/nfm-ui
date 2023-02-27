import { useState } from 'react'
import { 
    Grid,
    Typography,
    Backdrop,
    CircularProgress,
    Card,
    CardMedia,
    CardContent,
    CardActions,
    Button,
    Modal,
    Checkbox,
    FormControlLabel
  } from '@mui/material'

export default function ProfileWalletNFTModal(props) {
    const {
        nfts,
        showNftModal,
        walletNfts,
        selectedWalletNfts,
        setSelectedWalletNfts,
        setShowNftModal,
        saveWalletNfts,
        removeImageBackgrounds,
        setRemoveImageBackgrounds
    } = props

    const [isLoading, setIsLoading] = useState(false)

    const selectNft = (walletNft) => {
        const isAlreadySelected = selectedWalletNfts && selectedWalletNfts.find(selectedWalletNft => selectedWalletNft.token_id === walletNft.token_id)
        if(isAlreadySelected) {
            setSelectedWalletNfts(selectedWalletNfts.filter(selectedWalletNft => selectedWalletNft.token_id !== isAlreadySelected.token_id))
        } else {
            setSelectedWalletNfts([...selectedWalletNfts, walletNft])
        }
    }

    const handleRemoveImageBackgroundsChange = (event) => {
        setRemoveImageBackgrounds(event.target.checked)
    }

    const closeWalletNftModal = () => {
        setShowNftModal(false)
        setSelectedWalletNfts(nfts)
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
        <Modal open={showNftModal} sx={{ overflow: 'scroll' }}>
            <Grid
                container 
                direction="row" 
                justifyContent="center" 
                alignContent="center"
                style={{ minHeight: "100vh" }}
            >
                <Grid item xs={8}>
                    <Card sx={{ borderRadius: '16px', top: '50%' }}>
                        <CardContent>
                            <Typography variant='h4' textAlign='center'>Select NFTs to save</Typography>
                            <Grid container direction='row'>
                                {
                                    walletNfts && walletNfts.map((walletNft) => (
                                        <Grid item xs={4} key={walletNft.token_id}>
                                            <Card
                                                key={walletNft.token_id} 
                                                sx={{ 
                                                    margin: '15px', 
                                                    ":hover": { 
                                                        boxShadow: '-1px 10px 29px 0px rgba(0,0,0,0.8);', 
                                                        cursor: 'pointer' 
                                                    },
                                                    boxShadow: selectedWalletNfts && selectedWalletNfts.find(selectedWalletNft => selectedWalletNft.token_id === walletNft.token_id) || nfts && nfts.find(nft => nft.token_id === walletNft.token_id) ? '-1px 10px 29px 0px rgba(0,0,0,0.8);' : ''
                                                }}
                                                onClick={() => selectNft(walletNft)}
                                            >
                                                <CardMedia 
                                                    sx={{ height: 350 }}
                                                    image={walletNft.metadata.image}
                                                    title={walletNft.metadata.name}
                                                />
                                                <CardContent>
                                                    <Typography textAlign='center'>{walletNft.metadata.name}</Typography>
                                                </CardContent>
                                            </Card>
                                        </Grid>

                                    ))
                                }
                            </Grid>
                        </CardContent>
                        <CardActions>
                            <Grid  container item xs={6} justifyContent='flex-start'>
                                <Button onClick={() => closeWalletNftModal()}>Close</Button>
                                <Button disabled={!selectedWalletNfts.length} onClick={() => saveWalletNfts()}>Save</Button>

                            </Grid>
                            <Grid  container item xs={6} justifyContent='flex-end'>
                                <FormControlLabel
                                    control={
                                        <Checkbox 
                                            checked={removeImageBackgrounds}
                                            onChange={handleRemoveImageBackgroundsChange}
                                        />
                                    }
                                    label="Remove background from tokens" 
                                />
                            </Grid>
                        </CardActions>
                    </Card>
                </Grid>
            </Grid>
        </Modal>
    )


}