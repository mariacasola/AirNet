import User from '../models/user.js';
import { hashPassword, comparePassword } from '../helpers/auth.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

// antes de guardar un usuario en la base de datos hay que :
// -añadir validacion 
// -ver si el mail ya existe
// -encriptar(hash) la contraseña
// registrar usuario
// send response

export const register = async(req, res) => {
    try {
        // destructure name, email, password from req.body
        const { name, email, password } = req.body;
        // validate
        if (!name.trim()) {
            return res.json({ error: 'Nombre es requerido' });
        }
        if (!email) {
            return res.json({ error: 'Email ya usado' });
        }
        if (!password || password.length < 6) {
            return res.json({ error: 'Password debe tener al menos 6 caracteres' });
        }
        //chequar si el mail ya existe
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.json({ error: 'Email ya usado' });
        }
        // hash password
        const hashedPassword = await hashPassword(password);
        // register user
        const user = await new User({ name, email, password: hashedPassword }).save();
        // crear token firmado
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

        // send response
        res.json({
            user: {
                name: user.name,
                email: user.email,
                role: user.role,
                address: user.address,
            },
            token
        });


    } catch (err) {
        console.log(err);
    }
};



export const login = async(req, res) => {
    try {
        // destructure name, email, password from req.body
        const { email, password } = req.body;
        // validate

        if (!email) {
            return res.json({ error: 'Email ya usado' });
        }
        if (!password || password.length < 6) {
            return res.json({ error: 'Password debe tener al menos 6 caracteres' });
        }
        //chequar si el mail ya existe
        const user = await User.findOne({ email });
        if (!user) {
            return res.json({ error: 'Usuario no encontrado' });
        }
        // compare password
        const match = await comparePassword(password, user.password);
        if (!match) {
            return res.json({ error: 'Contraseña incorrecta' });
        }

        // crear token firmado
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

        // send response
        res.json({
            user: {
                name: user.name,
                email: user.email,
                role: user.role,
                address: user.address,
            },
            token
        });


    } catch (err) {
        console.log(err);
    }
};

export const secret = async(req, res) => {
    res.json({ currentUser: req.user });
}



export const updateProfile = async (req, res) => {
    try{
        const { name, password, address } = req.body;
        const user = await User.findById(req.user._id);

        // verificaicon del largo de la contraseña
        if (password && password.length < 6 ){
            return res.json({
                error: "La contraseña es obligatoria y debe tener un minimo de 6 caracteres"
            });
        }
        const hashedPassword = password ? await hashPassword(password) : undefined;

        const update = await User.findByIdAndUpdate(
            req.user._id,
            {
                name: name || user.name,
                password: hashedPassword || user.password,
                address: address || user.address,
            },
            { new: true}
        );

        update.password = undefined;
        res.json(update);

    } catch(err) {
        console.log(err)
    }
}