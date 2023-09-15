import './modalEditUser.css';
import { useContext, useState, useEffect } from 'react';
import closeIcon from '../../assets/closeIcon.svg'
import { Box, Button, Stack, IconButton } from '@mui/material';
import api from '../../api/api';
import { alpha, styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const BootstrapInput = styled(InputBase)(({ theme }) => ({
    'label + &': {
        top: '8px'

    },
    '& .MuiInputBase-input': {
        borderRadius: 4,
        position: 'relative',
        backgroundColor: theme.palette.mode === 'light' ? '#F3F6F9' : '#1A2027',
        border: '1px solid',
        borderColor: theme.palette.mode === 'light' ? '#E0E3E7' : '#2D3843',
        fontSize: 16,
        width: '150',
        padding: '10px 12px',
        top: '10px',
        transition: theme.transitions.create([
            'border-color',
            'background-color',
            'box-shadow',
        ]),
        // Use the system font instead of the default Roboto font.
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
        '&:focus': {
            boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
            borderColor: theme.palette.primary.main,
        },
    },
}));

export default function modalEditUser({ setOpenModaEditUser, openModalEditUser, shareData }) {
    const [showPassword, setShowPassword] = useState(false);
    const [alert, setAlert] = useState('')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [cpf, setCpf] = useState('')
    const [phone, setPhone] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmNewPassword, setConfirmNewPassword] = useState('')

    const handleClickShowPassword = () => setShowPassword(!showPassword);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <div className='container-modalEditUser'>
            <div className='box-modalEditUser'>
                <div className='closeIcon-box'>
                    <img onClick={() => setOpenModaEditUser(false)} src={closeIcon} alt="Close Icon" />
                </div>
                <h1>Edite o seu cadastro</h1>

                <Box
                    component="form"
                    sx={{
                        outline: 'red',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '3rem',
                        '& > :not(style)': { m: 0, width: '36.8rem', height: '4.4rem', position: 'relative' },
                    }}
                    autoComplete="off"
                >
                    <FormControl variant="standard" >
                        <InputLabel shrink htmlFor="bootstrap-input"
                            style={{ fontSize: '20px' }}
                            type='text' required
                        >
                            Nome
                        </InputLabel>
                        <BootstrapInput defaultValue={name}
                            id="bootstrap-input"
                            placeholder='Digite o seu nome'
                            value={name}
                            name='nome' />
                    </FormControl>
                    <FormControl variant="standard" >
                        <InputLabel shrink htmlFor="bootstrap-input"
                            style={{ fontSize: '20px' }}
                            type='text' required

                        >
                            Email
                        </InputLabel>
                        <BootstrapInput
                            id="bootstrap-input"
                            value={email}
                            name='email'
                            placeholder='Digite o seu e-mail' />
                    </FormControl>



                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '1rem',
                        '& > :not(style)': { width: '100%', height: '4.4rem', position: 'relative' },
                    }}>

                        <FormControl variant="standard" >
                            <InputLabel shrink htmlFor="bootstrap-input"
                                style={{ fontSize: '20px' }}
                                type='text' required
                            >
                                CPF
                            </InputLabel>
                            <BootstrapInput id="bootstrap-input"
                                value={cpf}
                                name='cpf'
                                placeholder='Digite o seu CPF' />
                        </FormControl>
                        <FormControl variant="standard" >
                            <InputLabel shrink htmlFor="bootstrap-input"
                                style={{ fontSize: '20px' }}
                                type='text' required
                                value={email} name='email'>
                                Telefone
                            </InputLabel>
                            <BootstrapInput id="bootstrap-input"
                                value={phone}
                                name='phone'
                                placeholder='Digite o seu telefone' />
                        </FormControl>

                    </Box>

                    <FormControl variant="standard" >
                        <InputLabel shrink htmlFor="bootstrap-input"
                            style={{ fontSize: '20px' }}
                            type='text' required
                            value={newPassword}
                            name='newPassword'
                            placeholder>
                            Nova senha
                        </InputLabel>
                        <BootstrapInput id="bootstrap-input"
                            endAdornment={<InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>}
                            type={showPassword ? 'text' : 'password'}
                        />
                    </FormControl>

                    <FormControl variant="standard" >
                        <InputLabel shrink htmlFor="bootstrap-input"
                            style={{ fontSize: '20px' }}
                            type='text' required
                            value={confirmNewPassword} name='confirmNewPassword'>
                            Confirmação senha
                        </InputLabel>
                        <BootstrapInput id="bootstrap-input"
                            endAdornment={<InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>}
                            type={showPassword ? 'text' : 'password'}
                        />
                    </FormControl>

                    {alert && <span>{alert}</span>}

                    <Stack sx={{ width: '100%', display: 'flex', justifyContent: 'center', margin: '3rem', }} direction="row" spacing={2}>
                        <Button
                            sx={{
                                width: '16rem',
                                height: '4rem',
                                borderRadius: '.8rem',
                                backgroundColor: '#DA0175',
                                '&:hover': {
                                    backgroundColor: '#790342',
                                },
                                fontSize: '1.4rem'
                            }}
                            variant="contained"
                            type='button'
                        >
                            Atualizar
                        </Button>
                    </Stack>
                </Box>
            </div>
        </div>
    )
}

