import React from 'react';
import BoxItem from './BoxItem.jsx';

export default function List({ list }) {
  return (
    <>
      <div id="featured">Featured Boxes</div>
      <div className="list">
        {list.map(item => <BoxItem item={item} key={item.boxid} />)}
      </div >
    </>
  );
};