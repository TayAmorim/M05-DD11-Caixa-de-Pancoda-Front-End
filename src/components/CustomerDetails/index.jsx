import './styles.css'
import {
    Avatar,
    Grid,
    Stack,
    Box,
    TextField,
    IconButton,
    Button,
} from "@mui/material";
import NavMenu from "../NavMenu";
import colors from "../../style/colors";
import clients from "../../assets/clients.svg";
import editIcon2 from "../../assets/editicon2.svg";

export default function CustomerDetails() {
    const userStorage = JSON.parse(localStorage.getItem("user"));
    const nameUser = userStorage.name;
    const words = nameUser.split(' ');
    const firstLetters = [];

    for (let i = 0; i < 2; i++) {
        if (words[i] && words[i].length > 0) {
            const first = words[i][0];
            firstLetters.push(first);
        }
    }

    const clientData = {
        "name_client": "Jose Silva",
        "cpf_client": "88051533461",
        "email_client": "josesilva@email.com",
        "phone_client": "1234567890",
        "address_complete": {
            "address": "rua sem nome",
            "complement": "Grand Line",
            "neighborhood": "Barra de Jangada",
            "city": "São Paulo",
            "state": "São Paulo",
            "zip_code": "28360000"
        },
        "charges": [
            {
                "id_charges": "1",
                "description ": "lorem ipsum, lorem ipsum, lorem ipsum, lorem ipsum",
                "due_date": "12/05/23",
                "amount": "5000",
                "status": true
            },
            {
                "id_charges": "2",
                "description ": "lorem ipsum, lorem ipsum, lorem ipsum, lorem ipsum",
                "due_date": "12/05/23",
                "amount": "3000",
                "status": false
            }
        ]
    }

    return (
        <>
            <Grid item xs={11} sx={{ border: '1px solid red' }}>
                <Stack
                    direction="row"
                    spacing={1}
                    sx={{
                        padding: "5.4rem 5.4rem 2.4rem",
                        borderBottom: "1px solid" + colors.Green.light,
                        marginLeft: '1rem'
                    }}
                    justifyContent="space-between"
                >
                    <Stack
                        direction="row"
                        spacing={1}
                        sx={{

                            gap: '1rem'
                        }}
                        justifyContent="space-between"
                    >
                        <h1
                            style={{
                                fontSize: "1.6rem",
                                color: "#0E8750",
                                alignSelf: "flex-end",
                                marginBottom: "-2rem",
                            }}
                        >
                            Clientes
                        </h1>
                        <h1
                            style={{
                                fontSize: "1.6rem",
                                color: "#0E8750",
                                alignSelf: "flex-end",
                                marginBottom: "-2rem",
                            }}
                        >
                    >
                        </h1>
                        <h1
                            style={{
                                fontSize: "1.6rem",
                                color: "#747488",
                                alignSelf: "flex-end",
                                marginBottom: "-2rem",
                            }}
                        >
                            Detalhes do cliente
                        </h1>
                    </Stack>
                    <Stack direction="row" spacing={1} alignItems="center">
                        <Avatar
                            sx={{
                                bgcolor: colors.Grey.f,
                                color: colors.Green.normal,
                                fontSize: "2rem",
                                fontFamily: "Nunito",
                            }}
                        >
                            {firstLetters}
                        </Avatar>
                        <NavMenu />
                    </Stack>
                </Stack>

            </Grid>
            <Grid item xs={10} sx={{
                border: '1px solid red',
                marginLeft: "11.8rem"
            }}>
                <Stack direction="row"
                    spacing={2}
                    sx={{
                        padding: "3rem 3rem 1rem",
                        justifyContent: "left",
                        marginLeft: "2.5rem"
                    }}
                >

                    <img src={clients} alt="" />
                    <h1>{clientData.name_client}</h1>

                </Stack>
            </Grid>


            <Stack direction="row"
                sx={{
                    padding: "3rem 3rem 1rem",
                    marginLeft: "15.3rem"
                }}
                justifyContent="space-between"
            >
                <h3>Dados do cliente </h3>
                <Button
                    sx={{
                        width: "20rem",
                        height: "3.5rem",
                        borderRadius: "1rem",
                        backgroundColor: "#F8F8F9",
                        color: "#0E8750",
                        marginLeft: "70.3rem",
                        "&:hover": {
                            backgroundColor: "#0E8000",
                            color: "#F8F8F9"
                        },
                        fontSize: "1.4rem",
                    }}
                    variant="contained"
                    type="button"
                >
                    <img src={editIcon2} alt="" /> Editar Cliente
                </Button>
            </Stack>
            <Stack direction={'column'}
                sx={{
                    paddingTop: "2rem",
                    gap: "1rem",
                    marginLeft: '18.3rem'
                }}>
                <div className='first-client-data-row'>
                    <div>
                        <h5>E-Mail</h5>
                        <p>{clientData.email_client}</p>
                    </div>
                    <div>
                        <h5>Telefone</h5>
                        <p>{clientData.phone_client}</p>
                    </div>
                    <div>
                        <h5>CPF</h5>
                        <p>{clientData.cpf_client}</p>
                    </div>
                </div>

                <div className='second-client-data-row'>
                    <div>
                        <h5>Endereço</h5>
                        <p>{clientData.address_complete.address}</p>
                    </div>
                    <div>
                        <h5>Bairro</h5>
                        <p>{clientData.address_complete.neighborhood}</p>
                    </div>
                    <div>
                        <h5>Complemento</h5>
                        <p>{clientData.address_complete.complement}</p>
                    </div>
                    <div>
                        <h5>CEP</h5>
                        <p>{clientData.address_complete.zip_code}</p>
                    </div>
                    <div>
                        <h5>Cidade</h5>
                        <p>{clientData.address_complete.city}</p>
                    </div>
                    <div>
                        <h5>UF</h5>
                        <p>{clientData.address_complete.state}</p>
                    </div>
                </div>
            </Stack>

            <Stack direction="row"
                sx={{
                    padding: "3rem 3rem 1rem",
                    marginLeft: "15.3rem",
                    marginTop: "3rem"
                }}
                justifyContent="space-between"
            >
                <h3>Cobranças do Cliente </h3>
                <Button
                    sx={{
                        marginLeft: "66.3rem",
                        width: "20rem",
                        height: "3.5rem",
                        borderRadius: "1rem",
                        backgroundColor: "#DA0175",
                        "&:hover": {
                            backgroundColor: "#790342",
                        },
                        fontSize: "1.4rem",
                    }}
                    variant="contained"
                    type="button"
                >
                    + Nova cobrança
                </Button>
            </Stack>





        </>
    );
}