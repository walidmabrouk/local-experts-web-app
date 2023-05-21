const ReservationModel = require("../models/Reservation.model");

/**-----------------------------------------------
 * @desc    Create New Reservation
 * @route   /api/reservations
 * @method  POST
 * @access  private (only Login)
 ------------------------------------------------*/
module.exports.createReservationCtrl = (async (req, res) => {
    try {

  const { clientId, professionalId, start, end, title } = req.body;
 // Créer une nouvelle instance de réservation
  const reservation = new ReservationModel({
    clientId,
    professionalId,
    start,
      end,
    title,
  });

  // Enregistrer la réservation dans la base de données
  await reservation.save();

  // Retourner une réponse appropriée
  res
    .status(201)
    .json({ message: "Réservation créée avec succès", reservation });
} catch (error) {
  // En cas d'erreur, retourner une réponse d'erreur
  res
    .status(500)
    .json({
      error: "Une erreur est survenue lors de la création de la réservation",
    });
}
});

// Assuming you have the necessary imports and setup for your application

// Controller function to get reservations by professional ID
module.exports.getReservationByProfessional = async (req, res) => {
  const { professionalId } = req.params;

  try {
    // Fetch reservations from the database based on professional ID
    const reservations = await ReservationModel.find({ professionalId })
      .populate("clientId")
      .populate("professionalId");

    // Check if any reservations were found
    if (reservations.length === 0) {
      return res
        .status(404)
        .json({ message: "No reservations found for the professional." });
    }

    // Return the reservations as a response
    res.status(200).json(reservations);
  } catch (error) {
    console.error("Error retrieving reservations:", error);
    res.status(500).json({ message: "Error retrieving reservations." });
  }
};


module.exports.getAllReservationCtrl = async (req, res) => {
  try {
    // Fetch all reservations from the database
    const reservations = await ReservationModel.find().populate(
      "clientId"
    ).populate("professionalId");

    // Check if any reservations were found
    if (reservations.length === 0) {
      return res.status(404).json({ message: "No reservations found." });
    }

    // Return the reservations as a response
    res.status(200).json(reservations);
  } catch (error) {
    console.error("Error retrieving reservations:", error);
    res.status(500).json({ message: "Error retrieving reservations." });
  }
};


module.exports.updateReservationCtrl = async (req, res) => {
  const { reservationId } = req.params;
  const { status } = req.body;

  try {
    // Find the reservation by ID in the database
    const reservation = await ReservationModel.findById(reservationId);

    // Check if the reservation exists
    if (!reservation) {
      return res.status(404).json({ message: "Reservation not found." });
    }

    // Update the reservation status
    reservation.status = status;

    // Save the updated reservation
    const updatedReservation = await reservation.save();

    // Return the updated reservation as a response
    res.status(200).json(updatedReservation);
  } catch (error) {
    console.error("Error updating reservation:", error);
    res.status(500).json({ message: "Error updating reservation." });
  }
};


module.exports.deleteReservationCtrl = async (req, res) => {
  const { reservationId } = req.params;

  try {
    // Find the reservation by ID
    const reservation = await ReservationModel.findById(reservationId);

    // Check if the reservation exists
    if (!reservation) {
      return res.status(404).json({ message: "Reservation not found." });
    }

    // Delete the reservation from the database
    await ReservationModel.findByIdAndDelete(reservationId);

    // Return a success message
    res.status(200).json({ message: "Reservation deleted successfully." });
  } catch (error) {
    console.error("Error deleting reservation:", error);
    res.status(500).json({ message: "Error deleting reservation." });
  }
};


