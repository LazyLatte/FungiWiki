
import React from 'react';
import $ from 'jquery';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom'
import {
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupButtonDropdown,
    Button,
    Container,
    Row, Col,
    Modal, ModalHeader,  ModalBody,  ModalFooter
} from 'reactstrap';

import {connect} from 'react-redux';
import {getFungi, setMasking} from '../states/fungi-actions.js';
import InfiniteScroll from 'react-infinite-scroll-component';


import './FungiKnowledge.css';

class FungiKnowledge extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            modal: false
        };
        this.modalToggle=this.modalToggle.bind(this);
        this.handleImageClick=this.handleImageClick.bind(this);
    }
    componentDidMount(){
    }
    componentDidUpdate(prevProps){
    }
    render() {
        const {modal} = this.state;
        return (
            <div className='fungi-knowledge'>
            <Button color="danger" onClick={this.modalToggle}>小知識</Button>
            <Modal isOpen={modal} toggle={this.modalToggle} size='lg'>
              <ModalHeader toggle={this.modalToggle}>真菌小知識</ModalHeader>
              <ModalBody >

                <br/>
                <Row className='mx-5 my-3 px-5'>
                  <div className='text mx-auto wow bounceInUp'>
                  真菌既不是動物也不是植物，它們沒有根、莖、葉的構造，身體全是由菌絲組成，
                  所以真菌的主要辨識方法是以是否有菌絲來辨別。真菌無葉綠素，要靠分解物質獲得營養，
                  在生態系中扮演分解者的角色。
                  </div>
                </Row>
                <br/><br/>
                <Row>
                  <div className='text ml-5 mr-auto wow bounceInLeft'>
                    <h6>高等真菌包括子囊菌及擔子菌，他們的菌絲普遍具有分隔細胞間的隔膜(septum)</h6>
                  </div>
                </Row>
                <Row className='row'>
                  <Col xs='6' className='d-flex'>
                    <div className='text my-auto wow bounceInLeft'>
                        <h5 >子囊菌 :</h5>
                        子囊菌的有性生殖孢子是生長在子囊裡面，子囊有圓形、橢圓、長條、棒狀等不同的形狀。
                        當孢子成熟後會從由子囊內釋放出來，而許多個子囊與附屬構造被包在由菌絲結成的子實體內，稱為子囊果。
                        子囊菌門的真菌都是寄生或腐生，一般熟知的酵母菌、冬蟲夏草及羊肚菌等即是屬於子囊菌。
                    </div>
                  </Col>
                  <Col xs='6' className='d-flex'>
                    <img src='../images/fungi_intro_02.png' className='img mx-auto my-auto wow bounceInRight' data-wow-delay='0.2s'/>
                  </Col>
                </Row>

                <Row className='row'>
                  <Col xs='6' className='d-flex'>
                    <div className='text my-auto wow bounceInLeft' data-wow-delay='0.3s'>
                      <h5>擔子菌 :</h5>
                      擔子菌是真菌中高等進化者，野外所見的大型真菌亦多為擔子菌，其特徵為有性生殖時期，擔子柄外生擔孢子。
                      擔子菌有兩大類，異擔子菌類和同擔子菌類。
                      異擔子菌類的擔孢子有再生擔孢子的能力，且多數種類的擔子有橫隔或縱隔。而同隔擔子菌的擔子不分隔，擔孢子也不能再生擔孢子。
                      最為人們熟悉的同隔擔子菌為菇類、無褶菌類。菇類主要成員有傘菌目、牛肝菌目及紅菇目，這類的子實體通常柔軟，呈傘形。
                      無褶菌類子實體的質地頗堅韌，在自然中存留的時間也較久，這類多為木材腐朽菌，多為皮殼菌類及多孔菌類。
                    </div>
                  </Col>
                  <Col xs='6' className='d-flex'>
                    <img src='../images/fungi_intro_01.png' className='img mx-auto my-auto wow bounceInRight' data-wow-delay='0.1s'/>
                  </Col>
                </Row>

                <Row className='row' >
                  <Col xs='6' className='d-flex wow bounceInRight animated'>
                    <img src='../images/fungi_intro_04.jpg' className='img mx-auto my-auto ' />
                  </Col>
                  <Col xs='6' className='d-flex wow bounceInLeft'>
                    <div className='text my-auto' >
                    <h5>接合菌 :</h5>
                      接合真菌為低等真菌，它們是無鞭毛的。有性繁殖時透過兩個等積的配子囊接合，形成接合孢子囊，其中的大部分核會退化，只有一對會核融合，
                      並發展成雙倍體的接合孢子。無性繁殖時則會產生孢子囊。
                    </div>
                  </Col>
                </Row>
                <div className='next'></div>
                <Row className='mx-5 my-3 px-5'>
                  <div className='text mx-auto wow bounceInUp'>
                    <h5>真菌對於人們生活也是息息相關</h5>
                  </div>
                </Row>
                <br/><br/>
                <Row className='row '>
                  <Col xs='6' className='d-flex wow bounceInRight' data-wow-duration="1.5s">
                    <img src='../images/fungi_intro_03.png' className='img mx-auto my-auto '/>
                  </Col>
                  <Col xs='6' className='d-flex wow bounceInLeft' data-wow-duration="1.5s">
                    <div className='text my-auto '>
                      子囊菌中的<Link to='/fungi/酵母菌' onClick={()=>{this.handleImageClick('酵母菌')}}>酵母菌</Link>經由發酵作用，讓人們能品嚐鬆軟可口的麵包與陳年古酒
                    </div>
                  </Col>
                </Row>

                <Row className='row'>
                  <Col xs='6' className='d-flex'>
                  <div className='text my-auto mx-auto wow bounceInLeft'>
                      接合菌中的<Link to='/fungi/毛黴菌' onClick={()=>{this.handleImageClick('毛黴菌')}}>毛黴菌</Link>則能用來製作豆腐乳
                  </div>
                  </Col>
                  <Col xs='6' className='d-flex'>
                    <img src='../images/fungi_intro_05.png' className='img mx-auto my-auto wow bounceInRight'/>
                  </Col>
                </Row>
                <Row className='row'>
                  <Col xs='6' className='d-flex'>
                    <img src='../images/fungi_intro_06.png' className='img mx-auto my-auto wow bounceInRight' />
                  </Col>
                  <Col xs='6' className='d-flex'>
                    <div className='text my-auto wow bounceInLeft'>
                      生活中最常見的菇類即是屬於擔子菌類。
                    </div>
                  </Col>
                </Row>

              </ModalBody>
              <ModalFooter>
                <Button color="primary" onClick={this.modalToggle}>確定</Button>
              </ModalFooter>
            </Modal>

            </div>
        );
  }

  modalToggle(){
      this.setState((prevState)=>({
        modal: !prevState.modal
      }));

  }
  handleImageClick(name){
    this.setState((prevState)=>({
      modal: !prevState.modal
    }), ()=>{

      this.props.dispatch(setMasking(true)).then(()=>{
        this.props.dispatch(getFungi(name));
      });
    });



    setTimeout(() => {
      this.props.dispatch(setMasking(false));
    }, 600);
  }

}
export default connect(state => ({

}))(FungiKnowledge);
