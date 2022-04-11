export const formatedTime = (time) => {

  let timeFixed = parseInt(time) * 60;
  

  const segundos = Math.round(timeFixed % 0x3c);
  const horas = Math.floor(timeFixed / 0xe10);
  const minutos = Math.floor(timeFixed / 0x3c) % 0x3c;


  return `${horas !== 0 ? `${horas}h ` : ''}${
    minutos <= 9 ? `0${minutos}m` : `${minutos}m`
  }`;
};