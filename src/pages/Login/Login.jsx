import { useRef, useState } from 'react';
import Form from 'react-bootstrap/Form';
import './Login.css';
import { verifyUser } from '../../data/user';

const Login = ({ setToken, setRole }) => {
    const [error, setError] = useState('');
    const usernameRef = useRef();
    const passwordRef = useRef();

    return (
        <div className="login-container">
            <h1 className="text-center">Welcome Back!</h1>
            {error && <div className="alert alert-danger">{error}</div>}
            <Form className="login-form">
                <Form.Group>
                    <Form.Label htmlFor="username">Username <span className="hint">(e.g., type "user")</span></Form.Label>
                    <Form.Control
                        type="text"
                        id="username"
                        placeholder="Enter your username"
                        ref={usernameRef}
                        className="input-field"
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label htmlFor="password">Password <span className="hint">(e.g., type "pass")</span></Form.Label>
                    <Form.Control
                        type="password"
                        id="password"
                        placeholder="Enter your password"
                        ref={passwordRef}
                        className="input-field"
                    />
                </Form.Group>
                <div className='button-container'>
                    <button
                        className='btn btn-outline-danger mt-4'
                        onClick={() => {
                            usernameRef.current.value = '';
                            passwordRef.current.value = '';
                        }}
                    >
                        Clear
                    </button>

                    <button
                        className='btn btn-outline-success mt-4'
                        onClick={() => {
                            const user = usernameRef.current.value;
                            const pass = passwordRef.current.value;
                            usernameRef.current.value = '';
                            passwordRef.current.value = '';
                            const userInfo = verifyUser(user, pass);
                            if (userInfo === null) {
                                setError('Wrong username or password!');
                            } else {
                                setToken(userInfo.token);
                                setRole(userInfo.role);
                            }
                        }}
                    >
                        Login
                    </button>
                </div>
            </Form>
            <div className="animated-sticker">
                <img src="https://media.tenor.com/Y3bJsdez11QAAAAj/cute-spin-cute-bubu.gif" alt="animated sticker" />
            </div>
        </div>
    );
};

export default Login;
