import React from 'react';
import { Button, Card, Image, Header, Container } from 'semantic-ui-react';

const MockupPositions = () => (
  <Container>
    <Header as="h2" textAlign="center">Positions Available!</Header>
    <Card.Group>
      <Card>
        <Card.Content>
          <Image
            floated='right'
            size='mini'
            src='https://d2q79iu7y748jz.cloudfront.net/s/_logo/9e2984fb2967e94265968e42771331a0'
          />
          <Card.Header>Health Data Analyst</Card.Header>
          <Card.Meta>AlohaCare</Card.Meta>
          <Card.Description>
            <strong>Join AlohaCare to help create a healthier Hawaii. Request for application..</strong> <p>Interests/Skills in health, data analytics, R programming</p>
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <div className='ui two buttons'>
            <Button basic color='green'>
                      Add
            </Button>
            <Button basic color='blue'>
                      Message
            </Button>
          </div>
        </Card.Content>
      </Card>
      <Card>
        <Card.Content>
          <Image
            floated='right'
            size='mini'
            src='https://img.s-hawaiianairlines.com/static/images/brand/refresh/imagenewpualani2x.png?version=a947&sc_lang=en'
          />
          <Card.Header>Software Developer</Card.Header>
          <Card.Meta>Hawaiian Airlines</Card.Meta>
          <Card.Description>
            <strong>Visit our website to get your application!</strong> <p>Interests/Skills in software engineering, graphic design, problem solving</p>
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <div className='ui two buttons'>
            <Button basic color='green'>
                      Add
            </Button>
            <Button basic color='blue'>
                      Message
            </Button>
          </div>
        </Card.Content>
      </Card>
      <Card>
        <Card.Content>
          <Image
            floated='right'
            size='mini'
            src='https://alohastadium.hawaii.gov/wp-content/uploads/2013/11/BOH_Stacked_293.pdf_reverse-e1414786234300.jpg'
          />
          <Card.Header>Systems Engineer, Intern</Card.Header>
          <Card.Meta>Bank of Hawaii</Card.Meta>
          <Card.Description>
            <strong> Please contact us to get more information.</strong> <p>Interests/Skills in software engineering, information systems, communication</p>
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <div className='ui two buttons'>
            <Button basic color='green'>
                      Add
            </Button>
            <Button basic color='blue'>
                      Message
            </Button>
          </div>
        </Card.Content>
      </Card>
    </Card.Group>
  </Container>
);

export default MockupPositions;
