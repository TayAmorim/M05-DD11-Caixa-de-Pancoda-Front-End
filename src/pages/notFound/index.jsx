import './index.css'
import alertIcon from '../../assets/alert.svg'
import { Button, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
 
export default function notFoundPage(){
    const navigate = useNavigate()
    return(
        <div className='container-notFound'>
            <div className='box-notFound'>
                <img src={alertIcon} alt="Alert Icon" />
                <h1>Página não encontrada!</h1>
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
                    onClick={() => navigate('/')}
                    variant="contained"
                    type='button'
                >
                    Ir para login
                </Button>
            </Stack>
            </div>
            </div>
        </div>
    )
}