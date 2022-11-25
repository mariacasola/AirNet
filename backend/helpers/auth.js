import bcrypt from 'bcrypt';

export const hashPassword = (password) => {
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(12, (err, salt) => {
            if (err) {
                reject(err);
            }
            bcrypt.hash(password, salt, (err, hash) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(hash);
                }
            });
        });
    });
};
// hay que comparar la contraseña que el usuario ingresa con la contraseña que tenemos en la base de datos
export const comparePassword = (password, hashed) => {
    return bcrypt.compare(password, hashed); // se compara y retorna true o false
};