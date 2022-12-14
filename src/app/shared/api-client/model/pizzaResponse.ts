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
import { IngredientResponseBase } from './ingredientResponseBase';


export interface PizzaResponse { 
    id?: number;
    name?: string | null;
    description?: string | null;
    price?: number;
    ingredients?: Array<IngredientResponseBase> | null;
}

