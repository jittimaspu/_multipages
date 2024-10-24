import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const initTab = 'home';

function Navbar({ products, carts, setToken, role }) {
    const [tab, setTab] = useState('');

    useEffect(() => {
        setTab(initTab);
    }, []);

    const homeRef = useRef();
    const calculatorRef = useRef();
    const animationRef = useRef();
    const componentsRef = useRef();
    const todoRef = useRef();
    const productsRef = useRef();
    const cartsRef = useRef();

    useEffect(() => {
        if (tab === 'calculator') calculatorRef.current.click();
        else if (tab === 'animation') animationRef.current.click();
        else if (tab === 'components') componentsRef.current.click();
        else if (tab === 'todo') todoRef.current.click();
        else if (tab === 'products') productsRef.current.click();
        else if (tab === 'carts') cartsRef.current.click();
        else if (tab === 'home') homeRef.current.click();
    }, [tab]);

    return (
        <div className="navbar-container">
            <Link to='/home'>
                <button
                    className={`nav-btn ${tab === "home" ? "active" : ""}`}
                    onClick={() => setTab('home')}
                    ref={homeRef}
                >
                    Home
                </button>
            </Link>
            <Link to='/calculator'>
                <button
                    className={`nav-btn ${tab === "calculator" ? "active" : ""}`}
                    onClick={() => setTab('calculator')}
                    ref={calculatorRef}
                >
                    Calculator
                </button>
            </Link>
            <Link to='/animation'>
                <button
                    className={`nav-btn ${tab === "animation" ? "active" : ""}`}
                    onClick={() => setTab('animation')}
                    ref={animationRef}
                >
                    Animation
                </button>
            </Link>
            <Link to='/components'>
                <button
                    className={`nav-btn ${tab === "components" ? "active" : ""}`}
                    onClick={() => setTab('components')}
                    ref={componentsRef}
                >
                    Components
                </button>
            </Link>
            <Link to='/todo'>
                <button
                    className={`nav-btn ${tab === "todo" ? "active" : ""}`}
                    onClick={() => setTab('todo')}
                    ref={todoRef}
                >
                    Todo
                </button>
            </Link>
            <Link to='/products'>
                <button
                    className={`nav-btn ${tab === "Products" ? "active" : ""}`}
                    onClick={() => setTab('Products')}
                    ref={productsRef}
                >
                    Products ({products.length})
                </button>
            </Link>
            <Link to='/carts'>
                <button
                    className={`nav-btn ${tab === "Carts" ? "active" : ""}`}
                    onClick={() => setTab('Carts')}
                    ref={cartsRef}
                >
                    Carts
                    {carts.length > 0 && (
                        <span className="badge">{carts.length < 10 ? carts.length : '9+'}</span>
                    )}
                </button>
            </Link>
            <button className="logout-btn" onClick={() => setToken('')}>
                Logout
            </button>
        </div>
    );
}

export default Navbar;
