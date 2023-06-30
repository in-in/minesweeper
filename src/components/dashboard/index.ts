import { range } from "@components/range/index";
import { toggle } from "@components/toggle/index";
import { stat } from "@components/stat/index";
import { button } from "@components/button/index";

const dashboard = {
	render(container, state) {
		const element = document.createElement("div");
		element.className = "dashboard";

		range.render(element, state);
		toggle.render(element, "sound");
		toggle.render(element, "day/night");
		stat.render(element, "timer");
		stat.render(element, "turns");
		stat.render(element, "mines");
		button.render(element, state, {
			modifier: "button__primary dashboard_button",
			text: "New<br>Game",
			dataAttr: ["restart", true],
		});

		container.appendChild(element);
	},
};

export { dashboard };
