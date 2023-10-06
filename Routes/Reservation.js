const express = require('express');
const Router = express.Router();

const {ValuesRegistration,AuthCustomer,AuthAdmin,ValuesUpdates} = require('../Middleware/Reservation/index');
const {CompletdReservations,FiveReservations,Revenue,GetApprovedReservation,DeleteReservationByAdmin,DeleteReservationByCustomer,NewReservation,Reservations,UpdateReservation,AllReservations,ApprovedReservations,UpdateCustomerReservation,SortedApprovedreservations} = require('../Controller/Reservation')

Router.route('/makeareservation').post(AuthCustomer,ValuesRegistration,NewReservation);
Router.route('/getallreservation').get(AuthCustomer,Reservations);
Router.route('/updatethestatus').put(ValuesUpdates,UpdateCustomerReservation);
Router.route('/updatethestatus/admin').put(AuthAdmin,ValuesUpdates,UpdateReservation);
Router.route('/getallreservations/admin').get(AuthAdmin,AllReservations);
Router.route('/getapprovedreservations/admin').get(AuthAdmin,ApprovedReservations);
Router.route('/deletereservationbycustomer/:id').delete(DeleteReservationByCustomer);
Router.route('/deletereservationbyadmin/:id').delete(AuthAdmin,DeleteReservationByAdmin);
Router.route('/getsortedapprovedreservations/admin').get(AuthAdmin,SortedApprovedreservations);
Router.route('/getallapprovedreservations/admin').get(AuthAdmin,GetApprovedReservation);
Router.route('/getfivereservations/admin').get(AuthAdmin,FiveReservations);
Router.route('/getcompletedreservations/admin').get(AuthAdmin,CompletdReservations);
Router.route('/getrevenueofthetime/:month/:year').get(Revenue)


module.exports = Router