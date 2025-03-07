import { useState, useEffect } from "react";
import axios from "axios";

const BookmarkButton = ({ investorId, userId }) => {
  const [bookmarked, setBookmarked] = useState(false);

  useEffect(() => {
    // Check if the investor is already bookmarked
    axios
      .get("http://localhost:5000/bookmark",{ headers: { "token" :localStorage.getItem("token") } })
      .then((res) => {
        if (res.data.some((investor) => investor._id === investorId)) {
          setBookmarked(true);
        }
      })
      .catch((err) => console.error(err));
  }, [investorId]);

  const toggleBookmark = async () => {
    try {
      if (bookmarked) {
        await axios.delete(`http://localhost:5000/bookmark/remove/${investorId}`, { headers: { "token" :localStorage.getItem("token") } });
      } else {
        await axios.post(
          "http://localhost:5000/bookmark/add",
          { id: investorId },
          { headers: { "token" :localStorage.getItem("token") } }
        );
      }
      setBookmarked(!bookmarked);
    } catch (error) {
      console.error("Error updating bookmark", error);
    }
  };

  return (
    <button
      className={`min-w-[150px] px-4 py-2 border border-[#75757569] rounded-md ${
        bookmarked ? "bg-[#75757569] text-white" : "text-[#adadad] bg-[#161616]"
      }`}
      onClick={toggleBookmark}
    >
      {bookmarked ? "Bookmarked" : "Bookmark"}
    </button>
  );
};

export default BookmarkButton;
