import React from "react";

export default function WishlistButton() {
  return (
    <button className="px-3 py-2 bg-white rounded-lg shadow-sm flex items-center gap-2">
      ❤️ <span className="text-sm">Wishlist</span>
    </button>
  );
}
import { useState } from "react";
import { FaHeart } from "react-icons/fa";

function WishlistButton() {
  const [liked, setLiked] = useState(false);

  return (
    <FaHeart
      size={24}
      color={liked ? "red" : "gray"}
      style={{ cursor: "pointer" }}
      onClick={() => setLiked(!liked)}
    />
  );
}

export default WishlistButton;