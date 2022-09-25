import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { getUsers } from "../../services/users.service";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", type: "number", width: 100 },
  { field: "username", headerName: "User name", width: 130 },
  { field: "first_name", headerName: "First name", width: 150 },
  { field: "last_name", headerName: "Last name", width: 150 },
  { field: "is_active", headerName: "Active", type: "boolean", width: 70 },

  {
    field: "is_superuser",
    headerName: "Superuser",
    type: "boolean",
    width: 130,
  },
  { field: "last_login", headerName: "Last Login", width: 130 },
];

interface User {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  is_active: boolean;
  last_login: string;
  is_superuser: boolean;
}

const Users = () => {
  const [users, setUsers] = useState<User[]>();

  useEffect(() => {
    /* const getUsers = () => {
      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: authHeader(),
        },
      };

      return fetch(`${API_URL}/api/v1/users/`, options)
        .then(response => response.json())
        .then(response => {
          if (response) setUsers(response as Array<User>);
        })
        .catch(err => console.error(err));
    };
    getUsers(); */
    getUsers()
      .then(response => response.json())
      .then(response => {
        if (response) setUsers(response as Array<User>);
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <main className="container">
      <div className="title">Users</div>

      <Box sx={{ height: 400, width: "100%" }}>
        {users && (
          <DataGrid
            rows={users}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            disableSelectionOnClick
            experimentalFeatures={{ newEditingApi: true }}
          />
        )}
      </Box>
    </main>
  );
};

export default Users;
