import { useState } from 'react'
import { 
    Button,
    Card,
    CardContent,
    CardActions,
    Grid,
    Typography,
    Divider,
    List,
    ListItem,
    ListItemIcon,
    ListItemButton,
    ListItemText,
    Modal,
    CardMedia
  } from '@mui/material'
import TokenIcon from '@mui/icons-material/Token'
import CategoryIcon from '@mui/icons-material/Category'
import LogoutIcon from '@mui/icons-material/Logout'
import SettingsIcon from '@mui/icons-material/Settings'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet'
import { signIn, signOut, useSession } from 'next-auth/react'
import { useAccount, useConnect, useSignMessage, useDisconnect } from 'wagmi'
import { useRouter } from 'next/router'
import { useAuthRequestChallengeEvm } from "@moralisweb3/next";
import ProfileProducts from '@/components/ProfileProfucts/ProfileProfucts'
import ProfileNFTs from '@/components/ProfileNFTs/ProfileNFTs'
import ProfileSettings from '@/components/ProfileSettings/ProfileSettings'


  export default function Profile() {
    const { connectAsync } = useConnect();
    const { disconnectAsync } = useDisconnect();
    const { isConnected } = useAccount();
    const { signMessageAsync } = useSignMessage();
    const { requestChallengeAsync } = useAuthRequestChallengeEvm();
    const { data: session } = useSession()
    const { push, pathname } = useRouter();
    const [activeProfileComponent, setActiveProfileComponent] = useState('products')
    const [showWalletOptions, setShowWalletOptions] = useState(false)
    const profileActionOptions = [{text: 'Products', component: 'products'}, {text: 'NFTs', component: 'nfts'}]
    const profileManagementOptions = [{text: 'Settings', component: 'settings'}, {text: 'Sign Out', component: 'signOut'}]

    const handleAuth = async (wallet) => {
        if (isConnected) {
          await disconnectAsync();
        }
    
        const { account, chain } = await setWalletAccountAndChain(wallet)
    
        const { message } = await requestChallengeAsync({
          address: account,
          chainId: chain.id,
        });
    
        const signature = await signMessageAsync({ message });
    
        // redirect user after success authentication to '/user' page
        const { url } = await signIn("moralis-auth", {
          message,
          signature,
          redirect: false,
          callbackUrl: pathname,
        });
        /**
         * instead of using signIn(..., redirect: "/user")
         * we get the url from callback and push it to the router to avoid page refreshing
         */
        push(url);
    };

    const setWalletAccountAndChain = async (wallet) => {
    if(wallet === 'walletconnect') {
        const { account, chain } = await connectAsync({
            connector: new WalletConnectConnector({
                options: {
                    qrcode: true,
                },
            }),
        });
        return { account, chain }
    } else if (wallet === 'metamask') {
        const { account, chain } = await connectAsync({ connector: new MetaMaskConnector() })
        return { account, chain }

    } else if (wallet === 'coinbase') {
        const { account, chain } = await connectAsync({
        connector: new CoinbaseWalletConnector({
            options: {
            appName: 'nfm',
            },
        }),
        });
        return { account, chain }
    } else {
        const { account, chain } = await connectAsync({
        connector: new WalletConnectConnector({
            options: {
                qrcode: true,
            },
        }),
        });
        return { account, chain }
    }
    }

    const handleActionOption = (actionOption) => {
        setActiveProfileComponent(actionOption.component)
    }

    const handleManagementOption = (managementOption) => {
        if(managementOption.component === 'signOut') {
            signOut({ redirect: '/' })
            push('/')
        } else {
            setActiveProfileComponent(managementOption.component)
        }

    }

    const renderSwitch = (activeProfileComponent) => {
        switch(activeProfileComponent) {
            case 'products':
                return <ProfileProducts user={session.user.address} />
            case 'nfts':
                return <ProfileNFTs user={session.user.address} />
            case 'settings':
                return <ProfileSettings user={session.user.address} />
        }
    }

    const closeWalletModal = () => {
        setShowWalletOptions(false)
    }

    const signInCard = () => {
        return (
            <Grid 
                container 
                direction="row" 
                justifyContent="center" 
                alignContent="center"
                style={{ minHeight: "100vh" }}
            >
                <Grid item xs={6}>
                    <Card sx={{ borderRadius: '16px', top: '50%' }}>
                        <CardContent>
                            <Typography variant="h4" gutterBottom textAlign="center">
                                Connect wallet to view your Profile
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button onClick={() => setShowWalletOptions(true)}>Connect Wallet</Button>
                        </CardActions>
                    </Card>
                </Grid>
                <Modal
                    open={showWalletOptions}
                    onClose={closeWalletModal}
                >
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
                                    <Typography variant='h4' textAlign='center'>Choose Wallet to Connect</Typography>
                                    <Grid container direction='row'>
                                        <Grid item xs={4}>
                                            <Card 
                                                sx={{ margin: '15px', ":hover": { boxShadow: '-1px 10px 29px 0px rgba(0,0,0,0.8);', cursor: 'pointer' } }}
                                                onClick={() => handleAuth('metamask')}
                                            >
                                                <CardMedia 
                                                    sx={{ height: 350 }}
                                                    image="https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/MetaMask_Fox.svg/800px-MetaMask_Fox.svg.png"
                                                    title="MetaMask"
                                                />
                                                <CardContent>
                                                    <Typography textAlign='center'>Connect MetaMask Wallet</Typography>
                                                </CardContent>
                                            </Card>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <Card 
                                                sx={{ margin: '15px', ":hover": { boxShadow: '-1px 10px 29px 0px rgba(0,0,0,0.8);', cursor: 'pointer' } }}
                                                onClick={() => handleAuth('walletconnect')}
                                            >
                                                <CardMedia 
                                                    sx={{ height: 350 }}
                                                    image="https://1000logos.net/wp-content/uploads/2022/05/WalletConnect-Logo.jpg"
                                                    title="WalletConnect"
                                                />
                                                <CardContent>
                                                    <Typography textAlign='center'>Connect Using WalletConnect</Typography>
                                                </CardContent>
                                            </Card>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <Card 
                                                sx={{ margin: '15px', ":hover": { boxShadow: '-1px 10px 29px 0px rgba(0,0,0,0.8);', cursor: 'pointer' } }}
                                                onClick={() => handleAuth('coinbase')}
                                            >
                                                <CardMedia 
                                                    sx={{ height: 350 }}
                                                    image="https://play-lh.googleusercontent.com/PjoJoG27miSglVBXoXrxBSLveV6e3EeBPpNY55aiUUBM9Q1RCETKCOqdOkX2ZydqVf0"
                                                    title="Coinbase"
                                                />
                                                <CardContent>
                                                    <Typography textAlign='center'>Connect CoinbaseWallet</Typography>
                                                </CardContent>
                                            </Card>
                                        </Grid>

                                    </Grid>
                                </CardContent>
                                <CardActions>
                                    <Button onClick={() => setShowWalletOptions(false)}>Close</Button>
                                </CardActions>

                            </Card>
                        </Grid>

                    </Grid>

                </Modal>
            </Grid>
        )
    }

    const profilePage = () => {
        return (
            <Grid container direction='row'>
                <Grid item xs={2}>
                    <List>
                        {
                            profileActionOptions.map((actionOption) => (
                                <ListItem key={actionOption.component} disablePadding>
                                    <ListItemButton onClick={() => handleActionOption(actionOption)}>
                                        <ListItemIcon>
                                            { actionOption.component === 'nfts' ? <TokenIcon /> : <CategoryIcon /> }
                                        </ListItemIcon>
                                        <ListItemText primary={actionOption.text} />
                                    </ListItemButton>
                                </ListItem>
                            ))
                        }
                    </List>
                    <Divider />
                    <List>
                        {
                            profileManagementOptions.map((managementOption) => (
                                <ListItem key={managementOption.component} disablePadding>
                                    <ListItemButton onClick={() => handleManagementOption(managementOption)}>
                                        <ListItemIcon>
                                            { managementOption.component === 'settings' ? <SettingsIcon /> : <LogoutIcon /> }
                                        </ListItemIcon>
                                        <ListItemText primary={managementOption.text} />
                                    </ListItemButton>
                                </ListItem>
                            ))
                        }
                    </List>
                </Grid>
                <Grid item xs={10}>
                    {renderSwitch(activeProfileComponent)}
                </Grid>
            </Grid>
        )
    }



    return (
        <Grid container>
            {
                session ? (
                    profilePage()
                ) : (
                    signInCard()
                )
            }
        </Grid>
    )
  }