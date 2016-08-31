/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import User from '../api/user/user.model';
import Product from '../api/product/product.model';


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
