export const randomNumbers = (numero = 100000000) => {
  let resultado: any = {};
  for (let i = 0; i < numero; i++) {
    let numero_aleatorio = Math.floor(Math.random() * (10000 - 0 + 1) + 0);
    if (resultado[numero_aleatorio]) {
      resultado[numero_aleatorio] += 1;
    } else {
      resultado[numero_aleatorio] = 1;
    }
  }
  return resultado;
};

process.on("message", (msj: any) => {
  if (msj.command == "start") {
    const resultado = randomNumbers(msj.numero);
    (<any>process).send(resultado);
  }
});
