import React, {
  useImperativeHandle,
  forwardRef,
  useEffect,
  useState,
  useRef
} from "react";
import Draggable from "react-draggable";
import { toCanvas } from "html-to-image";

const Meme = forwardRef((props, ref) => {
  const [meme, setMeme] = useState({
    randomImage: "http://i.imgflip.com/1bij.jpg",
  });

  const [selectedImage, setSelectedImage] = useState(null);
  const imageInputRef = useRef(null);
  const [allMemes, setAllMemes] = useState([]);

  useEffect(() => {
    async function getMemes() {
      const res = await fetch("https://api.imgflip.com/get_memes");
      const data = await res.json();
      setAllMemes(data.data.memes);
    }

    if (!allMemes.length) {
      getMemes();
    }
  }, [allMemes]);


  const getMemeImage = () => {
    if (selectedImage) {
      setSelectedImage(null); // Reset selected image to display random meme
    } else {
      const randomNumber = Math.floor(Math.random() * allMemes.length);
      const url = allMemes[randomNumber].url;
      setMeme((prevMeme) => ({
        ...prevMeme,
        randomImage: url,
      }));
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        // Update the state with the selected image data URL
        setSelectedImage(e.target.result);
      };

      // Read the selected image as a data URL
      reader.readAsDataURL(file);
    }
  };

  const handleDownload = async () => {
    const container = document.querySelector(".meme-display");

    // Use toCanvas function to capture the content as a canvas element
    const canvas = await toCanvas(container);

    // Get the canvas data URL
    const dataUrl = canvas.toDataURL("image/png");

    // Create a link element
    const a = document.createElement("a");

    // Set the download attribute with the desired file name
    a.download = "custom-meme.png";

    // Set the href attribute with the data URL
    a.href = dataUrl;

    // Trigger a click event
    a.click();
  };

    // Function to trigger file input from an external element
    const triggerFileInput = () => {
      if (imageInputRef.current) {
        imageInputRef.current.click();
      }
    };

  // Expose getMemeImage function to the parent component
  useImperativeHandle(ref, () => ({
    getMemeImage,
    handleDownload,
    triggerFileInput,
  }));

  return (
    <div className="meme-display">
      {selectedImage ? (
        <img
          src={selectedImage}
          alt="Uploaded Meme"
          className="meme--image"
          crossOrigin="anonymous"
        />
      ) : (
        <img
          src={meme.randomImage}
          alt="Random Meme"
          className="meme--image"
          crossOrigin="anonymous"
        />
      )}
      <Draggable>
        <input className="input-text" placeholder="Edit This" />
      </Draggable>
      <div>
      <Draggable>
        <input className="input-text" placeholder="Edit This" />
      </Draggable>
      </div>
      <input
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        ref={imageInputRef}
        onChange={handleImageChange}
      />
    </div>
  );
});

export default Meme;
