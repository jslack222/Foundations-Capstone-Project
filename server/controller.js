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