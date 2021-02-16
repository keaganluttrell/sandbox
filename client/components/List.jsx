import React from 'react';
import BoxItem from './BoxItem.jsx';

export default function List({
  list,
  author,
  setModal,
  userLikes,
  setUserLikes
}) {
  return (
    <div className="list">
      {list.map(item => (
        <BoxItem
          item={item}
          key={item.boxid}
          author={author}
          setModal={setModal}
          userLikes={userLikes}
          setUserLikes={setUserLikes}
        />
      ))}
    </div >
  );
};