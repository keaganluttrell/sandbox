import React from 'react';
import BoxItem from './BoxItem.jsx';

export default function List({ list, title }) {
  return (
    <>
      <div id="featured">{title}</div>
      <div className="list">
        {list.map(item => <BoxItem item={item} key={item.boxid} />)}
      </div >
    </>
  );
};