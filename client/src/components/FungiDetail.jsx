
import React from 'react';
import {

    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupButtonDropdown,
    Button,
    Container,
    Row, Col
} from 'reactstrap';

import {connect} from 'react-redux';
import './FungiDetail.css';

class FungiDetail extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

        };

    }
    componentDidMount(){

    }
    render() {
        const {name, scientific_name, category, imgsrc, content1, content2, content3} = this.props.fungiData;

        return (
          <div className={`fungi-detail ${this.props.masking? 'masking': ''}`}>
            <Container className='container'>
                  <Row className='identification d-flex flex-column'>
                    <div className='name'>{name}</div>
                    <div className='scientific_name'>{scientific_name}</div>
                  </Row>

                  <div className='content'>
                    <img className='btn img mx-auto my-auto float-right' src={`${imgsrc}`}  />
                    {content1}
                    <br/><br/>
                    {content2}
                    <br/><br/>
                    {content3}

                  </div>

                  <div>

                  </div>


            </Container>
          </div>
        );
    }



}
export default connect(state => ({
  masking: state.masking
}))(FungiDetail);
