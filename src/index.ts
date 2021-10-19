import Server from "./services/server";
import { connectToDB } from "./services/db";

//const PORT = argumentos.puerto || 8080;

//console.log(argumentos);
const init = async () => {
  await connectToDB();
  Server.listen(8080, () => console.log(`Server up puerto 8080`));
};

init();
