export class SelectedMusicModel {
  id: string;
  popularity: number;
  url: string;
  name: string;
  artist: string;
  image: string;
  artistImage: string;
  genre: string;
  followers: number;
  albums: any[];

  constructor(
    id: string,
    popularity: number,
    url: string,
    name: string,
    artist: string,
    image: string,
    artistImage: string,
    genre: string,
    followers: number,
    albums: any[]
  ) {
    this.id = id;
    this.popularity = popularity;
    this.url = url;
    this.name = name;
    this.artist = artist;
    this.image = image;
    this.artistImage = artistImage;
    this.genre = genre;
    this.followers = followers;
    this.albums = albums;
  }
}
