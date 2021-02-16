import React from 'react';
import BoxItem from './BoxItem.jsx';

export default function List({ list, title }) {
  return (
    <div className="list">
      {list.map(item => <BoxItem item={item} key={item.boxid} />)}
    </div >
  );
};