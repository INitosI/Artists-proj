export const artists = [
  {
    id: 1,
    name: 'Unlike Pluto',
    yearsActive: '2013–present',
    sex: 'Male',
    members: 1,
    country: 'United States',
    image: 'https://via.placeholder.com/150',
    bio: 'Armond Arabshahi, known by his stage name Unlike Pluto, is an American singer, songwriter, music producer, and former DJ. He is mainly known for his song "Everything Black", released under the record label Monstercat in 2017, which he produced with Philadelphia-based vocalist and DJ Mike Taylor.',
    genres: ['Electronic', 'Pop', 'Alternative', 'Indie'], // <-- масив жанрів
  },
];

// Імітація Axios
export const fetchArtistById = async id => {
  return new Promise(resolve => {
    setTimeout(() => {
      const artist = artists.find(a => a.id === Number(id));
      resolve({ data: artist });
    }, 200);
  });
};
