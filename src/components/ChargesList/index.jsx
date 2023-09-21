import "./style.css";
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
import SearchIcon from "@mui/icons-material/Search";
import chargeIcon from "../../assets/billingsIcon.svg";
import searchControler from "../../assets/customersSettings.svg";
import sortIconHeaders from "../../assets/sortIconHeaders.svg";
import editIcon from "../../assets/editIcon.svg";
import deleteIcon from "../../assets/deleteIcon.svg"
import axios from 'axios'
import { useContext, useEffect, useState } from "react";
import { AuthContext } from '../../context/myContext';
import {format} from '../../../node_modules/date-fns'
export default function ChargesList({ setOpenModalDeleteCharges, setOpenModalEditCharges }) {
    const { setIdDelete, dataCharges, setDataCharges, setIdEdit } = useContext(AuthContext)
    const [data, setData] = useState([])
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

    const getCharges = async () => {
        try {
            const response = await axios.get('http://localhost:3000/cobrancas')
            setData(response.data)

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getCharges()
    }, [])

    useEffect(() => {
        setDataCharges(data)
    }, [data])

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
                    <h1
                        style={{
                            fontSize: "1.6rem",
                            color: "#0E8750",
                            alignSelf: "flex-end",
                            marginBottom: "-2rem",
                        }}
                    >
                        Cobrança
                    </h1>
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

                <div className="container-billingMain">
                    <div className="billing-box-header">
                        <div className="title-billing">
                            <img src={chargeIcon} alt="Charge Icon" />
                            <h1>Cobrança</h1>
                        </div>
                        <div className="search-box-users charges">

                            <img
                                className="searchControlerIcon"
                                src={searchControler}
                                alt="Search controller Icon"
                            />

                            <div className="set-search-input-img">
                                <Box>
                                    <TextField
                                        id="outlined-basic"
                                        label="Pesquisa"
                                        variant="outlined"
                                        type="text"
                                        name="senha"
                                        InputProps={{
                                            style: {
                                                fontSize: "1.6rem",
                                                color: "#343447",
                                                borderRadius: ".8rem",
                                                backgroundColor: "#fff",
                                                width: "30rem",
                                                height: "3.8rem",
                                                lineHeight: "1.8rem",
                                            },
                                            endAdornment: (
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    edge="end"
                                                    sx={{
                                                        position: "absolute",
                                                        right: "1.5rem",
                                                        top: "50%",
                                                        transform: "translateY(-50%)",
                                                    }}
                                                >
                                                    <SearchIcon style={{ fontSize: "3rem" }} />
                                                </IconButton>
                                            ),
                                        }}
                                        InputLabelProps={{
                                            style: {
                                                fontSize: "1.6rem",
                                                color: "gray",
                                                width: "30rem",
                                                height: "3.8rem",
                                                lineHeight: "1.3rem",
                                            },
                                        }}
                                    />
                                </Box>
                            </div>
                        </div>
                    </div>
                    <div className="box-table-billings ">
                        <div className="table-header-customer charges-table">
                            <ul>
                                <li>
                                    <img src={sortIconHeaders} alt="Sort Icon" />
                                    Cliente
                                </li>
                                <li>
                                    <img src={sortIconHeaders} alt="Sort Icon" />
                                    ID Cob.
                                </li>
                                <li>Valor</li>
                                <li>Data de Venc.</li>
                                <li>Status</li>
                                <li>Descrição</li>
                                <li></li>
                                <li></li>
                            </ul>
                        </div>
                        <div className="body-table-customer charges-table">
                            {dataCharges.map((charges) => (
                                <ul key={charges.id_charges}>
                                    <li>{charges.name_client}</li>
                                    <li>{charges.id_charges}</li>
                                    <li>{`R$: ${(charges.amount / 100).toFixed(2).replace('.', ',')}`}</li>
                                    <li>{format( new Date(charges.due_date), 'dd/MM/yyy')}</li>
                                    <li className={charges.status_charge === true ? "expired-client" : "up-to-date-client"}>{charges.status_charge === true ? "Vencido" : "Pago"}</li>
                                    <li>{charges.description}</li>
                                    <li></li>
                                    <li className="edit-delete">
                                        <div onClick={() => {setOpenModalEditCharges(true); setIdEdit(charges.id)}}>
                                            <img src={editIcon} alt="Edit Icon" />
                                            <span>Editar</span>
                                        </div>
                                        <div onClick={() => { setOpenModalDeleteCharges(true); setIdDelete(charges.id) }}>
                                            <img src={deleteIcon} alt="Delete Icon" />
                                            <span>Deletar</span>
                                        </div>
                                    </li>
                                </ul>
                            ))}
                        </div>
                    </div>
                </div>
            </Grid>
        </>
    );
}