/** @jsx h */
import { h } from "preact";
import { useEffect, useState, useRef } from "preact/hooks";
import firebase from "firebase";
import Item from "../models/item/Item.ts";

type ItemCardProps = Readonly<{
  inputItem: Item;
  handleItemChange: (newItem: Item) => Promise<void>;
}>;

function ItemCard({ inputItem, handleItemChange }: ItemCardProps) {
  //   item: props.data,
  //   edit: false,
  //   tempName: props.data.name,
  //   tempPrice: props.data.price,
  //   uploading: false,

  //   const timeRef = new Date("August 30, 2020 00:00:00");
  //   const diffRef = timeRef.getTime();
  //   this.diffRef = diffRef;

  //   //Refs
  //   this.fileForm = createRef();

  //   //Binds
  //   this.toggleEdit = this.toggleEdit.bind(this);
  //   this.submitEdit = this.submitEdit.bind(this);
  //   this.onFormChange = this.onFormChange.bind(this);
  //   this.autoPriceChange = this.autoPriceChange.bind(this);

  //   this.autoPriceChange();
  const [item, setItem] = useState<Item>(inputItem);
  const [edit, setEdit] = useState<boolean>(false);
  const [tempName, setTempName] = useState<string>("");
  const [tempPrice, setTempPrice] = useState<string>("");

  const fileForm = useRef(null);

  function toggleEdit() {
    setEdit(!edit);
  }

  function onFormChange(event) {
    const value = event.target.value;
    const name = event.target.id;

    // this.setState({ [name]: value });
  }

  async function submitEdit(event) {
    event.preventDefault();

    if (tempName !== item.name && tempName !== "") {
      const tempItem = item;
      tempItem.name = tempName;
      setItem(tempItem);
    }

    if (tempPrice !== item.price && tempPrice !== "") {
      const tempItem = item;
      console.log("ITEM! ", item);
      const now = Date.now() /*- this.diffRef*/
        .toString();
      console.log("price", item.priceHistory);
      tempItem.priceHistory[now] = item.price;

      tempItem.price = tempPrice;

      setItem(tempItem);
    }

    //Handle file upload
    if (fileForm.current.files[0]) {
      const file = fileForm.current.files[0];
      const photoRef = firebase.storage().ref("item_images/" + file.name);
      photoRef.put(file);

      let link;
      await photoRef.getDownloadURL().then((url) => {
        link = url;
      });

      setItem({ ...item, imageLink: link });
    }

    const newItem = JSON.parse(JSON.stringify(item));
    handleItemChange(newItem);
    setTempName(item.name);
    setTempPrice(item.price);
    setEdit(!edit);
  }

  return (
    <div
      className="card"
      // key={item.docID}
      style={{ width: "18rem", margin: "1rem" }}
      bg="light"
      text="dark"
    >
      <body>
        <h2>
          <img
            style={{ maxHeight: 100, maxWidth: 100 }}
            src={item.imageLink}
            rounded={true}
          />
        </h2>
        <h1>{edit ? <></> : <h>{item.name}</h>}</h1>
        <p>{edit ? <></> : <h>${item.price}</h>}</p>
        <div>
          {edit ? (
            <form
              autoComplete="off"
              // onSubmit={this.submitEdit}
            >
              <input
                id="tempName"
                type="text"
                onFocus={(event) => {
                  event.target.select();
                }}
                value={tempName}
                // onChange={this.onFormChange}
              />
              <div style={{ flexDirection: "row" }}>
                <p style={{ width: 10, display: "inline-block" }}>$</p>
                <input
                  type="text"
                  id="tempPrice"
                  placeholder="0.00"
                  style={{ width: 100, margin: 20, display: "inline-block" }}
                  value={tempPrice}
                  // onChange={this.onFormChange}
                />
              </div>

              <div style={{ height: "1rem" }}></div>
              <label className="form-control-file" style={{ marginBottom: 10 }}>
                Upload a photo of this item
              </label>
              <input
                type="file"
                ref={fileForm}
                class="form-control-file"
                // onChange={() => this.setState({ uploading: true })}
              />
              <div style={{ height: "1rem" }}></div>
              <button
                type="button"
                // onClick={this.submitEdit}
                variant="secondary"
              >
                Save
              </button>
            </form>
          ) : (
            <div></div>
          )}
          <button
            checked={edit}
            variant="primary"
            type="checkbox"
            // onChange={this.toggleEdit}
          >
            {edit ? <h>Undo</h> : <h>Edit</h>}
          </button>
        </div>
      </body>
    </div>
  );
}

export default ItemCard;
