const express = require('express');
const router = express.Router();

const pool = require('../database.js');

router.get('/add', (req, res) => {
    res.render('scholarships/addScholarship');
});

router.post('/add', async (req, res) => {
    const { titulo, imagen, archivo, descripcion, pregunta, estado, semestre, carrera, fecha_ini,
        fecha_fin } = req.body;
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
    await pool.query('INSERT INTO becas SET ?', [newEvent]);
    res.redirect('/scholars');
});

router.get('/', async (rep, res) => {
    const scholars = await pool.query('SELECT * FROM becas ORDER BY fecha_cre DESC');
    console.log(scholars);
    res.render('scholarships/listScholarships', { scholars });
});

router.get('/delete/:id_beca', async (req, res) => {
    const {id_beca} = req.params;
    await pool.query('DELETE FROM becas WHERE id_beca = ?', [id_beca]);
    res.redirect('/scholars');
});

router.get('/edit/:id_beca', async (req, res) => {
    const {id_beca} = req.params;
    const scholar = await pool.query('SELECT * FROM convocatorias WHERE id_conv = ?', [id_beca]);
    console.log(announ[0]);
    res.render('scholarships/editScholarship', {scholar: scholar[0]});
});

router.post('/edit/:id_beca', async (req, res) => {
    const {id_beca} = req.params;
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
    await pool.query('UPDATE becas set ? WHERE id_beca = ?', [newEvent,id_beca]);
    res.redirect('/scholars');
});

module.exports = router;