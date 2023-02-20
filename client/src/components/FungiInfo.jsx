
import React from 'react';
import {Link} from 'react-router-dom'
import {
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupButtonDropdown,
    Button,
    Container,
    Collapse,
    Card, CardBody, CardTitle, CardImg,
    Popover, PopoverHeader, PopoverBody
} from 'reactstrap';

import {connect} from 'react-redux';
import {showFungiDetail, setMasking} from '../states/fungi-actions.js';
import './FungiInfo.css';
//import '../../dist/images/';
class FungiInfo extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
          animationOption: 0,
          isOpen: false
        };
        this.handleToggle=this.handleToggle.bind(this);
        this.handleImageClick=this.handleImageClick.bind(this);
    }
    componentDidMount(){

    }
    componentDidUpdate(prevProps) {
        // 常見用法（別忘了比較 prop）：
        if (this.props.order !== prevProps.order) {
          console.log("hi");
          if(this.props.order < prevProps.order){
            this.setState({
              animationOption: 1
            });
          }else{

            this.setState({
              animationOption: 2
            });
          }
        }
    }
    render() {
        const {id, name, imgsrc, content} =this.props.fungi;
        const {isOpen, animationOption} = this.state;
        const {order} = this.props;
        //console.log(order);
        let delay=1-(1/(1+0.1*order));
        return (
          <div className={`fungi-info wow fadeInLeft fadeIn`} data-wow-delay={`${delay}s`}>

            <Card className='fungi-card'>
              <Link to={`/fungi/${name}`}><CardImg id='fungi-Popover' className='btn fungi-img'
                top width="100%" src={`${imgsrc}`} alt="Card image cap" onClick={()=>{this.handleImageClick()}}/></Link>
              <CardBody className='body d-flex flex-row'>
                <CardTitle className='title mx-auto my-auto' tag="h5">{name}</CardTitle>
              </CardBody>
            </Card>



          </div>
          /*
          <Popover placement="bottom" trigger='hover' delay={7} isOpen={isOpen}
            target="fungi-Popover" toggle={this.handleToggle}>
            <PopoverHeader>Popover Title</PopoverHeader>
            <PopoverBody>Sed posuere consectetur est at lobortis.
                      Aenean eu leo quam. Pellentesque ornare sem
                      lacinia quam venenatis vestibulum.</PopoverBody>
          </Popover>
          */
        );
    }

    handleToggle(){
      this.setState((prevState)=>({
        isOpen: !prevState.isOpen
      }));
    }
    handleImageClick(){

      this.props.dispatch(setMasking(true)).then(()=>{
        this.props.dispatch(showFungiDetail(this.props.fungi));
      });


      setTimeout(() => {
        this.props.dispatch(setMasking(false));
      }, 600);
    }

}
export default connect(state => ({

}))(FungiInfo);
