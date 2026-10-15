import "./style.css";
import "./revision.css";
import { render } from "./router";

addEventListener("hashchange", render);
render();
