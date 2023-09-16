import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom'
import api from '../../api/api'
import { Box, TextField, IconButton, Button, Stack, Link } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { AuthContext } from '../../context/myContext.jsx'
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

export default function formLogin() {
    const navigate = useNavigate()
    const [showPassword, setShowPassword] = useState(false);
    const { email, setEmail, password, setPassword, alert, setAlert } = useContext(AuthContext)

    const handleTogglePassword = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    const handleLogin = async (event) => {
        event.preventDefault()
        if (!email) {
            setAlert('Email é um campo obrigátorio')
            return
        }
        if (!password) {
            setAlert('Senha é um campo obrigatório')
            return
        }
        try {
            const response = await api.post('/login', { email, password })
            localStorage.setItem('token', response.data.token)
            setAlert(String(response.data.mensagem));
            navigate('/')

            toast.success('Login efetuado com sucesso!', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                });

        } catch (error) {
            toast.error('Ops! Algo deu errado!', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                });
            setAlert(String(error.response.data.mensagem));
        }
    }

    return (
        <Box
            onSubmit={handleLogin}
            component="form"
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                '& > :not(style)': { m: 3, width: '36.8rem', height: '4.4rem', position: 'relative' },
            }}
            autoComplete="off"
        >
            <Box  sx={{ display: 'flex', flexDirection: 'column' }}>
                <label style={{ fontFamily: 'Nunito', color: '#344054', fontWeight: '500' }}>Email*</label>
                <TextField id="outlined-basic" variant="outlined" type='email' placeholder='Digite o seu email'
                    value={email} name='email' onChange={(event) => setEmail(event.target.value)}
                    InputProps={{ style: { fontSize: '1.6rem', color: '#343447', borderRadius: '.8rem', width:'35.5rem', height: '4.5rem' }, }}
                    InputLabelProps={{ style: { fontSize: '1.6rem', color: 'gray', transform: 'none', width:'35.5rem',height: '4.5rem' }, }}
                />
            </Box>
            <div style={{marginBottom:'-4.5rem', marginTop:'0rem', paddingRight:'2rem', display:'flex', alignItems:'center', justifyContent:'flex-end' }}>
            <Link sx={{
                 marginLeft:'2rem', color: '#DA0175', textDecorationColor: '#DA0175', display: 'flex', justifyContent: 'flex-end', cursor: 'pointer'
            }}>Esqueceu sua senha?
            </Link>
            </div>
            <Box  sx={{ display: 'flex', flexDirection: 'column' }}>
                <label style={{ fontFamily: 'Nunito', color: '#344054', fontWeight: '500' }}>Senha*</label>
                <TextField id="outlined-basic" variant="outlined" type={showPassword ? 'text' : 'password'} placeholder='Digite sua senha'
                    value={password} name='password' onChange={(event) => setPassword(event.target.value)}
                    InputProps={{
                        style: { fontSize: '1.6rem', color: '#343447', borderRadius: '.8rem', width:'35.5rem', height: '4.5rem' },
                        endAdornment: (
                            <IconButton aria-label="toggle password visibility" onClick={handleTogglePassword} edge="end"
                                sx={{ position: 'absolute', right: '1.5rem', top: '50%', transform: 'translateY(-50%)' }}
                            >
                                {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                            </IconButton>
                        ),
                    }}
                    InputLabelProps={{ style: { fontSize: '1.6rem', color: 'gray', transform: 'none', width:'35.5rem', height: '4.5rem' }, }}
                />
            {alert && <span style={{ color: '#DA0175', width: '100%', left: '2rem', marginTop: '2rem' }}>{alert}</span>}
            </Box>
            
            <div style={{marginTop: '8rem'}}>
            <Stack sx={{ width: '100%', display: 'flex', justifyContent: 'center' }} direction="row" spacing={2}>
                <Button
                    sx={{
                        width: '16rem',
                        height: '4.4rem',
                        borderRadius: '.8rem',
                        backgroundColor: '#DA0175',
                        '&:hover': {
                            backgroundColor: '#790342',
                        },
                        fontSize: '1.4rem'
                    }}
                    variant="contained"
                    type='submit'
                >
                    Entrar
                </Button>
            </Stack>
            </div>
            <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight:'500' }}>
                Ainda não possui conta? <Link onClick={() => navigate('/sign-up')} sx={{
                    color: '#DA0175', textDecorationColor: '#DA0175', cursor: 'pointer', marginLeft: '1rem'
                }}>Clique aqui</Link>
            </Box>
        </Box>
    );
}
