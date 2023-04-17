import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Link, Outlet, useSearchParams } from "react-router-dom";
import { fetchUsers } from './utils/api';

export default function App() {
  

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />} >
          <Route index element={<Home />} />
          <Route path="albums" element={<Albums />} />
          <Route path="photos" element={<Photos />} />
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

const Layout = () => {
  return (
    <>
      <Link to="/" className='btn'>Home</Link>

      <Outlet />
    </>
  );
};

const Home = () => {
  const [users, setUsers] = useState([]);
  

  useEffect(() => {
    fetchUsers(`/users`).then(setUsers);
  }, []);
  
  return (
    <ul>
      {users.map((user) => (
        <li key={user.id} className='user'>
          <p>{ user.name }</p>
          <Link to={`/albums?userId=${user.id}`} className='btn'>Albums</Link>
        </li>
      ))}
    </ul>
  );
};

const Albums = () => {
  const [albums, setAlbums] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  let userId = searchParams.get("userId");

  useEffect(() => {
    fetchUsers(`/albums?userId=${userId}`).then(setAlbums);
  }, [userId]);

  return (
    <>
      <ul className='albums'>
        {albums.map((album) => (
          <li key={album.id} className='album'>
            <p>{ album.title }</p>
            <Link to={`/photos?albumId=${album.id}`} className='btn'>Photos</Link>
          </li>
        ))}
      </ul>
    </>
  );
};

const Photos = () => {
  const [photos, setPhotos] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  let albumId = searchParams.get("albumId");

  useEffect(() => {
      fetchUsers(`/photos?albumId=${albumId}`).then(setPhotos);
  }, [albumId]);

  return (
      <ul className='photos'>
          {photos.map((photo) => (
              <li key={photo.id} className='photo'>
                  <img src={ photo.thumbnailUrl } alt="" />
              </li>
          ))}
      </ul>
  );
};

const NoMatch = () => {
  return (
    <h1>Not found!</h1>
  );
};
