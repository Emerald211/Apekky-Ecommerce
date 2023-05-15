import { Outlet } from 'react-router-dom'
import Navbar from '../../components/navbar/navbar.component'
import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { customGetCategoryAndDocumentFromCollection } from '../../utils/firebase/firebase.component'
import { setCategories } from '../../store/categories/category.action'

const Navigation = () => {
  const [items, setItems] = useState()
  const dispatch = useDispatch()
  useEffect(() => {
    const getRes = async () => {
      const data = await customGetCategoryAndDocumentFromCollection();

      // console.log(data);

      dispatch(setCategories(data));

      setItems(data)
    };

    return getRes;
  }, []);

  useEffect(() => { }, [items])
  return (
      <div>
      <Navbar />
      
      <Outlet />
    </div>
  )
}

export default Navigation