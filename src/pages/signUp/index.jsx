import './index.css'
import { useState } from 'react'
import SignUpComponents from '../../components/SignUp/SignUp'
import SignUpComponentPassword from '../../components/SignUp/SignUpPassword'
import whiteCircle from '../../assets/whiteCircle.png'
import greenCircle from '../../assets/greenCircle.png'
import checkIcon from '../../assets/check-icon.svg'
import bar from '../../assets/bar.png'

export default function SignUp() {
    const [sucess, setSucess] = useState(false)
    const [pagePassword, setPagePassword] = useState(false)

    return (
        <div className='container-signUp'>
            <div className='status-box'>
                <div className='status'>
                    <img src={greenCircle} className='circle-status' alt="Icon status active" onClick={() => {setSucess(false), setPagePassword(false)}}/>
                    <img src={bar} className='bar' alt="Bar Icon" />
                    <img src={pagePassword ? greenCircle : whiteCircle} className='circle-status' alt="Icon status inactive" />
                    <img src={bar} className='bar' alt="Bar Icon" />
                    <img src={sucess ? greenCircle : whiteCircle} className='circle-status' alt="Icon status inactive" />
                </div>
                <div className='title-status'>
                    <h3>Cadastre-se</h3>
                    <span>Por favor, informe seu nome e email</span>
                    <h3>Escolha sua senha</h3>
                    <span>Por favor, escolhe sua senha</span>
                    <h3>Pronto!</h3>
                    <span>Cadastro realizado com sucesso</span>
                </div>
            </div>
            <div className='login-area-signUp'>
                {!pagePassword ?
                    <>
                        <div className='box-inputs-signUp'>
                            <h1>Adicione seus dados</h1>

                            <SignUpComponents setPagePassword={setPagePassword} />

                        </div>
                        <div className='status-bar'>
                            <div className=' status-bar-div active' />
                            <div className='status-bar-div' />
                            <div className='status-bar-div' />
                        </div>
                    </>
                    : !sucess ? <>
                        <div className='box-inputs-signUp'>
                            <h1>Escolha sua senha</h1>

                            <SignUpComponentPassword setSucess={setSucess} />
                        </div>

                        <div className='status-bar'>
                            <div className=' status-bar-div active' />
                            <div className='status-bar-div active' />
                            <div className='status-bar-div' />
                        </div>
                    </> :
                        <>
                            <div className='box-inputs'>
                                <div className='box-sucess'>
                                    <img src={checkIcon} alt="Check Icon" />
                                    <h1>Cadastro Realizado com sucesso</h1>
                                </div>
                            </div>
                            <div className='status-bar'>
                                <div className=' status-bar-div active' />
                                <div className='status-bar-div active' />
                                <div className='status-bar-div active' />
                            </div>

                        </>}
            </div>
        </div>
    )
}