import init from "./App";
import dbClient from "./db/model";
import { ExceptionHandler } from "./errors/ExceptionHandler";

ExceptionHandler.init();
dbClient.connect();
dbClient.status();
init();
