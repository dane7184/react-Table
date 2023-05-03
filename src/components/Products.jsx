import React, { useEffect } from "react"
import { useMemo } from "react"
import { useState } from "react"
import DataTable from "react-data-table-component"
import 'bootstrap/dist/css/bootstrap.min.css';

const Products = ({ data }) => {
  const [products, setProducts] = useState([])
  const [filterText, setFilterText] = useState("")
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false)
  const filteredItems = products.filter(
    (item) =>
      item.title && item.title.toLowerCase().includes(filterText.toLowerCase())
  )
  console.log(products)

  const columns = [
    {
      name: "Id",
      selector: (row) => row.id,
            sortable: true,
    },
    {
      name: "Product Name",
      selector: (row) => row.title,
            sortable: true,
    },
    {
      name: "Price",
      selector: (row) => row.price,
            sortable: true,
    },
    {
      name: "Category",
      selector: (row) => row.category.name,
            sortable: true,
    },
    {
      name: "Image",
      selector: (row) => (
        <img
          src={row.images}
          alt={row.title}
          width='100px'
          height='100px'
        />
      ),
    },

    {
      name: "Actions",
      selector: (row) => (
        <div>
          <button className='btn btn-primary mr-5'>Edit</button>
          <button className='btn btn-danger'>Delete</button>
        </div>
      ),
    },
  ]
  useEffect(() => {
    fetch("https://api.escuelajs.co/api/v1/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))

    //
  }, [])
  const subHeaderComponentMemo = React.useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle)
        setFilterText("")
      }
    }

    return (
      <input
        onChange={(e) => setFilterText(e.target.value)}
        onClear={handleClear}
        filterText={filterText}
        type='text'
        placeholder='Search'
        className='input input-bordered input-accent w-full max-w-xs text-white'
      />
    )
  }, [filterText, resetPaginationToggle])

  return (
    <>
      <DataTable
        title='Contact List'
        columns={columns}
        data={filteredItems}
        pagination 
                highlightOnHover
        paginationResetDefaultPage={resetPaginationToggle}
        subHeader
        subHeaderComponent={subHeaderComponentMemo}
        selectableRows
        persistTableHead
               
      />
    </>
  )
}

export default Products
