import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Api from '../../api';

import './style.css';

const List = () => {
  const [lists, setLists] = useState([]);

  useEffect(() => {
    Api.getNews().then((data) => {
      setLists(data);
    })
  }, []);

  return (
    <div className="App">
      {
        lists.map(item => (
          <div className="list-item" key={item}>
            <Link to={`/item?id=${item}`}>{item}</Link>
          </div>
        ))
      }
    </div>
  );
};

export default List;
