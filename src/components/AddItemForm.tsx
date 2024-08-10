import React, { useState } from "react";
import { TextField, Button, Box } from "@mui/material";

interface AddItemFormProps {
  onAdd: (item: { name: string; quantity: number }) => void;
}

const AddItemForm: React.FC<AddItemFormProps> = ({ onAdd }) => {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && quantity) {
      onAdd({ name, quantity: parseInt(quantity, 10) });
      setName("");
      setQuantity("");
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <TextField
        label="Item Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        fullWidth
        margin="normal"
        sx={{
          input: { color: "white" }, // Input text color
          "& .MuiInputLabel-root": { color: "white" }, // Label color
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "white", // Outline color
            },
            "&:hover fieldset": {
              borderColor: "yellow", // Outline color on hover
            },
            "&.Mui-focused fieldset": {
              borderColor: "orange", // Outline color when focused
            },
          },
        }}
      />
      <TextField
        label="Quantity"
        type="number"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        fullWidth
        margin="normal"
        sx={{
          input: { color: "white" }, // Input text color
          "& .MuiInputLabel-root": { color: "white" }, // Label color
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "white", // Outline color
            },
            "&:hover fieldset": {
              borderColor: "yellow", // Outline color on hover
            },
            "&.Mui-focused fieldset": {
              borderColor: "orange", // Outline color when focused
            },
          },
        }}
      />
      <Button
        type="submit"
        variant="contained"
        sx={{
          mt: 2,
          backgroundColor: "orange",
          color: "black",
          "&:hover": {
            backgroundColor: "darkorange",
          },
        }}
      >
        Add Item
      </Button>
    </Box>
  );
};

export default AddItemForm;
