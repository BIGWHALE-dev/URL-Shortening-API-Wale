import { useState } from "react";
import "./SearchBar.css";

function SearchBar(prop) {
  const [inputLink, setInputLink] = useState("");
  const [errMessage, setErrMessage] = useState("");

  async function requestHandler(e) {
    try {
      e.preventDefault();
      const urlPattern = new RegExp(
        "^(https?:\\/\\/)?" + // protocol
          "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
          "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
          "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
          "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
          "(\\#[-a-z\\d_]*)?$",
        "i", // fragment locator
      );

      if (!urlPattern.test(inputLink)) {
        setErrMessage("Enter a valid link");
        return;
      }
      if (!inputLink) {
        setErrMessage("Please add a link");
        return;
      }

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
