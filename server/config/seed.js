/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import User from '../api/user/user.model';
import Product from '../api/product/product.model';

<<<<<<< HEAD
Thing.find({}).remove()
  .then(() => {
    Thing.create({
      name: 'Purple Kush',
      info: 'Nuj ce sa zic,nu am incercat inca cred. Merge sigur!'
    }, {
      name: 'Sour Diesel',
      info: 'Asta cica e bomba in Caliornia.Bagati tare!'
    }, {
      name: 'Jack Herer',
      info: 'Ce pula mea e asta?'
    }, {
      name: 'Blue Dream',
      info: 'Asta iti da vise umede!'
    }, {
      name: 'Kosher Kush',
      info: 'Facuta de evrei pentru evrei.Aveti grija!'
    }, {
      name: 'Granddaddy Purple',
      info: 'Cea mai smecherie de pe piata'
    },{
      name: 'Tampoane',
      info: 'bune pentru femei'
    },{
      name: 'TUDOSE',
      info: 'mai fa un pai'
    }
    )});
  
User.find({}).remove()
  .then(() => {
    User.create({
      provider: 'local',
      name: 'Test User',
      email: 'test@example.com',
      password: 'test'
    }, {
      provider: 'local',
      role: 'admin',
      name: 'Admin',
      email: 'admin@example.com',
      password: 'admin'
    })
    .then(() => {
      console.log('finished populating users');
    });
  });
=======

// User.find({}).remove()
//   .then(() => {
//     User.create({
//       provider: 'local',
//       name: 'Test User',
//       email: 'test@example.com',
//       password: 'test'
//     }, {
//       provider: 'local',
//       role: 'admin',
//       name: 'Admin',
//       email: 'admin@example.com',
//       password: 'admin'
//     })
//     .then(() => {
//       console.log('finished populating users');
//     });
//   });

 Product.find({}).remove()
   .then(() => {
     Product.create({
       name: 'Test User',
       info: 'test@example.com',
       price: 123 
     }, {
       name: 'local',
       info: 'admin',
       price: 456
     })
     .then(() => {
       console.log('finished populating users');
     });
   });
>>>>>>> master
