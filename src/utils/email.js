import config from "../config/config.js";
import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'fertorron21@gmail.com',
        pass: config.gmailNodemailer,
    },
});

export const sendRecoveryPass = async (userEmail, token) => {
    const link = `${config.emailUrl}/reset-password?token=${token}`;//enlace con el token

    //estructura del correo
    await transporter.sendMail({
        from: "fertorron21@gmail.com",
        to: userEmail,
        subject: "Lans - Restablecer contraseña",
        html: `
            <div>
                <h2>Has solicitado un cambio de contraseña</h2>
                <p>Da clic en el siguiente enlace para restablecer la contraseña</p>
                <a href="${link}">
                    <button> Restablecer contraseña </button>
                </a>
            </div>
        `
    })
};

export const sendDeleteUsers = async (userEmail) => {
    await transporter.sendMail({
        from: "fertorron21@gmail.com",
        to: userEmail,
        subject: "Lans - Usuario Eliminado",
        html: `
            <div>
                <h2>Se ha eliminado tu usuario</h2>
                <p>Hemos eliminado tu usuario por inactividad</p>
            </div>
        `
    })
};

export const sendDeleteProduct = async (userEmail, productName) => {
    await transporter.sendMail({
        from: "fertorron21@gmail.com",
        to: userEmail,
        subject: "Lans - Producto Eliminado",
        html: `
            <div>
                <h2>Se ha eliminado ${productName}</h2>
            </div>
        `
    })
};