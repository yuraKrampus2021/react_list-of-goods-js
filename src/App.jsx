import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';

export const goodsFromServer = [
  'Dumplings',
  'Carrot',
  'Eggs',
  'Ice cream',
  'Apple',
  'Bread',
  'Fish',
  'Honey',
  'Jam',
  'Garlic',
];

const ALPHABET_SORT = 'alphabet';
const STR_LENGTH_SORT = 'length';

export const App = () => {
  const [goodsList, setGoodsList] = useState(goodsFromServer);
  const [rev, setRev] = useState(false);
  const [classActive, setClassActive] = useState('');
  const [reverseActive, setREverseActive] = useState(true);

  const getPreparedGoods = (goods, { sort, reverse }) => {
    const preparedGoods = [...goods];

    if (sort) {
      return preparedGoods.sort((good1, good2) => {
        switch (sort) {
          case ALPHABET_SORT:
            return good1.localeCompare(good2);
          case STR_LENGTH_SORT:
            return good1.length - good2.length;
          default:
            return 0;
        }
      });
    }

    if (reverse) {
      return preparedGoods.reverse();
    }

    return preparedGoods;
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => {
            const obj = {
              sort: ALPHABET_SORT,
              reverse: rev,
            };

            setGoodsList(getPreparedGoods(goodsList, obj));
            setRev(true);
            setClassActive(ALPHABET_SORT);
            setREverseActive(true);
          }}
          type="button"
          className={`button is-info ${classActive === ALPHABET_SORT ? '' : 'is-light'}`}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => {
            const obj = {
              sort: STR_LENGTH_SORT,
              reverse: rev,
            };

            setGoodsList(getPreparedGoods(goodsList, obj));
            setRev(true);
            setClassActive(STR_LENGTH_SORT);
            setREverseActive(true);
          }}
          type="button"
          className={`button is-success ${classActive === STR_LENGTH_SORT ? '' : 'is-light'}`}
        >
          Sort by length
        </button>

        <button
          onClick={() => {
            const obj = {
              sort: '',
              reverse: rev,
            };

            setREverseActive(!reverseActive);

            return rev ? setGoodsList(getPreparedGoods(goodsList, obj)) : null;
          }}
          type="button"
          className={`button is-warning ${classActive && reverseActive ? '' : 'is-light'}`}
        >
          Reverse
        </button>

        {rev && (
          <button
            onClick={() => {
              setGoodsList(goodsFromServer);
              setRev(false);
              setClassActive('');
            }}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goodsList.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
