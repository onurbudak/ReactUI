import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import axios from "axios";
import Button from "@material-ui/core/Button";
import { Grid } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";

export default class Customer extends React.Component {
  state = {
    dataList: {
      data: [],
      success: false,
      message: null,
    },
    firstName: "",
    lastName: "",
    phone: "",
  };

  componentDidMount() {
    this.getAll();
  }

  getAll = () => {
    const headers = {
      Authorization: "Bearer my-token",
      "My-Custom-Header": "foobar",
    };
    axios
      .get("https://localhost:44364/api/customers/getall", headers)
      .then((response) => this.setState({ dataList: response.data }));
  };

  handleClick = (event) => {
    if (event.target.id === "firstName") {
      this.setState({ firstName: event.target.value });
    } else if (event.target.id === "lastName") {
      this.setState({ lastName: event.target.value });
    } else if (event.target.id === "phone") {
      this.setState({ phone: event.target.value });
    }
  };

  handleSaveClick = () => {
    let customer = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      phone: this.state.phone,
    };
    axios
      .post("https://localhost:44364/api/customers/add", customer)
      .then((response) => this.getAll());
  };

  render() {
    return (
      <div>
        <Grid container>
          <Grid item xs={8}>
            <TableContainer component={Paper}>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="right">Müşteri </TableCell>
                    <TableCell align="right">Adı</TableCell>
                    <TableCell align="right">Soyadı</TableCell>
                    <TableCell align="right">Telefonu</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {this.state.dataList.data.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell align="right">{row.id}</TableCell>
                      <TableCell align="right">{row.firstName}</TableCell>
                      <TableCell align="right">{row.lastName}</TableCell>
                      <TableCell align="right">{row.phone}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
          <Grid item xs={4}>
            <TextField
              onChange={(e) => this.handleClick(e)}
              fullWidth
              id="firstName"
              label="İsim"
              variant="outlined"
            />
            <TextField
              onChange={(e) => this.handleClick(e)}
              fullWidth
              id="lastName"
              label="Soyisim"
              variant="outlined"
            />
            <TextField
              onChange={(e) => this.handleClick(e)}
              fullWidth
              id="phone"
              label="Telefon"
              variant="outlined"
            />
            <Button
              onClick={(e) => this.handleSaveClick(e)}
              variant="contained"
              color="primary"
            >
              Kaydet
            </Button>
            
          </Grid>
        </Grid>
      </div>
    );
  }
}
