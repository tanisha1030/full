const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// POST route /bfhl
app.post("/bfhl", (req, res) => {
  try {
    const { array, full_name, email_id, college_roll } = req.body;

    if (!array || !Array.isArray(array) || !full_name || !email_id || !college_roll) {
      return res.status(400).json({ is_success: false, message: "Invalid input" });
    }

    let evenNumbers = [];
    let oddNumbers = [];
    let alphabets = [];
    let specialChars = [];
    let sumNumbers = 0;
    let alphaConcat = "";

    array.forEach(item => {
      if (typeof item === "number") {
        sumNumbers += item;
        if (item % 2 === 0) evenNumbers.push(item);
        else oddNumbers.push(item);
      } else if (typeof item === "string") {
        if (/^[a-zA-Z]$/.test(item)) {
          alphabets.push(item.toUpperCase());
          alphaConcat += item;
        } else {
          specialChars.push(item);
        }
      }
    });

    // Reverse alphabetical characters in alternating caps
    const reversedAltCaps = alphaConcat
      .split("")
      .reverse()
      .map((c, i) => (i % 2 === 0 ? c.toUpperCase() : c.toLowerCase()))
      .join("");

    const today = new Date();
    const dd = String(today.getDate()).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const yyyy = today.getFullYear();

    const user_id = `${full_name.toLowerCase().replace(/ /g, "_")}_${dd}${mm}${yyyy}`;

    res.status(200).json({
      is_success: true,
      user_id,
      email_id,
      college_roll,
      even_numbers: evenNumbers,
      odd_numbers: oddNumbers,
      alphabets,
      special_characters: specialChars,
      sum_of_numbers: sumNumbers,
      reversed_alphabet_concat: reversedAltCaps
    });
  } catch (err) {
    res.status(500).json({ is_success: false, message: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
