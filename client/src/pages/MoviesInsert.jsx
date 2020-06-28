import React, { Component, Fragment } from 'react'
import { Container, Row, Col } from 'reactstrap'
import api from '../api'
import Select from "react-dropdown-select"
import { AsyncTypeahead } from 'react-bootstrap-typeahead'
import styled from 'styled-components'
import 'react-bootstrap-typeahead/css/Typeahead.css'

const options = [
  { value: 'Alternate', label: 'Foreign/Chinese List' },
  { value: 'Native', label: 'Native/Indian List' },
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
      relations: '',
      results: [],
      search: '',
      listType: '',      
      selectedList: '',
      isLoading: false,
      appsOptions: []
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
    const { appId, title, icon, genres, region, relations, listType } = this.state
    const payload = { appId, title, icon, genres, region, relations }
    console.log(payload);
    if (listType === 'Alternate'){
      await api.insertAlternate(payload).then(() => {
        window.alert(`Alternate inserted successfully`)
        this.setState({
          appId: '',
          title: '',
          icon: '',
          genres: '',
          region: '',
          relation: '',
          appsOptions: [],
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
          relation: '',
          appsOptions: [],
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

  handleChangeAppsSearch = async (title) => {
    this.setState({isLoading: true});
    await api.getNativeByTitle(title).then(natives => {
      this.setState({
        appsOptions: natives.data.data,
        isLoading: false
      });
    })
  }

  handleChangeAppsSelect = (select) => {
    const appIds = select.map(i => {
      return i.appId;
    })
    console.log(appIds);
    this.setState({
      relations: appIds
    })
  }

  render() {
    const { appId, title, icon, genres, region, results, search, listType, selectedList, isLoading, appsOptions} = this.state
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

              <Select
                required
                value={selectedList}
                placeholder="Select List" options={options}
                onChange={this.handleListDropDown}/>

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
              <AsyncTypeahead
                id="typeahead-apps"
                isLoading={isLoading}
                labelKey="title"
                filterBy={['title']}
                multiple
                minLength={3}
                onSearch={this.handleChangeAppsSearch}
                onChange={this.handleChangeAppsSelect}
                options={appsOptions}
                placeholder="Search for a Apps..."
                renderMenuItemChildren={(option, props) => (
                  <Fragment>
                    <span>{option.appId}, {option.title}</span>
                  </Fragment>
                )}
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
