import './index.css';
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
import InputMask from 'react-input-mask';

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

export default function modalEditUser({ setOpenModalEditUser}) {
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

    const handlePhoneChange = (event) => {
        setPhone(event.target.value);
    };

    const handleCpfChange = (event) => {
        setCpf(event.target.value);
    };

    return (
        <div className='container-modalEditUser'>
            <div className='box-modalEditUser'>
                <div className='closeIcon-box'>
                    <img onClick={() => setOpenModalEditUser(false)} src={closeIcon} alt="Close Icon" />
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
                            onChange={() => setName()}
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
                            placeholder='Digite o seu e-mail'
                            onChange={() => setEmail()} />

                    </FormControl>



                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '1rem',
                        '& > :not(style)': { width: '100%', height: '4.4rem', position: 'relative' },
                    }}>
                        <FormControl variant="standard">
                            <InputLabel shrink htmlFor="bootstrap-input" style={{ fontSize: '20px' }}>
                                Cpf
                            </InputLabel>
                            <InputMask
                                mask="999.999.999-99"
                                value={cpf}
                                onChange={handleCpfChange}
                            >
                                {() => (
                                    <BootstrapInput
                                        id="bootstrap-input"
                                        name='cpf'
                                        type='tel'
                                        placeholder='Digite o seu cpf'
                                    />
                                )}
                            </InputMask>
                        </FormControl>

                        <FormControl variant="standard">
                            <InputLabel shrink htmlFor="bootstrap-input" style={{ fontSize: '20px' }}>
                                Telefone
                            </InputLabel>
                            <InputMask
                                mask="(99) 99999-9999"
                                value={phone}
                                onChange={handlePhoneChange}
                            >
                                {() => (
                                    <BootstrapInput
                                        id="bootstrap-input"
                                        name='phone'
                                        type='tel'
                                        placeholder='Digite o seu telefone'
                                    />
                                )}
                            </InputMask>
                        </FormControl>

                    </Box>

                    <FormControl variant="standard" >
                        <InputLabel shrink htmlFor="bootstrap-input"
                            style={{ fontSize: '20px' }}
                            type='text' required
                            value={newPassword}
                            name='newPassword'
                            onChange={() => setNewPassword()}>
                            Nova senha
                        </InputLabel>
                        <BootstrapInput id="bootstrap-input"
                            endAdornment={<InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                    sx={{ position: 'absolute', right: '2rem', top: '3.2rem', transform: 'translateY(-50%)' }}
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
                            value={confirmNewPassword} name='confirmNewPassword'
                            onChange={() => setNewPassword()}>
                            Confirmação senha
                        </InputLabel>
                        <BootstrapInput id="bootstrap-input"
                            endAdornment={<InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                    sx={{ position: 'absolute', right: '2rem', top: '3.2rem', transform: 'translateY(-50%)' }}
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
        </div >
    )
}

