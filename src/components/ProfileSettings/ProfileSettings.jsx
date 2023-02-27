import { 
    Grid,
    Typography
  } from '@mui/material';


  export default function ProfileSettings(props) {
    const { user } = props
    return (
        <Grid container direction="row">
            <Grid item xs={12}>
                <Typography variant="h3">Settings</Typography>
            </Grid>
        </Grid>
    )
  }