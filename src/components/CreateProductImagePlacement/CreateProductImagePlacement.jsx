import { 
    Card,
    CardContent,
    Grid,
    Typography,
  } from '@mui/material'

export default function CreateProductImagePlacement(props) {
    const {
        imagePlacements,
        setSelectedImagePlacement,
        selectedImagePlacement,
        setCanGoToNextStep
    } = props

    if(!selectedImagePlacement) {
        setCanGoToNextStep(false)
    }

    const selectPlacement = (placement) => {
        setSelectedImagePlacement(placement)
        setCanGoToNextStep(true)
    }

    return (
        <Grid container direction="row">
            <Grid item xs={12}>
                <Typography variant="h3">ImagePlacement</Typography>
            </Grid>
            <Grid item xs={12}>
                <Grid
                    container
                    spacing={4}
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="flex-start"
                >
                    {
                        imagePlacements &&
                        imagePlacements.map((placement) => (
                            <Grid item xs={6} key={placement.id}>
                                <Card
                                    key={placement.id}
                                    sx={{
                                        ":hover": { 
                                            boxShadow: '-1px 10px 29px 0px rgba(0,0,0,0.8);', 
                                            cursor: 'pointer' 
                                        },
                                        boxShadow: selectedImagePlacement && selectedImagePlacement.id === placement.id ? '-1px 10px 29px 0px rgba(0,0,0,0.8);' : ''
                                    }}
                                    onClick={() => selectPlacement(placement)}
                                >
                                    {/* <CardMedia 
                                        component='img'
                                        image={}
                                        alt={placement.title}
                                    /> */}
                                    <CardContent>
                                        <Typography noWrap gutterBottom component="div">
                                            {placement.title}
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