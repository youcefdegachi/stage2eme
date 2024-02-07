import React from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const NotFound = () => {
  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md="auto">
          <h1 className="mt-5">404</h1>
          <h2 className="mb-4">Page Not Found</h2>
          <p>Sorry, the page you are looking for does not exist.</p>
      <LinkContainer to={`/`}>
          <Button className='btn-sm' variant='danger'>
            Go to Home
          </Button>
      </LinkContainer>
        </Col>
      </Row>

    </Container>
  )
}

export default NotFound