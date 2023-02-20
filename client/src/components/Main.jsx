
import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom'
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Input,
    Button,
    UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem
} from 'reactstrap';

import {connect} from 'react-redux';

//import init from './init.js'
import LandingPage from './LandingPage.jsx';
import SearchResult from './SearchResult.jsx';
import FungiDetial from './FungiDetail.jsx';
import FungiKnowledge from './FungiKnowledge.jsx';
import './Main.css';
import {listFungi, listFungiByCategory, setMasking} from '../states/fungi-actions.js';
class Main extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

        };
        this.handleFungiSearch=this.handleFungiSearch.bind(this);
        this.handleSearchByCategory=this.handleSearchByCategory.bind(this);

    }
    componentDidMount(){

    }
    render() {

        return (
          <Router>
              <div className='main bg-faded'>

                   <div className='container'>
                       <Navbar color='faded' light expand='md'>
                           <NavbarToggler onClick={this.handleNavbarToggle}/>
                           <NavbarBrand className='text-info' href="/">真菌wiki</NavbarBrand>
                           <Collapse isOpen={this.state.navbarToggle} navbar>
                               <Nav navbar>
                                 <UncontrolledDropdown nav inNavbar>
                                   <DropdownToggle nav caret>
                                     分類
                                   </DropdownToggle>

                                   <DropdownMenu left>
                                     <DropdownItem disabled>常見分類</DropdownItem>
                                     <Link to='/search'><DropdownItem onClick={()=>{this.handleSearchByCategory('子囊菌')}}>
                                       子囊菌
                                     </DropdownItem></Link>
                                      <Link to='/search'><DropdownItem  onClick={()=>{this.handleSearchByCategory('擔子菌')}}>
                                       擔子菌
                                     </DropdownItem></Link>
                                     <Link to='/search'><DropdownItem  onClick={()=>{this.handleSearchByCategory('接合菌')}}>
                                      接合菌
                                    </DropdownItem></Link>
                                    <Link to='/search'><DropdownItem  onClick={()=>{this.handleSearchByCategory('其他')}}>
                                     其他
                                   </DropdownItem></Link>
                                     <DropdownItem divider />
                                     <Link to='/search'><DropdownItem  onClick={()=>{this.handleSearchByCategory('全部')}}>
                                      全部
                                    </DropdownItem></Link>
                                   </DropdownMenu>
                                 </UncontrolledDropdown>
                               </Nav>

                           </Collapse>
                          <Nav navbar>
                              <FungiKnowledge />
                          </Nav>
                       </Navbar>

                   </div>
                    <div className={`mask ${this.props.masking ? 'masking' : ''}`}>
                      <img src={`${this.props.fungiDetail.id==-1?'images/fungi_bg3.jpg':this.props.fungiDetail.imgsrc}`}  className={`fungi_bg ${this.props.masking ? 'masking' : ''}`} fluid/>
                       <Route exact path="/" render={() => (
                          <LandingPage onSearch={this.handleFungiSearch}/>
                       )}/>

                       <Route exact path="/search" render={() => (
                          <SearchResult fungiList={this.props.fungiList}/>
                       )}/>
                       <Route exact path={`/fungi/${this.props.fungiDetail.name}`} render={() => (
                          <FungiDetial fungiData={this.props.fungiDetail}/>
                       )}/>
                       <Route exact path="/knowledge" render={() => (
                          <FungiKnowledge />
                       )}/>
                    </div>
               </div>
          </Router>
        );
    }

    handleFungiSearch(search){
      this.props.dispatch(setMasking(true)).then(()=>{
        this.props.dispatch(listFungi(search));
      });


      setTimeout(() => {
        this.props.dispatch(setMasking(false));
      }, 600);
    }
    handleSearchByCategory(category){
      this.props.dispatch(setMasking(true)).then(()=>{
        this.props.dispatch(listFungiByCategory(category));
      });
      setTimeout(() => {
        this.props.dispatch(setMasking(false));
      }, 600);
    }

}
export default connect(state => ({
    fungiList:  state.fungi.fungi,
    fungiDetail: state.detail,
    masking: state.masking
}))(Main);
