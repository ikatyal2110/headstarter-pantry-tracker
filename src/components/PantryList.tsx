import React from "react";
import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

interface PantryItem {
  id: string;
  name: string;
  quantity: number;
}

interface PantryListProps {
  items: PantryItem[];
  onDelete: (id: string, quantity: number) => void;
}
const PantryList: React.FC<PantryListProps> = ({ items, onDelete }) => {
  return (
    <List>
      {items.map((item) => (
        <ListItem key={item.id}>
          <ListItemText
            primary={item.name}
            secondary={`Quantity: ${item.quantity}`}
            sx={{
              "& .MuiListItemText-primary": { color: "white" }, // Item name color
              "& .MuiListItemText-secondary": { color: "white" }, // Quantity color
            }}
          />
          <ListItemSecondaryAction>
            <IconButton
              edge="end"
              aria-label="delete"
              onClick={() => onDelete(item.id, item.quantity)}
              style={{ color: "white" }} // Add inline style for visibility
            >
              <DeleteIcon style={{ fontSize: 20 }} />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      ))}
    </List>
  );
};

export default PantryList;
