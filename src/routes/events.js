const express = require('express');
const router = express.Router();

const pool  = require('../database.js');

router.get('/add', (req, res) => {
    res.render('events/addEvent');
});

router.post('/add', async (req, res) => {
    const { titulo, imagen, archivo, descripcion, pregunta, estado, semestre, carrera, fecha_ini, fecha_fin } = req.body;
    const newEvent = {
        titulo, 
        imagen, 
        archivo, 
        descripcion, 
        pregunta, 
        estado, 
        semestre: semestre.toString(), 
        carrera: carrera.toString(),
        fecha_ini,
        fecha_fin
    };
    await pool.query('INSERT INTO eventos SET ?',[newEvent]);
    res.redirect('/events');
});

router.get('/', async (rep, res) => {
    const events = await pool.query('SELECT * FROM eventos ORDER BY fecha_cre DESC');
    console.log(events);
    res.render('events/listEvents', {events});
});

router.get('/delete/:id_evento', async (req, res) => {
    const {id_evento} = req.params;
    await pool.query('DELETE FROM eventos WHERE id_evento = ?', [id_evento]);
    res.redirect('/events');
});

router.get('/edit/:id_evento', async (req, res) => {
    const {id_evento} = req.params;
    const event = await pool.query('SELECT * FROM eventos WHERE id_evento = ?', [id_evento]);
    console.log(event[0]);
    res.render('events/editEvent', {event: event[0]});
});

router.post('/edit/:id_evento', async (req, res) => {
    const {id_evento} = req.params;
    const { titulo, imagen, archivo, descripcion, pregunta, estado, semestre, carrera, fecha_ini, fecha_fin } = req.body;
    const newEvent = {
        titulo, 
        imagen, 
        archivo, 
        descripcion, 
        pregunta, 
        estado, 
        semestre: semestre.toString(), 
        carrera: carrera.toString(),
        fecha_ini,
        fecha_fin
    };
    await pool.query('UPDATE eventos set ? WHERE id_evento = ?', [newEvent,id_evento]);
    res.redirect('/events');
});

module.exports = router;