import React from "react";
import {
  BookOpen,
  Sparkles,
  Rocket,
  Shield,
  Heart,
  ScrollText,
  Brain,
  Feather,
  Users,
  Ghost,
} from "lucide-react";

const genres = [
  { name: "Fiction", icon: BookOpen, image: "https://images.unsplash.com/photo-1512820790803-83ca734da794" },
  { name: "Fantasy", icon: Sparkles, image: "https://images.unsplash.com/photo-1507842217343-583bb7270b66" },
  { name: "Science Fiction", icon: Rocket, image: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa" },
  { name: "Mystery & Thriller", icon: Shield, image: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d" },
  { name: "Romance", icon: Heart, image: "https://images.unsplash.com/photo-1492724441997-5dc865305da7" },
  { name: "Historical Fiction", icon: ScrollText, image: "https://images.unsplash.com/photo-1524578271613-d550eacf6090" },
  { name: "Non-Fiction", icon: Brain, image: "https://images.unsplash.com/photo-1455885661740-29cbf08a42fa" },
  { name: "Self-Development", icon: Brain, image: "https://images.unsplash.com/photo-1519681393784-d120267933ba" },
  { name: "Poetry", icon: Feather, image: "https://images.unsplash.com/photo-1476275466078-4007374efbbe" },
  { name: "Young Adult", icon: Users, image: "https://images.unsplash.com/photo-1516979187457-637abb4f9353" },
  { name: "Horror", icon: Ghost, image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee" },
  { name: "Classics", icon: BookOpen, image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f" }
];

const BookGenresPage = () => {
  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Explore Genres</h2>

      <div style={styles.grid}>
        {genres.map((genre, index) => {
          const Icon = genre.icon;

          return (
            <div
              key={index}
              style={{
                ...styles.card,
                backgroundImage: `url(${genre.image})`,
              }}
            >
              <div style={styles.overlay}>
                <Icon size={28} />
                <span style={styles.name}>{genre.name}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
  },
  title: {
    fontSize: "22px",
    fontWeight: "600",
    marginBottom: "20px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
    gap: "20px",
  },
  card: {
    height: "180px",
    backgroundSize: "cover",
    backgroundPosition: "center",
    borderRadius: "12px",
    overflow: "hidden",
    cursor: "pointer",
    transition: "transform 0.3s ease",
    display: "flex",
    alignItems: "flex-end",
  },
  overlay: {
    width: "100%",
    background: "rgba(0,0,0,0.55)",
    color: "white",
    padding: "15px",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    backdropFilter: "blur(4px)",
  },
  name: {
    fontSize: "15px",
    fontWeight: "500",
  },
};

export default BookGenresPage;