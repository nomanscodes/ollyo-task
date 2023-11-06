import { useRef, useState } from "react";
import "./App.scss";
import { imaData } from "../imgdata";


function App() {
  // Define a state variable images
  const [images, setImages] = useState(imaData);

  // Define a state variable selectedItem
  const [selectedItems, setSelectedItems] = useState();

  // Function to toggle the is_checked
  const checkControler = (id) => {
    // Create a new array with updated is_checked values based on the provided 'id'.
    const updatedImages = images.map((item) => {
      if (item.id === id) {
        return { ...item, is_checked: !item.is_checked };
      }
      return item;
    });

    // Update the state variable images with the new array.
    setImages(updatedImages);

    // Filter the checked items and update the state variable selectedItem.
    const checkedItems = updatedImages.filter((item) => item.is_checked);
    setSelectedItems(checkedItems);
  };

  // Function to delete items
  const deleteControler = () => {
    // Filter the images array to keep only the selected items.
    const filteredItems = images.filter(
      (item) => !selectedItems.some((selected) => selected.id === item.id)
    );

    // Update the state variable images with the filtered array and clear the selected items.
    setImages(filteredItems);
    setSelectedItems([]);
  };

  // Dragged item index store
  const dragItem = useRef(null);

  // Dragged Over item index store
  const dragOverItem = useRef(null);

  //Function to sorting items
  const handleShort = () => {
    // Check if both dragItem and dragOverItem are defined
    if (dragItem.current !== null && dragOverItem.current !== null) {
      // Duplicate the images array to make a copy for modification
      const newImages = [...images];

      // Swap the positions of the dragged item and the dragged-over item
      [newImages[dragItem.current], newImages[dragOverItem.current]] = [
        newImages[dragOverItem.current],
        newImages[dragItem.current],
      ];

      // Reset the position references to null for the next drag-and-drop operation
      dragItem.current = null;
      dragOverItem.current = null;

      // Update the actual array with the modified copy
      setImages(newImages);
    }
  };

// Function new image upload 
  const handleImageUpload = (event) => {
    const file = event.target.files[0];

    if (file) {
      const url = URL.createObjectURL(file);
      // create new object 
      const newImage = {
        id: images.length + 1,
        img: url,
        is_checked: false,
      };
      //  push new object 
      setImages([...images, newImage]);
    }
  }

  return (
    <div className="image-gallary">
      <div className="image-gallary__container">
        {/* Start : header  */}
        <div className="image-gallary__header">
          {/* Start : selecet item conunt  */}
          <div className="image-gallary__header-left">
            <input type="checkbox" checked={selectedItems?.length > 0} />
            <span>{selectedItems?.length || 0}</span>
            <p> Files Selected</p>
          </div>
          {/* End : selecet item conunt  */}

          <div className="image-gallary__header-middel">
            <p> Ollyo Image Gallary</p>
          </div>
          {/* Start : delete btn  */}
          <button
            onClick={() => deleteControler()}
            className={`image-gallary__header-right ${
              selectedItems?.length > 0 ? `block` : `hidden`
            }`}
          >
            Delete Files
          </button>
          {/* End : delete btn  */}
        </div>
        {/* End : header  */}
        {/* Start : gallary container  */}
        <div className="image-gallary__main">
          {/* Start : single item  */}
          {images.map((item, index) => (
            <div
              key={index}
              className={`${index === 0 ? `feature-img` : ``} image-gallary__img group  `}
              draggable
              onDragStart={() => (dragItem.current = index)}
              onDragEnter={() => (dragOverItem.current = index)}
              onDragEnd={handleShort}
              onDragOver={(e) => e.preventDefault()}
            >
              <img src={item?.img} />
              <div
                className={`${ item.is_checked ? ` checked-overlay ` : ` hover-overlay `} `}
              >
                <input
                  onChange={() => checkControler(item.id)}
                  type="checkbox"
                  checked={item.is_checked}
                />
              </div>
            </div>
          ))}
          {/* Start : image upload  */}
          <div className="image-gallary__file-upload">
             <input accept="image/*" onChange={handleImageUpload} type="file"/>
       
              <img src="/file-upload.svg"/>
              <p>Add Image</p>
           
            </div>
          {/* End : image upload  */}

          {/* End : single item  */}
        </div>
        {/* End : gallary container  */}
      </div>
    </div>
  );
}

export default App;
