import React from "react";
import "./App.css";
import { Card, TextField, Button, Divider } from "@material-ui/core";
import YouTube from "react-youtube";
var validUrl = require("valid-url");
const youtube_regex = /^.*(youtu\.be\/|vi?\/|u\/\w\/|embed\/|\?vi?=|\&vi?=)([^#\&\?]*).*/;

function App() {
  const [url, setUrl] = React.useState("");
  const [playlist, setPlaylist] = React.useState([]);
  const [link, setLink] = React.useState("");

  // this function return ID from youtube url
  const youtube_id = url => {
    const parsed = url.match(youtube_regex);
    if (parsed && parsed[2]) {
      return parsed[2];
    }
  };
  if (validUrl.isUri("https://www.youtube.com/watch?v=_B9U2qvdLeo")) {
    console.log("Looks like an URI");
  } else {
    console.log("Not a URI");
  }

  // this function create ID from a valid url and push to playlist table
  const add_Url = e => {
    if (url && validUrl.isUri(url)) {
      let mylist = playlist;
      if (youtube_id(url) !== undefined) {
        mylist.push(youtube_id(url));
        setPlaylist(mylist);
        setUrl("");
        if (playlist.length === 1) {
          setLink(youtube_id(url));
        }
      } else {
        window.alert("This is not a youtube video url");
      }
    } else {
      window.alert("Url is not valid");
    }
  };

  // this function delets data from playlist
  const deleteFromPlaylist = i => {
    let mylist = playlist;
    mylist.splice(i, 1);
    setPlaylist(mylist);
  };

  // this function from react-youtube module, it helps to autoplay
  const opts = {
    height: "390",
    width: "640",
    playerVars: {
      autoplay: 1
    }
  };

  // this function returns a jsx for playlist
  function myplaylist() {
    return playlist.map((e, i) => {
      return (
        <div key={i}>
          <div className="playlist-div">
            <h3>{`Link ${i + 1}`}</h3>
            <h3 id="close-icon" onClick={() => deleteFromPlaylist(i)}>
              x
            </h3>
          </div>
          <Divider />
        </div>
      );
    });
  }

  // this function is for deleting already played video and replay next
  const func = () => {
    let mylist = playlist;
    if (mylist.length > 0) {
      mylist.splice(0, 1);
      setLink(mylist[0]);
    } else {
      setLink("");
    }
  };

  // const errorHandler =()=>{
    
  // }

  return (
    <div className="App">
      <div className="div-1">
        <Card className="textfield-card">
          <TextField
            fullWidth
            id="outlined-basic"
            label="Outlined"
            variant="outlined"
            value={url}
            onChange={e => {
              setUrl(e.target.value);
            }}
          />
          <Button
            onClick={add_Url}
            style={{
              background: "red",
              color: "white",
              fontWeight: "bold",
              width: "20%",
              maxWidth: "150px"
            }}
          >
            Add
          </Button>
        </Card>
        <div className="iframe-div">
          <YouTube
            videoId={link}
            containerClassName={"cont-string"}
            className={"string"}
            opts={opts}
            onEnd={func}
            onError={()=>{func()}} 
          />
        </div>
      </div>
      <hr />
      <div className="div-2">
        <div>
          <Button
            style={{
              background: "#2196f3",
              color: "white",
              fontWeight: "bold",
              width: "100%",
              height: "78px",
              fontSize: "larger"
            }}
          >
            Playlist
          </Button>
          {myplaylist()}
        </div>
      </div>
    </div>
  );
}

export default App;
