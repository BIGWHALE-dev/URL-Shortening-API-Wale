import { useState } from "react";
import "./SearchBar.css";

function SearchBar(prop) {
  const [inputLink, setInputLink] = useState("");
  const [errMessage, setErrMessage] = useState("");

  async function requestHandler(e) {
    try {
      e.preventDefault();

      if (!inputLink) return setErrMessage("Please add a link");
      const res = await fetch(
        "https://cors-anywhere.com/" + "https://cleanuri.com/api/v1/shorten",
        {
          method: "POST",
          headers: { "content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams({ url: inputLink }),
        },
      );

      if (!res.ok)
        throw new Error(`Unable to shorten link, try again (${res.status})`);
      const data = await res.json();
      const shortenedResult = data.result_url;
      prop.onReceiveShortLink({ inputLink, shortenedResult });
      setInputLink("");
    } catch (err) {
      console.error(err.message);
    }
  }

  return (
    <div className="search-bar_container">
      <form onSubmit={requestHandler}>
        <div className={`input-err__container ${errMessage ? "error" : ""}`}>
          <input
            type="search"
            placeholder="Shorten a link here..."
            name="search"
            id="search_bar"
            value={inputLink}
            onChange={(e) => {
              const link = e.target.value;
              setInputLink(link);
            }}
            onInput={() => setErrMessage("")}
          />
          <p className="error_msg">{errMessage}</p>
        </div>
        <input type="submit" className="search-btn" value="Shorten It!" />
      </form>
    </div>
  );
}

export default SearchBar;
// "https://corsproxy.io/?"
