import React, { Component } from 'react'
import ReactTable from 'react-table'
import api from '../api'

import styled from 'styled-components'

import 'react-table/react-table.css'

const Wrapper = styled.div`
    padding: 0 40px 40px 40px;
`

const Update = styled.div`
    color: #ef9b0f;
    cursor: pointer;
`

const Delete = styled.div`
    color: #ff0000;
    cursor: pointer;
`

class UpdateNative extends Component {
  updateUser = event => {
    event.preventDefault()

    window.location.href = `/natives/update/${this.props.id}`
  }

  render() {
    return <Update onClick={this.updateUser}>Update</Update>
  }
}

class DeleteNative extends Component {
  deleteUser = event => {
    event.preventDefault()

    if (
      window.confirm(
        `Do you want to delete the native ${this.props.id} permanently?`,
      )
    ) {
      api.deleteNativeById(this.props.id)
      window.location.reload()
    }
  }

  render() {
    return <Delete onClick={this.deleteUser}>Delete</Delete>
  }
}

class NativesList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      natives: [],
      columns: [],
      isLoading: false,
    }
  }

  componentDidMount = async () => {
    this.setState({ isLoading: true })

    await api.getAllNatives().then(natives => {
      this.setState({
        natives: natives.data.data,
        isLoading: false,
      })
    })
  }

  render() {
    const { natives, isLoading } = this.state

    const columns = [
      /*{
        Header: 'ID',
        accessor: '_id',
        filterable: true,
      },*/
      {
        Header: 'App Icon',
        accessor: 'icon',
        Cell: function (props) {
          return (
            <img src={props.original.icon} alt={props.original.title} width="30%" />
          )
        }
      },
      {
        Header: 'App ID',
        accessor: 'appId',
        filterable: true,
      },
      {
        Header: 'Title',
        accessor: 'title',
        filterable: true,
      },
      {
        Header: 'Genres',
        accessor: 'genre',
        filterable: true,
      },
      {
        Header: 'Region',
        accessor: 'region',
        filterable: true,
      },
      {
        Header: '',
        accessor: '',
        Cell: function(props) {
          return (
            <span>
                <DeleteNative id={props.original._id} />
            </span>
          )
        },
      },
      {
        Header: '',
        accessor: '',
        Cell: function(props) {
          return (
            <span>
                <UpdateNative id={props.original._id} />
            </span>
          )
        },
      },
    ]

    let showTable = true
    if (!natives.length) {
      showTable = false
    }

    return (
      <Wrapper>
        {showTable && (
          <ReactTable
            data={natives}
            columns={columns}
            loading={isLoading}
            defaultPageSize={10}
            showPageSizeOptions={true}
            minRows={0}
          />
        )}
      </Wrapper>
    )
  }
}

export default NativesList
