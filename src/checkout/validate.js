export function validateCheckout(fields) {
  const errors = {};

  if (!fields.fullName.trim()) {
    errors.fullName = "Full name is required.";
  }

  if (!fields.email.trim()) {
    errors.email = "Email is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) {
    errors.email = "Enter a valid email address.";
  }

  if (!fields.phone.trim()) {
    errors.phone = "Phone number is required.";
  } else if (!/^[0-9+\s-]{7,}$/.test(fields.phone)) {
    errors.phone = "Enter a valid phone number.";
  }

  if (!fields.pickupDate) {
    errors.pickupDate = "Pick-up date is required.";
  }

  if (!fields.returnDate) {
    errors.returnDate = "Return date is required.";
  } else if (fields.pickupDate && fields.returnDate < fields.pickupDate) {
    errors.returnDate = "Return date must be after pick-up date.";
  }

  return errors;
}
