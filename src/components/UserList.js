import React from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'

const UserList = (props) => {
  if (!props.registeredUsers || props.registeredUsers.length < 1) {
    return null
  }

  return (
    <div>
      <h3>Registered users</h3>
      {props.registeredUsers.map(user => (
        <div key={user._id}>
          <Link to={`/admin/users/${user._id}`}>{user.username}</Link>
        </div>
      ))}
    </div>
  )
}

const mapStateToProps = state => ({
  registeredUsers: state.registeredUsers,
})

export default withRouter(connect(mapStateToProps)(UserList))
