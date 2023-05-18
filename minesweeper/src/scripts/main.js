import { wrapper } from '../components/wrapper';
import { dashboard } from '../components/dashboard';
import { field } from '../components/field';
import { level } from '../components/level';
import { scoretable } from '../components/scoretable';

const { body } = document;

wrapper.render(body);
const wrapperElement = document.querySelector('.wrapper');

dashboard.render(wrapperElement);
field.render(wrapperElement);
level.render(wrapperElement);
scoretable.render(wrapperElement);
