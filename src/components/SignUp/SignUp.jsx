import { useContext, useEffect, useState } from 'react';
import validator from 'validator'
import { useNavigate } from 'react-router-dom'
import { Box, TextField, Button, Stack, Link } from '@mui/material';
import { AuthContext } from '../../context/myContext.jsx'


export default function SignUpComponent({ setPagePassword }) {
    const navigate = useNavigate()
    const {name, setName, email, setEmail, alert, setAlert} = useContext(AuthContext)

    const handleSignup = async() => {

        if (!name) {
            return setAlert('Nome é um campo obrigátorio!')
        }
        if (!email) {
            return setAlert('Email é um campo obrigátorio!')
        }
        const validatorEmail = validator.isEmail(email)
        if (!validatorEmail) {
            return setAlert('O email, não é um endereço válido')
        }
        setPagePassword(true)
        setAlert('')

    }
    return (
        <Box
            component="form"
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                '& > :not(style)': {
                    m: 0,
                    width: '36.8rem',
                    height: '4.4rem',
                    position: 'relative',
                },
            }}
            autoComplete="off"
        >
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <label style={{ fontFamily: 'Nunito', color: '#344054', fontWeight: '500' }}>Nome*</label>
                <TextField
                    id="outlined-basic"
                    placeholder='Digite o seu nome'
                    variant="outlined"
                    type="text"
                    required
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    name="name"
                    InputProps={{
                        style: { fontSize: '1.6rem', color: '#343447', borderRadius: '.8rem', height: '4.5rem', width:'35.5rem' },
                    }}
                    InputLabelProps={{
                        style: { fontSize: '1.6rem', color: 'gray', transform: 'none', margin: '0', height: '4.5rem' , width:'35.5rem'},
                    }}
                />
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <label style={{ fontFamily: 'Nunito', color: '#344054', fontWeight: '500', marginTop: '3rem' }}>Email*</label>
                <TextField
                    id="outlined-basic"
                    placeholder='Digite o seu email'
                    variant="outlined"
                    type="text"
                    required
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    name="email"
                    InputProps={{
                        style: { fontSize: '1.6rem', color: '#343447', borderRadius: '.8rem', height: '4.5rem', width:'35.5rem' },
                    }}
                    InputLabelProps={{
                        style: { fontSize: '1.6rem', color: 'gray', transform: 'none', margin: '0', height: '4.5rem' , width:'35.5rem'},
                    }}
                />
            {alert && <span style={{ color: '#DA0175', width: '100%', left: '2rem', marginTop:'1rem'}}>{alert}</span>}
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
                        onClick={() => handleSignup()}
                        type='button'
                    >
                        Continuar
                    </Button>
                </Stack>
                <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Nunito', fontWeight: '500', marginTop:'3rem' }}>
                    Já tem uma conta? Faça seu <Link onClick={() => navigate('/')} sx={{
                        color: '#DA0175', textDecorationColor: '#DA0175', cursor: 'pointer', marginLeft: '1rem'
                    }}>Login</Link>
                </Box>
            </div>
        </Box>
    );
}
