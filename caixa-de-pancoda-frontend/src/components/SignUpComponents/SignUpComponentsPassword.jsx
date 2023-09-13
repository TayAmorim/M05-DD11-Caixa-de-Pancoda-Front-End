import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom'
import { Box, TextField, IconButton, Button, Stack, Link } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';


export default function SignUpComponentPassword({ setSucess }) {
    const navigate = useNavigate()
    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState('')
    const [alert, setAlert] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const handleTogglePassword = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    const handleSignup = async (event) => {
        event.preventDefault()

        if (!password) {
            setAlert('Senha é um campo obrigátorio')
            return
        }
        if(password.length < 6 ){
            setAlert('A senha precisa ter pelo menos 6 caracteres')
            return
        }
        if (!confirmPassword) {
            setAlert('Confirmar senha é um campo obrigatório')
            return
        }
        if (password !== confirmPassword) {
            setAlert('As senhas não são compativeis')
            return
        }
        setSucess(true)
        setTimeout(() => {
            navigate('/')
        }, 2000)
    }
    return (
        <Box
            component="form"
            onSubmit={handleSignup}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '3rem',
                '& > :not(style)': { m: 1, width: '36.8rem', height: '4.4rem', position: 'relative' },
            }}
            autoComplete="off"

        >
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <label style={{ fontFamily: 'Nunito', color: '#344054', fontWeight: '500' }}>Escolha uma senha*</label>
                <TextField id="outlined-basic" variant="outlined" placeholder='******' type={showPassword ? 'text' : 'password'} required
                    value={password} name='senha' onChange={(event) => setPassword(event.target.value)}
                    InputProps={{
                        style: { fontSize: '1.6rem', color: '#343447', borderRadius: '.8rem', height: '4.5rem', lineHeight: '2rem', width:'35.5rem' },
                        endAdornment: (
                            <IconButton aria-label="toggle password visibility" onClick={handleTogglePassword} edge="end"
                                sx={{ position: 'absolute', right: '1.5rem', top: '50%', transform: 'translateY(-50%)' }}
                            >
                                {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                            </IconButton>
                        ),
                    }}
                    InputLabelProps={{ style: { fontSize: '1.6rem', color: 'gray', transform: 'none', height: '4.5rem', lineHeight: '2rem', width:'35.5rem' }, }}
                />
            </Box>


            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <label style={{ fontFamily: 'Nunito', color: '#344054', fontWeight: '500', marginTop: '1rem' }}>Repita a senha*</label>
                <TextField id="outlined-basic" variant="outlined" placeholder='******' type={showPassword ? 'text' : 'password'} required
                    value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)}
                    InputProps={{
                        style: { fontSize: '1.6rem', color: '#343447', borderRadius: '.8rem', height: '4.5rem', lineHeight: '2rem', width:'35.5rem' },
                        endAdornment: (
                            <IconButton aria-label="toggle password visibility" onClick={handleTogglePassword} edge="end"
                                sx={{ position: 'absolute', right: '1.5rem', top: '50%', transform: 'translateY(-50%)', fontSize: '3rem' }}
                            >
                                {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                            </IconButton>
                        ),
                    }}
                    InputLabelProps={{ style: { fontSize: '1.6rem', color: 'gray', transform: 'none', height: '4.5rem', lineHeight: '2rem', width:'35.5rem' }, }}
                />
            {alert && <span style={{ color: '#DA0175', width: '100%', left: '2rem', marginTop:'1rem' }}>{alert}</span>}
            </Box>
            <div style={{ marginTop: '6rem' }}>
                <Stack sx={{ width: '100%', display: 'flex', justifyContent: 'center' }} direction="row" spacing={2}>
                    <Button
                        sx={{
                            width: '20rem',
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
                        Finalizar cadastro
                    </Button>
                </Stack>
                <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '3rem', fontFamily: 'Nunito', fontWeight: '500' }}>
                    Já tem uma conta? Faça seu <Link onClick={() => navigate('/')} sx={{
                        color: '#DA0175', textDecorationColor: '#DA0175', cursor: 'pointer', marginLeft: '1rem'
                    }}>Login</Link>
                </Box>
            </div>
        </Box>
    );
}
