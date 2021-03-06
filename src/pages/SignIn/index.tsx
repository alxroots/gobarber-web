import React, {useRef, useCallback} from 'react';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { Link, useHistory } from 'react-router-dom';

import {Background, Container, Content, AnimationContainer } from './styles';
import getValidationErrors from '../../utils/getValidationsErrors';
import { useAuth } from '../../hooks/AuthContext';
import { useToast } from '../../hooks/ToastContext';

import LogoImg from '../../assets/logo.svg';
import Input from '../../components/Input';
import Button from '../../components/Button';


interface SignInFormData {
    email: string;
    password: string;
}

const SignIn: React.FC = () => {

    const formRef = useRef<FormHandles>(null);
    const {signIn} = useAuth()
    const {addToast} = useToast();
    const history = useHistory();

    const handleSubmit  = useCallback(async (data: SignInFormData) => {
        try {
            formRef.current?.setErrors({});
            const schema = Yup.object().shape({
                email: Yup.string()
                    .required('E-mail obrigatório')
                    .email('Digite um e-mail válido'),
                password: Yup.string().required('Senha obrigatória'),
            });
            await schema.validate(data, {
                abortEarly: false,
            });
            await signIn({
                email: data.email,
                password: data.password
            });
            history.push('/dashboard')

        } catch (err) {
            if (err instanceof Yup.ValidationError){
                const errors = getValidationErrors(err);
                formRef.current?.setErrors(errors);

                return;
            }
            
            addToast({
                type: 'error',
                title: 'Erro no autenticação',
                description: 'Ocorreu um erro ao fazer login, cheque as credenciais'
            })
            
            
        }
    }, [signIn, addToast, history])
    
    return (
        <Container>
            <Content>
                <AnimationContainer>
                    <img src={LogoImg} alt="GoBarber Logo"/>
                    <Form ref={formRef} onSubmit={handleSubmit}>
                        <h1>Efetue seu Login</h1>

                        <Input 
                            name="email"
                            icon={FiMail}
                            type="email"
                            placeholder="Email"
                        />
                        <Input 
                            name="password"
                            icon={FiLock}
                            type="password"
                            placeholder="Senha"
                        />

                        <Button>Entrar</Button>

                        <a href="forgot">Esqueci minha senha</a>
                    </Form>
                    <Link to="signup">
                        <FiLogIn />
                        Criar conta
                    </Link>
                </AnimationContainer>
            </Content>
            <Background></Background>
        </Container>
    )
};

export default SignIn;