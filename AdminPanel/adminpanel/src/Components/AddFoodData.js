import React, { useState } from 'react'
import '../Components/AddFoodData.css'

// Firebase imports
import { db, storage } from '../Firebase/FirebaseConfig'
import { addDoc, collection } from 'firebase/firestore'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import Navbar from './Navbar/Navbar'
const AddFoodData = () => {
  const [foodName, setFoodName] = useState()
  const [foodDesc, setFoodDesc] = useState()
 
  const [foodPrice, setFoodPrice] = useState();
  const [foodType,setFoodType]=useState();
  const [foodCategories,setFoodCategories]=useState();
  const [mealType,setMealType]= useState();
  const [addOnName,setAddOnName]=useState();
  const [addOnPrice,setAddOnPrice]=useState();

  const [foodImage, setFoodImage] = useState(null)
 
  const [restName, setRestName] = useState()
 const [restArea,setRestArea]=useState();
 const [restCity,setRestCity]=useState();
 const [restPin,setRestPin]=useState();
 const [restPhone,setRestPhone]=useState();
 const [restEmail,setRestEmail]=useState();
  const [foodImageUrl, setFoodImageUrl] = useState()
  const [restBuildingNumber, setRestBuildingNumber]=useState()

  const submitHandler = e => {
    e.preventDefault()

    //  console.log("This is food data"+JSON.stringify(foodData.foodImage[0]));
    try {
      if (foodImage == null) {
        alert('Select an Image')
        return
      } else {
        const imageRef = ref(storage, `FoodImages/${foodImage.name}`)
        uploadBytes(imageRef, foodImage)
          .then(() => {
            alert('Image uploaded successfully')
            getDownloadURL(imageRef).then(url => {
              console.log(url)
              setFoodImageUrl(url)
              const foodData = {
                foodName,
                foodDesc,
                foodPrice,
                foodType,
                foodCategories,
                mealType,
                addOnName,
                addOnPrice,
                foodImageUrl: url,
                restName,
                restArea,
                restCity,
                restPin,
                restPhone,
               restEmail,
               restBuildingNumber,
               id: new Date().getTime().toString(),
              }
              const docRef = addDoc(collection(db, 'FoodData'), foodData)
              alert('Data added successfully' + docRef.id)
            })
          })
          .catch(error => {
            alert(error.message)
          })
      }
    } catch (error) {
      alert('Error adding document: ' + error)
    }
  }

  return (
   <div>
    <Navbar />
    <div className='form-outer'>
      <h2>Add Food Data</h2>
      <form className='form-inner'>
        <label>Food Name</label>
        <input
          type='text'
          name='food_name'
          onChange={e => setFoodName(e.target.value)}
        />
        <br />
        <label>Food Description</label>
        <input
          type='text'
          name='food_description'
          onChange={e => setFoodDesc(e.target.value)}
        />
        <br />
       
        <div className='food_type'>
          <label>Food Price: </label>
          <input
            type='number'
            name='food_price'
            onChange={e => setFoodPrice(e.target.value)}
          />
          <label style={{ marginLeft: 100 }}>Food Type: </label>
          <select name='food_type' className='food_types' onChange={(e)=>setFoodType(e.target.value)}>
            <option value='none'>Select Food Type</option>
            <option value='veg'>Veg</option>
            <option value='Non-veg'>Non-Veg</option>
          </select>
        </div>
        <div className='food_type' style={{paddingTop:20}}>
        <label>Food Categories: </label>
          <select name='food_categories' className='food_types' onChange={(e)=>setFoodCategories(e.target.value)}>
            <option value='none'>Select Food Categories</option>
            <option value='Indian'>Indian</option>
            <option value='Chinese'>Chinese</option>
            <option value='Japanese'>Japanese</option>
            <option value='Maxicon'>Maxicon</option>
            <option value='American'>American</option>
          </select>
          <label style={{ marginLeft: 100 }}>Meal Type: </label>
          <select name='meal_type' className='food_types' onChange={(e)=>setMealType(e.target.value)}>
            <option value='none'>Select Meal Type</option>
            <option value='Dinner'>Dinner</option>
            <option value='Starters'>Starters</option>
            <option value='Breakfast'>Breakfast</option>
            <option value='Liquid'>Liquid</option>
          </select>
        </div>
<br/>
        <div className='food_type'>
          <label>Add On Name: </label>
          <input
            type='text'
            name='add_on_name'
            onChange={e => setAddOnName(e.target.value)}
          />
          <label style={{ marginLeft: 100 }}>Add On Price: </label>
          <input
            type='number'
            name='add_on_price'
            onChange={e => setAddOnPrice(e.target.value)}
          />
        </div>

        <br />
        <label>Food Image</label>
        <input
          type='file'
          name='food_image'
          accept='image/*'
          onChange={e => setFoodImage(e.target.files[0])}
          
        />
        {/* setFoodImage(e.target.files[0])  */}
        <br />
        <label>Resturant Name: </label>
          <input
            type='text'
            name='rest_name'
            onChange={e => setRestName(e.target.value)}
          />
         <br/>

        <div className='food_type'>
          <label>Resturant Building Number/Name: </label>
          <input
            type='text'
            name='rest_building_number'
            onChange={e => setRestBuildingNumber(e.target.value)}
          />
          <label style={{ marginLeft: 100 }}>Resturant Street/Area: </label>
          <input
            type='text'
            name='rest_area'
            onChange={e => setRestArea(e.target.value)}
          />
        </div>
        <br/>
        <div className='food_type'>
          <label>Resturant City: </label>
          <input
            type='text'
            name='rest_city'
            onChange={e => setRestCity(e.target.value)}
          />
          <label style={{ marginLeft: 100 }}>Resturant Pin-code: </label>
          <input
            type='number'
            name='rest_pin'
            onChange={e => setRestPin(e.target.value)}
          />
        </div>
        <br/>
        <div className='food_type'>
          <label>Resturant Phone: </label>
          <input
            type='number'
            name='rest_phone'
            onChange={e => setRestPhone(e.target.value)}
          />
          <label style={{ marginLeft: 100 }}>Resturant Email: </label>
          <input
            type='text'
            name='rest_email'
            onChange={e => setRestEmail(e.target.value)}
          />
        </div>
        <br />
        <button onClick={submitHandler}>Add Food</button>
      </form>
    </div>
   </div>
  )
}

export default AddFoodData
