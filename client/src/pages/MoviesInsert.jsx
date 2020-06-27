import React, { Component } from 'react'
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

  handleIncludeAlternate = async () => {
    const { appId, title, icon, genres, region, listType } = this.state
    const payload = { appId, title, icon, genres, region }

    if (listType === 'Alternate'){
      await api.insertAlternate(payload).then(() => {
        window.alert(`Alternate inserted successfully`)
        this.setState({
          appId: '',
          title: '',
          icon: '',
          genres: '',
          region: ''
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
          region: ''
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

  render() {
    const { appId, title, icon, genres, region, results, search, listType, selectedList } = this.state
    return (
      <Wrapper>
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

        <Select value={selectedList} placeholder="Select List" options={options} onChange={this.handleListDropDown}/>

        <Title>Create {listType} Item</Title>

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

        <Button onClick={this.handleIncludeAlternate}>Add {listType}</Button>
        <CancelButton href={'/alternates/list'}>Cancel</CancelButton>
      </Wrapper>
    )
  }
}

export default AlternatesInsert
