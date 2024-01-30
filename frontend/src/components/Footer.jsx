import { Container , Row, Col} from 'react-bootstrap'

import React from 'react'

function Footer() {
    
    const currentYear = new Date().getFullYear();
    return (
            <footer>
                <Container>
                    {/* <Row className="justify-content-center text-center"> */}
                    <Row>
                        {/* <Col lg={6}> */}
                        <Col className='text-center py-3'>
                            <p> youcef &copy; {currentYear}</p>
                        </Col>
                    </Row>
                </Container>
            </footer>
        )
}

export default Footer