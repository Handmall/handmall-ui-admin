import LockPersonIcon from '@mui/icons-material/LockPerson';
import Copyright from "../../components/Copyright";
import { Avatar, Box, Button, Container, Grid, Link, TextField, Typography } from "@mui/material"
import { useForm, Controller, SubmitHandler } from 'react-hook-form';

const Login = () => {

    const { handleSubmit, control } = useForm({
        defaultValues: {
            username: '',
            password: ''
        }
    })

    const onSubmit: SubmitHandler<LoginRequest> = data => {
        console.log(data)
    }

    return (
        <>
            <Container component="main" maxWidth="xs">
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center'
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
                        <LockPersonIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box component="form" noValidate sx={{ mt: 1 }}>
                        <form>
                            <Controller 
                                name="username"
                                control={control}
                                render={({ field }) => 
                                    <TextField 
                                        margin="normal"
                                        required
                                        fullWidth 
                                        {...field}
                                    />
                            }
                            />
                            <Controller 
                                name="password"
                                control={control}
                                render={({ field }) => 
                                    <TextField 
                                        margin="normal"
                                        required
                                        fullWidth 
                                        type="password"
                                        {...field}
                                    />
                            }
                            />
                            <Button
                                type="submit"
                                onClick={handleSubmit(onSubmit)}
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Sign In
                            </Button>
                        </form>

                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="#" variant="body2">
                                    Don't have an account?
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
            <Copyright />
        </>
    )
}

export default Login