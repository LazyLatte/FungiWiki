
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
import InfiniteScroll from 'react-infinite-scroll-component';
import FungiInfo from './FungiInfo.jsx'

import './SearchResult.css';

class SearchResult extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            tag: ''
        };
        this.handleTagClick=this.handleTagClick.bind(this);
        this.checkTag=this.checkTag.bind(this);
    }
    componentDidMount(){

    }
    componentDidUpdate(prevProps){
        if(this.props.fungiList!==prevProps.fungiList){
          this.setState({
            tag: ''
          });
        }

    }
    render() {
        const {fungiList} = this.props;
        const {tag} = this.state;
        let row = [];
        let rowID = [];
        let col_num = 4;
        let FL=[];
        if(tag==''){
          FL=fungiList;
        }else{
          for(let i=0; i<fungiList.length; i++){
            if(this.checkTag(fungiList[i].tag)){
                FL.push(fungiList[i]);
            }
          }
        }
        for(let i=0; i<Math.ceil(FL.length/col_num); i++){
          let col = [];
          let ID=1;
          for(let j=0; j<col_num; j++){
            if(FL[i*col_num+j]!==undefined){
              col.push(FL[i*col_num+j]);
              ID*=FL[i*col_num+j].id;
            }
          }
          row.push(col);
          rowID.push(ID);
        }
        /*
        for(let i=0; i<Math.ceil(fungiList.length/col_num); i++){
          let col = [];
          for(let j=0; j<col_num; j++){
            if(fungiList[i*col_num+j]!==undefined){
              col.push(fungiList[i*col_num+j]);
            }
          }
          row.push(col);
        }
        */
        let tagCol = ['#蕈類', '#有毒', '#病害'];
        //console.log(row.length);
        return (
          <div className={`search-result ${this.props.masking? 'masking': ''}`}>

            <Container className='container'>
              <Row className='tags'>
                {tagCol.map((m=><Col xs='1.5' key={tagCol.indexOf(m)}>
                  <Button className='tag' onClick={()=>{this.handleTagClick(m)}}>
                    {m}
                  </Button>
                </Col>))}

              </Row>

              <InfiniteScroll className='infinte-scroll' initialLoad={true} dataLength={FL.length} hasMore={true}>
                {row.map((m=><Row className='r' key={rowID[row.indexOf(m)]}>
                        {m.map((p=><Col xs='3' className='c' key={p.id}>
                              <FungiInfo fungi={p} order={FL.indexOf(p)}/>
                          </Col>
                        ))}
                    </Row>
                ))}
              </InfiniteScroll>

            </Container>


          </div>
        );
    }
    checkTag(fungiTag){
      const {tag} = this.state;
      if(tag=='蕈類'){
        return fungiTag.search('菇類') >=0;
      }else if(tag=='有毒'){
        return fungiTag.search('有毒') >=0;
      }else if(tag=='病害'){
        return fungiTag.search('病害') >=0;
      }
      return true;
    }
    handleTagClick(tag){
        //console.log(tag.slice(1));
        let t=tag.slice(1);
        this.setState((prevState)=>({
          tag: prevState.tag==t?'':t
        }));
    }

}
export default connect(state => ({
  masking: state.masking
}))(SearchResult);
