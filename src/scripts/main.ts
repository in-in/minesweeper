import { State } from "@state/state";
import { wrapper } from "@components/wrapper/index";

wrapper.render(document.body, new State("minesweeper"));
