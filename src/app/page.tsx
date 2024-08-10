"use client";
import React, { useState, useEffect } from "react";
import { Container, Typography } from "@mui/material";
import PantryList from "../components/PantryList";
import AddItemForm from "../components/AddItemForm";
import { db } from "../lib/firebase";
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";

interface PantryItem {
  id: string;
  name: string;
  quantity: number;
}

export default function Home() {
  const [items, setItems] = useState<PantryItem[]>([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "pantryItems"),
      (snapshot) => {
        const newItems: PantryItem[] = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<PantryItem, "id">),
        }));
        setItems(newItems);
      }
    );

    return () => unsubscribe();
  }, []);

  const addItem = async (item: Omit<PantryItem, "id">) => {
    // Check if item already exists
    const existingItem = items.find((i) => i.name === item.name);
    if (existingItem) {
      // Update the quantity of the existing item
      await updateDoc(doc(db, "pantryItems", existingItem.id), {
        quantity: existingItem.quantity + item.quantity,
      });
    } else {
      // Add a new item
      await addDoc(collection(db, "pantryItems"), item);
    }
  };

  const updateItemQuantity = async (id: string, currentQuantity: number) => {
    if (currentQuantity > 1) {
      // If more than one, just decrement the quantity
      await updateDoc(doc(db, "pantryItems", id), {
        quantity: currentQuantity - 1,
      });
    } else {
      // If quantity is 1, delete the item
      await deleteDoc(doc(db, "pantryItems", id));
    }
  };

  const deleteItem = async (id: string, currentQuantity: number) => {
    await updateItemQuantity(id, currentQuantity);
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h1" gutterBottom>
        Pantry Tracker
      </Typography>
      <AddItemForm onAdd={addItem} />
      <PantryList items={items} onDelete={deleteItem} />
    </Container>
  );
}
