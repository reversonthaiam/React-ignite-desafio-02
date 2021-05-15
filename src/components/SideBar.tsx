import {useState, useEffect} from 'react'
import {Button} from './Button'

import { api } from '../services/api';
import '../styles/sidebar.scss';

interface SideBarIndicador{
  onClick(id: number):void;
  selected: number;
}


interface GenreResponseProps {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}

export function SideBar({onClick, selected} : SideBarIndicador) {
  
  const [genres, setGenres] = useState<GenreResponseProps[]>([]);

  useEffect(() => {
    api.get<GenreResponseProps[]>('genres').then(response => {
      setGenres(response.data);
    });
  }, []);

  return(
    <nav className="sidebar">
        <span>Watch<p>Me</p></span>

        <div className="buttons-container">
          {genres.map(genre => (
            <Button
              key={String(genre.id)}
              title={genre.title}
              iconName={genre.name}
              onClick={() => onClick(genre.id)}
              selected={selected === genre.id}
            />
          ))}
        </div>

      </nav>
  )
}