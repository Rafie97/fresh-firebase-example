import { useEffect, useState } from "preact";
import firebase from "firebase";
import Item from "../models/item/Item.ts";

type ItemCardProps = {
  item: Item;
  handleItemChange: (newItem: Item) => Promise<void>;
};

function ItemCard({ item, handleItemChange }: ItemCardProps) {
  //   item: props.data,
  //   edit: false,
  //   tempName: props.data.name,
  //   tempPrice: props.data.price,
  //   uploading: false,

  //   const timeRef = new Date("August 30, 2020 00:00:00");
  //   const diffRef = timeRef.getTime();
  //   this.diffRef = diffRef;

  //   //Refs
  //   this.fileForm = React.createRef();

  //   //Binds
  //   this.toggleEdit = this.toggleEdit.bind(this);
  //   this.submitEdit = this.submitEdit.bind(this);
  //   this.onFormChange = this.onFormChange.bind(this);
  //   this.autoPriceChange = this.autoPriceChange.bind(this);

  //   this.autoPriceChange();

  function toggleEdit() {
    const { edit } = this.state;
    this.setState({ edit: !edit });
  }

  function onFormChange(event) {
    const value = event.target.value;
    const name = event.target.id;

    this.setState({ [name]: value });
  }

  async function submitEdit(event) {
    event.preventDefault();
    const { edit, tempName, tempPrice } = this.state;

    if (tempName !== this.state.item.name && tempName !== "") {
      const item = this.state.item;
      item.name = tempName;
      await this.setState({ item: item });
    }

    if (tempPrice !== this.state.item.price && tempPrice !== "") {
      const item = this.state.item;
      console.log("ITEM! ", item);
      const now = (Date.now() - this.diffRef).toString();
      console.log("price", item.priceHistory);
      item.priceHistory[now] = this.state.item.price;

      item.price = tempPrice;

      await this.setState({ item: item });
    }

    //Handle file upload
    if (this.fileForm.current.files[0]) {
      const file = this.fileForm.current.files[0];
      const photoRef = firebase.storage().ref("item_images/" + file.name);
      photoRef.put(file);

      let link;
      await photoRef.getDownloadURL().then((url) => {
        link = url;
      });

      const item = this.state.item;
      item.imageLink = link;
      await this.setState({ item: item });
    }

    const newItem = JSON.parse(JSON.stringify(this.state.item));
    this.props.handleItemChange(newItem);
    await this.setState({
      tempName: this.state.item.name,
      tempPrice: this.state.item.price,
      edit: !edit,
    });
  }

  return (
    <div
      className="card"
      key={this.state.item.docID}
      style={{ width: "18rem", margin: "1rem" }}
      bg="light"
      text="dark"
    >
      <body>
        <h2>
          <img
            style={{ maxHeight: 100, maxWidth: 100 }}
            src={this.state.item.imageLink}
            rounded={true}
          />
        </h2>
        <h1>{this.state.edit ? <></> : <h>{this.state.item.name}</h>}</h1>
        <p>{this.state.edit ? <></> : <h>${this.state.item.price}</h>}</p>
        <div>
          {this.state.edit ? (
            <form autoComplete="off" onSubmit={this.submitEdit}>
              <control
                id="tempName"
                type="text"
                onFocus={(event) => {
                  event.target.select();
                }}
                value={this.state.tempName}
                onChange={this.onFormChange}
              />
              <div style={{ flexDirection: "row" }}>
                <p style={{ width: 10, display: "inline-block" }}>$</p>
                <input
                  type="text"
                  id="tempPrice"
                  placeholder="0.00"
                  style={{ width: 100, margin: 20, display: "inline-block" }}
                  value={this.state.tempPrice}
                  onChange={this.onFormChange}
                />
              </div>

              <div style={{ height: "1rem" }}></div>
              <label className="form-control-file" style={{ marginBottom: 10 }}>
                Upload a photo of this item
              </label>
              <input
                type="file"
                ref={this.fileForm}
                class="form-control-file"
                onChange={() => this.setState({ uploading: true })}
              />
              <div style={{ height: "1rem" }}></div>
              <button
                type="button"
                onClick={this.submitEdit}
                variant="secondary"
              >
                Save
              </button>
            </form>
          ) : (
            <></>
          )}
          <button
            checked={this.state.edit}
            variant="primary"
            type="checkbox"
            onChange={this.toggleEdit}
          >
            {this.state.edit ? <h>Undo</h> : <h>Edit</h>}
          </button>
        </div>
      </body>
    </div>
  );
}

export default ItemCard;
