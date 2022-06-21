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
    const { type, name, date, email } = req.body
    sequelize
      .query(
        `INSERT INTO appointments (
        type, 
        name,
        date, 
        email)
        VALUES ( 
        '${type}',
        '${name}',
        '${date}',
        '${email}'
      )`
      )
      .then((dbRes) => {
        console.log(dbRes);
        res.status(200).send(dbRes[0]);
      })
      .catch((err) =>
        console.log("create appointments function not working", err)
      );
  },

  deleteAppt: (req, res) => {
    const { id } = req.params; 
    sequelize
      .query(
        `DELET FROM appointments
      WHERE appt_id = ${+id}; 
      `
      )
      .then((dbRes) => {
        console.log(dbRes);
        res.status(200).send(dbRes[0]);
      })
      .catch((err) => console.log('delete Appointments function is not working',)
      );
      
  },

  seed: (req, res) => {
    sequelize.query(
      `
        CREATE TABLE appointments (
          appt_id SERIAL PRIMARY KEY, 
          type VARCHAR NOT NULL,
          name VARCHAR (50) NOT NULL, 
          date VARCHAR (50) NOT NULL,
          email VARCHAR (300) NOT NULL 
        );
        
        INSERT INTO appointments (type, name, date, email)
        VALUES ('Vocal Lessons', 'Jeremy Rider', '12/24/2024', 'jerry@rider.net'), 
        ('Vocal Lessons', 'Tom Thumb', '01/11/2023', 'tbcrazy@yahoo.com' )
        
        `
    )
      .then(() => {
        console.log("DB seeded!"); 
        res.sendStatus(200); 
      })
    .catch ((err) => console.log("error seeding DB", err))
  }
};