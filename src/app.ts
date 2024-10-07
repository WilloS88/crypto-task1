// Greatest common divisor function
function gcd(a: number, b: number): number {
  while (b !== 0) {
    const temp = b;
    b = a % b;
    a = temp;
  }
  return a;
}

const alphabetSize = 26;
const spacePlaceholder = "XMEZERAX";

// Utility function to clean and prepare input text
function prepareInput(text: string): string {
  return text
    .toUpperCase() // Convert to uppercase
    .replace(/[ÁÀÂÄ]/g, "A")
    .replace(/[Č]/g, "C")
    .replace(/[Ď]/g, "D")
    .replace(/[ÉÈÊË]/g, "E")
    .replace(/[ÍÌÎÏ]/g, "I")
    .replace(/[Ň]/g, "N")
    .replace(/[ÓÒÔÖ]/g, "O")
    .replace(/[Ř]/g, "R")
    .replace(/[Š]/g, "S")
    .replace(/[Ť]/g, "T")
    .replace(/[ÚÙÛÜ]/g, "U")
    .replace(/[Ý]/g, "Y")
    .replace(/[Ž]/g, "Z")
    .replace(/[^A-Z0-9 ]/g, "") // Remove all special characters except numbers and spaces
    .replace(/ /g, spacePlaceholder); // Replace spaces with placeholder
}

// Function to split text into chunks of five characters
function formatOutput(text: string): string {
  return text.replace(/.{1,5}/g, "$& ").trim();
}

// Encoding function
function affineEncrypt(plainText: string, a: number, b: number): string {
  if (gcd(a, alphabetSize) !== 1) {
    throw new Error(
      "Coefficient 'a' must be coprime with the alphabet size (26)"
    );
  }

  const filteredText = prepareInput(plainText);

  const encryptedText = filteredText
    .split("")
    .map((char) => {
      if (char >= "0" && char <= "9") {
        // Encrypt numbers 0-9 by shifting them within the range of 10
        return String.fromCharCode(
          ((char.charCodeAt(0) - "0".charCodeAt(0) + b) % 10) +
            "0".charCodeAt(0)
        );
      } else if (char >= "A" && char <= "Z") {
        const x = char.charCodeAt(0) - "A".charCodeAt(0);
        const encryptedChar = (a * x + b) % alphabetSize;
        return String.fromCharCode(encryptedChar + "A".charCodeAt(0));
      } else {
        return char; // Return unchanged for placeholders or numbers
      }
    })
    .join("");
  return formatOutput(encryptedText);
}

// Adding Event Listeners for encoding in UI
document.querySelector(".encode-button")?.addEventListener("click", () => {
  const textToEncode = (
    document.getElementById("text-to-encode") as HTMLTextAreaElement
  ).value;
  const a = parseInt(
    (document.getElementById("coefficient-a") as HTMLInputElement).value
  );
  const b = parseInt(
    (document.getElementById("coefficient-b") as HTMLInputElement).value
  );

  try {
    const encodedText = affineEncrypt(textToEncode, a, b);
    (document.getElementById("encoded-text") as HTMLTextAreaElement).value =
      encodedText;
  } catch (error) {
    if (error instanceof Error) {
      alert(error.message);
    } else {
      alert("An unknown error occurred");
    }
  }
});
