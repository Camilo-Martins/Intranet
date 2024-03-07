const nodemailer = require("nodemailer");
require("dotenv").config({ path: "variables.env" });

const emailRegistro = async (datos) => {
  const { emailRecovery, emailGenerated, name, token, password, rol } = datos;

  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  console.log(rol);

  switch (rol) {
    case "STUDENT":
      // Correo para estudiantes
      await transport.sendMail({
        from: '"Intranet - Comunidad Educativa de Villa Dulce" <cuentas@uptask.com>',
        to: emailRecovery,
        subject: `Bienvenido ${name} a Intranet`,
        text: "Comprueba tu cuenta en UpTask",
        html: `<p>Hola: ${name}, por medio de este correo te enviamos tu usuario y contraseña</p>
        <p>Recuerda que no debes compartir estos datos con nadie. 
      <ul>
        <li>  Email: ${emailGenerated} </li>
        <li>  Password: ${password} </li>
      </ul>
        <p>Si tu no creaste esta cuenta, puedes ignorar el mensaje</p>
        `,
      });
      break;
    case "TEACHER":
      // Correo para estudiantes
      await transport.sendMail({
        from: '"Intranet - Comunidad Educativa de Villa Dulce" <cuentas@uptask.com>',
        to: emailRecovery,
        subject: `Bienvenido al equipo educativo ${name}, con este correo podrás acceder al intranet `,
        text: "Aquí tienes mas información",
        html: `<p>Hola: ${name}, por medio de este correo te enviamos tu usuario y contraseña</p>
          <p>Recuerda que no debes compartir estos datos con nadie. 
        <ul>
          <li>  Email: ${emailGenerated} </li>
          <li>  Password: ${password} </li>
        </ul>

        <ul>
          <p>Recuerda que como docente puede:</p>
        <li>  Ver el perfil de los alumnos y sus calificaciones. </li>
        <li>  Crear, editar o eliminar las anotaciones que hayas colocado. </li>
        <li>  Subir, editar o eliminar contenido. </li>
        <li>  Agregar o editar calificaciones. </li>
      </ul>


          <p>Si tu no creaste esta cuenta, puedes ignorar el mensaje</p>
          `,
      });
      break;
      case "PRINCIPAL":
      // Correo para estudiantes
      await transport.sendMail({
        from: '"Intranet - Comunidad Educativa de Villa Dulce" <cuentas@uptask.com>',
        to: emailRecovery,
        subject: `Bienvenido Director al equipo educativo ${name}, con este correo podrás acceder al intranet `,
        text: "Aquí tienes mas información",
        html: `<p>Hola: ${name}, por medio de este correo te enviamos tu usuario y contraseña</p>
          <p>Recuerda que no debes compartir estos datos con nadie. 
        <ul>
          <li>  Email: ${emailGenerated} </li>
          <li>  Password: ${password} </li>
        </ul>

        <ul>
          <p>Recuerda que como Director puede:</p>
        <li>  Ver el perfil de los alumnos y sus calificaciones. </li>
        <li>  Crear, editar o eliminar las anotaciones que se hayan colocado. </li>
        <li>  Desactivar a coordinadores, docentes o docentes. </li>
        <li>  Reajustar salarios de coordinadores o docentes. </li>
      </ul>


          <p>Si tu no creaste esta cuenta, puedes ignorar el mensaje</p>
          `,
      });
      break;
      case "COORDINATOR":
        // Correo para estudiantes
        await transport.sendMail({
          from: '"Intranet - Comunidad Educativa de Villa Dulce" <cuentas@uptask.com>',
          to: emailRecovery,
          subject: `Bienvenido Coordinador al equipo educativo ${name}, con este correo podrás acceder al intranet `,
          text: "Aquí tienes mas información",
          html: `<p>Hola: ${name}, por medio de este correo te enviamos tu usuario y contraseña</p>
            <p>Recuerda que no debes compartir estos datos con nadie. 
          <ul>
            <li>  Email: ${emailGenerated} </li>
            <li>  Password: ${password} </li>
          </ul>
  
          <ul>
            <p>Recuerda que como Coordinador puede:</p>
          <li>  Ver el perfil de los alumnos y sus calificaciones. </li>
          <li>  Ver Docentes y sus cursos asignados. </li>
          <li>  Ver, crear o editar cursos, asignaturas y contenidos. </li>
        </ul>
  
  
            <p>Si tu no creaste esta cuenta, puedes ignorar el mensaje</p>
            `,
        });
        break;
    default:
      break;
  }
};

module.exports = emailRegistro;
