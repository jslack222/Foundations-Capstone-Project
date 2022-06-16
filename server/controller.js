require("dotenv").config();
const Sequelize = require("sequelize");
const { CONNECTION_STRING } = process.env;

const sequelize = new Sequelize(CONNECTION_STRING, {
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
});

module.exports = {


  getAppt: (req, res) => {
    sequelize.query(
      `SELECT * FROM appointments`
    )
      .then(dbRes => res.status(200).send(dbRes[0]))
    .catch((err) => console.log("error showing appointments", err))
  },

  createAppt: (req, res) => {
    const { appt_id, appt_type, name, email } = req.body
    sequelize.query(
      `INSERT INTO appointments (
        appt_id,
        appt_type, 
        name, 
        email)
        VALUES (
        '${appt_id}', 
        '${appt_type}',
        '${name}', 
        '${email}'
      )`
    )
      .then((dbRes) => {
        console.log(dbRes)
        res.status(200).send(dbRes[0])
      })
      .catch((err) =>
      console.log('create appointments function not working', err))
  },

  seed: (req, res) => {
    sequelize.query(
      `
        CREATE TABLE appointments (
          appt_id SERIAL PRIMARY KEY, 
          appt_type VARCHAR NOT NULL,
          name VARCHAR (50) NOT NULL, 
          email VARCHAR (300) NOT NULL 
        );
        
        INSERT INTO appointments (appt_type, name, email)
        VALUES ('Vocal Lessons', 'Jeremy Rider', 'jerry@rider.net'), 
        ('Vocal Lessons', 'Tom Thumb', 'tbcrazy@yahoo.com' )
        
        `
    )
      .then(() => {
        console.log("DB seeded!"); 
        res.sendStatus(200); 
      })
    .catch ((err) => console.log("error seeding DB", err))
  }
};