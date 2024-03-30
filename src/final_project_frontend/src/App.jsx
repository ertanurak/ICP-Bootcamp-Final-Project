import React, { useState, useEffect } from 'react';
import { final_project_backend } from 'declarations/final_project_backend';
import { TextField, Button, CircularProgress, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Typography, Paper } from '@mui/material';
import './index.scss';

function App() {
  const [registeredPersons, setRegisteredPersons] = useState([]);
  const [helpedPersons, setHelpedPersons] = useState([]);
  const [registrationFormData, setRegistrationFormData] = useState({
    name: '',
    surname: '',
    tcNo: '',
    reason: '',
  });
  const [loadingRegisteredPersons, setLoadingRegisteredPersons] = useState(true);
  const [loadingHelpedPersons, setLoadingHelpedPersons] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoadingRegisteredPersons(true);
    setLoadingHelpedPersons(true);

    try {
      const persons = await final_project_backend.getRegisteredPersons();
      const helped = await final_project_backend.getHelpedPersons();
      console.log('persons', persons);
      console.log('helped', helped);

      setRegisteredPersons(persons);
      setHelpedPersons(helped);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoadingRegisteredPersons(false);
      setLoadingHelpedPersons(false);
    }
  };

  const handleRegister = async (event) => {
    event.preventDefault();

    // Girilen TC No'nun daha önceden kayıtlı olup olmadığını kontrol et
    const isRegistered = registeredPersons.some(person => Number(person.tcNo) === Number(registrationFormData.tcNo)) 
    && helpedPersons.some(person => Number(person.tcNo) === Number(registrationFormData.tcNo));
    console.log(isRegistered);
    console.log(registeredPersons)
    console.log(helpedPersons)
    console.log(registrationFormData)
    
    if (isRegistered) {
      alert('Bu TC No daha önceden kayıtlıdır. Lütfen farklı bir TC No deneyin.');
      return; // Kayıt işlemini gerçekleştirme
    }

    try {
      await final_project_backend.register(
        registrationFormData.name,
        registrationFormData.surname,
        registrationFormData.tcNo,
        registrationFormData.reason
      );
      setRegistrationFormData({
        name: '',
        surname: '',
        tcNo: '',
        reason: '',
      });
      fetchData(); // Yeni verileri al
    } catch (error) {
      console.error('Error registering person:', error);
    }
  };

  const handleHelp = async (tcNo, amount) => {
    try {
      await final_project_backend.sendHelp(tcNo, amount);
      fetchData(); // Yeni verileri al
    } catch (error) {
      console.error('Error sending help:', error);
    }
  };

  return (
    <div className="app-container">
      <Typography variant="h4" gutterBottom>Registered Persons</Typography>
      {loadingRegisteredPersons ? (
        <CircularProgress className="loading-spinner" />
      ) : registeredPersons.length > 0 ? (
        <Paper className="table-paper">
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Surname</TableCell>
                  <TableCell>Reason</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {registeredPersons.map(person => (
                  <TableRow key={person.tcNo}>
                    <TableCell>{person.name}</TableCell>
                    <TableCell>{person.surname}</TableCell>
                    <TableCell>{person.reason}</TableCell>
                    <TableCell>
                      <Button variant="contained" onClick={() => handleHelp(person.tcNo, 100)}>Send Help</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      ) : (
        <Typography variant="body1" className="no-data-text">No registered persons found.</Typography>
      )}

      <Typography variant="h4" gutterBottom>Helped Persons</Typography>
      {loadingHelpedPersons ? (
        <CircularProgress className="loading-spinner" />
      ) : helpedPersons.length > 0 ? (
        <Paper className="table-paper">
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Surname</TableCell>
                  <TableCell>Reason</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {helpedPersons.map(person => (
                  <TableRow key={person.tcNo}>
                    <TableCell>{person.name}</TableCell>
                    <TableCell>{person.surname}</TableCell>
                    <TableCell>{person.reason}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      ) : (
        <Typography variant="body1" className="no-data-text">No helped persons found.</Typography>
      )}

      <Typography variant="h4" gutterBottom>Register Person</Typography>
      <form onSubmit={handleRegister} className="register-form">
        <TextField
          label="Name"
          variant="outlined"
          value={registrationFormData.name}
          onChange={(e) => setRegistrationFormData({ ...registrationFormData, name: e.target.value })}
          required
        />
        <TextField
          label="Surname"
          variant="outlined"
          value={registrationFormData.surname}
          onChange={(e) => setRegistrationFormData({ ...registrationFormData, surname: e.target.value })}
          required
        />
        <TextField
          label="TC No"
          variant="outlined"
          type="number"
          value={registrationFormData.tcNo}
          onChange={(e) => setRegistrationFormData({ ...registrationFormData, tcNo: Number(e.target.value)})}
          required
        />
        <TextField
          label="Reason"
          variant="outlined"
          value={registrationFormData.reason}
          onChange={(e) => setRegistrationFormData({ ...registrationFormData, reason: e.target.value })}
          required
        />
        <Button type="submit" variant="contained" className="register-button">Register</Button>
      </form>
    </div>
  );
}

export default App;
