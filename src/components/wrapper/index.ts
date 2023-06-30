import { dashboard } from "@components/dashboard/index";
import { field } from "@components/field/index";
import { level } from "@components/level/index";
import { scoretable } from "@components/scoretable/index";

const wrapper = {
	render(container, state) {
		const element = document.createElement("div");
		element.className = "wrapper";

		dashboard.render(element, state);
		field.render(element, state);
		level.render(element, state);
		scoretable.render(element, state);

		container.appendChild(element);
	},
};

export { wrapper };
