import {init} from "./server";

init("3000", (err) => {
    if (err) throw err;
});