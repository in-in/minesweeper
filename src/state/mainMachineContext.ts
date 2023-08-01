import { createActorContext } from "@xstate/react";

import { mainMachine } from "@state/main.machine";

const mainMachineContext = createActorContext(mainMachine);

export { mainMachineContext };
