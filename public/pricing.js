const mongoose = require('mongoose');
const express = require('express')

const base_price = 1000;
const terminal_fee = 300;
const dv_terminal_fee = 200;
const inithead = 1;
let totalhead;
let tax = (0.12) * base_price;

let total = base_price + tax + terminal_fee +totalhead;

const payment=()=>{
    
}




