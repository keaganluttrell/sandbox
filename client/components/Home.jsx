import React, { useState } from 'react';
import { Link } from "react-router-dom";
import samples from '../data/sample.js';
import List from './List.jsx';
import '../styles/home.css';

export default function Home() {
  const [list, setList] = useState(samples);
  return (
    <div id="home">
      HOME
      <Link to="box">Build Now</Link>
      <List list={list} />
    </div>
  );
};