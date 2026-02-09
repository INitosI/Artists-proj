const artists = [
  {
    id: '65adae31af9f6d155db4b2fa',
    name: 'Fake Artist',
    yearsActive: '2013–present',
    sex: 'Male',
    members: '1',
    country: 'United States',
    bio: 'Armond Arabshahi, known by his stage name Unlike Pluto, is an American singer, songwriter, music producer, and former DJ. He is mainly known for his song "Everything Black", released under the record label Monstercat in 2017, which he produced with Philadelphia-based vocalist and DJ Mike Taylor.',
    genres: ['Pop', 'Electronic', 'Indie'],
  },
];

export const fetchArtistById = async id => {
  await new Promise(resolve => setTimeout(resolve, 200));
  return artists.find(artist => artist.id === id);
};
