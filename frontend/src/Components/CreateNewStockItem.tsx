import { Box, Button, TextField, Typography } from "@mui/material"
import { useFormik } from 'formik';
import * as Yup from 'yup';

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

const CreateNewStockItem = () => {
    const formik = useFormik({
        initialValues: {
            itemName: '',
            quantity: '',
            price: '',
            description: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            console.log(values);
            // You can handle the submission here, like sending data to your backend
        },
    });


    return (
        <Box
            component="form"
            onSubmit={formik.handleSubmit}
            sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%', maxWidth: 400 }}
        >
            <Typography variant="h6">Add New Stock Item</Typography>

            <TextField
                label="Item Name"
                variant="outlined"
                name="itemName"
                value={formik.values.itemName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.itemName && Boolean(formik.errors.itemName)}
                helperText={formik.touched.itemName && formik.errors.itemName}
                required
            />

            <TextField
                label="Quantity"
                variant="outlined"
                name="quantity"
                type="number"
                value={formik.values.quantity}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.quantity && Boolean(formik.errors.quantity)}
                helperText={formik.touched.quantity && formik.errors.quantity}
            />

            <TextField
                label="Price"
                variant="outlined"
                name="price"
                type="number"
                value={formik.values.price}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.price && Boolean(formik.errors.price)}
                helperText={formik.touched.price && formik.errors.price}
            />

            <TextField
                label="Description"
                variant="outlined"
                name="description"
                value={formik.values.description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                multiline
                rows={4}
                error={formik.touched.description && Boolean(formik.errors.description)}
                helperText={formik.touched.description && formik.errors.description}
            />

            <Button variant="contained" color="primary" type="submit">
                Add Item
            </Button>
        </Box>
    )
}

export default CreateNewStockItem
