const Models = require('./Models')
const fs = require('fs')
const Connection = require('./Connection')
const sleep = require('../common_functions/sleep')

const CurrentSensor = Models.CurrentSensor
const Data = Models.Data
const DHT = Models.DHT
const Machine = Models.Machine
const Script = Models.Script
const Session = Models.Session
const User = Models.User

const input_current_sensors = require('./templates/input_current_sensors.json')
const input_dht11s = require('./templates/input_dht11s.json')
const input_machines = require('./templates/input_machines.json')
const input_scripts = require('./templates/input_scripts.json')
const input_users = require('./templates/input_users.json')

function readFileTemplate(path, handle) {
    fs.readFile(path, 'utf8', (err, data) => {
        if (data !== undefined) {
            const record = JSON.parse(data)
            handle(record)
        } else {
            handle(undefined)
        }
    })
}

const insertAll = async () => {
    await input_current_sensors.forEach(current => {

        CurrentSensor.create(current)
            .then(() => {

            })
            .catch(err => {
                // console.log('ERRPOR Insert CurrentSensor: ', err)
            })
    })

    await input_dht11s.forEach(dht11 => {
        DHT11.create(dht11)
            .then(() => {

            })
            .catch(err => {
                // console.log('ERRPOR Insert DHT11: ', err)
            })
    })

    await input_machines.forEach(machine => {
        Machine.create(machine)
            .then(() => {

            })
            .catch(err => {
                // console.log('ERRPOR Insert Machine: ', err)
            })

    })

    await input_scripts.forEach(script => {
        Script.create(script)
            .then(() => { })
            .catch(err => {
                // console.log('ERRPOR Insert Script: ', err)
            })
    })

    await input_users.forEach(user => {
        /*
            Parameters:
                user
            SQL:
                INSERT INTO company.User(order_bill_id, product_id, num_product)
                VALUES({element.order_bill_id}, {element.product_id}, {element.num_product});
        */
        // console.log(user);
        User.create(user)
            .then(() => {
                // console.log('Object User: ', usr)
            })
            .catch(err => {
                // console.log('ERRPOR Insert Uesr: ', err)
            })
    })
}

setTimeout(insertAll, 10000)

