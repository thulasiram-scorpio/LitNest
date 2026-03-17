import React, { useState } from "react";
import "./FavoritesPage.css";

function Favorites() {

  const [favorites, setFavorites] = useState([
    {
      id:1,
      title:"The Silent Moon",
      author:"Ramesh Sangle",
      type:"Poem",
      cover:"https://m.media-amazon.com/images/I/71HmStt0FBS._AC_UF1000,1000_QL80_.jpg"
    },
    {
      id:2,
      title:"Dreams of Tomorrow",
      author:"R.B.Alid",
      type:"Story",
      cover:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSDWAzaI-UzoNFycN1HyhUb3QO0Unr97MYcw&s"
    },
    {
      id:3,
      title:"The Writer's Mind",
      author:"John Carter",
      type:"Essay",
      cover:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPgDUscE6Szu7w7tu9EtQjayUnXtlAiT_21w&s"
    }
  ]);

  const [search,setSearch] = useState("");
  const [filter,setFilter] = useState("All");

  const removeFavorite = (id)=>{
    setFavorites(favorites.filter(f => f.id !== id));
  };

  const filteredFavorites = favorites
  .filter(f =>
    f.title.toLowerCase().includes(search.toLowerCase())
  )
  .filter(f =>
    filter==="All" ? true : f.type === filter
  );

  return (

  <div className="favorites-container">

  <div className="favorites-header">

  <h1>❤️ My Favorites</h1>

  <p>Your saved literary works</p>

  </div>

  {/* Search + Filter */}

  <div className="favorites-toolbar">

  <input
  placeholder="Search favorites..."
  value={search}
  onChange={(e)=>setSearch(e.target.value)}
  />

  <select
  value={filter}
  onChange={(e)=>setFilter(e.target.value)}
  >
  <option>All</option>
  <option>Poem</option>
  <option>Story</option>
  <option>Essay</option>
  <option>Article</option>
  </select>

  </div>

  {/* Favorites Grid */}

  {filteredFavorites.length === 0 ? (

  <div className="empty-state">

  <h2>No Favorites Yet</h2>

  <p>Start exploring literature and save your favorites ❤️</p>

  </div>

  ) : (

  <div className="favorites-grid">

  {filteredFavorites.map(fav => (

  <div className="favorite-card" key={fav.id}>

  <img src={fav.cover} alt="cover"/>

  <div className="card-content">

  <span className="type-badge">{fav.type}</span>

  <h3>{fav.title}</h3>

  <p>by {fav.author}</p>

  <div className="card-actions">

  <button className="read-btn">
  Read
  </button>

  <button
  className="remove-btn"
  onClick={()=>removeFavorite(fav.id)}
  >
  Remove
  </button>

  </div>

  </div>

  </div>

  ))}

  </div>

  )}

  </div>

  );
}

export default Favorites;
