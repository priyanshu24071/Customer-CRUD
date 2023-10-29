// server.js
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');


const app = express();
const port = 5000;
const cors = require("cors");

app.use(bodyParser.json());
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));



// ===========================================  login  =======================================
app.post('/login', async (req, res) => {
  try {
    const apiUrl = 'https://qa2.sunbasedata.com/sunbase/portal/api/assignment_auth.jsp';
    const requestData = {
      login_id: req.body.login_id,
      password: req.body.password,
    };

    const response = await axios.post(apiUrl, requestData);

    if (response.status === 200) {
      const token = response.data.access_token;
      

      res.status(200).json({ message: 'Login Success', token });
      res.send()
    } else {
      res.status(401).json({ message: 'Failed login' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


//===============================  add user  =====================================
app.post('/createuser/:token', async (req, res) => {



  try {
    const apiUrl = 'https://qa2.sunbasedata.com/sunbase/portal/api/assignment.jsp';
    const token = req.params.token

    if (!req.body.first_name || !req.body.last_name) {
      res.status(400).json({ message: 'First name and last name are required' });
      return;
    }

    const requestData = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      street: req.body.street || '',   
      address: req.body.address || '', 
      city: req.body.city || '',       
      state: req.body.state || '',     
      email: req.body.email || '',     
      phone: req.body.phone || ''  
    };

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const response = await axios.post(apiUrl, requestData, {
      headers,
      params: {
        cmd: "create"
      }
    });

    if (response.status == 201) {
  
      res.status(201).json({ message: 'Successfully Created' });
    } else {
      res.status(response.status).send(response.statusText);
      console.log(response.status);
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});




//====================  Fetch all customer ==========================
app.get('/getallcustomer/:token', async (req, res) => {
  try {
    const apiUrl = 'https://qa2.sunbasedata.com/sunbase/portal/api/assignment.jsp';
    const token = req.params.token

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const response = await axios.get(apiUrl, {
      headers,
      params: {
        cmd: "get_customer_list"
      }
    });

    if (response.status == 200) {
      res.send(response.data)

    } else {
      res.status(400).json({ message: 'Not fetched' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});




//===================  update User =================================
app.post('/updateuser/:id/:token', async (req, res) => {
  const uuid = req.params.id
  try {
    const apiUrl = 'https://qa2.sunbasedata.com/sunbase/portal/api/assignment.jsp';
    const token = req.params.token;

    const requestData = {

      first_name: req.body.first_name,
      last_name: req.body.last_name,
      street: req.body.street,
      address: req.body.address,
      city: req.body.city,
      state: req.body.state,
      email: req.body.email,
      phone: req.body.phone,
    };

  
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const response = await axios.post(apiUrl, requestData, {
      headers,
      params: {
        cmd: "update",
        uuid : uuid
      }
    });

    if (response.status === 200) {
      res.status(200).json({ message: 'Updated successfully' });

    } else {
      res.status(400).json({ message: 'First Name or Last Name is missing' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});





//==========================  Delete User =================================
app.post('/deleteuser/:id/:token', async (req, res) => {
  const uuid = req.params.id;
  try {
    const apiUrl = 'https://qa2.sunbasedata.com/sunbase/portal/api/assignment.jsp';
    const token = req.params.token;

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const response = await axios.post(apiUrl, null, {
      headers: headers,
      params: {
        cmd: 'delete',
        uuid: uuid,
      },
    });

    if (response.status === 200) {
      res.status(200).json({ message: 'Successfully deleted' });
    } else if (response.status === 400) {
      res.status(400).json({ message: 'UUID not found' });
    } else {
      res.status(500).json({ message: 'Error: Not deleted' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});



app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
