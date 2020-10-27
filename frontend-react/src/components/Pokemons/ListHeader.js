import {Tab, Nav, Col, Row, Form, Container} from 'react-bootstrap';
import CustomDropdown from '../Atoms/CustomDropdown'

const ListHeader = (props) => {
    return (
        <div className="sticky-top bg-light pb-2">
        <Tab.Container id="left-tabs-example" defaultActiveKey="all" onSelect={props.selectTabHandler}>
            <Nav variant="pills" className="flex-row border border-info mb-30 nav-bar-all-fav">
                <Nav.Item className="flex-fill text-center" >
                    <Nav.Link eventKey="all"  >All</Nav.Link>
                </Nav.Item>
                <Nav.Item className="flex-fill text-center" >
                    <Nav.Link eventKey="favorite">Favorite</Nav.Link>
                </Nav.Item>
            </Nav>
                
        
            </Tab.Container>
            <Row className="mt-2">
                <Col md={7} xs={12} className="pb-2 pb-md-0">
                    <Form.Control type="text" placeholder="Search" className="input-search" onChange={props.enterSearchTextHandler}  />
                </Col>
                <Col md={3} xs={6} className="pb-2 pb-md-0">
                    <CustomDropdown {...props.pokemonTypes} selectTypeHandler={props.selectTypeHandler} />
                </Col>
                <Col md={1} xs={3} onClick={props.setViewToList}>
                <i className="fa fa-align-justify fa-2x text-info"></i>
                </Col>
                <Col md={1} xs={3} onClick={props.setViewToGrid}>
                <i className="fa fa-th fa-2x text-info"></i>
                </Col>
            </Row>
        </div>
    )
}

export default ListHeader;