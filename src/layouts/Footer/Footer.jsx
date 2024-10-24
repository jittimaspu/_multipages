import { Badge, Container } from 'react-bootstrap';

import './Footer.css';

function Footer() {
    return (
        <div className='footer-container'>
            <Container fluid className="footer-container text-center p-3">
                <h2>
                    <Badge pill bg="danger" className="badge-size">
                        SPU
                    </Badge>{' '}
                    -{' '}
                    <Badge pill bg="warning" text="dark" className="badge-size">
                        SIT
                    </Badge>{' '}
                    -{' '}
                    <Badge pill bg="success" className="badge-size">
                        CSI
                    </Badge>
                </h2>
            </Container>
        </div>
    );
}

export default Footer;