import { Alert, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField, Typography } from "@mui/material"
import { useEffect, useState } from "react";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate, useParams } from "react-router-dom";
import { CreateItemPayload, StockItem, UpdateItemPayload } from "../interfaces";
import { createNewStockItem, deleteItemById, getItemById, restockItem, updateStockItem } from "../api/stockApi";

const validationSchema = Yup.object({
    itemName: Yup.string()
        .min(2, 'Item Name must be at least 2 characters')
        .required('Item Name is required'),
    quantity: Yup.number()
        .positive('Quantity must be a positive number')
        .required('Quantity is required'),
    price: Yup.number()
        .positive('Price must be a positive number')
        .required('Price is required'),
    description: Yup.string()
        .min(10, 'Description must be at least 10 characters')
        .required('Description is required'),
});


const ItemInfo = () => {
    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate();
    const [stockItem, setStockItem] = useState<StockItem | null | undefined>(undefined)
    const [isEditable, setIsEditable] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [openRestockDialog, setOpenRestockDialog] = useState(false);
    const [restockAmount, setRestockAmount] = useState<number>(0);
    const [isItemDeleted, setIsItemDeleted] = useState(false)

    const fetchData = async () => {
        if (id)
            setStockItem((await getItemById(id)))
    }

    useEffect(() => {
        fetchData()
    }, [])

    const formik = useFormik({
        initialValues: {
            itemName: stockItem?.itemName,
            quantity: stockItem?.quantity,
            price: stockItem?.price,
            description: stockItem?.description,
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            console.log(values);
            const payload: UpdateItemPayload = {
                price: Number(values.price),
                description: values.description ? values.description : ""
            }
            try {
                if (id) {
                    const resultObject = await updateStockItem(id, payload)
                    if (resultObject) { //item created
                        console.log("result: ", resultObject)
                        window.location.reload()
                    } else {
                        window.location.reload()
                    }
                }
            } catch (error) {
                window.location.reload()
            }
        },
    });

    const handleRestock = () => {
        setOpenRestockDialog(true);
    };

    const handleEdit = () => {
        setIsEditable(true);
    };

    const handleSave = () => {
        formik.handleSubmit();
        // Logic to save edited details
    };

    const handleDelete = async () => {
        if (id) {
            await deleteItemById(id)
            // navigate(-1)
            setIsItemDeleted(true)
            setOpenDialog(false);
        }
    };

    const handleRestockConfirm = async () => {
        if (id) {
            const result = await restockItem(id, restockAmount)
            setOpenRestockDialog(false);
            if (result) {
                window.location.reload()
            }
        }
    };

    const handleRestockChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRestockAmount(Number(event.target.value));
    };

    const handleOpenDialog = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    return (
        <Box
            component="form"
            onSubmit={formik.handleSubmit}
            sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%', maxWidth: 400 }}
        >
            {
                isItemDeleted ?
                    <Alert severity="error">Item deleted. <Button onClick={() => navigate(-1)}>go back</Button></Alert>
                    :
                    <>
                        {stockItem ?
                            <><Typography variant="h6">Item name</Typography>


                                <TextField
                                    label="Item Name"
                                    variant="outlined"
                                    name="itemName"
                                    defaultValue={stockItem.itemName}
                                    value={formik.values.itemName}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.itemName && Boolean(formik.errors.itemName)}
                                    helperText={formik.touched.itemName && formik.errors.itemName}
                                    required
                                    disabled
                                />

                                <TextField
                                    label="Quantity"
                                    variant="outlined"
                                    name="quantity"
                                    type="number"
                                    defaultValue={stockItem.quantity}
                                    value={formik.values.quantity}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.quantity && Boolean(formik.errors.quantity)}
                                    helperText={formik.touched.quantity && formik.errors.quantity}
                                    disabled
                                />

                                <TextField
                                    label="Price"
                                    variant="outlined"
                                    name="price"
                                    type="number"
                                    value={formik.values.price}
                                    onChange={formik.handleChange}
                                    defaultValue={stockItem.price}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.price && Boolean(formik.errors.price)}
                                    helperText={formik.touched.price && formik.errors.price}
                                />

                                <TextField
                                    label="Description"
                                    variant="outlined"
                                    name="desdefaultValue={stockItem.quantity}cription"
                                    value={formik.values.description}
                                    defaultValue={stockItem.description}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    multiline
                                    rows={4}
                                    error={formik.touched.description && Boolean(formik.errors.description)}
                                    helperText={formik.touched.description && formik.errors.description}
                                />

                                <Stack direction="row" spacing={2}>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={handleRestock}
                                    >
                                        Restock Item
                                    </Button>


                                    <Button
                                        variant="contained"
                                        color="success"
                                        onClick={handleSave}
                                    >
                                        Save Changes
                                    </Button>

                                    <Button
                                        variant="contained"
                                        color="error"
                                        onClick={handleOpenDialog}
                                    >
                                        Delete Item
                                    </Button>
                                </Stack>

                                <Dialog
                                    open={openDialog}
                                    onClose={handleCloseDialog}
                                >
                                    <DialogTitle>Confirm Deletion</DialogTitle>
                                    <DialogContent>
                                        Are you sure you want to delete this item?
                                    </DialogContent>
                                    <DialogActions>
                                        <Button onClick={handleCloseDialog} color="primary">
                                            Cancel
                                        </Button>
                                        <Button onClick={handleDelete} color="error">
                                            Delete
                                        </Button>
                                    </DialogActions>
                                </Dialog>


                                {/* Restock Dialog */}
                                <Dialog
                                    open={openRestockDialog}
                                    onClose={() => setOpenRestockDialog(false)}
                                >
                                    <DialogTitle>Restock Item</DialogTitle>
                                    <DialogContent>
                                        <TextField
                                            autoFocus
                                            margin="dense"
                                            label="Restock Amount"
                                            type="number"
                                            fullWidth
                                            variant="outlined"
                                            value={restockAmount}
                                            onChange={handleRestockChange}
                                        />
                                    </DialogContent>
                                    <DialogActions>
                                        <Button onClick={() => setOpenRestockDialog(false)} color="primary">
                                            Cancel
                                        </Button>
                                        <Button onClick={handleRestockConfirm} color="primary">
                                            Confirm
                                        </Button>
                                    </DialogActions>
                                </Dialog></>
                            :
                            <Alert severity="error">Not found</Alert>}
                    </>

            }

        </Box>
    )
}

export default ItemInfo
