'use server';

import { revalidatePath } from 'next/cache';

export async function getAlbums() {
  const response = await fetch('http://localhost:9000/albums');

  return await response.json();
}

export async function createAlbum(body) {
  const response = await fetch('http://localhost:9000/albums', {
    headers: { 'Content-Type': 'application/json;charset=utf-8' },
    body: JSON.stringify(body),
    method: 'POST'
  });

  if (!response.ok) {
    throw new Error('ошибка');
  }

  revalidatePath('/albums');

  return await response.json();
}
