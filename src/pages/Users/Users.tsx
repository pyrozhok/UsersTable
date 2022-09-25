import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import {
  DataGrid,
  GridColDef,
  GridValueFormatterParams,
  GridValueGetterParams,
} from "@mui/x-data-grid";
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
  {
    field: "last_login",
    headerName: "Last Login",
    type: "string",
    valueFormatter: (params: GridValueFormatterParams) => {
      return new Date(params.value).toLocaleDateString("en-US");
    },
    // valueGetter for filtering
    valueGetter: (params: GridValueGetterParams) => {
      return new Date(params.value).toLocaleDateString("en-US");
    },
    width: 130,
  },
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
  const [rows, setRows] = useState<User[]>();

  useEffect(() => {
    getUsers()
      .then(response => response.json())
      .then(response => {
        if (response) {
          setUsers(response as Array<User>);
          setRows(response as Array<User>);
        }
      })
      .catch(err => console.error(err));
  }, []);

  const requestSearch = (searchedVal: string) => {
    console.log("HEY");
    const filteredRows = users.filter(user => {
      return user.username.toLowerCase().includes(searchedVal.toLowerCase());
    });
    setRows(filteredRows);
  };

  const handleSearch = (value: string | null) => {
    if (value !== null) {
      requestSearch(value);
      return;
    }
    setRows(users);
  };

  return (
    <main className="container">
      <h1 className="title">Users</h1>
      <Autocomplete
        id="search-box"
        freeSolo
        options={users?.map(user => user.username)}
        onChange={(event: React.SyntheticEvent, newValue) =>
          handleSearch(newValue)
        }
        renderInput={params => (
          <TextField {...params} label="Find by username" />
        )}
      />
      <Box sx={{ height: 400, width: "100%" }}>
        {rows ? (
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            disableSelectionOnClick
            experimentalFeatures={{ newEditingApi: true }}
          />
        ) : (
          <div>Loading...</div>
        )}
      </Box>
    </main>
  );
};

export default Users;
