import React from 'react';
import BoxItem from './BoxItem.jsx';

export default function List({ list, author, setModal }) {
  return (
    <div className="list">
      {list.map(item => (
        <BoxItem
          item={item}
          key={item.boxid}
          author={author}
          setModal={setModal}
        />
      ))}
    </div >
  );
};