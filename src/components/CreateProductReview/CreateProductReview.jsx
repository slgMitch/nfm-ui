import { 
    Card,
    CardContent,
    CardMedia,
    Grid,
    Typography,
    TextField,
    ToggleButton,
    Tooltip
  } from '@mui/material'

export default function CreateProductReview(props) {
    const {
        selectedBaseProduct,
        selectedUserImages,
        selectedImagePlacement,
        merchName,
        setMerchName
    } = props

    console.log('selectedBaseProduct', selectedBaseProduct)
    console.log('selectedUserImages', selectedUserImages)
    console.log('selectedImagePlacement', selectedImagePlacement)

    const handleMerchNameChange = (e) => {
        setMerchName(e.target.value)
    }

    return (
        <Grid container direction="row">
            <Grid item xs={12}>
                <Typography variant="h3">Review</Typography>
            </Grid>
            <Grid item xs={12}>
                <Grid
                    container
                    spacing={4}
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="flex-start"
                >
                    <Grid item xs={12}>
                        <Typography variant="h5">Base Product</Typography>
                    </Grid>
                    <Grid item xs={6} sx={{ border: '5px solid black'}}>
                        <Card
                            // sx={{ height: '100px'}}
                        >
                            <CardMedia 
                                component='img'
                                image={selectedBaseProduct.image}
                                alt={selectedBaseProduct.title}
                            />
                        </Card>
                    </Grid>
                    <Grid item xs={6} sx={{ border: '5px solid blue'}}>
                        <Grid
                            container
                            spacing={4}
                            direction="row"
                            justifyContent="flex-start"
                            alignItems="flex-start"
                            sx={{ border: '5px solid red'}}
                        >
                            <Grid item xs={12}>
                                <Grid
                                    container
                                    direction='row'
                                >
                                    <Grid item xs={12}>
                                        <Typography>Merch Name: Token Name - {merchName}</Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField 
                                            defaultValue={merchName}
                                            onChange={handleMerchNameChange}
                                            variant="outlined"
                                            fullWidth
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12}>
                                <Grid
                                    container
                                    direction='row'
                                >
                                    <Grid item xs={12}>
                                        <Typography>File Placement</Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Card
                                            sx={{width: '50%'}}
                                        >
                                            {/* <CardMedia 
                                                component='img'
                                                image={selectedImagePlacement.image}
                                                alt={selectedImagePlacement.id}
                                            /> */}
                                            <CardContent>
                                                <Typography noWrap gutterBottom component="div">
                                                    {selectedImagePlacement.title}
                                                </Typography>
                                            </CardContent>
                                        </Card>
                                    </Grid>

                                </Grid>
                            </Grid>
                            <Grid item xs={12}>
                                <Grid
                                    container
                                    direction='row'
                                >
                                    <Grid item xs={12}>
                                        <Typography>Colors</Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        {
                                            selectedBaseProduct &&
                                            selectedBaseProduct.colors.map((color) => (
                                                <Tooltip key={color.color} title={color.color}>
                                                    <ToggleButton key={color.colorCode} value={color.colorCode} style={{ backgroundColor: `${color.colorCode}`, margin: '2px', padding: '15px'}}></ToggleButton>
                                                </Tooltip>
                                            ))
                                        }
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12}>
                                <Grid
                                    container
                                    direction='row'
                                >
                                    <Grid item xs={12}>
                                        <Typography>Sizes</Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        {
                                            selectedBaseProduct &&
                                            selectedBaseProduct.sizes.map((size) => (
                                                <ToggleButton key={size} value={size} style={{margin: '2px'}}>{size}</ToggleButton>
                                            ))
                                        }
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Grid
                    container
                    spacing={4}
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="flex-start"
                >
                    <Grid item xs={12}>
                        <Typography variant="h5">Selected Images</Typography>
                    </Grid>
                    {
                        selectedUserImages &&
                        selectedUserImages.map((selectedUserImage) => (
                            <Grid item xs={3} key={selectedUserImage._id}>
                                <Card key={selectedUserImage._id}>
                                    <CardMedia 
                                        component='img'
                                        image={selectedUserImage.metadata.image}
                                        alt={selectedUserImage.metadata.name}
                                    />
                                    <CardContent>
                                        <Typography noWrap gutterBottom component="div">
                                            {selectedUserImage.metadata.name}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))
                    }

                </Grid>

            </Grid>
        </Grid>
    )
}