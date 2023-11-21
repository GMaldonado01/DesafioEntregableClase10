import path from "path";
import { fileURLToPath } from "url";

const __filemame = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filemame);

export default __dirname;
