function calculateSalary(totalHours,  rol) {
  // ? El calculo del salario es:
  // ? (Total de horas * valor hora) + gratificación segun el rol
  // ? Directo 40% del salario, Coordinador 28% y Docente 20%
  console.log(rol);

  let salary = 0;
  let hoursValue = 0;

  console.log("hola");

  switch (rol) {
    case "PRINCIPAL":
        hoursValue = 6000;
      return (salary = totalHours * hoursValue * 1.2);
    case "COORDINATOR":
        hoursValue = 5200;
      return (salary = totalHours * hoursValue * 1.17);
    case "TEACHER":
        hoursValue = 4600;
      return (salary = totalHours * hoursValue * 1.15);
    default:
      break;
  }
}

module.exports = calculateSalary;
