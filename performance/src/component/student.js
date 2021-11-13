import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function Formstudent() {
  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '50ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField
          required
          id="outlined-required"
          label="First Name"
          autoComplete="First Name"
        />
        <TextField
          required
          id="outlined-Last Name-input"
          label="Last Name"
          autoComplete="Last Name"
        />
        </div>
        <div>
        <TextField
        required
          id="outlined-Discipline-input"
          label="Discipline"
          //type="D1234-0021"
          autoComplete="Discipline."
        />
        <TextField
        required
          id="outlined-Roll no.-input"
          label="Roll No"
          //type="D1234-0021"
          autoComplete="Roll No."
        />
        <TextField
          id="outlined-Mail Id-input"
          label="Mail Id"
          defaultValue="@gmail.com"
          //InputProps={{
            //readOnly: true,
         // }}
        />
        <TextField
          id="outlined-Contact number"
          label="Contact Number"
          type="number"
          //InputLabelProps={{
            //shrink: true,
          //}}
        />
      </div>
      <div>
          <TextField
          id="filled-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          variant="filled"
        />
        <TextField
          id="filled-password-input"
          label="Re-type Password"
          type="password"
          autoComplete="current-password"
          variant="filled"
        />
        </div>
        <div>
        <form ref="form" onSubmit={this.handleSubmit}>

<button type="submit">Do the thing</button>

</form>
        </div>
    </Box>
  );
}
