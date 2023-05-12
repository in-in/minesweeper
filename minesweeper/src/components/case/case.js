import data from '../../data/data.json' assert { type: 'json' };

export function createCase(body) {
  const keyboardCase = document.createElement('div');
  keyboardCase.className = 'case';

  Object.keys(data).forEach((k) => {
    const caseRow = document.createElement('div');
    caseRow.className = 'case__row';
    caseRow.id = k;
    keyboardCase.append(caseRow);
  });

  body.append(keyboardCase);
}

export default createCase;
