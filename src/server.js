import sgMail from '@sendgrid/mail'; 
import express from "express";
import cors from 'cors';
import fetch from 'node-fetch';


const app = express();
const apiKey = process.env.VITE_APIKEY

sgMail.setApiKey(apiKey);

app.use(cors());

app.get('/', (req, res) => {
  res.send('Welcome to the casaverde server');
});

app.get('/send-email', (req, res) => {
  const { recipient } = req.query;
  const msg = {
    to: recipient,
    from: 'workmailmelo@gmail.com',
    subject: 'CasaVerde - Newsletter',
    text: "Thank you for subscribing to our newsletter! Dear recruiter, this button does work :)"
  };

  sgMail.send(msg)
    .then((success) => {
      res.send(success);
      console.log('Email sent');
    })
    .catch((error) => {
      res.status(500).send(error.message);
      console.error('Email not sent:', error);
    });
});

app.get('/get-plants', async (req, res) => {
  try {
    const response = await fetch('https://raw.githubusercontent.com/itsdamel/casaverde-data/main/db.json');
    const data = await response.json();
    res.send(data);
  } catch (error) {
    res.status(500).send('Failed to fetch plant data');
    console.error('Error fetching plant data:', error);
  }
});

app.listen(3333, () => {
  console.log("Server is listening on port 3333...");
});