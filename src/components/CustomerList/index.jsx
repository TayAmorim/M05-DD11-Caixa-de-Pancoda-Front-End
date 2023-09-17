import './style.css'
import { Avatar, Grid, Stack, Box, TextField, IconButton, Button } from "@mui/material";
import NavMenu from "../NavMenu";
import colors from "../../style/colors";
import SearchIcon from '@mui/icons-material/Search';
import clients from '../../assets/clients.svg'
import searchControler from '../../assets/customersSettings.svg'
import sortIconHeaders from '../../assets/sortIconHeaders.svg'
import addBilling from '../../assets/addBilling.svg'

export default function CustomerList({setOpenModalCustomer}) {
    const nameUser = localStorage.getItem('name').split(' ')
    let firstLetter = ''
    if (nameUser.length === 2 || nameUser.length > 2) {
      for (let name of nameUser) {
        firstLetter += name[0];
      }
    } else if (nameUser.length === 1  ) {
      firstLetter = nameUser[0][0];
    }
    return (
        <>
            <Grid item xs={11}>
                <Stack
                    direction="row"
                    spacing={1}
                    sx={{
                        padding: "5.4rem 5.4rem 2.4rem",
                        borderBottom: "1px solid" + colors.Green.light,
                    }}
                    justifyContent="space-between"
                >
                    <h1 style={{ fontSize: '1.6rem', color: '#0E8750', alignSelf: 'flex-end', marginBottom: '-2rem' }} >Clientes</h1>
                    <Stack direction="row" spacing={1} alignItems="center">
                        <Avatar
                            sx={{
                                bgcolor: colors.Grey.f,
                                color: colors.Green.normal,
                                fontSize: "2rem",
                                fontFamily: "Nunito"
                            }}
                        >
                            {firstLetter.slice(0, 2)}
                        </Avatar>
                        <NavMenu />
                    </Stack>
                </Stack>


                <div className='container-billingMain'>
                    <div className='billing-box-header'>
                        <div className='title-billing'>
                            <img src={clients} alt="Billins Icon" />
                            <h1>Clientes</h1>
                        </div>
                        <div className='search-box-users'>
                            <Stack sx={{ width: '100%', display: 'flex', justifyContent: 'center' }} direction="row" spacing={2}>
                                <Button
                                    sx={{
                                        width: '25rem',
                                        height: '3.5rem',
                                        borderRadius: '1rem',
                                        backgroundColor: '#DA0175',
                                        '&:hover': {
                                            backgroundColor: '#790342',
                                        },
                                        fontSize: '1.4rem'
                                    }}
                                    onClick={() => setOpenModalCustomer(true)}
                                    variant="contained"
                                    type='button'
                                >
                                    + Adicionar Cliente
                                </Button>
                            </Stack>
                            <img className='searchControlerIcon' src={searchControler} alt="Search controller Icon" />
                            <div className='set-search-input-img'>
                                <Box>
                                    <TextField id="outlined-basic" label="Pesquisa" variant="outlined" type="text"
                                        name='senha'
                                        InputProps={{
                                            style: { fontSize: '1.6rem', color: '#343447', borderRadius: '.8rem', backgroundColor: '#fff', width: '30rem', height: '3.8rem', lineHeight: '1.8rem' },
                                            endAdornment: (
                                                <IconButton aria-label="toggle password visibility" edge="end"
                                                    sx={{ position: 'absolute', right: '1.5rem', top: '50%', transform: 'translateY(-50%)' }}
                                                >
                                                    <SearchIcon style={{ fontSize: '3rem' }} />
                                                </IconButton>
                                            ),
                                        }}
                                        InputLabelProps={{ style: { fontSize: '1.6rem', color: 'gray', width: '30rem', height: '3.8rem', lineHeight: '1.3rem' }, }}
                                    />
                                </Box>
                            </div>
                        </div>
                    </div>
                    <div className='box-table-billings'>
                        <div className='table-header-customer'>
                            <ul>
                                <li><img src={sortIconHeaders} alt="Sort Icon" />Cliente</li>
                                <li>CPF</li>
                                <li>E-mail</li>
                                <li>Telefone</li>
                                <li>Status</li>
                                <li>Criar Cobrança</li>
                            </ul>
                        </div>
                        <div className='body-table-customer'>
                            <ul>
                                <li>Sara da Silva</li>
                                <li>054 365 255 87</li>
                                <li>sarasilva@cubos.io</li>
                                <li>71 9 9462 8654</li>
                                <li className='expired-client'>Inadimplente</li>
                                <li><img src={addBilling} alt="Add Billing Icon" /></li>
                            </ul>

                            <ul>
                                <li>Cameron Williamson</li>
                                <li>054 365 255 87</li>
                                <li>cameronw@cubos.io</li>
                                <li>71 9 9462 8654</li>
                                <li className='expired-client'>Inadimplente</li>
                                <li><img src={addBilling} alt="Add Billing Icon" /></li>
                            </ul>

                            <ul>
                                <li>Savannah Nguyen</li>
                                <li>054 365 255 87</li>
                                <li>snguyen@cubos.io</li>
                                <li>71 9 9462 8654</li>
                                <li className='expired-client'>Inadimplente</li>
                                <li><img src={addBilling} alt="Add Billing Icon" /></li>
                            </ul>

                            <ul>
                                <li>Darlene Robertson</li>
                                <li>054 365 255 87</li>
                                <li>darlener@cubos.io</li>
                                <li>71 9 9462 8654</li>
                                <li className='expired-client'>Inadimplente</li>
                                <li><img src={addBilling} alt="Add Billing Icon" /></li>
                            </ul>

                            <ul>
                                <li>Marvin McKinney</li>
                                <li>054 365 255 87</li>
                                <li>marvinm@cubos.io</li>
                                <li>71 9 9462 8654</li>
                                <li className='expired-client'>Inadimplente</li>
                                <li><img src={addBilling} alt="Add Billing Icon" /></li>
                            </ul>

                            <ul>
                                <li>Sandra dos Santos</li>
                                <li>054 365 255 87</li>
                                <li>sandrasantos@cubos.io</li>
                                <li>71 9 9462 8654</li>
                                <li className='expired-client'>Inadimplente</li>
                                <li><img src={addBilling} alt="Add Billing Icon" /></li>
                            </ul>

                            <ul>
                                <li>Cameron Williamson</li>
                                <li>054 365 255 87</li>
                                <li>cameronw@cubos.io</li>
                                <li>71 9 9462 8654</li>
                                <li className='up-to-date-client'>Em dia</li>
                                <li><img src={addBilling} alt="Add Billing Icon" /></li>
                            </ul>

                            <ul>
                                <li>Savannah Nguyen</li>
                                <li>054 365 255 87</li>
                                <li>snguyen@cubos.io</li>
                                <li>71 9 9462 8654</li>
                                <li className='up-to-date-client'>Em dia</li>
                                <li><img src={addBilling} alt="Add Billing Icon" /></li>
                            </ul>

                            <ul>
                                <li>Darlene Robertson</li>
                                <li>054 365 255 87</li>
                                <li>darlener@cubos.io</li>
                                <li>71 9 9462 8654</li>
                                <li className='up-to-date-client'>Em dia</li>
                                <li><img src={addBilling} alt="Add Billing Icon" /></li>
                            </ul>

                            <ul>
                                <li>Marvin McKinney</li>
                                <li>054 365 255 87</li>
                                <li>marvinm@cubos.io</li>
                                <li>71 9 9462 8654</li>
                                <li className='up-to-date-client'>Em dia</li>
                                <li><img src={addBilling} alt="Add Billing Icon" /></li>
                            </ul>


                        </div>
                    </div>
                </div>
            </Grid>
        </>
    )
}