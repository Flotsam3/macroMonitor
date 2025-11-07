import { useEffect, useState, useContext } from "react";
import styles from "./Products.module.scss";
import Navigation from "../components/Organisms/Navigation";
import NewFoodPanel from "../components/Organisms/NewFoodPanel";
import Macronutrient from "../components/Molecules/Macronutrient";
import banana from "../assets/images/banane_1.png";
import {
   getAllOptions,
   createOptions,
   getAllFood,
   saveConsumption,
   getConsumption,
   deleteFoodItem,
   uploadImage,
} from "../services/api";
import { OptionContext, Options, InputValues } from "../context/OptionContext";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";

type SelectedFood = {
   [key: string]: string | number;
};

export default function Products() {
   const { setOptionsData, food, setFoodData, setConsumptionData, setInputValue } =
      useContext(OptionContext) || {};
   const [selectedFood, setSelectedFood] = useState<SelectedFood>({});
   const [loading, setLoading] = useState< string | false>(false);

   useEffect(() => {
      const fetchOptions = async () => {
         const initialFetch = await getAllOptions();
         if (setOptionsData) {
            if (initialFetch.length > 0) {
               setOptionsData(() => initialFetch[0]);
            } else {
               const optionsData = await createOptions({ calories: 2000 });
               setOptionsData(() => optionsData.data);
            }
         }
      };

      const getFood = async () => {
         const data = await getAllFood();
         console.log({ data });

         if (data) {
            setFoodData?.(data);
         } else {
            console.warn("Failed to fetch food data");
         }
      };

      fetchOptions();
      getFood();
   }, []);

   useEffect(() => {
      console.log({ selectedFood });
   }, [selectedFood]);

   function handleOnChange(name: string | undefined, value: string) {
      if (value === "" && name != undefined) {
         const _selectedFood = { ...selectedFood };
         delete _selectedFood[name];
         setSelectedFood(_selectedFood);
      } else {
         if (name) {
            setSelectedFood((prevSelectedFood) => ({
               ...prevSelectedFood,
               [name]: value,
            }));
         }
      }
   }

   function calculateSelectionData() {
      const dailyConsumption: Options[] = [];
      for (const key in selectedFood) {
         food?.find((foodItem) => {
            const amount = +selectedFood[key] / 100;
            if (foodItem.name === key) {
               const selectionData = {
                  name: key,
                  grams: +(amount * 100).toFixed(1),
                  calories: +(amount * foodItem.calories).toFixed(1),
                  carbohydrates: +(amount * foodItem.carbohydrates).toFixed(1),
                  fat: +(amount * foodItem.fat).toFixed(1),
                  protein: +(amount * foodItem.protein).toFixed(1),
                  saturatedFat: +(amount * foodItem.saturatedFat).toFixed(1),
                  sugar: +(amount * foodItem.sugar).toFixed(1),
                  salt: +(amount * foodItem.salt).toFixed(1),
               };
               dailyConsumption.push(selectionData);
            }
         });
      }
      return dailyConsumption;
   }

   async function handleSaveSelection() {
      if (setConsumptionData) {
         const data = calculateSelectionData();
         console.log({ data });
         await saveConsumption(data);
         const updatedData = await getConsumption();
         setConsumptionData(updatedData);
         toast.success("Food saved into daily consumption!", {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
         });
      }
   }

   function handleCreateMenu() {
      const summerizedValues = {
         calories: 0,
         carbohydrates: 0,
         fat: 0,
         protein: 0,
         saturatedFat: 0,
         sugar: 0,
         salt: 0,
      };
      const selectedData = calculateSelectionData();
      selectedData.forEach((obj) => {
         summerizedValues.calories += +obj.calories;
         summerizedValues.carbohydrates += +obj.carbohydrates;
         summerizedValues.fat += +obj.fat;
         summerizedValues.protein += +obj.protein;
         summerizedValues.saturatedFat += +obj.saturatedFat;
         summerizedValues.sugar += +obj.sugar;
         summerizedValues.salt += +obj.salt;
      });
      console.log({ summerizedValues });
      const stringifiedValues: InputValues = {
         calories: summerizedValues.calories.toFixed(1).toString(),
         carbohydrates: summerizedValues.carbohydrates.toFixed(1).toString(),
         fat: summerizedValues.fat.toFixed(1).toString(),
         protein: summerizedValues.protein.toFixed(1).toString(),
         saturatedFat: summerizedValues.saturatedFat.toFixed(1).toString(),
         sugar: summerizedValues.sugar.toFixed(1).toString(),
         salt: summerizedValues.salt.toFixed(1).toString(),
      };

      if (setInputValue) {
         setInputValue(stringifiedValues);
      }
   }

   async function handleDeleteItem(name: string | undefined) {
      if (name) {
         await deleteFoodItem({ name });
         const data = await getAllFood();
         if (setFoodData) {
            setFoodData(data);
         }
      }
   }

   async function handleUploadImage(
      id: string,
      image: string,
      evt: React.ChangeEvent<HTMLInputElement>
   ) {
      const target = evt.target as HTMLInputElement & {
         files: FileList;
      };
      const reader = new FileReader();
      reader.readAsDataURL(target.files[0]);
      reader.onload = async function () {
         const base64Image = reader.result;
         if (base64Image) {
            setLoading(id);
            await uploadImage(id, image, base64Image);
            const data = await getAllFood();
            setLoading(false);
            if (setFoodData) {
               setFoodData(data);
            }
         }
      };
   }

   return (
      <div className={styles.products}>
         <div className={styles.inputWrapper}>
            <div className={styles.navWrapper}>
               <Navigation />
            </div>
            <NewFoodPanel handleCreateMenu={handleCreateMenu} />
            <img className={styles.banana} src={banana} alt="A half peeled banana" />
            <div title="Save products with gram values into balance" className={styles.addButtonWrapper}>
               {food && food?.length > 0 && <button onClick={handleSaveSelection}>+</button>}
            </div>
         </div>
         <div className={styles.outerPanelWrapper}>
            {food &&
               food.map((food, index) => (
                  <div key={index} className={styles.productPanelWrapper}>
                     <div className={styles.titleWrapper}>
                        <div className={styles.imageWrapper}>
                           <p className={styles.image}>
                              {loading === food._id ? (
                                 <ClipLoader
                                    loading={loading == food._id}
                                    size={20}
                                    aria-label="Loading Spinner"
                                    data-testid="loader"
                                 />
                              ) : (
                                 food.image && (
                                    <img
                                       className={styles.image_small}
                                       src={import.meta.env.VITE_CLOUDINARY_URL + food.image}
                                       alt=""
                                    />
                                 )
                              )}
                              <input
                                 type="file"
                                 onChange={(evt) =>
                                    handleUploadImage(food._id || "", food.image || "", evt)
                                 }
                              />
                           </p>
                           <p className={styles.title}>
                              {food.name}
                              {food.image && (
                                 <img
                                    className={styles.image_large}
                                    src={import.meta.env.VITE_CLOUDINARY_URL + food.image}
                                    alt=""
                                 />
                              )}
                           </p>
                        </div>
                     </div>
                     <div className={styles.nutrientWrapper}>
                        <div className={styles.topNutrientWrapper}>
                           <Macronutrient label="Kcal" value={food.calories} />
                           <Macronutrient label="Carbs" value={food.carbohydrates} />
                           <Macronutrient label="Fat" value={food.fat} />
                           <Macronutrient label="Protein" value={food.protein} />
                        </div>
                        <div className={styles.bottomNutrientWrapper}>
                           <Macronutrient label="Sat.Fat" value={food.saturatedFat} />
                           <Macronutrient label="Sugar" value={food.sugar} />
                           <Macronutrient label="Salt" value={food.salt} />
                           <div className={styles.gramsWrapper}>
                              <p>g</p>
                              <input
                                 type="text"
                                 value={selectedFood[food.name || "empty"]}
                                 onChange={(evt) => handleOnChange(food.name, evt.target.value)}
                              />
                           </div>
                        </div>
                     </div>
                     <span className={styles.close} onClick={() => handleDeleteItem(food.name)}>
                        x
                     </span>
                  </div>
               ))}
         </div>
      </div>
   );
}
