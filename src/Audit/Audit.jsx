import React from "react";
import { Link } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import { userActions } from "../_actions";
import "./Audit.css";

import { Navbar, Nav } from "react-bootstrap";
import { useState } from "react";
import { useEffect } from "react";
function Auditpage(props) {
  const { user, users } = props;

  useEffect(() => {
    props.getUsers();
  }, []);

  const handleDeleteUser = (id) => {
    return props.deleteUser(id);
  };

  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand></Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link>
            <Link to="/">Home</Link>
          </Nav.Link>
          <Nav.Link href="#features">Auditor</Nav.Link>
          <Nav.Link>
            <Link to="/login">Logout</Link>
          </Nav.Link>
        </Nav>
      </Navbar>
      <div className="col-md-6 col-md-offset-3">
        <h1>Hi {user.firstName}!</h1>
        <p>You're logged in with React!!</p>
        <h3>All login audit </h3>
        {users.loading && <em>Loading users...</em>}
        {users.error && (
          <span className="text-danger">ERROR: {users.error}</span>
        )}
        <table className="table-container">
          <thead>
            <tr>
              <th className="table-column">ID</th>
              <th className="table-column">Role</th>
              <th className="table-column">Created Date</th>
              <th className="table-column">Name</th>
              <th className="table-column">Action</th>
            </tr>
          </thead>
          {users.items && (
            <tbody>
              {users.items.map((user, index) => (
                <tr>
                  <td className="table-row">{user.id}</td>
                  <td className="table-row">{user.role}</td>
                  <td className="table-row">{user.createdDate}</td>
                  <td className="table-row">
                    {user.firstName + " " + user.lastName}
                  </td>
                  <td className="table-row">
                    {user.deleting ? (
                      <em> - Deleting...</em>
                    ) : user.deleteError ? (
                      <span className="text-danger">
                        - ERROR: {user.deleteError}
                      </span>
                    ) : (
                      <span>
                        <a onClick={() => handleDeleteUser(user.id)}>Delete</a>
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </div>
    </div>
  );
}

function mapState(state) {
  const { users, authentication } = state;
  const { user } = authentication;
  return { user, users };
}

const mapDispatchToProps = {
  getUsers: userActions.getAll,
  deleteUser: userActions.delete,
};

const connectedAuditPage = connect(mapState, mapDispatchToProps)(Auditpage);
export { connectedAuditPage as Auditpage };
