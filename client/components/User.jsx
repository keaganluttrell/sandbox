import React, { useEffect } from 'react';
import { Link, useParams } from "react-router-dom";

export default function User() {
  const { username } = useParams();
  console.log(username)
  return (
    <div>
      USER
    </div>
  );
};