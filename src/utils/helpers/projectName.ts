import packageJson from "@root/package.json";

const projectName = btoa(packageJson.name);

export { projectName };
