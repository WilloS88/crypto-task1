// Function to find greatest common divisor
function gcd(a: number, b: number): number {
  while (b !== 0) {
    const temp = b;
    b = a % b;
    a = temp;
  }
  return a;
}
  
// Function to find modular multiplicative inverse
function modInverse(a: number, m: number): number | null {
  for (let i = 1; i < m; i++) {
    if ((a * i) % m === 1) {
      return i;
    }
  }
  return null; // If no modular inverse exists
}

const spacePlaceholder = "XMEZERAX";
const numbersPlaceholder = [
  "XZEROX",
  "XONEX",
  "XTWOX",
  "XTHREEX",
  "XFOURX",
  "XFIVEX",
  "XSIXX",
  "XSEVENX",
  "XEIGHTX",
  "XNINEX",
];

// Utility function to clean and prepare input text
function prepareInput(text: string): string {
  return text
    .toUpperCase() // Convert to uppercase
    .replace(/[ÁÀÂÄ]/g, "A")
    .replace(/[Č]/g, "C")
    .replace(/[Ď]/g, "D")
    .replace(/[ÉÈÊËĚ]/g, "E")
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
    .replace(/ /g, spacePlaceholder) // Replace spaces with placeholder
    .replace(/[0-9]/g, (digit: string) => numbersPlaceholder[parseInt(digit)]); // Replace numbers with placeholder
}

// Function to split text into chunks of five characters
function formatOutput(text: string): string {
  return text.replace(/.{1,5}/g, "$& ").trim();
}

// Encrypting function
function affineEncrypt(plainText: string, a: number, b: number): string {
  if (gcd(a, 26) !== 1) {
    throw new Error(
      "Coefficient 'a' must be coprime with the alphabet size (26)"
    );
  }

  const filteredText = prepareInput(plainText);

  const encryptedText = filteredText
    .split("")
    .map((char) => {
      if (char >= "0" && char <= "9") {
        const numberIndex = char.charCodeAt(0) - "0".charCodeAt(0);
        return numbersPlaceholder[numberIndex];
      } else if (char >= "A" && char <= "Z") {
        const x = char.charCodeAt(0) - "A".charCodeAt(0);
        const encryptedChar = (a * x + b) % 26;
        return String.fromCharCode(encryptedChar + "A".charCodeAt(0));
      } else {
        return char; // Return unchanged for placeholders or numbers
      }
    })
    .join("");

  return formatOutput(encryptedText);
}

// Decrypting function
function affineDecrypt(cipherText: string, a: number, b: number): string {
  const a_inv = modInverse(a, 26);
  if (a_inv === null) {
    throw new Error(
      "Coefficient 'a' has no modular inverse, hence decryption is not possible"
    );
  }

  const filteredText = cipherText.replace(/ /g, ""); // Remove spaces before decryption

  let decryptedText = filteredText
    .split("")
    .map((char) => {
      if (char >= "A" && char <= "Z") {
        const y = char.charCodeAt(0) - "A".charCodeAt(0);
        const decryptedChar = (a_inv * (y - b + 26)) % 26;
        return String.fromCharCode(decryptedChar + "A".charCodeAt(0));
      } else {
        return char; // Return unchanged for placeholders or numbers
      }
    })
    .join("")
    .replace(new RegExp(spacePlaceholder, "g"), " ");
  // Replace placeholder back with spaces

  decryptedText = decryptedText.replace(
    new RegExp(numbersPlaceholder.join("|"), "g"),
    (match) => {
      return numbersPlaceholder.indexOf(match).toString();
    }
  );

  return decryptedText;
}

// Event Listener for ENCRYPTING and displaying in UI
document.querySelector(".encrypt-button")?.addEventListener("click", () => {
  const textToEncrypt = (
    document.getElementById("text-to-encrypt") as HTMLTextAreaElement
  ).value;
  const a = parseInt(
    (document.getElementById("encrypt-coefficient-a") as HTMLInputElement).value
  );
  const b = parseInt(
    (document.getElementById("encrypt-coefficient-b") as HTMLInputElement).value
  );

  try {
    const filteredText = prepareInput(textToEncrypt);
    (document.getElementById("filtered-text") as HTMLTextAreaElement).value =
      filteredText;
    const encryptedText = affineEncrypt(textToEncrypt, a, b);
    (document.getElementById("encrypted-text") as HTMLTextAreaElement).value =
      encryptedText;
  } catch (error) {
    if (error instanceof Error) {
      alert(error.message);
    } else {
      alert("An unknown error occurred");
    }
  }
});

// Event Listener for DECRYPTING and displaying in UI
document.querySelector(".decrypt-button")?.addEventListener("click", () => {
  const textToDecrypt = (
    document.getElementById("text-to-decrypt") as HTMLTextAreaElement
  ).value;
  const a = parseInt(
    (document.getElementById("decrypt-coefficient-a") as HTMLInputElement).value
  );
  const b = parseInt(
    (document.getElementById("decrypt-coefficient-b") as HTMLInputElement).value
  );

  try {
    const decryptedText = affineDecrypt(textToDecrypt, a, b);
    (document.getElementById("decrypted-text") as HTMLTextAreaElement).value =
      decryptedText;
  } catch (error) {
    if (error instanceof Error) {
      alert(error.message);
    } else {
      alert("An unknown error occurred");
    }
  }
});

document.querySelector(".example-button")?.addEventListener("click", () => {
  try {
    (document.getElementById("text-to-encrypt") as HTMLTextAreaElement).value = "Útok na Čeňka v 19:00 &#*^$#@OK";
  } catch (error) {
    if (error instanceof Error) {
      alert(error.message);
    } else {
      alert("An unknown error occurred");
    }
  }
  
})


console.log("kokot" + "0".charCodeAt(0));
