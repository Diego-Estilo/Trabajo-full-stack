'use client';

import { useState, useEffect } from 'react';
import { Game } from '@/types';
import { createClient } from '@/utils/supabase/client';

export function useGames() {
  const [games, setGames] = useState<Game[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchGames() {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('products')
        .select('*');

      if (error) {
        setError(error.message);
      } else if (data) {
        setGames(data.map((p: any) => ({
          id: p.id,
          titulo: p.name,
          descripcion: p.description,
          precio: parseFloat(p.price),
          imagen: p.image_url,
          genero: p.genre, // Defaulting for now, we could add genre to schema
          calificacion: 5
        })));
      }
      setIsLoading(false);
    }

    fetchGames();
  }, []);

  return { games, isLoading, error };
}
