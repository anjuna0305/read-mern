import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  TextField,
  Button,
  Grid,
  Typography,
  Container,
  IconButton,
} from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import DeleteIcon from '@mui/icons-material/Delete';

interface Item {
  id: number;
  itemCode: string;
  description: string;
  quantity: number;
  unitPrice: number;
  taxRate: number;
  discountRate: number;
  totalPrice: number;
}

interface PurchaseOrderFormValues {
  poNumber: string;
  date: string;
  buyer: string;
  buyerConNum: string;
  status: string;
}

const fetchItemDetails = async (itemCode: string) => {
  // Replace this with actual API call
  return {
    description: `Item ${itemCode} Description`,
    unitPrice: 100.0,
    taxRate: 0.18,
    discountRate: 0.05,
  };
};

const validationSchema = Yup.object({
  poNumber: Yup.string().required('Purchase Order Number is required'),
  date: Yup.string().required('Date is required'),
  buyer: Yup.string().required('Buyer name is required'),
  buyerConNum: Yup.string().required('Buyer Contact Number is required'),
});

const getCurrentDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0'); // Add leading zero if needed
  const day = String(today.getDate()).padStart(2, '0'); // Add leading zero if needed
  return `${year}-${month}-${day}`;
};

const CreatePO: React.FC = () => {
  const [items, setItems] = useState<Item[]>([
    {
      id: Date.now(),
      itemCode: '',
      description: '',
      quantity: 1,
      unitPrice: 0,
      taxRate: 0,
      discountRate: 0,
      totalPrice: 0,
    },
  ]);

  const formik = useFormik<PurchaseOrderFormValues>({
    initialValues: {
      poNumber: '',
      date: getCurrentDate(),
      buyer: '',
      buyerConNum: '',
      status: 'draft',
    },
    validationSchema,
    // onSubmit: (values) => {
    //   console.log('Purchase Order Data:', { ...values, items });
    // },
  });

  const handleAddItem = () => {
    setItems([
      ...items,
      {
        id: Date.now(),
        itemCode: '',
        description: '',
        quantity: 1,
        unitPrice: 0,
        taxRate: 0,
        discountRate: 0,
        totalPrice: 0,
      },
    ]);
  };

  const handleRemoveItem = (id: number) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const handleItemCodeChange = async (id: number, value: string) => {
    const newItemDetails = await fetchItemDetails(value);
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? {
              ...item,
              itemCode: value,
              description: newItemDetails.description,
              unitPrice: newItemDetails.unitPrice,
              taxRate: newItemDetails.taxRate,
              discountRate: newItemDetails.discountRate,
              totalPrice:
                newItemDetails.unitPrice *
                item.quantity *
                (1 + newItemDetails.taxRate - newItemDetails.discountRate),
            }
          : item
      )
    );
  };

  const handleQuantityChange = (id: number, value: number) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: value,
              totalPrice:
                item.unitPrice *
                value *
                (1 + item.taxRate - item.discountRate),
            }
          : item
      )
    );
  };

  const handleIncreaseQuantity = (id: number) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity + 1,
              totalPrice:
                item.unitPrice *
                (item.quantity + 1) *
                (1 + item.taxRate - item.discountRate),
            }
          : item
      )
    );
  };

  const handleDecreaseQuantity = (id: number) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id && item.quantity > 1
          ? {
              ...item,
              quantity: item.quantity - 1,
              totalPrice:
                item.unitPrice *
                (item.quantity - 1) *
                (1 + item.taxRate - item.discountRate),
            }
          : item
      )
    );
  };

  const calculateTotalPrice = () => {
    return items
      .reduce((acc, item) => acc + item.totalPrice, 0)
      .toFixed(2);
  };

  const handleSubmit = () => {
    formik.setFieldValue('status', 'submitted');
    formik.submitForm();
  };

  const handleCancel = () => {
    formik.resetForm();
  };
  const handleDraft = () => {
    formik.setFieldValue('status', 'draft');
    formik.submitForm();
  }; 

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>
        Create Purchase Order
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <TextField
              fullWidth
              id="poNumber"
              name="poNumber"
              label="Purchase Order Number"
              value={formik.values.poNumber}
              onChange={formik.handleChange}
              error={formik.touched.poNumber && Boolean(formik.errors.poNumber)}
              helperText={formik.touched.poNumber && formik.errors.poNumber}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              id="date"
              name="date"
              label="Date"
              type="date"
              value={formik.values.date}
              onChange={formik.handleChange}
              error={formik.touched.date && Boolean(formik.errors.date)}
              helperText={formik.touched.date && formik.errors.date}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              id="buyer"
              name="buyer"
              label="Buyer Name"
              value={formik.values.buyer}
              onChange={formik.handleChange}
              error={formik.touched.buyer && Boolean(formik.errors.buyer)}
              helperText={formik.touched.buyer && formik.errors.buyer}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              id="buyerConNum"
              name="buyerConNum"
              label="Buyer Contact Number"
              value={formik.values.buyerConNum}
              onChange={formik.handleChange}
              error={formik.touched.buyerConNum && Boolean(formik.errors.buyerConNum)}
              helperText={formik.touched.buyerConNum && formik.errors.buyerConNum}
            />
          </Grid>

          <Grid item xs={12} >
            {items.map((item, index) => (
              <Grid item xs={12} style={{ marginTop: 15 }}>
              <Grid container spacing={2} key={item.id} alignItems="center">
                <Grid item xs={2}>
                  <TextField
                    fullWidth
                    id={`itemCode-${index}`}
                    name={`itemCode-${index}`}
                    label="Item Code"
                    value={item.itemCode}
                    onChange={(e) => handleItemCodeChange(item.id, e.target.value)}
                  />
                </Grid>
                <Grid item xs={3.5}>
                  <TextField
                    fullWidth
                    id={`description-${index}`}
                    name={`description-${index}`}
                    label="Description"
                    value={item.description}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </Grid>
                <Grid item xs={1.2} justifyContent={'flex-center'} container alignItems="center">
                  
                <TextField
                            fullWidth
                            id={`quantity-${index}`}
                            name={`quantity-${index}`}
                            label="Quantity"
                            type="number"
                            value={item.quantity}
                            onChange={(e) => handleQuantityChange(item.id, Number(e.target.value))}
                            InputProps={{
                              inputProps: { min: 1 },
                              style: { 
                                MozAppearance: 'textfield'  
                              },
                            }}
                            sx={{
                              '& input[type=number]': {
                                '-moz-appearance': 'textfield', 
                              },
                              '& input[type=number]::-webkit-outer-spin-button': {
                                '-webkit-appearance': 'none',
                                margin: 0,
                              },
                              '& input[type=number]::-webkit-inner-spin-button': {
                                '-webkit-appearance': 'none',
                                margin: 0,
                              },
                            }}
                          />

                 
                </Grid>
                <Grid item xs={1.6}>
                  <TextField
                    fullWidth
                    id={`unitPrice-${index}`}
                    name={`unitPrice-${index}`}
                    label="Unit Price"
                    value={item.unitPrice}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </Grid>
                <Grid item xs={2.7}>
                  <TextField
                    fullWidth
                    id={`totalPrice-${index}`}
                    name={`totalPrice-${index}`}
                    label="Total Price"
                    value={item.totalPrice.toFixed(2)}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </Grid>
                <Grid item xs={1}>
                  <IconButton onClick={() => handleRemoveItem(item.id)}>
                    <DeleteIcon color="error" />
                  </IconButton>
                </Grid>
              </Grid>
              </Grid>
            ))}
            <Grid container justifyContent="flex" style={{ marginTop: 3 }}>
              <IconButton onClick={handleAddItem}>
                <AddCircleIcon color="primary" style={{ fontSize: 40 }} />
              </IconButton>
            </Grid>
            <Grid container justifyContent="flex-end" style={{ marginTop: 10 }}>
              <Typography variant="h6"  style={{ marginRight: 30 }}>Total Price:  </Typography> 
              <Typography xs={2} variant="h6"style={{ marginLeft: 10,marginRight:90 }}>Rs. {calculateTotalPrice()}</Typography>
            </Grid>
            <Grid container justifyContent="center" style={{ marginTop: 20 }}>
              <Button
                color="black"
                variant="contained"
                style={{ width: 200,}}
                onClick={handleDraft}
              >
                Draft
              </Button>
              <Button
                color="primary"
                variant="contained"
                style={{ width: 200, marginRight: 40, marginLeft: 40 }}
                onClick={handleSubmit}
                type="submit"
              >
                Submit
              </Button>
              <Button
                color="error"
                variant="contained"
                style={{ width: 200, }}
                onClick={handleCancel}
              >
                Cancel
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default CreatePO;
