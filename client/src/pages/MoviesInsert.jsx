import React, { Component } from 'react'
import { Container, Row, Col } from 'reactstrap';
import api from '../api'
import Select from "react-dropdown-select"
import styled from 'styled-components'

const options = [
  { value: 'Alternate', label: 'Alternate List' },
  { value: 'Native', label: 'Native List' },
];

const Title = styled.h1.attrs({
  className: 'h1',
})``

const Wrapper = styled.div.attrs({
  className: 'form-group',
})`
    margin: 0 30px;
`

const Label = styled.label`
    margin: 5px;
`

const InputText = styled.input.attrs({
  className: 'form-control',
})`
    margin: 5px;
`

const Button = styled.button.attrs({
  className: `btn btn-primary`,
})`
    margin: 15px 15px 15px 5px;
`

const CancelButton = styled.a.attrs({
  className: `btn btn-danger`,
})`
    margin: 15px 15px 15px 5px;
`

class AlternatesInsert extends Component {
  constructor(props) {
    super(props)

    this.state = {
      appId: '',
      title: '',
      icon: '',
      genres: '',
      region: '',
      alternate1: '',
      alternate2: '',
      alternate3: '',
      alternate4: '',
      alternate5: '',
      results: [],
      search: '',
      listType: '',      
      selectedList: ''
    }
  }

  handleChangeInputAppId = async event => {
    const appId = event.target.value
    this.setState({ appId })
  }

  handleChangeInputTitle = async event => {
    const title = event.target.value
    this.setState({ title })
  }

  handleChangeInputIcon = async event => {
    const icon = event.target.value
    this.setState({ icon })
  }

  handleChangeInputGenres = async event => {
    const genres = event.target.value
    this.setState({ genres })
  }

  handleChangeInputRegion = async event => {
    const region = event.target.value
    this.setState({ region })
  }

  handleCreateItem = async () => {
    const alters = [];
    const { appId, title, icon, genres, region, listType, alternate1, alternate2, alternate3, alternate4, alternate5 } = this.state
    if (alternate1 > 0){
      alters.push(alternate1);
    }
    if (alternate2 > 0){
      alters.push(alternate2);
    }
    if (alternate3 > 0){
      alters.push(alternate3);
    }
    if (alternate4 > 0){
      alters.push(alternate4);
    }
    if (alternate5 > 0){
      alters.push(alternate5);
    }
    const payload = { appId, title, icon, genres, region, alters }

    if (listType === 'Alternate'){
      await api.insertAlternate(payload).then(() => {
        window.alert(`Alternate inserted successfully`)
        this.setState({
          appId: '',
          title: '',
          icon: '',
          genres: '',
          region: '',
          alternate1: '',
          alternate2: '',
          alternate3: '',
          alternate4: '',
          alternate5: '',
        })
      })
  } else {
      await api.insertNative(payload).then(() => {
        window.alert(`Native inserted successfully`)
        this.setState({
          appId: '',
          title: '',
          icon: '',
          genres: '',
          region: '',
          alternate1: '',
          alternate2: '',
          alternate3: '',
          alternate4: '',
          alternate5: '',
        })
      })
    }
  }

  handleChangeInputSearch = async event => {
    const search = event.target.value
    this.setState({ search })
  }

  handleChangeSearch = async () => {
    const { search } = this.state
    await api.getIosApps(search).then(apps => {
      this.setState({
        results: apps.data.data,
      })
    })
  }

  handleChangeAppSelect = (app) => {
    return function () {
      this.setState({
        appId: app.id,
        title: app.title,
        icon: app.icon,
        genres: app.genres.join(','),
      })
    }.bind(this)
  }

  handleListDropDown = selectedList => {
    this.setState({selectedList}) 
    const { listType } = this.state
    this.setState({listType : selectedList[0].value}) 
    console.log(`Option selected:`, listType);
  }

  handleChangeInputAlternate1 = async event => {
    const alternate1 = event.target.value
    this.setState({ alternate1 })
  }
  
  handleChangeInputAlternate2 = async event => {
    const alternate2 = event.target.value
    this.setState({ alternate2 })
  }  

  handleChangeInputAlternate3 = async event => {
    const alternate3 = event.target.value
    this.setState({ alternate3 })
  }  
  
  handleChangeInputAlternate4 = async event => {
    const alternate4 = event.target.value
    this.setState({ alternate4 })
  }  

  handleChangeInputAlternate5 = async event => {
    const alternate5 = event.target.value
    this.setState({ alternate5 })
  }  

  render() {
    const { appId, title, icon, genres, region, results, search, listType, selectedList, alternate1, alternate2 , alternate3, alternate4, alternate5} = this.state
    return (
      <Wrapper>
        <Container>
          <Row>
            <Col>
              <Title>Search</Title>
              <Label>Term:</Label>
              <InputText
                type="text"
                placeholder="Search"
                value={search}
                onChange={this.handleChangeInputSearch}
              />
              <Button onClick={this.handleChangeSearch}>Search</Button>
              <ul>
                { results.map((app, i) => { return <li key={i}><button key={i} onClick={this.handleChangeAppSelect(app)}>{ app.title }</button></li> })}
              </ul>
            </Col>

            <Col>
              <Title>Create {listType} Item</Title>

              <Select value={selectedList} placeholder="Select List" options={options} onChange={this.handleListDropDown}/>

              <Label>App ID: </Label>
              <InputText
                type="number"
                value={appId}
                onChange={this.handleChangeInputAppId}
              />

              <Label>Title: </Label>
              <InputText
                type="text"
                value={title}
                onChange={this.handleChangeInputTitle}
              />

              <Label>Icon URL: </Label>
              <InputText
                type="text"
                value={icon}
                onChange={this.handleChangeInputIcon}
              />

              <Label>Genres: </Label>
              <InputText
                type="text"
                value={genres}
                onChange={this.handleChangeInputGenres}
              />

              <Label>Region: </Label>
              <InputText
                type="text"
                value={region}
                onChange={this.handleChangeInputRegion}
              />

              <Label>Alternates: </Label>
              <InputText
                type="number"
                value={alternate1}
                onChange={this.handleChangeInputAlternate1}
              />
              <InputText
                type="number"
                value={alternate2}
                onChange={this.handleChangeInputAlternate2}
              />
              <InputText
                type="number"
                value={alternate3}
                onChange={this.handleChangeInputAlternate3}
              />
              <InputText
                type="number"
                value={alternate4}
                onChange={this.handleChangeInputAlternate4}
              />
              <InputText
                type="number"
                value={alternate5}
                onChange={this.handleChangeInputAlternate5}
              />

              <Button onClick={this.handleCreateItem}>Add {listType}</Button>
              <CancelButton href={'/alternates/list'}>Cancel</CancelButton>

            </Col>
          </Row>
        </Container>

      </Wrapper>
    )
  }
}

export default AlternatesInsert
