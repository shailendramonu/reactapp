import React, { Component } from 'react'
import api from '../api'

import styled from 'styled-components'

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

class AlternatesUpdate extends Component {
  constructor(props) {
    super(props)

    this.state = {
      id: this.props.match.params.id,
      appId: '',
      title: '',
      icon: '',
      genre: '',
      region: ''
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
    const genre = event.target.value
    this.setState({ genre })
  }

  handleChangeInputRegion = async event => {
    const region = event.target.value
    this.setState({ region })
  }

  handleUpdateAlternate = async () => {
    const { id, appId, title, icon, genre, region } = this.state
    const payload = { appId, title, icon, genre, region }

    await api.updateAlternateById(id, payload).then(() => {
      window.alert(`Alternate updated successfully`)
      this.setState({
        appId: '',
        title: '',
        icon: '',
        genre: '',
        region: ''
      })
    })
  }

  componentDidMount = async () => {
    const { id } = this.state
    const alternate = await api.getAlternateById(id)

    this.setState({
      appId: alternate.data.data.appId,
      title: alternate.data.data.title,
      icon: alternate.data.data.icon,
      genre: alternate.data.data.genre,
      region: alternate.data.data.region
    })
  }

  render() {
    const { appId, title, icon, genre, region } = this.state
    return (
      <Wrapper>
        <Title>Create Alternate</Title>

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
          value={genre}
          onChange={this.handleChangeInputGenres}
        />

        <Label>Region: </Label>
        <InputText
          type="text"
          value={region}
          onChange={this.handleChangeInputRegion}
        />

        <Button onClick={this.handleUpdateAlternate}>Update Alternate</Button>
        <CancelButton href={'/alternates/list'}>Cancel</CancelButton>
      </Wrapper>
    )
  }
}

export default AlternatesUpdate
