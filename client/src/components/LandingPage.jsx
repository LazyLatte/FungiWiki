
import React from 'react';
import {Link} from 'react-router-dom'
import {
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupButtonDropdown,
    Button,
    Container,
    Jumbotron
} from 'reactstrap';

import {connect} from 'react-redux';
import {FaExclamationCircle} from 'react-icons/fa';
import './LandingPage.css';
//import '../../dist/images/';
class LandingPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
          shake: false,
          invalidInput: false,
          searchInput: '',
          masking: false,
          loading: false
        };
        this.handleSearchInputChange=this.handleSearchInputChange.bind(this);
        this.handleFungiSearch=this.handleFungiSearch.bind(this);

    }
    componentDidMount(){

    }
    render() {
        const {searchInput} =this.state;
        const btn_style = {
          backgroundColor: 'DarkBlue'
        };
        return (
          <div className={`landing ${this.props.masking? 'masking': ''}`}>



            <Jumbotron className='title mx-auto '>
              <h1 className="display-3 ">Welcome!</h1>
              <p className='paragraph'>Discover more fungi</p>
            </Jumbotron>
            <InputGroup className='wow fadeInLeft fadeIn search-input mx-auto'>
              {this.state.invalidInput?
                <input className={`input invalidInput ${this.state.shake?'shake':''}`} type='text' id='invalid-search-fungi' value={searchInput}
                  onChange={this.handleSearchInputChange} placeholder=' &#xf06a; Invalid Input'/>
                :
                <input className='input' type='text' id='search-fungi' value={searchInput}
                  onChange={this.handleSearchInputChange} placeholder=' &#xf002; Find some fungi'/>
              }



                <InputGroupAddon addonType='prepend'>
                  <Link to={`${searchInput==''?'':'/search'}`} >
                    <Button style={btn_style} onClick={()=>{this.handleFungiSearch()}}>
                    Search
                    </Button>
                  </Link>
                </InputGroupAddon>
            </InputGroup>
            <div className='footage'>
              107200009 陳冠甫
            </div>

          </div>
        );
    }


    handleSearchInputChange(e){
      const searchInput = e.target.value;

      this.setState({searchInput});
    }

    handleFungiSearch(){
      const {searchInput} =this.state;
      this.setState((prevState)=>({
        invalidInput: searchInput===''?true:false,
        shake: true
      }));

      if(searchInput!==''){
        this.props.onSearch(this.state.searchInput);
      }else{


      }
      setTimeout(()=>{
        this.setState({
          shake: false
        });
      }, 500);
    }

}
export default connect(state => ({
  masking: state.masking
}))(LandingPage);
