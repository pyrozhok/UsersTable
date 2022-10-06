import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import TextField from "@mui/material/TextField";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import Autocomplete from "@mui/material/Autocomplete";

import {
  DataGrid,
  GridColDef,
  GridValueFormatterParams,
  GridValueGetterParams,
} from "@mui/x-data-grid";
import Header from "../../components/Header/Header";
import { isLoggedIn } from "../../services/auth-header";
import { getUsers } from "../../services/users.service";
import style from "./users.module.css";

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

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Users = () => {
  const authorized = isLoggedIn();
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [rows, setRows] = useState<User[]>([]);
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    document.title = "EmphaSoft Demo App - Users";
  }, []);

  useEffect(() => {
    setLoading(true);
    getUsers()
      .then(response => {
        if (response.status === 401) throw Error(response.statusText);
        return response.json();
      })
      .then(response => {
        if (response) {
          setUsers(response as Array<User>);
          setRows(response as Array<User>);
          setLoading(false);
        }
      })
      .catch(err => {
        setLoading(false);
        console.error(err);
        setShowMessage(true);
      });
  }, []);

  const requestSearch = (searchedVal: string) => {
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

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setShowMessage(false);
  };

  return (
    <>
      <Header />
      <main className="container">
        <Typography variant="h5" component="h1" gutterBottom my={2}>
          Users
        </Typography>

        <Snackbar
          open={showMessage}
          autoHideDuration={6000}
          onClose={handleClose}
        >
          <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
            Authorization error, you need to log in.
          </Alert>
        </Snackbar>
        <Autocomplete
          id="search-box"
          freeSolo
          options={users.length > 0 ? users.map(user => user.username) : [""]}
          onChange={(event: React.SyntheticEvent, newValue) =>
            handleSearch(newValue)
          }
          renderInput={params => (
            <TextField {...params} label="Find by username" />
          )}
          className={style.search}
        />
        <Box sx={{ height: 500, width: "100%" }}>
          {rows && !loading ? (
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
              disableSelectionOnClick
              experimentalFeatures={{ newEditingApi: true }}
            />
          ) : (
            <Box sx={{ display: "flex" }}>
              <CircularProgress />
            </Box>
          )}
        </Box>
      </main>
    </>
  );
};

export default Users;
