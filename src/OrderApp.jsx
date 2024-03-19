import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencil } from "@fortawesome/free-solid-svg-icons";
import { format } from "date-fns"; // Import format function from date-fns

function OrderApp() {
  const [items, setItems] = useState([
    {
      id: 1,
      name: "Minuman dingin",
      quantity: 10,
      date: "01/05/2026",
      address: "Jl. satu", // New field for delivery address
      isDone: false,
    },
  ]);
  const [editIndex, setEditIndex] = useState(null);
  const [editedName, setEditedName] = useState("");
  const [editedQuantity, setEditedQuantity] = useState(0);
  const [editedDate, setEditedDate] = useState("");
  const [editedAddress, setEditedAddress] = useState(""); // State for edited address
  const [searchTerm, setSearchTerm] = useState(""); // State for search term
  const [filterType, setFilterType] = useState("all"); // State for filtering items

  const addItem = (
    newItemName,
    newItemQuantity,
    newItemDate,
    newItemAddress
  ) => {
    // Validation for empty string and quantity
    if (newItemName.trim() === "" || newItemName.trim() === " ") {
      alert("Nama barang tidak boleh kosong!");
      return;
    }

    if (!newItemQuantity || isNaN(newItemQuantity) || newItemQuantity <= 0) {
      alert("Kuantitas harus diisi dengan angka yang lebih besar dari 0!");
      return;
    }

    // Check if item already exists
    const itemExists = items.some(
      (item) => item.name.toLowerCase() === newItemName.toLowerCase()
    );
    if (itemExists) {
      alert("Nama barang sudah ada sebelumnya");
      return;
    }

    // constraint for date
    const today = new Date();
    const selectedDate = new Date(newItemDate);
    if (selectedDate < today) {
      alert("Tanggal tidak boleh sebelum hari ini!");
      return;
    }

    if (!newItemDate) {
      alert("Tanggal tidak boleh kosong!");
      return;
    }

    // contraint for address
    if (newItemAddress.trim() === "" || newItemAddress.trim() === " ") {
      alert("Alamat tidak boleh kosong!");
      return;
    }

    setItems([
      ...items,
      {
        id: Date.now(),
        name: newItemName,
        quantity: newItemQuantity,
        date: newItemDate,
        address: newItemAddress, // Set the address for the new item
        isDone: false, // Newly added item is not done
      },
    ]);
  };

  const editItem = (index, updatedItem) => {
    // Validation for empty string and quantity
    if (updatedItem.name.trim() === "" || updatedItem.name.trim() === " ") {
      alert("Nama barang tidak boleh kosong!");
      return;
    }

    if (
      !updatedItem.quantity ||
      isNaN(updatedItem.quantity) ||
      updatedItem.quantity <= 0
    ) {
      alert("Kuantitas harus diisi dengan angka yang lebih besar dari 0!");
      return;
    }

    // constraint for date
    const today = new Date();
    const selectedDate = new Date(updatedItem.date);
    if (selectedDate < today) {
      alert("Tanggal tidak boleh sebelum hari ini!");
      return;
    }

    if (!updatedItem.date) {
      alert("Tanggal tidak boleh kosong!");
      return;
    }

    // contraint for address
    if (
      updatedItem.address.trim() === "" ||
      updatedItem.address.trim() === " "
    ) {
      alert("Alamat tidak boleh kosong!");
      return;
    }

    // Check if there are no changes
    if (
      updatedItem.name === items[index].name &&
      updatedItem.quantity === items[index].quantity &&
      updatedItem.date === items[index].date &&
      updatedItem.address === items[index].address
    ) {
      setEditIndex(null);
      return;
    }

    // Check if the edited name already exists
    const editedNameExists = items.some(
      (item, i) =>
        i !== index &&
        item.name.toLowerCase() === updatedItem.name.toLowerCase()
    );
    if (editedNameExists) {
      alert("Nama barang sudah ada dalam daftar!");
      return;
    }

    const updatedItems = [...items];
    updatedItems[index] = updatedItem;
    setItems(updatedItems);
    setEditIndex(null);
  };

  const removeItem = (index) => {
    setItems(items.filter((item, i) => i !== index));
    setEditIndex(null);
  };

  // Function to toggle the isDone property
  const toggleDone = (index) => {
    const updatedItems = [...items];
    updatedItems[index].isDone = !updatedItems[index].isDone;
    setItems(updatedItems);
  };

  // Filtered item
  const filteredItems = items.filter((item) => {
    // semua
    if (filterType === "all") {
      return item.name.toLowerCase().includes(searchTerm.toLowerCase());
    } else if (filterType === "notShip") {
      //belum dikirim
      return (
        !item.isDone &&
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    } else {
      // sudah dikirim
      return (
        item.isDone &&
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
  });

  return (
    <div className="flex flex-col items-center justify-center bg-[]">
      <div className="flex flex-col">
        <h1 className="text-3xl font-bold pb-5 pt-20">Order App</h1>
      </div>
      <div className="flex-col rounded-md shadow-md py-8 px-8">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const newItemName = e.target.itemName.value;
            const newItemQuantity = parseInt(e.target.itemQuantity.value);
            const newItemDate = e.target.itemDate.value;
            const newItemAddress = e.target.itemAddress.value; // Get address from form
            addItem(newItemName, newItemQuantity, newItemDate, newItemAddress);
            e.target.reset();
          }}
        >
          <div>
            <div className="flex flex-row mb-2">
              <label htmlFor="dateInput">Nama barang:</label>
              <input
                className="border border-gray-500 py-1.5 rounded-md pl-5 ml-[60px] w-[600px] "
                type="text"
                name="itemName"
                placeholder="Nama barang"
              />
            </div>
            <div className="flex flex-row mb-2">
              <label>Jumlah barang:</label>
              <input
                className="border border-gray-500 py-1.5 rounded-md pl-5 ml-[50px] w-[600px]"
                type="number"
                name="itemQuantity"
                placeholder="Kuantitas"
              />
            </div>
            <div className="flex flex-row mb-2">
              <label>Alamat Pengantaran:</label>
              <input
                className="border border-gray-500 py-1.5 rounded-md px-5 ml-[11px] w-[600px]"
                type="text"
                name="itemAddress"
                placeholder="Alamat pengantaran"
              />
            </div>
            <div className="flex flex-row mb-2">
              <label>Tanggal Pengiriman:</label>
              <input
                className="border border-gray-500 py-1.5 rounded-md px-5 ml-[15px] w-[600px] text-gray-400"
                type="date"
                name="itemDate"
                placeholder="Select Date"
              />
            </div>
          </div>
          <div className="flex pt-3">
            <button
              className=" text-white text-base font-medium px-3 py-2  rounded-md w-[760px]"
              type="submit"
            >
              Tambah Pesanan
            </button>
          </div>
        </form>
      </div>
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-3xl font-bold pb-5 pt-8 mt-5">Daftar Pesanan</h1>
      </div>
      <div className="flex-col rounded-md shadow-md py-8 px-8">
        {/* Filter buttons */}
        <div className="flex gap-2 mb-4">
          <button
            className={`w-[250px] h-[40px] ${
              filterType === "all" ? "bg-[#49a09d]" : ""
            }`}
            onClick={() => setFilterType("all")}
          >
            All
          </button>
          <button
            className={`w-[250px] h-[40px] ${
              filterType === "notShip" ? "bg-[#49a09d]" : ""
            }`}
            onClick={() => setFilterType("notShip")}
          >
            Belum Dikirim
          </button>
          <button
            className={`w-[250px] h-[40px] ${
              filterType === "done" ? "bg-[#49a09d]" : ""
            }`}
            onClick={() => setFilterType("done")}
          >
            Sudah Dikirim
          </button>
        </div>

        <input
          type="text"
          placeholder="Cari nama barang..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-500 py-1.5 rounded-md px-3 mb-4 w-[770px]"
        />
        <table className="justify-start text-left mt-4 p-8">
          <thead>
            <tr>
              <th></th>
              <th>Nama Barang</th>
              <th>Jumlah</th>
              <th>Alamat Pengantaran</th>
              <th>Tanggal Pengiriman</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filteredItems.map((item, index) => (
              <tr key={item.id} className={item.isDone ? "completed" : ""}>
                {editIndex === index ? (
                  <>
                    <td></td>
                    <td>
                      <input
                        className="border border-gray-500 py-1.5 rounded-md pl-3 mr-2 bg-white"
                        type="text"
                        value={editedName === "" ? item.name : editedName}
                        onChange={(e) => setEditedName(e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        className="border border-gray-500 py-1.5 rounded-md pl-3 mt-2 mr-2 bg-white"
                        type="number"
                        value={
                          editedQuantity === 0 ? item.quantity : editedQuantity
                        }
                        onChange={(e) =>
                          setEditedQuantity(parseInt(e.target.value))
                        }
                      />
                    </td>
                    <td>
                      <input
                        className="border border-gray-500 py-1.5 rounded-md pl-3 mt-2 mr-2 bg-white"
                        type="text"
                        value={
                          editedAddress === "" ? item.address : editedAddress
                        }
                        onChange={(e) => setEditedAddress(e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        className="border border-gray-500 py-1.5 rounded-md pl-3 mt-2 mr-2 bg-white"
                        type="date"
                        value={editedDate === "" ? item.date : editedDate}
                        onChange={(e) => setEditedDate(e.target.value)}
                      />
                    </td>

                    <td>
                      <button
                        className="bg-green-500 text-white text-base font-medium py-1 px-2 rounded-md mr-2 "
                        onClick={() => {
                          if (
                            editedName.trim() !== "" ||
                            editedQuantity !== ""
                          ) {
                            editItem(index, {
                              ...item,
                              name:
                                editedName.trim() !== ""
                                  ? editedName.trim()
                                  : item.name,
                              quantity:
                                editedQuantity !== ""
                                  ? parseInt(editedQuantity)
                                  : item.quantity,
                              date: editedDate !== "" ? editedDate : item.date,
                              address:
                                editedAddress !== ""
                                  ? editedAddress
                                  : item.address,
                            });
                          }
                        }}
                      >
                        Simpan
                      </button>
                      <button
                        className="bg-red-500 text-white text-base font-medium py-1 px-2 rounded-md"
                        onClick={() => setEditIndex(null)}
                      >
                        Batal
                      </button>
                    </td>
                  </>
                ) : (
                  <>
                    <td className="border border-b-slate-800 px-3 py-2">
                      <input
                        type="checkbox"
                        checked={item.isDone}
                        onChange={() => toggleDone(index)}
                      />
                    </td>
                    <td className="border border-b-slate-800 px-3 py-2">
                      <span
                        className={
                          item.isDone ? "line-through text-red-600" : ""
                        }
                      >
                        {item.name}
                      </span>
                    </td>
                    <td
                      className={
                        item.isDone
                          ? "line-through border border-b-slate-800 px-3 py-2 text-red-600"
                          : "border border-b-slate-800 px-3 py-2"
                      }
                    >
                      {item.quantity}
                    </td>
                    <td
                      className={
                        item.isDone
                          ? "line-through border border-b-slate-800 px-3 py-2 text-red-600"
                          : "border border-b-slate-800 px-3 py-2"
                      }
                    >
                      {item.address}
                    </td>
                    <td
                      className={
                        item.isDone
                          ? "line-through border border-b-slate-800 px-3 py-2 text-red-600"
                          : "border border-b-slate-800 px-3 py-2"
                      }
                    >
                      {format(new Date(item.date), "MM/dd/yyyy")}
                    </td>

                    <td className="border border-b-slate-800 px-3 py-2 text-red-600">
                      <button
                        className="bg-yellow-500 text-white text-base font-medium py-1 px-2 rounded-md mr-2"
                        onClick={() => {
                          setEditIndex(index);
                          setEditedName(item.name);
                          setEditedQuantity(item.quantity);
                          setEditedDate(item.date);
                          setEditedAddress(item.address);
                        }}
                      >
                        <FontAwesomeIcon icon={faPencil} />
                      </button>
                      <button
                        className="bg-red-500 text-white text-base font-medium py-1 px-2 rounded-md"
                        onClick={() => removeItem(index)}
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-center gap-4 mt-4">
          <button
            className="bg-red-500 text-white text-base font-medium py-2 px-4 rounded-md"
            onClick={() => setItems([])}
          >
            Delete Semua
          </button>
          <button
            className="bg-red-500 text-white text-base font-medium py-2 px-4 rounded-md"
            onClick={() => {
              const notShippedItems = items.filter((item) => !item.isDone);
              setItems(notShippedItems);
            }}
          >
            Delete Barang Sudah dikirim
          </button>
        </div>
      </div>
    </div>
  );
}

export default OrderApp;
