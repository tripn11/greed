import { configureStore } from '@reduxjs/toolkit' 
import detailsReducer from './detailsReducer'


export default configureStore({
    reducer: {
      details: detailsReducer
    }
})