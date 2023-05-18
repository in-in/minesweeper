import { wrapper } from '../components/wrapper';
import { dashboard } from '../components/dashboard';
import { field } from '../components/field';
import { cell } from '../components/cell';

const { body } = document;

wrapper.render(body);
const wrapperElement = document.querySelector('.wrapper');

dashboard.render(wrapperElement);
field.render(wrapperElement);
cell.render(document.querySelector('.field'));
