// Get all rooms
router.get("/rooms", async (req, res) => {
  try {
    const { data, error } = await supabase.from("rooms").select("*");
    if (error) {
      throw error;
    }
    res.status(200).json({
      data,
    });
  } catch (error) {
    console.error("Error retrieving rooms:", error.message);
    res.status(500).json({
      error: "Error retrieving rooms",
    });
  }
});

// Get a specific room by ID
router.get("/rooms/:id", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("rooms")
      .select("*")
      .eq("id", req.params.id)
      .single();
    if (error) {
      throw error;
    }
    res.status(200).json({
      data,
    });
  } catch (error) {
    console.error("Error retrieving room:", error.message);
    res.status(500).json({
      error: "Error retrieving room",
    });
  }
});

// Update a room
router.put("/rooms/:id", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("rooms")
      .update(req.body)
      .eq("id", req.params.id);
    if (error) {
      throw error;
    }
    res.status(200).json({
      message: "Room updated successfully",
    });
  } catch (error) {
    console.error("Error updating room:", error.message);
    res.status(500).json({
      error: "Error updating room",
    });
  }
});

// Create a new room
router.post("/rooms", async (req, res) => {
  try {
    const { data, error } = await supabase.from("rooms").insert(req.body);
    if (error) {
      throw error;
    }
    res.status(201).json({
      message: "Room created successfully",
      data,
    });
  } catch (error) {
    console.error("Error creating room:", error.message);
    res.status(500).json({
      error: "Error creating room",
    });
  }
});

// Delete a room
router.delete("/rooms/:id", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("rooms")
      .delete()
      .eq("id", req.params.id);
    if (error) {
      throw error;
    }
    res.status(200).json({
      message: "Room deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting room:", error.message);
    res.status(500).json({
      error: "Error deleting room",
    });
  }
});
