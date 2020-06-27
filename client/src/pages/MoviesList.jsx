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

class UpdateAlternate extends Component {
  updateUser = event => {
    event.preventDefault()

    window.location.href = `/alternates/update/${this.props.id}`
  }

  render() {
    return <Update onClick={this.updateUser}>Update</Update>
  }
}

class DeleteAlternate extends Component {
  deleteUser = event => {
    event.preventDefault()

    if (
      window.confirm(
        `Do tou want to delete the alternate ${this.props.id} permanently?`,
      )
    ) {
      api.deleteAlternateById(this.props.id)
      window.location.reload()
    }
  }

  render() {
    return <Delete onClick={this.deleteUser}>Delete</Delete>
  }
}

class AlternatesList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      alternates: [],
      columns: [],
      isLoading: false,
    }
  }

  componentDidMount = async () => {
    this.setState({ isLoading: true })

    await api.getAllAlternates().then(alternates => {
      this.setState({
        alternates: alternates.data.data,
        isLoading: false,
      })
    })
  }

  render() {
    const { alternates, isLoading } = this.state

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
        accessor: 'genres',
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
                <DeleteAlternate id={props.original._id} />
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
                <UpdateAlternate id={props.original._id} />
            </span>
          )
        },
      },
    ]

    let showTable = true
    if (!alternates.length) {
      showTable = false
    }

    return (
      <Wrapper>
        {showTable && (
          <ReactTable
            data={alternates}
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

export default AlternatesList
