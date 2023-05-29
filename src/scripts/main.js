import { State } from '@state/state';
import { wrapper } from '@components/wrapper';

wrapper.render(document.body, new State('minesweeper'));
