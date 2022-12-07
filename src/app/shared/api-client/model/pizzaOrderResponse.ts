/**
 * Pizza.API
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: v1
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
import { Size } from './size';
import { IngredientOrderResponse } from './ingredientOrderResponse';


export interface PizzaOrderResponse { 
    id?: number;
    size?: Size;
    quantity?: number;
    ingredients?: Array<IngredientOrderResponse> | null;
}

