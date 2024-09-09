import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField, Typography } from "@mui/material"
import { useState } from "react";
import { useFormik } from 'formik';
import * as Yup from 'yup';

interface StockItem {
    itemName: string;
    quantity: number;
    price: number;
    description: string;
}

interface StockItemDetailsProps {
    item: StockItem;
}

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
    const item = {
        itemName: "dummy name",
        quantity: 10,
        price: 200,
        description: "dummy description"
    }

    const formik = useFormik({
        initialValues: {
            itemName: item.itemName,
            quantity: item.quantity,
            price: item.price,
            description: item.description,
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            console.log("submit function called: ", values);
            setIsEditable(false);   
            // You can handle the submission here, like sending data to your backend
        },
    });

    const [isEditable, setIsEditable] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);

    const handleRestock = () => {
        // Logic to restock item
    };

    const handleEdit = () => {
        setIsEditable(true);
    };

    const handleSave = () => {
        formik.handleSubmit();
        // Logic to save edited details
    };

    const handleDelete = () => {
        // Logic to delete item
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
            <Typography variant="h6">Item name</Typography>


            <TextField
                label="Item Name"
                variant="outlined"
                name="itemName"
                defaultValue={item.itemName}
                value={formik.values.itemName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.itemName && Boolean(formik.errors.itemName)}
                helperText={formik.touched.itemName && formik.errors.itemName}
                required
                slotProps={{
                    input: {
                        readOnly: !isEditable,
                    },
                }}
            />

            {/* <TextField
                label="Quantity"
                variant="outlined"
                name="quantity"
                defaultValue={item.quantity}
                value={formik.values.quantity}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.quantity && Boolean(formik.errors.quantity)}
                helperText={formik.touched.quantity && formik.errors.quantity}
                slotProps={{
                    input: {
                        readOnly: !isEditable,
                    },
                }}
            /> */}

            <TextField
                label="Price"
                variant="outlined"
                name="price"
                defaultValue={item.price}
                value={formik.values.price}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.price && Boolean(formik.errors.price)}
                helperText={formik.touched.price && formik.errors.price}
                slotProps={{
                    input: {
                        readOnly: !isEditable,
                    },
                }}
            />

            <TextField
                label="Description"
                variant="outlined"
                name="description"
                defaultValue={item.description}
                value={formik.values.description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                multiline
                rows={4}
                error={formik.touched.description && Boolean(formik.errors.description)}
                helperText={formik.touched.description && formik.errors.description}
                slotProps={{
                    input: {
                        readOnly: !isEditable,
                    },
                }}
            />

            {
                !isEditable ?
                    <Button
                        color="secondary"
                        onClick={handleEdit}
                        type="button"
                    >
                        Edit Item
                    </Button> : <></>
            }

            <Stack direction="row" spacing={2}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleRestock}
                    type="button"
                >
                    Restock Item
                </Button>


                <Button
                    variant="contained"
                    color="success"
                    onClick={handleSave}
                    disabled={!isEditable}
                >
                    Save Changes
                </Button>

                <Button
                    variant="contained"
                    color="error"
                    onClick={handleDelete}
                    type="button"
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
        </Box>
    )
}

export default ItemInfo
