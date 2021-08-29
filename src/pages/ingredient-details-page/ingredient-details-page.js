import React from 'react';
import IngredientDetails from '../../components/ingredient-details/ingredient-details';
import styles from './ingredient-details-page.module.css'

function IngredientDetailsPage() {
  return (
    <>
      <h1 className={`${styles.header} text text_type_main-large mt-10 mr-10 ml-10`}>
        Детали ингридиента
      </h1>
      <IngredientDetails />
    </>
  )
}

export default IngredientDetailsPage;
