import { 
    Grid,
    Typography,
    Card,
    CardMedia,
    CardContent
  } from '@mui/material'

export default function CreateProductBaseProducts(props) {
    const { 
        baseProducts, 
        setSelectedBaseProduct, 
        setImagePlacements, 
        selectedBaseProduct,
        setCanGoToNextStep,
        setMerchName
    } = props

    const selectProduct = (product) => {
        setSelectedBaseProduct(product)
        setMerchName(product.title)
        const { file_placement_options } = product
        setImagePlacements(file_placement_options)
        setCanGoToNextStep(true)
    }

    return (
        <Grid container direction="row">
            <Grid item xs={12}>
                <Typography variant="h4">T-Shirts</Typography>
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
                        baseProducts &&
                        baseProducts.TSHIRTS.map((tshirt) => (
                            <Grid item xs={3} key={tshirt.id}>
                                <Card 
                                    key={tshirt.id}
                                    sx={{ 
                                        ":hover": { 
                                            boxShadow: '-1px 10px 29px 0px rgba(0,0,0,0.8);', 
                                            cursor: 'pointer' 
                                        },
                                        boxShadow: selectedBaseProduct && selectedBaseProduct.id === tshirt.id ? '-1px 10px 29px 0px rgba(0,0,0,0.8);' : ''
                                    }}
                                    onClick={() => selectProduct(tshirt)} 
                                >
                                    <CardMedia 
                                        component='img'
                                        image={tshirt.image}
                                        alt={tshirt.title}
                                    />
                                    <CardContent>
                                        <Typography noWrap gutterBottom component="div">
                                            {tshirt.title}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))
                    }
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Typography variant="h4">Sweatshirts</Typography>
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
                        baseProducts &&
                        baseProducts.SWEATSHIRTS.map((sweatshirt) => (
                            <Grid item xs={3} key={sweatshirt.id}>
                                <Card 
                                    key={sweatshirt.id} 
                                    sx={{ 
                                        ":hover": { 
                                            boxShadow: '-1px 10px 29px 0px rgba(0,0,0,0.8);', 
                                            cursor: 'pointer' 
                                        },
                                        boxShadow: selectedBaseProduct && selectedBaseProduct.id === sweatshirt.id ? '-1px 10px 29px 0px rgba(0,0,0,0.8);' : ''
                                    }}
                                    onClick={() => selectProduct(sweatshirt)} 
                                >
                                    <CardMedia 
                                        component='img'
                                        image={sweatshirt.image}
                                        alt={sweatshirt.title}
                                    />
                                    <CardContent>
                                        <Typography noWrap gutterBottom component="div">
                                            {sweatshirt.title}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))
                    }
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Typography variant="h4">Hoodies</Typography>
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
                        baseProducts &&
                        baseProducts.HOODIES.map((hoodie) => (
                            <Grid item xs={3} key={hoodie.id}>
                                <Card 
                                    key={hoodie.id} 
                                    sx={{ 
                                        ":hover": { 
                                            boxShadow: '-1px 10px 29px 0px rgba(0,0,0,0.8);', 
                                            cursor: 'pointer' 
                                        },
                                        boxShadow: selectedBaseProduct && selectedBaseProduct.id === hoodie.id ? '-1px 10px 29px 0px rgba(0,0,0,0.8);' : ''
                                    }}
                                    onClick={() => selectProduct(hoodie)} 
                                >
                                    <CardMedia 
                                        component='img'
                                        image={hoodie.image}
                                        alt={hoodie.title}
                                    />
                                    <CardContent>
                                        <Typography noWrap gutterBottom component="div">
                                            {hoodie.title}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))
                    }
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Typography variant="h4">Pants</Typography>
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
                        baseProducts &&
                        baseProducts.PANTS.map((pants) => (
                            <Grid item xs={3} key={pants.id}>
                                <Card 
                                    key={pants.id} 
                                    sx={{ 
                                        ":hover": { 
                                            boxShadow: '-1px 10px 29px 0px rgba(0,0,0,0.8);', 
                                            cursor: 'pointer' 
                                        },
                                        boxShadow: selectedBaseProduct && selectedBaseProduct.id === pants.id ? '-1px 10px 29px 0px rgba(0,0,0,0.8);' : ''
                                    }}
                                    onClick={() => selectProduct(pants)} 
                                >
                                    <CardMedia 
                                        component='img'
                                        image={pants.image}
                                        alt={pants.title}
                                    />
                                    <CardContent>
                                        <Typography noWrap gutterBottom component="div">
                                            {pants.title}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))
                    }
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Typography variant="h4">Shorts</Typography>
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
                        baseProducts &&
                        baseProducts.SHORTS.map((shorts) => (
                            <Grid item xs={3} key={shorts.id}>
                                <Card 
                                    key={shorts.id}
                                    sx={{ 
                                        ":hover": { 
                                            boxShadow: '-1px 10px 29px 0px rgba(0,0,0,0.8);', 
                                            cursor: 'pointer' 
                                        },
                                        boxShadow: selectedBaseProduct && selectedBaseProduct.id === shorts.id ? '-1px 10px 29px 0px rgba(0,0,0,0.8);' : ''
                                    }}
                                    onClick={() => selectProduct(shorts)}  
                                >
                                    <CardMedia 
                                        component='img'
                                        image={shorts.image}
                                        alt={shorts.title}
                                    />
                                    <CardContent>
                                        <Typography noWrap gutterBottom component="div">
                                            {shorts.title}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))
                    }
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Typography variant="h4">Cases</Typography>
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
                        baseProducts &&
                        baseProducts.CASES.map((cases) => (
                            <Grid item xs={3} key={cases.id}>
                                <Card 
                                    key={cases.id}
                                    sx={{ 
                                        ":hover": { 
                                            boxShadow: '-1px 10px 29px 0px rgba(0,0,0,0.8);', 
                                            cursor: 'pointer' 
                                        },
                                        boxShadow: selectedBaseProduct && selectedBaseProduct.id === cases.id ? '-1px 10px 29px 0px rgba(0,0,0,0.8);' : ''
                                    }}
                                    onClick={() => selectProduct(cases)}  
                                >
                                    <CardMedia 
                                        component='img'
                                        image={cases.image}
                                        alt={cases.title}
                                    />
                                    <CardContent>
                                        <Typography noWrap gutterBottom component="div">
                                            {cases.title}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))
                    }
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Typography variant="h4">Pillows</Typography>
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
                        baseProducts &&
                        baseProducts.PILLOWS.map((pillow) => (
                            <Grid item xs={3} key={pillow.id}>
                                <Card 
                                    key={pillow.id} 
                                    sx={{ 
                                        ":hover": { 
                                            boxShadow: '-1px 10px 29px 0px rgba(0,0,0,0.8);', 
                                            cursor: 'pointer' 
                                        },
                                        boxShadow: selectedBaseProduct && selectedBaseProduct.id === pillow.id ? '-1px 10px 29px 0px rgba(0,0,0,0.8);' : ''
                                    }}
                                    onClick={() => selectProduct(pillow)} 
                                >
                                    <CardMedia 
                                        component='img'
                                        image={pillow.image}
                                        alt={pillow.title}
                                    />
                                    <CardContent>
                                        <Typography noWrap gutterBottom component="div">
                                            {pillow.title}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))
                    }
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Typography variant="h4">Prints</Typography>
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
                        baseProducts &&
                        baseProducts.PRINTS.map((print) => (
                            <Grid item xs={3} key={print.id}>
                                <Card 
                                    key={print.id} 
                                    sx={{ 
                                        ":hover": { 
                                            boxShadow: '-1px 10px 29px 0px rgba(0,0,0,0.8);', 
                                            cursor: 'pointer' 
                                        },
                                        boxShadow: selectedBaseProduct && selectedBaseProduct.id === print.id ? '-1px 10px 29px 0px rgba(0,0,0,0.8);' : ''
                                    }}
                                    onClick={() => selectProduct(print)} 
                                >
                                    <CardMedia 
                                        component='img'
                                        image={print.image}
                                        alt={print.title}
                                    />
                                    <CardContent>
                                        <Typography noWrap gutterBottom component="div">
                                            {print.title}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))
                    }
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Typography variant="h4">Bags</Typography>
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
                        baseProducts &&
                        baseProducts.BAGS.map((bag) => (
                            <Grid item xs={3} key={bag.id}>
                                <Card 
                                    key={bag.id} 
                                    sx={{ 
                                        ":hover": { 
                                            boxShadow: '-1px 10px 29px 0px rgba(0,0,0,0.8);', 
                                            cursor: 'pointer' 
                                        },
                                        boxShadow: selectedBaseProduct && selectedBaseProduct.id === bag.id ? '-1px 10px 29px 0px rgba(0,0,0,0.8);' : ''
                                    }}
                                    onClick={() => selectProduct(bag)} 
                                >
                                    <CardMedia 
                                        component='img'
                                        image={bag.image}
                                        alt={bag.title}
                                    />
                                    <CardContent>
                                        <Typography noWrap gutterBottom component="div">
                                            {bag.title}
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