import { useContext } from "react";
import styles from "./NewFoodPanel.module.scss";
import MacronutrientInput from "../Molecules/MacronutrientInput";
import Button from "../Atoms/Button";
import { Nutrient } from "../Molecules/OptionItem";
import { createFood, getAllFood, uploadImage } from "../../services/api";
import { OptionContext } from "../../context/OptionContext";
import { ToastContainer, toast, Zoom } from "react-toastify";
import { useState } from "react";
import BarcodeScanner from "../Molecules/BarcodeScanner";
import { lookupBarcode } from "../../services/productLookup";
import { downloadImageAsBase64 } from "../../services/imageHelper";
import "react-toastify/dist/ReactToastify.css";

type HandleCreateMenuType = () => void;

type NewFoodPanelProps = {
   handleCreateMenu: HandleCreateMenuType;
};

export default function NewFoodPanel({ handleCreateMenu }: NewFoodPanelProps): JSX.Element {
   const { setFoodData, inputValue, setInputValue } = useContext(OptionContext);
   const [isScanning, setIsScanning] = useState(false);

   function handleChange(evt: React.ChangeEvent<HTMLInputElement>) {
      const name = evt.target.name;
      const value = evt.target.value;
      console.log({ name, value });
      if (setInputValue) {
         setInputValue((prevInputValue) => ({
            ...prevInputValue,
            [name]: value,
         }));
      }
   }

   type InputValue = {
      name: string;
      calories: string;
      carbohydrates: string;
      fat: string;
      protein: string;
      saturatedFat: string;
      sugar: string;
      salt: string;
   };

   function sanitizeInput(inputValue: InputValue): InputValue | null {
      const fields: (keyof Omit<InputValue, "imageUrl">)[] = [
         // Exclude imageUrl from validation
         "name",
         "calories",
         "carbohydrates",
         "fat",
         "protein",
         "saturatedFat",
         "sugar",
         "salt",
      ];

      const sanitized: Partial<InputValue> = {};

      for (const key of fields) {
         const value = inputValue[key];

         if (key === "name") {
            const trimmedName = typeof value === "string" ? value.trim() : "";
            if (!trimmedName) {
               console.error("Validation failed: Name is empty");
               return null;
            }
            sanitized.name = trimmedName;
         } else {
            // Handle numeric fields - allow "0" as valid
            if (typeof value === "string") {
               const trimmed = value.trim();

               // If empty, default to "0"
               if (trimmed === "") {
                  sanitized[key] = "0";
                  continue;
               }

               const replaced = trimmed.replace(",", ".");
               const testFloat = parseFloat(replaced);

               if (isNaN(testFloat)) {
                  console.error(`Validation failed: ${key} is not a number (${trimmed})`);
                  return null;
               }

               sanitized[key] = replaced;
            } else {
               // If undefined/null, default to "0"
               sanitized[key] = "0";
            }
         }
      }

      return sanitized as InputValue;
   }

   async function handleAddToList() {
      if (inputValue && setInputValue) {
         if (!inputValue.name) return handleValidationError("Name is required!");
         if (
            inputValue.calories === "" ||
            inputValue.carbohydrates === "" ||
            inputValue.fat === "" ||
            inputValue.protein === "" ||
            inputValue.saturatedFat === "" ||
            inputValue.sugar === "" ||
            inputValue.salt === ""
         )
            return handleValidationError("All fields must have a value!");

         const sanitized = sanitizeInput(inputValue as InputValue);
         if (!sanitized) return handleValidationError("Invalid data format!");

         // Save the food item first
         const response = await createFood(sanitized);
         if (response.errors) return handleValidationError(response.errors[0].msg);

         // If there's an image URL from barcode scan, upload it
         if (inputValue.imageUrl && response.data?._id) {
            console.log("Uploading product image from:", inputValue.imageUrl);

            toast.info("Uploading product image...", {
               position: "top-center",
               autoClose: 2000,
               hideProgressBar: true,
               theme: "colored",
            });

            const base64Image = await downloadImageAsBase64(inputValue.imageUrl);

            if (base64Image) {
               await uploadImage(response.data._id, "", base64Image);
               toast.success("Image uploaded!", {
                  position: "top-center",
                  autoClose: 1500,
                  hideProgressBar: true,
                  theme: "colored",
               });
            }
         }

         // Reset form
         setInputValue({
            name: "",
            calories: "",
            carbohydrates: "",
            fat: "",
            protein: "",
            saturatedFat: "",
            sugar: "",
            salt: "",
            imageUrl: "",
         });

         // Refresh food list
         const data = await getAllFood();
         if (setFoodData) {
            setFoodData(data);
         }

         console.log("Food item created:", response);
      }
   }

   function handleValidationError(message: string) {
      toast.error(message, {
         position: "top-center",
         autoClose: 5000,
         hideProgressBar: true,
         closeOnClick: true,
         pauseOnHover: true,
         draggable: true,
         progress: undefined,
         theme: "colored",
      });
   }

   async function handleBarcodeScanned(barcode: string) {
      toast.info("Looking up product...", {
         position: "top-center",
         autoClose: 1500,
         hideProgressBar: true,
         theme: "colored",
      });

      const productData = await lookupBarcode(barcode);

      if (productData && setInputValue) {
         setInputValue(productData);

         toast.success(`Found: ${productData.name}`, {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: true,
            theme: "colored",
         });
      } else {
         toast.error("Product not found in Open Food Facts database", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: true,
            theme: "colored",
         });
      }
   }

   return (
      <div className={styles.panelWrapper}>
         <ToastContainer
            position="top-center"
            transition={Zoom}
            autoClose={5000}
            hideProgressBar
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
         />
         <h1>New Food Item</h1>
         <div className={styles.scannerWrapper}></div>
         <div className={styles.panel}>
            <div className={styles.nameWrapper}>
               <h4>{"Name"}</h4>
               <input type="text" name="name" value={inputValue?.name} onChange={handleChange} />
               <BarcodeScanner
                  onScan={handleBarcodeScanned}
                  isScanning={isScanning}
                  setIsScanning={setIsScanning}
               />
            </div>
            <div className={styles.macrosWrapper}>
               <MacronutrientInput
                  label={"Kcal"}
                  name={Nutrient.Calories}
                  value={inputValue?.calories || ""}
                  onChangeHandler={handleChange}
               />
               <div className={styles.innerMacrosWrapper}>
                  <MacronutrientInput
                     label={"Carbs"}
                     name={Nutrient.Carbohydrates}
                     value={inputValue?.carbohydrates || ""}
                     onChangeHandler={handleChange}
                  />
                  <MacronutrientInput
                     label={"Fat"}
                     name={Nutrient.Fat}
                     value={inputValue?.fat || ""}
                     onChangeHandler={handleChange}
                  />
                  <MacronutrientInput
                     label={"Protein"}
                     name={Nutrient.Protein}
                     value={inputValue?.protein || ""}
                     onChangeHandler={handleChange}
                  />
                  <MacronutrientInput
                     label={"Sat.fat"}
                     name={Nutrient.SaturatedFat}
                     value={inputValue?.saturatedFat || ""}
                     onChangeHandler={handleChange}
                  />
                  <MacronutrientInput
                     label={"Sugar"}
                     name={Nutrient.Sugar}
                     value={inputValue?.sugar || ""}
                     onChangeHandler={handleChange}
                  />
                  <MacronutrientInput
                     label={"Salt"}
                     name={Nutrient.Salt}
                     value={inputValue?.salt || ""}
                     onChangeHandler={handleChange}
                  />
               </div>
            </div>
         </div>
         <div className={styles.buttonWrapper}>
            <Button label={"Add to list"} appearance={"typeA"} onClick={handleAddToList} />
            <Button label={"Create menu"} appearance={"typeB"} onClick={handleCreateMenu} />
         </div>
      </div>
   );
}
